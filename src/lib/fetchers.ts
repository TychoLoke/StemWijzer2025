import { headers } from "next/headers";
import { AppMode } from "@/lib/time";
import { exitPollSnapshot } from "@/data/exitpoll";
import { ExitPollSnapshot } from "@/types/poll";

function cloneExitPollSnapshot(): ExitPollSnapshot {
  return {
    ...exitPollSnapshot,
    provider: { ...exitPollSnapshot.provider },
    methodology: { ...exitPollSnapshot.methodology },
    parties: exitPollSnapshot.parties.map((party) => ({ ...party })),
  };
}

function resolveBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  try {
    const headerList = headers();
    const host = headerList.get("host");
    if (host) {
      const forwardedProto = headerList.get("x-forwarded-proto");
      const protocol = forwardedProto ?? (host.includes("localhost") ? "http" : "https");
      return `${protocol}://${host}`;
    }
  } catch {
    // headers() may throw when invoked outside of a request context (e.g. during build-time).
    // In that situation we fall back to the localhost development URL defined below.
  }
  return "http://localhost:3000";
}

function getFetchInit(mode: AppMode) {
  const revalidate = mode === "PRE" ? 60 : 900;
  return {
    next: { revalidate },
  } as const;
}

export async function getExitPoll(mode: AppMode): Promise<ExitPollSnapshot> {
  const baseUrl = resolveBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/exitpoll`, getFetchInit(mode));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(
      `[exitpoll] Failed to load data from ${baseUrl}/api/exitpoll, falling back to bundled data.`,
      error,
    );
    return cloneExitPollSnapshot();
  }
}

export async function getSeats(mode: AppMode, dataset?: string) {
  const baseUrl = resolveBaseUrl();
  try {
    const url = new URL(`${baseUrl}/api/seats`);
    if (dataset) {
      url.searchParams.set("dataset", dataset);
    }
    const response = await fetch(url.toString(), getFetchInit(mode));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json() as Promise<{
      parties: ExitPollSnapshot["parties"];
      majority: number;
      updatedAt: string;
      sourceLabel?: string;
    }>;
  } catch (error) {
    console.error(
      `[exitpoll] Failed to load seat data from ${baseUrl}/api/seats, falling back to bundled data.`,
      error,
    );
    const fallback = cloneExitPollSnapshot();
    return {
      parties: fallback.parties,
      majority: fallback.majority,
      updatedAt: fallback.updatedAt,
      sourceLabel: dataset === "live" ? "Live tellingen — fallback" : "exitpoll 22:15",
    };
  }
}

import { headers } from "next/headers";
import { AppMode } from "@/lib/time";
import { slotPeilingData } from "@/data/slotpeiling";
import { SlotPeilingResponse } from "@/types/poll";

function cloneSlotPeilingData(): SlotPeilingResponse {
  return {
    ...slotPeilingData,
    provider: { ...slotPeilingData.provider },
    methodology: { ...slotPeilingData.methodology },
    parties: slotPeilingData.parties.map((party) => ({ ...party })),
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

export async function getSlotPeiling(mode: AppMode): Promise<SlotPeilingResponse> {
  const baseUrl = resolveBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/slotpeiling`, getFetchInit(mode));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(
      `[slotpeiling] Failed to load data from ${baseUrl}/api/slotpeiling, falling back to bundled data.`,
      error,
    );
    return cloneSlotPeilingData();
  }
}

export async function getSeats(mode: AppMode) {
  const baseUrl = resolveBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/seats`, getFetchInit(mode));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json() as Promise<{
      parties: SlotPeilingResponse["parties"];
      majority: number;
      updatedAt: string;
    }>;
  } catch (error) {
    console.error(
      `[slotpeiling] Failed to load seat data from ${baseUrl}/api/seats, falling back to bundled data.`,
      error,
    );
    const fallback = cloneSlotPeilingData();
    return {
      parties: fallback.parties,
      majority: fallback.majority,
      updatedAt: fallback.updatedAt,
    };
  }
}

import { headers } from "next/headers";
import { AppMode } from "@/lib/time";
import { SlotPeilingResponse } from "@/types/poll";

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

export async function getSlotPeiling(mode: AppMode): Promise<SlotPeilingResponse> {
  const baseUrl = resolveBaseUrl();
  const response = await fetch(`${baseUrl}/api/slotpeiling`, {
    cache: mode === "PRE" ? "no-store" : undefined,
    next: mode === "POST" ? { revalidate: 900 } : undefined,
  });
  if (!response.ok) {
    throw new Error("Kon slotpeiling niet laden");
  }
  return response.json();
}

export async function getSeats(mode: AppMode) {
  const baseUrl = resolveBaseUrl();
  const response = await fetch(`${baseUrl}/api/seats`, {
    cache: mode === "PRE" ? "no-store" : undefined,
    next: mode === "POST" ? { revalidate: 900 } : undefined,
  });
  if (!response.ok) {
    throw new Error("Kon zetels niet laden");
  }
  return response.json() as Promise<{
    parties: SlotPeilingResponse["parties"];
    majority: number;
    updatedAt: string;
  }>;
}

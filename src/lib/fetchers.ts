import { AppMode } from "@/lib/time";
import { SlotPeilingResponse } from "@/types/poll";

function resolveBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
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

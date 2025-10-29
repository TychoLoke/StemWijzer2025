import { CUTOFF_ISO, SITE_TZ } from "@/lib/constants";

export type AppMode = "PRE" | "POST";

export function getMode(nowIso: string): AppMode {
  const now = new Date(nowIso).getTime();
  const cutoff = new Date(CUTOFF_ISO).getTime();
  return now < cutoff ? "PRE" : "POST";
}

export function formatDateTime(iso: string, withTime = true): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: SITE_TZ,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
  }).format(date);
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: SITE_TZ,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getNextUpdateHint(mode: AppMode, updatedAtIso: string): string {
  if (mode === "PRE") {
    const cutoffTime = formatTime(CUTOFF_ISO);
    return `bij sluiting (${cutoffTime})`;
  }
  const updatedAt = new Date(updatedAtIso).getTime();
  const next = new Date(updatedAt + 15 * 60 * 1000);
  const formatted = formatTime(next.toISOString());
  return `~${formatted}`;
}

export function parseMajorityHint(majority: number): string {
  return `Meerderheid bij ${majority} zetels.`;
}

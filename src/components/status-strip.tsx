import { formatDateTime, getNextUpdateHint, AppMode } from "@/lib/time";

interface StatusStripProps {
  updatedAt: string;
  mode: AppMode;
  sourceLabel?: string;
  isLive?: boolean;
}

export function StatusStrip({ updatedAt, mode, sourceLabel, isLive = false }: StatusStripProps) {
  const updatedLabel = formatDateTime(updatedAt);
  const nextHint = getNextUpdateHint(mode, updatedAt);
  const normalizedLabel = (() => {
    const label = sourceLabel ?? "Exitpoll 22:15";
    if (label.length === 0) {
      return label;
    }
    return label.charAt(0).toUpperCase() + label.slice(1);
  })();

  const heading = isLive
    ? `${normalizedLabel} — laatst bijgewerkt ${updatedLabel}`
    : `${normalizedLabel} — niet officiële uitslag — laatst bijgewerkt ${updatedLabel}`;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
      <span className="font-semibold text-white">{heading}</span>
      <span className="hidden text-slate-500 sm:inline">•</span>
      <span>Volgende update {nextHint}</span>
    </div>
  );
}

import { formatDateTime, getNextUpdateHint, AppMode } from "@/lib/time";

interface StatusStripProps {
  updatedAt: string;
  mode: AppMode;
}

export function StatusStrip({ updatedAt, mode }: StatusStripProps) {
  const updatedLabel = formatDateTime(updatedAt);
  const nextHint = getNextUpdateHint(mode, updatedAt);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
      <span className="font-semibold text-white">
        Exitpoll — niet officiële uitslag — laatst bijgewerkt {updatedLabel}
      </span>
      <span className="hidden text-slate-500 sm:inline">•</span>
      <span>Volgende update {nextHint}</span>
    </div>
  );
}

import { getPartyBranding, getPartyGradient } from "@/data/party-colors";
import { PartyProjection } from "@/types/poll";
import clsx from "clsx";

interface SeatBarsProps {
  parties: PartyProjection[];
  majority: number;
}

export function SeatBars({ parties, majority }: SeatBarsProps) {
  const sorted = [...parties].sort((a, b) => b.seats - a.seats);
  const maxSeats = Math.max(majority, ...sorted.map((party) => party.seats));

  return (
    <div className="relative space-y-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 flex items-stretch"
        aria-hidden="true"
      >
        <div
          className="relative"
          style={{ width: `${(majority / maxSeats) * 100}%` }}
        >
          <div className="absolute inset-y-0 right-0 w-[2px] bg-white/50" />
        </div>
      </div>
      {sorted.map((party) => {
        const branding = getPartyBranding(party.id);
        const gradient = getPartyGradient(party.id);
        const width = Math.max((party.seats / maxSeats) * 100, 3);
        const deltaLabel = party.seatDelta > 0 ? `+${party.seatDelta}` : `${party.seatDelta}`;
        const deltaIcon = party.seatDelta > 0 ? "↑" : party.seatDelta < 0 ? "↓" : "→";
        const deltaTone =
          party.seatDelta > 0
            ? "bg-emerald-500/20 text-emerald-100"
            : party.seatDelta < 0
              ? "bg-rose-500/20 text-rose-100"
              : "bg-slate-700 text-slate-200";
        return (
          <div key={party.id} className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    background: gradient,
                    color: branding.contrastText,
                    boxShadow: `0 8px 18px -10px ${branding.secondary}`,
                  }}
                >
                  {party.seats}
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">{party.name}</span>
                  <span className="text-xs text-slate-300">{deltaIcon} {deltaLabel} t.o.v. vorige verkiezingen</span>
                </div>
              </div>
              <span className={clsx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", deltaTone)}>
                <span>{deltaIcon}</span>
                <span>{deltaLabel}</span>
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800" role="presentation">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${width}%`,
                  background: gradient,
                  boxShadow: `0 8px 25px -12px ${branding.secondary}`,
                }}
                title={`Zetels: ${party.seats} • Δ ${deltaLabel}`}
              />
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <div className="h-3 w-px bg-white/40" />
        <span>Streep geeft meerderheid ({majority} zetels)</span>
      </div>
      <p className="text-xs text-slate-400">
        Dit is een exitpoll; de werkelijke uitslag kan afwijken.
      </p>
    </div>
  );
}

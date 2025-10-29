import { PartyProjection } from "@/types/poll";
import clsx from "clsx";

interface SeatBarsProps {
  parties: PartyProjection[];
  majority: number;
}

const COLORS = [
  "from-indigo-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-orange-500",
  "from-sky-500 to-cyan-500",
  "from-purple-500 to-violet-500",
  "from-amber-500 to-orange-500",
  "from-lime-500 to-emerald-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-indigo-500",
  "from-teal-500 to-emerald-500",
  "from-red-500 to-rose-500",
  "from-slate-500 to-slate-400",
  "from-yellow-500 to-amber-500",
  "from-green-500 to-emerald-500",
  "from-fuchsia-500 to-purple-500",
  "from-cyan-500 to-sky-500",
];

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
          <div className="absolute inset-y-0 right-0 w-px bg-white/40" />
        </div>
      </div>
      {sorted.map((party, index) => {
        const gradient = COLORS[index % COLORS.length];
        const width = Math.max((party.seats / maxSeats) * 100, 3);
        const rangeLabel = `${party.pctRange[0].toFixed(1)}–${party.pctRange[1].toFixed(1)}%`;
        return (
          <div key={party.id} className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                  {party.seats}
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">{party.name}</span>
                  <span className="text-xs text-slate-300">Range: {rangeLabel}</span>
                </div>
              </div>
              <span className="text-sm font-medium text-slate-200">{party.pct.toFixed(1)}%</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800" role="presentation">
              <div
                className={clsx("h-full bg-gradient-to-r", gradient)}
                style={{ width: `${width}%` }}
                title={`Zetels: ${party.seats} ±${party.seatMargin} • Bandbreedte ${rangeLabel}`}
              />
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <div className="h-3 w-px bg-white/40" />
        <span>Streep geeft meerderheid ({majority} zetels)</span>
      </div>
    </div>
  );
}

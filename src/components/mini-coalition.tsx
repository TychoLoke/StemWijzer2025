"use client";

import { useMemo, useState } from "react";
import { PartyProjection } from "@/types/poll";
import clsx from "clsx";

interface MiniCoalitionProps {
  parties: PartyProjection[];
  majority: number;
}

const MINI_PRESETS: { name: string; parties: string[] }[] = [
  { name: "Progressief", parties: ["glpvda", "d66", "volt", "pvdd", "sp", "cu", "denk"] },
  { name: "Rechts", parties: ["vvd", "pvv", "ja21", "cda", "bbb", "sgp"] },
];

export function MiniCoalition({ parties, majority }: MiniCoalitionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const partyMap = useMemo(() => {
    const map = new Map<string, PartyProjection>();
    parties.forEach((party) => map.set(party.id, party));
    return map;
  }, [parties]);

  const selectedParties = selectedIds
    .map((id) => partyMap.get(id))
    .filter((party): party is PartyProjection => Boolean(party));

  const totalSeats = selectedParties.reduce((sum, party) => sum + party.seats, 0);
  const hasMajority = totalSeats >= majority;

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-indigo-500/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2 text-2xl font-semibold text-white">
          {totalSeats}
          <span className="text-sm font-medium text-slate-300">zetels</span>
        </div>
        <span
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-semibold",
            hasMajority ? "bg-emerald-500/20 text-emerald-200" : "bg-slate-800 text-slate-300"
          )}
        >
          {hasMajority ? "Meerderheid" : `Nog ${Math.max(0, majority - totalSeats)}`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedParties.length === 0 && (
          <p className="text-xs text-slate-400">Kies partijen hieronder om te testen.</p>
        )}
        {selectedParties.map((party) => (
          <span
            key={party.id}
            className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-100"
          >
            {party.name}
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{party.seats}</span>
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {parties.map((party) => {
          const active = selectedIds.includes(party.id);
          return (
            <button
              key={party.id}
              type="button"
              onClick={() =>
                setSelectedIds((prev) =>
                  prev.includes(party.id)
                    ? prev.filter((id) => id !== party.id)
                    : [...prev, party.id]
                )
              }
              className={clsx(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition",
                active
                  ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
              )}
            >
              {party.name}
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{party.seats}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 text-xs text-slate-300">
        <p className="font-semibold uppercase tracking-wide text-slate-400">Presets</p>
        <div className="flex flex-wrap gap-2">
          {MINI_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() =>
                setSelectedIds(preset.parties.filter((id) => partyMap.has(id)))
              }
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-white/90 hover:border-white/30 hover:bg-white/10"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

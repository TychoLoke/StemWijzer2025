"use client";

import { useMemo, useState } from "react";
import { getPartyBranding, getPartyGradient } from "@/data/party-colors";
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
    <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-indigo-500/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2 text-2xl font-semibold text-white">
          {totalSeats}
          <span className="text-sm font-medium text-slate-300">zetels</span>
        </div>
        <span
          className={clsx(
            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
            hasMajority ? "bg-emerald-500/20 text-emerald-100" : "bg-white/5 text-slate-200"
          )}
        >
          {hasMajority ? "Meerderheid" : `Nog ${Math.max(0, majority - totalSeats)}`}
        </span>
      </div>

      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-800/70">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${Math.min(Math.max((totalSeats / majority) * 100, 0), 115)}%`,
            background: hasMajority
              ? "linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(45, 212, 191, 0.8))"
              : "linear-gradient(90deg, rgba(129, 140, 248, 0.9), rgba(56, 189, 248, 0.85))",
          }}
        />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-white/50" aria-hidden />
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedParties.length === 0 && (
          <p className="text-xs text-slate-400">Kies partijen hieronder om te testen.</p>
        )}
        {selectedParties.map((party) => {
          const branding = getPartyBranding(party.id);
          return (
            <span
              key={party.id}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium shadow"
              style={{
                background: `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`,
                color: branding.contrastText,
                boxShadow: `0 12px 24px -20px ${branding.secondary}`,
              }}
            >
              {party.name}
              <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-semibold">
                {party.seats}
              </span>
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {parties.map((party) => {
          const active = selectedIds.includes(party.id);
          const branding = getPartyBranding(party.id);
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
                "inline-flex items-center justify-between gap-2 rounded-full border px-3 py-1 text-xs transition",
                active
                  ? "shadow-md shadow-indigo-500/20"
                  : "hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              )}
              style={{
                borderColor: active ? branding.ring : "rgba(148, 163, 184, 0.25)",
                background: active
                  ? `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`
                  : "rgba(15, 23, 42, 0.65)",
                color: active ? branding.contrastText : undefined,
              }}
            >
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: getPartyGradient(party.id) }} />
                {party.name}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-semibold">
                {party.seats}
              </span>
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

      <p className="text-[11px] text-slate-500">Meerderheid bij {majority} zetels. Dit is een exitpoll; de werkelijke uitslag kan afwijken.</p>
    </div>
  );
}

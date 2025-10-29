"use client";

import { useState } from "react";
import { PartyProjection, ExitPollSnapshot } from "@/types/poll";
import { SeatBars } from "@/components/seat-bars";
import clsx from "clsx";

interface SlotTabsProps {
  parties: PartyProjection[];
  majority: number;
  methodology: ExitPollSnapshot["methodology"];
}

const TABS = ["Zetels", "Delta vs vorige verkiezingen", "Methodiek"] as const;

type TabKey = (typeof TABS)[number];

export function SlotTabs({ parties, majority, methodology }: SlotTabsProps) {
  const [active, setActive] = useState<TabKey>("Zetels");
  const sortedByDelta = [...parties].sort((a, b) => b.seatDelta - a.seatDelta);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              active === tab
                ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                : "bg-white/5 text-slate-200 hover:bg-white/10"
            )}
            aria-pressed={active === tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
        {active === "Zetels" && <SeatBars parties={parties} majority={majority} />}
        {active === "Delta vs vorige verkiezingen" && (
          <div className="space-y-3">
            <ul className="space-y-2">
              {sortedByDelta.map((party) => {
                const deltaLabel = party.seatDelta > 0 ? `+${party.seatDelta}` : `${party.seatDelta}`;
                const trend = party.seatDelta > 0 ? "↑" : party.seatDelta < 0 ? "↓" : "→";
                const tone =
                  party.seatDelta > 0
                    ? "bg-emerald-500/20 text-emerald-100"
                    : party.seatDelta < 0
                      ? "bg-rose-500/20 text-rose-100"
                      : "bg-slate-700 text-slate-200";
                return (
                  <li
                    key={party.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        {party.seats}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{party.name}</span>
                        <span className="text-xs text-slate-300">Huidig: {party.seats} zetels</span>
                      </div>
                    </div>
                    <span className={clsx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold", tone)}>
                      <span>{trend}</span>
                      <span>{deltaLabel}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-slate-400">
              Dit is een exitpoll; de werkelijke uitslag kan afwijken.
            </p>
          </div>
        )}
        {active === "Methodiek" && (
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              <span className="font-semibold text-white">Steekproef:</span> {methodology.sample}
            </p>
            <p>
              <span className="font-semibold text-white">Notities:</span> {methodology.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

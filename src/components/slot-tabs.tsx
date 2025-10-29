"use client";

import { useState } from "react";
import { PartyProjection, SlotPeilingResponse } from "@/types/poll";
import { SeatBars } from "@/components/seat-bars";
import clsx from "clsx";

interface SlotTabsProps {
  parties: PartyProjection[];
  majority: number;
  methodology: SlotPeilingResponse["methodology"];
}

const TABS = ["Zetels", "Swing (Δ)", "Delta vs vorige", "Methodiek"] as const;

type TabKey = (typeof TABS)[number];

export function SlotTabs({ parties, majority, methodology }: SlotTabsProps) {
  const [active, setActive] = useState<TabKey>("Zetels");

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
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
        {active === "Zetels" && <SeatBars parties={parties} majority={majority} />}
        {active === "Swing (Δ)" && (
          <p className="text-sm text-slate-300">
            Swinginformatie volgt na de eerste exitpoll. Hou deze tab in de gaten vanaf 21:00.
          </p>
        )}
        {active === "Delta vs vorige" && (
          <p className="text-sm text-slate-300">
            Vergelijking met de vorige peiling wordt 15 minuten na sluiting beschikbaar.
          </p>
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

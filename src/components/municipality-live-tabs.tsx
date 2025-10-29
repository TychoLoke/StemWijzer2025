"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { MunicipalityResultSet } from "@/types/municipality";
import { MunicipalityResults } from "@/components/municipality-results";
import { UseInBuilderButton } from "@/components/use-in-builder-button";

interface MunicipalityLiveTabsProps {
  combined: MunicipalityResultSet;
  municipalities: MunicipalityResultSet[];
}

type TabKey = "total" | "municipal";

export function MunicipalityLiveTabs({ combined, municipalities }: MunicipalityLiveTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("total");
  const [activeMunicipality, setActiveMunicipality] = useState(
    municipalities[0]?.municipality ?? combined.municipality,
  );

  const municipalityOptions = useMemo(
    () => municipalities.map((result) => result.municipality),
    [municipalities],
  );

  const activeResult = useMemo(() => {
    if (activeTab === "total") {
      return combined;
    }
    return (
      municipalities.find((result) => result.municipality === activeMunicipality) ??
      municipalities[0] ??
      combined
    );
  }, [activeTab, activeMunicipality, combined, municipalities]);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("total")}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            activeTab === "total"
              ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
              : "bg-white/5 text-slate-200 hover:bg-white/10",
          )}
          aria-pressed={activeTab === "total"}
        >
          Totaaloverzicht
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("municipal")}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            activeTab === "municipal"
              ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
              : "bg-white/5 text-slate-200 hover:bg-white/10",
          )}
          aria-pressed={activeTab === "municipal"}
        >
          Per gemeente
        </button>
      </div>

      {activeTab === "municipal" && municipalityOptions.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-200 shadow-lg shadow-indigo-500/10">
          <span className="font-semibold uppercase tracking-wide text-slate-300">Kies gemeente:</span>
          <div className="flex flex-wrap gap-2">
            {municipalityOptions.map((municipality) => (
              <button
                key={municipality}
                type="button"
                onClick={() => setActiveMunicipality(municipality)}
                className={clsx(
                  "rounded-full border px-3 py-1 font-medium transition",
                  activeMunicipality === municipality
                    ? "border-indigo-400/80 bg-indigo-500/20 text-indigo-100 shadow shadow-indigo-500/20"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10",
                )}
                aria-pressed={activeMunicipality === municipality}
              >
                {municipality}
              </button>
            ))}
          </div>
        </div>
      )}

      <MunicipalityResults
        result={activeResult}
        action={
          activeTab === "total" ? (
            <UseInBuilderButton
              dataset="live"
              src="Live tellingen — Landelijk totaal"
              label="Coalitie op live telling"
            />
          ) : undefined
        }
      />
    </section>
  );
}

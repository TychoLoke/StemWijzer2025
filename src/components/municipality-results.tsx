"use client";

import { useMemo, type ReactNode } from "react";
import clsx from "clsx";
import { MunicipalityResultSet } from "@/types/municipality";

const percentFormatter = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const deltaFormatter = new Intl.NumberFormat("nl-NL", {
  signDisplay: "exceptZero",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const voteFormatter = new Intl.NumberFormat("nl-NL");

const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface MunicipalityResultsProps {
  result: MunicipalityResultSet;
  action?: ReactNode;
}

const coalitionFocus = new Set(["d66", "cda", "vvd", "ja21"]);

export function MunicipalityResults({ result, action }: MunicipalityResultsProps) {
  const coalitionShare = useMemo(
    () =>
      result.parties
        .filter((party) => coalitionFocus.has(party.slug))
        .reduce((sum, party) => sum + party.share2025, 0),
    [result.parties],
  );

  const topParties = result.parties.slice(0, 3);

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-indigo-500/10">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-indigo-300">Definitieve uitslag</span>
            <h2 className="text-2xl font-semibold text-white">{result.municipality} is binnen</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-100">
              {result.reporting}
            </div>
            {action}
          </div>
        </div>
        <p className="text-sm text-slate-300">
          Stand bijgewerkt op {dateFormatter.format(new Date(result.updatedAt))}. In deze gemeente pakken {topParties[0]?.name ?? ""}
          , {topParties[1]?.name ?? ""} en {topParties[2]?.name ?? ""} de podiumplaatsen. Samen halen D66, CDA, VVD en JA21
          {" "}
          <span className="font-semibold text-white">{percentFormatter.format(coalitionShare)}%</span> van de stemmen – een
          relevante combinatie om meteen in de coalitiebouwer te testen.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        {topParties.map((party, index) => (
          <div
            key={party.slug}
            className="flex flex-1 min-w-[12rem] items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-indigo-200">#{index + 1}</span>
              <p className="text-sm font-semibold text-white">{party.name}</p>
            </div>
            <div className="text-right text-sm text-slate-200">
              <p className="font-semibold text-white">{percentFormatter.format(party.share2025)}%</p>
              <p className="text-xs text-slate-400">{voteFormatter.format(party.votes2025)} stemmen</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="rounded-l-2xl bg-white/5 px-4 py-2 font-medium text-white">Partij</th>
              <th className="bg-white/5 px-4 py-2 font-medium text-white">2025</th>
              <th className="bg-white/5 px-4 py-2 font-medium text-white">2021</th>
              <th className="rounded-r-2xl bg-white/5 px-4 py-2 font-medium text-white">Δ pp</th>
            </tr>
          </thead>
          <tbody>
            {result.parties.map((party, index) => {
              const delta = deltaFormatter.format(party.shareDelta);
              const deltaClass = party.shareDelta > 0 ? "text-emerald-300" : party.shareDelta < 0 ? "text-rose-300" : "text-slate-300";
              return (
                <tr
                  key={party.slug}
                  className={clsx(
                    "align-top text-sm text-slate-200",
                    index === 0 && "bg-indigo-500/5",
                    index % 2 === 1 && "bg-white/5",
                  )}
                >
                  <td className="rounded-l-2xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">#{index + 1}</span>
                      <span className="font-medium text-white">{party.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{voteFormatter.format(party.votes2025)}</div>
                    <div className="text-xs text-slate-400">{percentFormatter.format(party.share2025)}%</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{voteFormatter.format(party.votes2021)}</div>
                    <div className="text-xs text-slate-400">{percentFormatter.format(party.share2021)}%</div>
                  </td>
                  <td className="rounded-r-2xl px-4 py-3">
                    <span className={clsx("font-semibold", deltaClass)}>{delta}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {result.note && <p className="text-xs text-slate-400">{result.note}</p>}
    </section>
  );
}

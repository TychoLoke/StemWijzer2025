"use client";

import { getPartyBranding } from "@/data/party-colors";
import { RecommendedCoalition } from "@/lib/coalitions";
import { PartyProjection } from "@/types/poll";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

interface LikelyCoalitionsProps {
  parties: PartyProjection[];
  majority: number;
  coalitions: RecommendedCoalition[];
  onApply?: (partyIds: string[]) => void;
  showLink?: boolean;
}

const TONE_LABEL: Record<RecommendedCoalition["tone"], string> = {
  progressive: "Progressief",
  centrist: "Centrum",
  right: "Rechts",
  broad: "Breed",
};

function buildStripeGradient(partyIds: string[]): string {
  const stops = partyIds.map((id, index) => {
    const { primary, secondary } = getPartyBranding(id);
    const start = (index / partyIds.length) * 100;
    const end = ((index + 1) / partyIds.length) * 100;
    return `${primary} ${start}%, ${secondary} ${end}%`;
  });

  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

export function LikelyCoalitions({
  parties,
  majority,
  coalitions,
  onApply,
  showLink = true,
}: LikelyCoalitionsProps) {
  const partyMap = useMemo(() => new Map(parties.map((party) => [party.id, party])), [parties]);

  if (coalitions.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/20">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Waarschijnlijke coalities</h3>
          <p className="text-sm text-slate-300">
            Gebaseerd op de exitpoll en actuele machtsblokken. Kies een scenario of bouw verder.
          </p>
        </div>
        {showLink && (
          <Link
            href="/coalitie"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/10"
          >
            Naar de bouwer
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {coalitions.map((coalition) => {
          const gradient = buildStripeGradient(coalition.parties);
          const seatLabel = `${coalition.seatTotal} zetels`;
          const surplusLabel = coalition.surplus > 0 ? `+${coalition.surplus}` : coalition.surplus.toString();
          const actionable = typeof onApply === "function";
          const content = (
            <div className="flex h-full flex-col gap-4">
              <div
                className="h-2 w-full rounded-full"
                style={{ backgroundImage: gradient }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {TONE_LABEL[coalition.tone]}
                  </p>
                  <h4 className="text-lg font-semibold text-white">{coalition.name}</h4>
                  <p className="text-sm text-slate-300">{coalition.description}</p>
                </div>
                <span
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100"
                >
                  {seatLabel}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {coalition.parties.map((id) => {
                  const branding = getPartyBranding(id);
                  const party = partyMap.get(id);
                  if (!party) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`,
                        color: branding.contrastText,
                      }}
                    >
                      {party.name}
                      <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                        {party.seats}
                      </span>
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>
                  Meerderheid bij {majority}. Voorsprong: {surplusLabel}
                </span>
                {actionable && (
                  <span className="font-semibold text-indigo-200">Selecteer scenario →</span>
                )}
              </div>
            </div>
          );

          if (!actionable) {
            return (
              <article
                key={coalition.id}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-md shadow-indigo-500/10"
              >
                {content}
              </article>
            );
          }

          return (
            <button
              key={coalition.id}
              type="button"
              onClick={() => onApply(coalition.parties)}
              className={clsx(
                "flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-left shadow-md shadow-indigo-500/10 transition",
                "hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              )}
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}

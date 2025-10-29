"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { PartyProjection } from "@/types/poll";
import { MAJORITY } from "@/lib/constants";
import { parseMajorityHint } from "@/lib/time";
import { getPartyBranding, getPartyGradient } from "@/data/party-colors";
import { LikelyCoalitions } from "@/components/likely-coalitions";
import { getRecommendedCoalitions } from "@/lib/coalitions";
import clsx from "clsx";

const PRESETS: { name: string; parties: string[] }[] = [
  {
    name: "Middenlinks 77",
    parties: ["glpvda", "d66", "cda", "volt", "cu", "50plus", "sp"],
  },
  {
    name: "Rechts 78",
    parties: ["vvd", "pvv", "ja21", "cda", "bbb", "sgp"],
  },
  {
    name: "Brede coalitie 84",
    parties: ["glpvda", "d66", "cda", "vvd", "volt", "pvdd"],
  },
];

interface CoalitionBuilderProps {
  parties: PartyProjection[];
  sourceLabel: string;
}

export function CoalitionBuilder({ parties, sourceLabel }: CoalitionBuilderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const builderRef = useRef<HTMLDivElement>(null);

  const partyMap = useMemo(() => {
    const map = new Map<string, PartyProjection>();
    parties.forEach((party) => map.set(party.id, party));
    return map;
  }, [parties]);

  useEffect(() => {
    const queryCoalition = searchParams.get("c");
    if (queryCoalition) {
      const ids = queryCoalition
        .split(",")
        .map((value) => value.trim())
        .filter((value) => partyMap.has(value));
      setSelectedIds(ids);
    } else if (selectedIds.length === 0) {
      setSelectedIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedIds.length > 0) {
      params.set("c", selectedIds.join(","));
    } else {
      params.delete("c");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  const selectedParties = selectedIds
    .map((id) => partyMap.get(id))
    .filter((party): party is PartyProjection => Boolean(party));

  const totalSeats = selectedParties.reduce((sum, party) => sum + party.seats, 0);
  const hasMajority = totalSeats >= MAJORITY;
  const seatDelta = totalSeats - MAJORITY;
  const progressWidth = Math.min(Math.max((totalSeats / MAJORITY) * 100, 0), 115);
  const progressGradient = hasMajority
    ? "linear-gradient(90deg, rgba(16, 185, 129, 0.85), rgba(34, 211, 238, 0.9))"
    : "linear-gradient(90deg, rgba(129, 140, 248, 0.9), rgba(56, 189, 248, 0.85))";
  const recommendedCoalitions = useMemo(
    () => getRecommendedCoalitions(parties, MAJORITY),
    [parties],
  );

  const toggleParty = useCallback(
    (partyId: string) => {
      setSelectedIds((prev) =>
        prev.includes(partyId)
          ? prev.filter((id) => id !== partyId)
          : [...prev, partyId],
      );
    },
    [],
  );

  const applyPreset = useCallback(
    (ids: string[]) => {
      setSelectedIds(ids.filter((id) => partyMap.has(id)));
    },
    [partyMap],
  );

  const resetCoalition = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const shareCoalition = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Scenario gekopieerd");
    } catch (error) {
      console.error(error);
      setToast("Kon URL niet kopiëren");
    }
  }, []);

  const exportPng = useCallback(async () => {
    if (!builderRef.current) return;
    const canvas = await html2canvas(builderRef.current, {
      backgroundColor: "#020617",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = "coalitie.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setToast("PNG opgeslagen");
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold text-white">Jouw coalitie</h2>
          <p className="text-sm text-slate-300">
            Bouw een meerderheid van {MAJORITY} zetels en exporteer of deel je scenario.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            onClick={resetCoalition}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/10"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={shareCoalition}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/60 bg-indigo-500/20 px-4 py-2 font-medium text-indigo-100 transition hover:bg-indigo-500/30"
          >
            Deel scenario
          </button>
          <button
            type="button"
            onClick={exportPng}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-2 font-medium text-emerald-100 transition hover:bg-emerald-500/30"
          >
            Exporteer PNG
          </button>
        </div>
      </div>

      <div
        ref={builderRef}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-indigo-500/15"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(79, 70, 229, 0.22), transparent 55%), radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.2), transparent 60%)",
          }}
        />

        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
              Gebaseerd op {sourceLabel}
            </p>
            <span
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold backdrop-blur",
                hasMajority
                  ? "bg-emerald-400/20 text-emerald-100"
                  : "bg-white/10 text-slate-200",
              )}
              aria-live="polite"
            >
              {hasMajority ? "Meerderheid" : "Nog"}
              {!hasMajority && <span className="font-semibold">{Math.max(0, -seatDelta)}</span>}
              {!hasMajority && <span>zetels</span>}
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-semibold text-white">{totalSeats}</span>
                <span className="text-base text-slate-300">zetels</span>
              </div>
              <p className="text-sm text-slate-300">{parseMajorityHint(MAJORITY)}</p>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs uppercase tracking-wide text-slate-400">
              <span>Meerderheidsdrempel</span>
              <span className="text-lg font-semibold text-white">{MAJORITY}</span>
            </div>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800/70">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
              style={{
                width: `${progressWidth}%`,
                background: progressGradient,
                boxShadow: hasMajority
                  ? "0 12px 32px -18px rgba(16, 185, 129, 0.65)"
                  : "0 12px 32px -18px rgba(59, 130, 246, 0.6)",
              }}
            />
            <div className="absolute inset-y-0 right-0 w-[2px] bg-white/60" aria-hidden />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>
              {hasMajority
                ? `Voorsprong van ${seatDelta} zetels`
                : `Nog ${Math.max(0, -seatDelta)} zetels nodig`}
            </span>
            <span>Streep = {MAJORITY} zetels</span>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr,1.9fr]">
            <section aria-label="Geselecteerde partijen" className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
                  Coalitie ({selectedParties.length})
                </h3>
                {selectedParties.length > 0 && (
                  <button
                    type="button"
                    onClick={resetCoalition}
                    className="text-xs font-medium text-indigo-200 hover:text-indigo-100"
                  >
                    Wis selectie
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedParties.length === 0 && (
                  <p className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-sm text-slate-300">
                    Voeg partijen toe vanuit de lijst hiernaast om je coalitie te starten.
                  </p>
                )}
                {selectedParties.map((party) => {
                  const branding = getPartyBranding(party.id);
                  const deltaLabel = party.seatDelta > 0 ? `+${party.seatDelta}` : `${party.seatDelta}`;
                  const deltaTone =
                    party.seatDelta > 0
                      ? "bg-black/20 text-emerald-100"
                      : party.seatDelta < 0
                        ? "bg-black/25 text-rose-200"
                        : "bg-black/20 text-slate-200";
                  return (
                    <button
                      key={party.id}
                      type="button"
                      onClick={() => toggleParty(party.id)}
                      className="group flex flex-col gap-3 rounded-2xl border border-transparent p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`,
                        color: branding.contrastText,
                        boxShadow: `0 20px 32px -24px ${branding.secondary}`,
                      }}
                      title={`Verwijder ${party.name}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Coalitie</p>
                          <h4 className="text-lg font-semibold leading-tight">{party.name}</h4>
                        </div>
                        <span className="rounded-full bg-black/20 px-3 py-1 text-sm font-semibold">
                          {party.seats} zetels
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={clsx("inline-flex items-center gap-1 rounded-full px-2 py-1", deltaTone)}>
                          {party.seatDelta > 0 ? "↑" : party.seatDelta < 0 ? "↓" : "→"}
                          <span className="font-semibold">{deltaLabel}</span>
                        </span>
                        <span className="text-xs font-medium opacity-90">Klik om te verwijderen</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section aria-label="Beschikbare partijen" className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Partijen
              </h3>
              <div className="grid max-h-[28rem] grid-cols-1 gap-3 overflow-auto pr-1 scrollbar-thin md:grid-cols-2">
                {parties.map((party) => {
                  const active = selectedIds.includes(party.id);
                  const branding = getPartyBranding(party.id);
                  const deltaLabel = party.seatDelta > 0 ? `+${party.seatDelta}` : `${party.seatDelta}`;
                  return (
                    <button
                      key={party.id}
                      type="button"
                      onClick={() => toggleParty(party.id)}
                      className={clsx(
                        "relative flex flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition",
                        active
                          ? "shadow-lg shadow-indigo-500/20"
                          : "hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5",
                      )}
                      style={{
                        borderColor: active ? branding.ring : "rgba(148, 163, 184, 0.25)",
                        background: active
                          ? `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`
                          : "rgba(15, 23, 42, 0.6)",
                        color: active ? branding.contrastText : "",
                      }}
                      title={`Klik om ${active ? "te verwijderen" : "toe te voegen"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: getPartyGradient(party.id) }}
                          />
                          <span className="text-sm font-semibold">{party.name}</span>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {party.seats} zetels
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1 rounded-full px-2 py-1",
                            active ? "bg-black/25" : "bg-white/10 text-slate-200",
                            party.seatDelta > 0
                              ? active
                                ? "text-emerald-100"
                                : "text-emerald-300"
                              : party.seatDelta < 0
                                ? active
                                  ? "text-rose-100"
                                  : "text-rose-300"
                                : active
                                  ? "text-slate-100"
                                  : "text-slate-300",
                          )}
                        >
                          {party.seatDelta > 0 ? "↑" : party.seatDelta < 0 ? "↓" : "→"}
                          <span className="font-semibold">{deltaLabel}</span>
                        </span>
                        <span className="text-xs font-medium text-indigo-200">
                          {active ? "In coalitie" : "Voeg toe"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Snelle presets</h3>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset.parties)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/10"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LikelyCoalitions
        parties={parties}
        majority={MAJORITY}
        coalitions={recommendedCoalitions}
        onApply={applyPreset}
        showLink={false}
      />

      <p className="text-xs text-slate-400">
        Dit is een exitpoll; de werkelijke uitslag kan afwijken.
      </p>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 shadow-lg shadow-indigo-500/20">
          {toast}
        </div>
      )}
    </div>
  );
}

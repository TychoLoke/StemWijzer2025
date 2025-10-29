"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { PartyProjection } from "@/types/poll";
import { MAJORITY } from "@/lib/constants";
import { parseMajorityHint } from "@/lib/time";
import clsx from "clsx";
import { getPartyColor, getPartyGradient } from "@/lib/party-colors";

const PRESETS: { name: string; orientation: string; parties: string[] }[] = [
  {
    name: "Sociaal-progressief akkoord",
    orientation: "centrumlinks",
    parties: ["glpvda", "d66", "cda", "sp", "pvdd", "denk", "volt"],
  },
  {
    name: "Nationaal rechts kabinet",
    orientation: "rechts",
    parties: ["pvv", "vvd", "ja21", "cda", "bbb", "sgp"],
  },
  {
    name: "Brede midden-coalitie",
    orientation: "centrum",
    parties: ["vvd", "d66", "cda", "glpvda"],
  },
  {
    name: "Ondernemerscoalitie",
    orientation: "centrumrechts",
    parties: ["vvd", "d66", "cda", "ja21", "bbb"],
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

  const coalitionSegments = useMemo(() => {
    const total = selectedParties.reduce((sum, party) => sum + party.seats, 0);
    if (total === 0) {
      return [];
    }
    return selectedParties.map((party) => {
      const ratio = Math.max(0, Math.round((party.seats / total) * 1000) / 10);
      const { primary } = getPartyColor(party.id);
      return {
        id: party.id,
        name: party.name,
        seats: party.seats,
        percent: ratio,
        color: primary,
      };
    });
  }, [selectedParties]);

  const majorityProgress = useMemo(() => {
    if (!MAJORITY) return 0;
    return Math.min(100, Math.round((totalSeats / MAJORITY) * 1000) / 10);
  }, [totalSeats]);

  const likelyCoalitions = useMemo(() => {
    const sortedParties = [...parties].sort((a, b) => b.seats - a.seats);

    const combinations: { ids: string[]; seats: number }[] = [];

    const generate = (
      startIndex: number,
      currentIds: string[],
      currentSeats: number
    ) => {
      if (currentIds.length >= 2) {
        combinations.push({ ids: [...currentIds], seats: currentSeats });
      }
      if (currentIds.length === 5 || startIndex >= sortedParties.length) {
        return;
      }
      for (let i = startIndex; i < sortedParties.length; i += 1) {
        const party = sortedParties[i];
        generate(i + 1, [...currentIds, party.id], currentSeats + party.seats);
      }
    };

    generate(0, [], 0);

    const valid = combinations
      .filter((combo) => combo.seats >= MAJORITY)
      .map((combo) => {
        const comboParties = combo.ids
          .map((id) => partyMap.get(id))
          .filter((party): party is PartyProjection => Boolean(party));
        const label = comboParties.map((party) => party?.name).join(" + ");
        const seats = combo.seats;
        const overhang = seats - MAJORITY;
        const averageColor = comboParties
          .map((party) => getPartyColor(party.id).primary)
          .slice(0, 3);
        if (averageColor.length === 1) {
          averageColor.push(averageColor[0]);
        }
        return {
          ids: combo.ids,
          seats,
          overhang,
          label,
          parties: comboParties,
          gradient:
            averageColor.length > 1
              ? `linear-gradient(120deg, ${averageColor.join(", ")})`
              : averageColor[0] ?? "#312e81",
        };
      })
      .filter((entry) => entry.parties.length >= 2);

    valid.sort((a, b) => {
      const diffA = a.overhang;
      const diffB = b.overhang;
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      if (a.parties.length !== b.parties.length) {
        return a.parties.length - b.parties.length;
      }
      return b.seats - a.seats;
    });

    return valid.slice(0, 4);
  }, [parties, partyMap]);

  const toggleParty = useCallback(
    (partyId: string) => {
      setSelectedIds((prev) =>
        prev.includes(partyId)
          ? prev.filter((id) => id !== partyId)
          : [...prev, partyId]
      );
    },
    []
  );

  const applyPreset = useCallback((ids: string[]) => {
    setSelectedIds(ids.filter((id) => partyMap.has(id)));
  }, [partyMap]);

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
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white">Jouw coalitie</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                onClick={resetCoalition}
                className="rounded-full border border-white/20 px-4 py-2 font-medium text-slate-200 transition hover:border-white/40"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={shareCoalition}
                className="rounded-full border border-indigo-400/60 bg-indigo-500/20 px-4 py-2 font-medium text-indigo-200 transition hover:bg-indigo-500/30"
              >
                Deel scenario
              </button>
              <button
                type="button"
                onClick={exportPng}
                className="rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-2 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
              >
                Exporteer PNG
              </button>
            </div>
          </div>

          <div
            ref={builderRef}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-xl shadow-indigo-500/10"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%)]" />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                  Gebaseerd op {sourceLabel}
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-semibold text-white">{totalSeats}</span>
                  <span className="text-sm font-medium uppercase tracking-wide text-slate-300">
                    Zetels
                  </span>
                </div>
                <p className="mt-2 max-w-sm text-sm text-slate-300">
                  {parseMajorityHint(MAJORITY)}
                </p>
              </div>
              <span
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold", 
                  hasMajority
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "bg-slate-800/80 text-slate-200"
                )}
                aria-live="polite"
              >
                {hasMajority ? "Meerderheid" : "Nog te gaan"}
                {!hasMajority && (
                  <span className="rounded-full bg-slate-900/60 px-2 py-0.5 text-xs font-semibold text-white/90">
                    {MAJORITY - totalSeats}
                  </span>
                )}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 transition-all"
                  style={{ width: `${majorityProgress}%` }}
                  aria-hidden
                />
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>0</span>
                <span>{MAJORITY} zetels nodig</span>
                <span>{Math.max(totalSeats, MAJORITY)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
                Coalitie ({selectedParties.length})
              </h3>
              {selectedParties.length === 0 ? (
                <p className="text-sm text-slate-300">
                  Klik op een partij in de lijst rechts om hem toe te voegen aan jouw coalitie.
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedParties.map((party) => {
                    const { primary } = getPartyColor(party.id);
                    return (
                      <button
                        key={party.id}
                        type="button"
                        onClick={() => toggleParty(party.id)}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/40 hover:bg-white/10"
                        title={`Verwijder ${party.name}`}
                      >
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{ background: getPartyGradient(party.id) }}
                          aria-hidden
                        />
                        <div className="relative flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-white">{party.name}</p>
                            <p className="text-xs text-white/80">Klik om te verwijderen</p>
                          </div>
                          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                            {party.seats} zetels
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {coalitionSegments.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
                  Zetelverdeling in dit scenario
                </h3>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
                  <div className="flex h-12 w-full overflow-hidden">
                    {coalitionSegments.map((segment) => (
                      <div
                        key={segment.id}
                        className="relative flex items-center justify-center text-xs font-semibold text-white/90"
                        style={{ width: `${segment.percent}%`, backgroundColor: segment.color }}
                      >
                        <span className="hidden px-2 sm:block">
                          {segment.name} · {segment.seats}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
              Populaire scenario&apos;s
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              De meest waarschijnlijke coalities op basis van deze peiling. Klik om ze direct te laden.
            </p>
            <div className="mt-4 space-y-3">
              {likelyCoalitions.length === 0 && (
                <p className="text-sm text-slate-400">Nog geen meerderheden gevonden.</p>
              )}
              {likelyCoalitions.map((coalition) => (
                <button
                  key={coalition.label}
                  type="button"
                  onClick={() => applyPreset(coalition.ids)}
                  className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/40 hover:bg-white/10"
                >
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{ background: coalition.gradient }}
                    aria-hidden
                  />
                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{coalition.label}</p>
                      <span className="rounded-full bg-slate-900/70 px-2 py-1 text-xs font-semibold text-white/90">
                        {coalition.seats} zetels
                      </span>
                    </div>
                    <div className="flex h-2 overflow-hidden rounded-full">
                      {coalition.parties.map((party) => {
                        const { primary } = getPartyColor(party.id);
                        return (
                          <div
                            key={party.id}
                            className="h-full"
                            style={{
                              width: `${Math.max(5, (party.seats / coalition.seats) * 100)}%`,
                              backgroundColor: primary,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] font-medium text-white/90">
                      {coalition.parties.map((party) => (
                        <span
                          key={party.id}
                          className="rounded-full bg-slate-900/60 px-2 py-0.5"
                        >
                          {party.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <section aria-label="Beschikbare partijen" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">Partijen</h3>
              <span className="text-xs text-slate-400">Klik om toe te voegen</span>
            </div>
            <div className="mt-4 grid max-h-[34rem] gap-3 overflow-y-auto pr-1 text-sm scrollbar-thin">
              {parties.map((party) => {
                const active = selectedIds.includes(party.id);
                const { primary } = getPartyColor(party.id);
                return (
                  <button
                    key={party.id}
                    type="button"
                    onClick={() => toggleParty(party.id)}
                    className={clsx(
                      "group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-left transition",
                      active
                        ? "border-white/40 bg-white/15 shadow-inner"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    )}
                    title={`Klik om ${active ? "te verwijderen" : "toe te voegen"}`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 w-1"
                      style={{ backgroundColor: primary }}
                      aria-hidden
                    />
                    <div className="relative flex flex-1 items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{party.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: primary }} />
                            {party.id.toUpperCase()}
                          </span>
                          <span>|</span>
                          <span>{party.seats} zetels</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span
                          className={clsx(
                            "rounded-full px-2 py-0.5",
                            party.seatDelta > 0
                              ? "bg-emerald-500/20 text-emerald-200"
                              : party.seatDelta < 0
                                ? "bg-rose-500/20 text-rose-200"
                                : "bg-slate-700 text-slate-200"
                          )}
                        >
                          {party.seatDelta > 0 ? `+${party.seatDelta}` : party.seatDelta}
                        </span>
                        <span
                          className={clsx(
                            "rounded-full border px-2 py-0.5 text-xs transition",
                            active
                              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
                              : "border-white/20 bg-white/10 text-white/80 group-hover:border-white/40"
                          )}
                        >
                          {active ? "In coalitie" : "Toevoegen"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">Presets</h3>
            <p className="mt-1 text-sm text-slate-300">
              Sneltoetsen om populaire scenario&apos;s te laden.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PRESETS.map((preset) => {
                const seats = preset.parties.reduce(
                  (sum, id) => sum + (partyMap.get(id)?.seats ?? 0),
                  0,
                );
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset.parties)}
                    className="flex flex-col items-start gap-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-slate-100 transition hover:border-white/40 hover:bg-white/10"
                  >
                    <span className="text-[11px] uppercase tracking-wide text-indigo-200">
                      {preset.orientation}
                    </span>
                    <span className="text-sm font-semibold text-white">{preset.name}</span>
                    <span className="text-xs text-slate-300">{seats} zetels</span>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </div>

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

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { PartyProjection } from "@/types/poll";
import { MAJORITY } from "@/lib/constants";
import { parseMajorityHint } from "@/lib/time";
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
}

export function CoalitionBuilder({ parties }: CoalitionBuilderProps) {
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold text-white">Jouw coalitie</h2>
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
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex flex-wrap items-baseline gap-4">
          <div className="flex items-center gap-2 text-4xl font-semibold text-white">
            {totalSeats}
            <span className="text-base font-medium text-slate-300">zetels</span>
          </div>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
              hasMajority
                ? "bg-emerald-500/20 text-emerald-200"
                : "bg-slate-800 text-slate-300"
            )}
            aria-live="polite"
          >
            {hasMajority ? "Meerderheid" : "Nog te gaan"}
            {!hasMajority && (
              <span className="font-semibold">{MAJORITY - totalSeats}</span>
            )}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300">{parseMajorityHint(MAJORITY)}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section aria-label="Geselecteerde partijen" className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
              Coalitie ({selectedParties.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedParties.length === 0 && (
                <p className="text-sm text-slate-400">Voeg partijen toe vanuit de lijst.</p>
              )}
              {selectedParties.map((party) => (
                <button
                  key={party.id}
                  type="button"
                  onClick={() => toggleParty(party.id)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white transition hover:border-white/40"
                  title={`Verwijder ${party.name}`}
                >
                  <span>{party.name}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/90">
                    {party.seats}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Beschikbare partijen" className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Partijen
            </h3>
            <div className="flex max-h-72 flex-wrap gap-2 overflow-auto pr-1 scrollbar-thin">
              {parties.map((party) => {
                const active = selectedIds.includes(party.id);
                return (
                  <button
                    key={party.id}
                    type="button"
                    onClick={() => toggleParty(party.id)}
                    className={clsx(
                      "inline-flex min-w-[9rem] flex-1 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-sm transition",
                      active
                        ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-100"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
                    )}
                    title={`Klik om ${active ? "te verwijderen" : "toe te voegen"}`}
                  >
                    <span className="font-medium">{party.name}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-300">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">
                        {party.seats}
                      </span>
                      <span className="text-slate-400">±{party.seatMargin}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Presets
          </h3>
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

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 shadow-lg shadow-indigo-500/20">
          {toast}
        </div>
      )}
    </div>
  );
}

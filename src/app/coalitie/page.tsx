import { Suspense } from "react";
import Link from "next/link";
import clsx from "clsx";
import { getSeats } from "@/lib/fetchers";
import { CoalitionBuilder } from "@/components/coalition-builder";
import { StatusStrip } from "@/components/status-strip";
import { ForceUpdateButton } from "@/components/force-update-button";

interface CoalitiePageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function CoalitiePage({ searchParams }: CoalitiePageProps) {
  const mode = "POST" as const;
  const datasetParam = searchParams?.dataset;
  const dataset = typeof datasetParam === "string" && datasetParam === "live" ? "live" : undefined;
  const { parties, majority, updatedAt, sourceLabel } = await getSeats(mode, dataset);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Coalitiebouwer</h1>
          <p className="text-sm text-slate-300">
            Stel je scenario samen en bekijk of je de meerderheid van {majority} zetels haalt.
          </p>
        </div>
        <StatusStrip updatedAt={updatedAt} mode={mode} />
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-xs text-slate-200">
          <span className="font-semibold uppercase tracking-wide text-slate-300">Kies bron:</span>
          <div className="flex flex-wrap gap-2">
            <Link
              prefetch={false}
              href="/coalitie"
              className={clsx(
                "rounded-full px-3 py-1 font-semibold transition",
                dataset ? "bg-white/5 text-slate-200 hover:bg-white/10" : "bg-indigo-500 text-white shadow shadow-indigo-500/30",
              )}
            >
              Exitpoll 22:15
            </Link>
            <Link
              prefetch={false}
              href="/coalitie?dataset=live"
              className={clsx(
                "rounded-full px-3 py-1 font-semibold transition",
                dataset === "live"
                  ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                  : "bg-white/5 text-slate-200 hover:bg-white/10",
              )}
            >
              Live tellingen
            </Link>
          </div>
          <span className="ml-auto text-[11px] uppercase tracking-wide text-indigo-200">{sourceLabel}</span>
        </div>
        <ForceUpdateButton />
      </div>

      <Suspense fallback={null}>
        <CoalitionBuilder parties={parties} sourceLabel={sourceLabel ?? "Exitpoll 22:15"} />
      </Suspense>
    </div>
  );
}

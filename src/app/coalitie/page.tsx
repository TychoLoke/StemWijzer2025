import { Suspense } from "react";
import { getSeats } from "@/lib/fetchers";
import { CoalitionBuilder } from "@/components/coalition-builder";
import { StatusStrip } from "@/components/status-strip";
import { ForceUpdateButton } from "@/components/force-update-button";

export default async function CoalitiePage() {
  const mode = "POST" as const;
  const { parties, majority, updatedAt, sourceLabel } = await getSeats(mode);

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
        <ForceUpdateButton />
      </div>

      <Suspense fallback={null}>
        <CoalitionBuilder parties={parties} sourceLabel={sourceLabel ?? "Exitpoll 21:15"} />
      </Suspense>
    </div>
  );
}

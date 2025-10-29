import { getMode } from "@/lib/time";
import { getSlotPeiling } from "@/lib/fetchers";
import { SlotTabs } from "@/components/slot-tabs";
import { StatusStrip } from "@/components/status-strip";
import { UseInBuilderButton } from "@/components/use-in-builder-button";
import { ForceUpdateButton } from "@/components/force-update-button";

export default async function SlotpeilingPage() {
  const nowIso = new Date().toISOString();
  const mode = getMode(nowIso);
  const slotpeiling = await getSlotPeiling(mode);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Slotpeiling</h1>
            <p className="text-sm text-slate-300">Gebruik deze cijfers om scenario’s te bouwen.</p>
          </div>
          <UseInBuilderButton label="Gebruik in bouwer" />
        </div>
        <StatusStrip updatedAt={slotpeiling.updatedAt} mode={mode} />
        {mode === "POST" && <ForceUpdateButton />}
      </div>

      <SlotTabs
        parties={slotpeiling.parties}
        majority={slotpeiling.majority}
        methodology={slotpeiling.methodology}
      />
    </div>
  );
}

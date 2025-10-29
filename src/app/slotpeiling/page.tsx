import { getExitPoll } from "@/lib/fetchers";
import { SlotTabs } from "@/components/slot-tabs";
import { StatusStrip } from "@/components/status-strip";
import { UseInBuilderButton } from "@/components/use-in-builder-button";
import { ForceUpdateButton } from "@/components/force-update-button";

export default async function SlotpeilingPage() {
  const mode = "POST" as const;
  const exitpoll = await getExitPoll(mode);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-indigo-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Exitpoll 21:15</h1>
            <p className="text-sm text-slate-300">Exitpoll leidend. Ververs elke 15 minuten voor nieuwe standen.</p>
          </div>
          <UseInBuilderButton label="Gebruik in bouwer" src="Exitpoll 21:15" />
        </div>
        <StatusStrip updatedAt={exitpoll.updatedAt} mode={mode} />
        <ForceUpdateButton />
      </div>

      <SlotTabs
        parties={exitpoll.parties}
        majority={exitpoll.majority}
        methodology={exitpoll.methodology}
      />
    </div>
  );
}

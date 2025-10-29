import { getExitPoll } from "@/lib/fetchers";
import { TopBanner } from "@/components/top-banner";
import { SeatBars } from "@/components/seat-bars";
import { MiniCoalition } from "@/components/mini-coalition";
import { LikelyCoalitions } from "@/components/likely-coalitions";
import { StatusStrip } from "@/components/status-strip";
import { UseInBuilderButton } from "@/components/use-in-builder-button";
import { ForceUpdateButton } from "@/components/force-update-button";
import { getRecommendedCoalitions } from "@/lib/coalitions";

export default async function HomePage() {
  const mode = "POST" as const;
  const exitpoll = await getExitPoll(mode);
  const heroTitle = "Exitpoll 21:15 — scenario’s na sluiting";
  const heroSub = "Stemming gesloten. We werken elke 15 minuten bij.";
  const recommended = getRecommendedCoalitions(exitpoll.parties, exitpoll.majority);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <TopBanner updatedAt={exitpoll.updatedAt} />

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-xl shadow-indigo-500/10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">{heroTitle}</h1>
          <p className="text-lg text-slate-300">{heroSub}</p>
          <StatusStrip updatedAt={exitpoll.updatedAt} mode={mode} />
          <ForceUpdateButton className="pt-2" />
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-5 text-sm text-emerald-100">
            Exitpoll leidend. Ververs handmatig met “Nu verversen” voor de laatste stand.
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Exitpoll 21:15</h2>
            <UseInBuilderButton label="Gebruik in coalitiebouwer" src="Exitpoll 21:15" />
          </div>
          <SeatBars parties={exitpoll.parties} majority={exitpoll.majority} />
        </div>
        <MiniCoalition parties={exitpoll.parties} majority={exitpoll.majority} />
      </section>

      <LikelyCoalitions
        parties={exitpoll.parties}
        majority={exitpoll.majority}
        coalitions={recommended}
      />
    </div>
  );
}

import { getMode } from "@/lib/time";
import { getSlotPeiling } from "@/lib/fetchers";
import { TopBanner } from "@/components/top-banner";
import { Countdown } from "@/components/countdown";
import { SeatBars } from "@/components/seat-bars";
import { MiniCoalition } from "@/components/mini-coalition";
import { StatusStrip } from "@/components/status-strip";
import { UseInBuilderButton } from "@/components/use-in-builder-button";
import { ForceUpdateButton } from "@/components/force-update-button";

export default async function HomePage() {
  const nowIso = new Date().toISOString();
  const mode = getMode(nowIso);
  const slotpeiling = await getSlotPeiling(mode);

  const heroTitle =
    mode === "PRE"
      ? "Laatste minuten: bouw je coalitie & volg de stand"
      : "Stemming gesloten — volg de scenario’s";
  const heroSub =
    mode === "PRE"
      ? "Slotpeiling is live. De stemwijzer is gesloten. Countdown tot 21:00."
      : "We werken elke 15 minuten bij. Gebruik de coalitiebouwer om meerderheden te testen.";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <TopBanner updatedAt={slotpeiling.updatedAt} />

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-xl shadow-indigo-500/10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">{heroTitle}</h1>
          <p className="text-lg text-slate-300">{heroSub}</p>
          <StatusStrip updatedAt={slotpeiling.updatedAt} mode={mode} />
          {mode === "POST" && (
            <ForceUpdateButton className="pt-2" />
          )}
        </div>
        <div className="flex items-center justify-center">
          {mode === "PRE" ? (
            <Countdown serverNowEndpoint="/api/now" />
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-5 text-sm text-emerald-100">
              Stemming gesloten. Pagina ververst automatisch elke 15 minuten.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Slotpeiling</h2>
            <UseInBuilderButton />
          </div>
          <SeatBars parties={slotpeiling.parties} majority={slotpeiling.majority} />
        </div>
        <MiniCoalition parties={slotpeiling.parties} majority={slotpeiling.majority} />
      </section>
    </div>
  );
}

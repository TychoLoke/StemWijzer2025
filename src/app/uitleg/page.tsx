import { MAJORITY } from "@/lib/constants";
import { CUTOFF_ISO, SITE_TZ } from "@/lib/constants";

export default function UitlegPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
        <h1 className="text-3xl font-semibold text-white">Hoe werkt de slotpeiling & coalitiebouwer?</h1>
        <p className="mt-3 text-sm text-slate-300">
          In aanloop naar de verkiezingsavond volgen we de slotpeiling en vernieuwen we de cijfers zodra de stembussen sluiten.
        </p>
      </header>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Meerderheid & zetels</h2>
        <p className="text-sm text-slate-300">
          De Tweede Kamer telt 150 zetels. Een werkbare meerderheid start bij {MAJORITY} zetels. In de coalitiebouwer zie je live of je samengestelde combinatie de drempel haalt. De badge wordt groen zodra je de grens passeert.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Tijdslijn</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          <li>
            <span className="font-semibold text-white">Voor 21:00 ({SITE_TZ}):</span> we tonen een live countdown tot {CUTOFF_ISO}. De cijfers zijn gefixeerd op de slotpeiling van Ipsos I&O.
          </li>
          <li>
            <span className="font-semibold text-white">Na 21:00:</span> we verversen de data automatisch elke 15 minuten. Via de knop “Forceer update” kun je handmatig een her-validatie starten.
          </li>
        </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Ranges & onzekerheid</h2>
        <p className="text-sm text-slate-300">
          Elke partij heeft een bandbreedte op basis van de gerapporteerde onzekerheidsmarge. In de grafieken zie je deze als tooltip, zodat je weet hoe stabiel de projectie is.
        </p>
      </section>
    </div>
  );
}

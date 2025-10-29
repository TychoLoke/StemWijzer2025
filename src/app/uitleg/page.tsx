import { MAJORITY } from "@/lib/constants";
import { CUTOFF_ISO, SITE_TZ } from "@/lib/constants";

export default function UitlegPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
        <h1 className="text-3xl font-semibold text-white">Hoe werkt de exitpoll & coalitiebouwer?</h1>
        <p className="mt-3 text-sm text-slate-300">
          Na sluiting van de stembussen schakelen we over op de exitpoll van Ipsos I&O. Elke 15 minuten verwerken we een nieuwe stand, met een handmatige “Nu verversen”-optie voor directe updates.
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
            <span className="font-semibold text-white">Voor 21:00 ({SITE_TZ}):</span> toonden we een live countdown en de slotpeiling als referentie.
          </li>
          <li>
            <span className="font-semibold text-white">21:00 – 21:15:</span> eerste exitpoll-flash. We schakelen de interface naar post-close modus en verwijderen de countdown.
          </li>
          <li>
            <span className="font-semibold text-white">Vanaf 21:15:</span> elke 15 minuten een nieuwe exitpoll-stand. Met “Nu verversen” (handmatig) kun je de cache direct verversen tussen de vaste updates.
          </li>
      </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Onzekerheid & disclaimer</h2>
        <p className="text-sm text-slate-300">
          De exitpoll blijft een steekproef. Daarom plaatsen we onder elke grafiek de duidelijke waarschuwing “Dit is een exitpoll; de werkelijke uitslag kan afwijken.” De coalitiebouwer gebruikt dezelfde data, zodat coalities altijd op de laatste stand zijn gebaseerd.
        </p>
      </section>
    </div>
  );
}

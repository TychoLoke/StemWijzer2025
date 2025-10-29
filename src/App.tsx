import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CoalitionBuilder from "./components/CoalitionBuilder";
import PrimaryButton from "./components/PrimaryButton";

const App = () => {
  const [tab, setTab] = useState<"quiz" | "coalitions">("coalitions");
  const [helpOpen, setHelpOpen] = useState(false);
  const [coalitionKey, setCoalitionKey] = useState(0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04060f] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#04060f] via-[#081432] to-[#1b0b16]" />
        <div className="absolute inset-0 twinkle-dots" />
        <div
          className="aurora-orb animate-[drift_22s_ease-in-out_infinite]"
          style={{
            top: "-20%",
            left: "-10%",
            width: "460px",
            height: "460px",
            background: "radial-gradient(circle at center, rgba(193,18,31,0.65), transparent 62%)",
          }}
        />
        <div
          className="aurora-orb animate-[drift_18s_ease-in-out_infinite]"
          style={{
            bottom: "-10%",
            right: "-12%",
            width: "520px",
            height: "520px",
            background: "radial-gradient(circle at center, rgba(0,51,153,0.6), transparent 60%)",
            animationDelay: "-5s",
          }}
        />
        <div
          className="aurora-orb animate-[drift_26s_ease-in-out_infinite]"
          style={{
            top: "35%",
            left: "45%",
            width: "360px",
            height: "360px",
            background: "radial-gradient(circle at center, rgba(255,255,255,0.35), transparent 55%)",
            opacity: 0.35,
            animationDelay: "-8s",
          }}
        />
        <div className="absolute inset-x-0 bottom-[-35%] h-[480px] bg-gradient-to-t from-[#c1121f]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1)_0%,_transparent_55%)] opacity-40" />
      </div>

      <div className="relative z-0 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c1121f]/40 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -left-12 bottom-6 h-32 w-32 rounded-full bg-[#003399]/35 blur-3xl" aria-hidden />
              <div className="glass-panel__content">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                  Slotpeiling 2025
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Nog 50 minuten tot sluiting</span>
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  De stembussen sluiten vanavond om 20:56 uur. De stemhulp is afgerond; vanaf nu ligt de focus op de slotpeiling en het vormen van coalities.
                  Volg hier de laatste projecties en bouw scenario’s voor de uitslagenavond.
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Stembussen sluiten</div>
                    <div className="mt-1 text-sm font-semibold text-white">20:56 uur</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Volgende update</div>
                    <div className="mt-1 text-sm font-semibold text-white">20:36 uur</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Laatste peiling</div>
                    <div className="mt-1 text-sm font-semibold text-white">Slotpeiling • 20:00</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Coalitie doel</div>
                    <div className="mt-1 text-sm font-semibold text-white">76 zetels</div>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c1121f]" aria-hidden />
                    <span>Live bijgewerkte slotpeiling met nadruk op coalitie-opties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.65)]" aria-hidden />
                    <span>Informatieve kaarten met duiding van mogelijke meerderheden en thema’s.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#003399]" aria-hidden />
                    <span>Coalitie‑bouwer met slotpeiling als startpunt en ruimte voor eigen correcties.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur-xl">
              <div className="pointer-events-none absolute -top-16 right-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" aria-hidden />
              <div className="glass-panel__content">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">Focus van de avond</div>
                    <p className="text-xs text-white/60">Slotpeiling analyseren, scenario’s testen en updates volgen.</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                    Beta
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTab("quiz")}
                    className={`rounded-full border border-dashed px-4 py-2 transition ${
                      tab === "quiz"
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-black/30 text-white/60 hover:bg-white/10"
                    }`}
                    aria-disabled
                  >
                    Stemwijzer (gesloten)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("coalitions")}
                    className={`rounded-full border border-white/20 px-4 py-2 transition ${
                      tab === "coalitions" ? "bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.25)]" : "bg-black/30 text-white hover:bg-white/10"
                    }`}
                  >
                    Coalities
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelpOpen(true)}
                    className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
                  >
                    Uitleg openen
                  </button>
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-4 text-xs text-white/60">
                  Tip: Reset zet de coalitie‑bouwer terug naar de slotpeiling en wist geselecteerde partijen. Handig om elk scenario
                  vanuit dezelfde uitgangspositie te starten.
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="space-y-6">
            <motion.header
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute -top-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden />
              <div className="glass-panel__content flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white/85 to-white/60 bg-clip-text text-transparent">Slotpeiling &amp; coalities</span>
                  </h2>
                  <p className="text-sm text-white/60">Volg de laatste zetelverwachtingen en stel formaties samen tijdens de eindspurt.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => setTab("quiz")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "quiz"
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/10"
                      }`}
                    >
                      Stemwijzer (gesloten)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("coalitions")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "coalitions"
                          ? "bg-white text-black shadow-[0_6px_18px_rgba(255,255,255,0.2)]"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      Coalities live
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHelpOpen((open) => !open)}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    {helpOpen ? "Verberg uitleg" : "Toon uitleg"}
                  </button>
                  <PrimaryButton
                    aria-label="reset applicatie"
                    onClick={() => {
                      setTab("coalitions");
                      setCoalitionKey((value) => value + 1);
                    }}
                  >
                    Reset naar slotpeiling
                  </PrimaryButton>
                </div>
              </div>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute -right-10 top-12 h-32 w-32 rounded-full bg-[#c1121f]/25 blur-3xl" aria-hidden />
              <div className="glass-panel__content space-y-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.35em] text-white/60">Live update 20:06</div>
                    <h3 className="text-xl font-semibold text-white">Slotpeiling in één oogopslag</h3>
                  </div>
                  <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] text-white/70">
                    Volgende push om 20:36
                  </span>
                </div>
                <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs uppercase tracking-wide text-white/50">Koploper</div>
                    <div className="mt-2 text-lg font-semibold text-white">PVV – 32 zetels</div>
                    <p className="mt-1 text-xs text-white/60">Behoudt voorsprong van 8 zetels op het blok GroenLinks/PvdA.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs uppercase tracking-wide text-white/50">Sleutel tot meerderheid</div>
                    <div className="mt-2 text-lg font-semibold text-white">CDA + VVD + JA21</div>
                    <p className="mt-1 text-xs text-white/60">Samen 49 zetels; zoeken steun bij PVV of centrum‑linkse partner.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs uppercase tracking-wide text-white/50">Watchlist</div>
                    <div className="mt-2 text-lg font-semibold text-white">Volt &amp; D66</div>
                    <p className="mt-1 text-xs text-white/60">Beide cruciaal voor een progressieve meerderheid van 76 zetels.</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    <span>We monitoren doorrekeningen van Peil.nl, Ipsos en Verian voor eventuele verschuivingen in de exitpoll.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c1121f]" aria-hidden />
                    <span>Let op combinaties met minimaal 76 zetels; scenario’s met een buffer &lt;4 worden als kwetsbaar gemarkeerd.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#003399]" aria-hidden />
                    <span>Heb je een update? Noteer deze in de coalitie‑bouwer en deel de code tijdens de liveblog.</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            <AnimatePresence>
              {helpOpen && (
                <motion.div
                  key="help"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 shadow-xl shadow-black/30 backdrop-blur-xl"
                >
                  <div className="glass-panel__content">
                    <div className="mb-2 text-base font-semibold">Laatste 50 minuten – zo gebruik je de portal</div>
                    <p className="text-sm leading-relaxed">
                      De stemwijzer is gesloten; alle aandacht gaat naar de <b>slotpeiling van 20:00 uur</b>. Gebruik de
                      <b>Coalitie‑bouwer</b> om meerderheden te simuleren, vergelijk scenario’s via de presets en noteer afspraken voor
                      de formatieronde. Elke 30 minuten werken we de informatiekaarten bij met nieuwe signalen uit peilingen en de
                      exitpoll‑voorbereiding.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {tab === "quiz" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto w-full max-w-3xl"
                >
                  <div className="glass-panel rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/70 shadow-xl shadow-black/30 backdrop-blur-xl">
                    <div className="glass-panel__content space-y-4 text-center">
                      <div>
                        <div className="text-xs uppercase tracking-[0.35em] text-white/50">Stemwijzer gesloten</div>
                        <h3 className="mt-2 text-xl font-semibold text-white">Tijd om coalities te bouwen</h3>
                      </div>
                      <p>
                        De vragenlijst is afgerond. Gebruik de laatste minuten om formaties en meerderheden door te rekenen met de
                        slotpeiling van 20:00 uur.
                      </p>
                      <div className="flex justify-center">
                        <PrimaryButton onClick={() => setTab("coalitions")}>Naar coalitie‑bouwer</PrimaryButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto w-full max-w-4xl"
                >
                  <CoalitionBuilder key={coalitionKey} />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <footer className="mt-6 flex flex-col items-center gap-2 text-[11px] text-white/50 sm:flex-row sm:justify-between">
          <span>Gemaakt met ❤ in Deurne • v13</span>
          <span>Ontworpen voor 2025 · geoptimaliseerd voor mobiel en desktop</span>
        </footer>
      </div>
    </div>
  );
};

export default App;

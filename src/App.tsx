import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuizExperience from "./pages/QuizExperience";
import CoalitionBuilder from "./components/CoalitionBuilder";
import PrimaryButton from "./components/PrimaryButton";

const App = () => {
  const [tab, setTab] = useState<"quiz" | "coalitions">("quiz");
  const [helpOpen, setHelpOpen] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

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
                  Stemwijzer 2025
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Maak je keuze met vertrouwen</span>
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  De Stemwijzer Portal bundelt persoonlijke profielen, actuele peilingen en coalitie‑opties in één moderne omgeving.
                  Ideaal voor twijfelaars én politieke volgers.
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Verkiezingen</div>
                    <div className="mt-1 text-sm font-semibold text-white">29 okt 2025</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Stellingen</div>
                    <div className="mt-1 text-sm font-semibold text-white">25 vragen</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Coalitie doel</div>
                    <div className="mt-1 text-sm font-semibold text-white">76 zetels</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-3">
                    <div className="text-white/50">Release</div>
                    <div className="mt-1 text-sm font-semibold text-white">v13 • realtime</div>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c1121f]" aria-hidden />
                    <span>Responsieve ervaring met glasachtige kaarten en duidelijke hiërarchie.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.65)]" aria-hidden />
                    <span>Resultaten uitgelegd met persona’s, badges en as‑visualisaties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#003399]" aria-hidden />
                    <span>Coalitie‑bouwer met presets en zetelbewerkingen voor je eigen scenario’s.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur-xl">
              <div className="pointer-events-none absolute -top-16 right-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" aria-hidden />
              <div className="glass-panel__content">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">Snelle navigatie</div>
                    <p className="text-xs text-white/60">Schakel direct tussen de quiz en de coalitie‑bouwer.</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                    Beta
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTab("quiz")}
                    className={`rounded-full border border-white/20 px-4 py-2 transition ${
                      tab === "quiz" ? "bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.25)]" : "bg-black/30 text-white hover:bg-white/10"
                    }`}
                  >
                    Stemwijzer
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
                  Tip: Reset wist antwoorden, kernwaarden en gegenereerde matches. Ideaal om verschillende persona’s te vergelijken
                  tijdens debatten of campagne‑avonden.
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
                    <span className="bg-gradient-to-r from-white via-white/85 to-white/60 bg-clip-text text-transparent">Dashboard</span>
                  </h2>
                  <p className="text-sm text-white/60">Kies stellingen, verfijn je profiel en bouw toekomstige coalities.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => setTab("quiz")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "quiz" ? "bg-white text-black shadow-[0_6px_18px_rgba(255,255,255,0.2)]" : "text-white hover:bg-white/10"
                      }`}
                    >
                      Stemwijzer
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("coalitions")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "coalitions" ? "bg-white text-black shadow-[0_6px_18px_rgba(255,255,255,0.2)]" : "text-white hover:bg-white/10"
                      }`}
                    >
                      Coalities
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
                      setTab("quiz");
                      setQuizKey((value) => value + 1);
                    }}
                  >
                    Reset
                  </PrimaryButton>
                </div>
              </div>
            </motion.header>

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
                    <div className="mb-2 text-base font-semibold">Hoe werkt dit platform?</div>
                    <p className="text-sm leading-relaxed">
                      Beantwoord <b>25 stellingen</b> op een schaal van één tot vijf. Daarna kun je je <b>kernwaarden</b> per beleidsas
                      wegen. Op basis daarvan plaatsen we je in het politieke landschap en berekenen we match‑scores met alle
                      partijen. In de <b>Coalities</b>-tab bouw je combinaties vanuit de nieuwste peilingen (streefwaarde: 76 zetels).
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {tab === "quiz" ? (
                <div className="mx-auto w-full max-w-3xl">
                  <QuizExperience key={quizKey} />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto w-full max-w-4xl"
                >
                  <CoalitionBuilder />
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

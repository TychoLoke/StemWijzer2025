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
    <div className="relative min-h-screen overflow-x-hidden bg-[#05050b] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#09031b] via-[#05050b] to-[#03030a]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "radial-gradient(circle at 12% 18%, rgba(249, 115, 22, 0.22), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(circle at 88% 24%, rgba(168, 85, 247, 0.25), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.01) 35%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.02) 100%)",
          }}
        />
      </div>

      <div className="relative z-0 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                Stemwijzer 2025
              </span>
              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Maak je keuze met vertrouwen
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                De Stemwijzer Portal bundelt persoonlijke profielen, actuele peilingen en coalitie‑opties in één moderne omgeving.
                Ideaal voor twijfelaars én politieke volgers.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="text-white/50">Verkiezingen</div>
                  <div className="mt-1 text-sm font-semibold text-white">29 okt 2025</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="text-white/50">Stellingen</div>
                  <div className="mt-1 text-sm font-semibold text-white">25 vragen</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="text-white/50">Coalitie doel</div>
                  <div className="mt-1 text-sm font-semibold text-white">76 zetels</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="text-white/50">Release</div>
                  <div className="mt-1 text-sm font-semibold text-white">v13 • realtime</div>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" aria-hidden />
                  <span>Responsieve ervaring met glasachtige kaarten en duidelijke hiërarchie.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-300" aria-hidden />
                  <span>Resultaten uitgelegd met persona’s, badges en as‑visualisaties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" aria-hidden />
                  <span>Coalitie‑bouwer met presets en zetelbewerkingen voor je eigen scenario’s.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">Snelle navigatie</div>
                  <p className="text-xs text-white/60">Schakel direct tussen de quiz en de coalitie‑bouwer.</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                  Beta
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTab("quiz")}
                  className={`rounded-full border border-white/15 px-4 py-2 transition ${
                    tab === "quiz" ? "bg-white text-black" : "bg-black/20 text-white hover:bg-white/10"
                  }`}
                >
                  Stemwijzer
                </button>
                <button
                  type="button"
                  onClick={() => setTab("coalitions")}
                  className={`rounded-full border border-white/15 px-4 py-2 transition ${
                    tab === "coalitions" ? "bg-white text-black" : "bg-black/20 text-white hover:bg-white/10"
                  }`}
                >
                  Coalities
                </button>
                <button
                  type="button"
                  onClick={() => setHelpOpen(true)}
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
                >
                  Uitleg openen
                </button>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
                Tip: Reset wist antwoorden, kernwaarden en gegenereerde matches. Ideaal om verschillende persona’s te vergelijken
                tijdens debatten of campagne‑avonden.
              </div>
            </div>
          </motion.aside>

          <div className="space-y-6">
            <motion.header
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
                  <p className="text-sm text-white/60">Kies stellingen, verfijn je profiel en bouw toekomstige coalities.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="rounded-full bg-white/10 p-1">
                    <button
                      type="button"
                      onClick={() => setTab("quiz")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "quiz" ? "bg-white text-black" : "text-white hover:bg-white/10"
                      }`}
                    >
                      Stemwijzer
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("coalitions")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        tab === "coalitions" ? "bg-white text-black" : "text-white hover:bg-white/10"
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
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 shadow-xl shadow-black/30 backdrop-blur"
                >
                  <div className="mb-2 text-base font-semibold">Hoe werkt dit platform?</div>
                  <p className="text-sm leading-relaxed">
                    Beantwoord <b>25 stellingen</b> op een schaal van één tot vijf. Daarna kun je je <b>kernwaarden</b> per beleidsas
                    wegen. Op basis daarvan plaatsen we je in het politieke landschap en berekenen we match‑scores met alle
                    partijen. In de <b>Coalities</b>-tab bouw je combinaties vanuit de nieuwste peilingen (streefwaarde: 76 zetels).
                  </p>
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

        <footer className="mt-12 flex flex-col items-center gap-2 text-[11px] text-white/50 sm:flex-row sm:justify-between">
          <span>Gemaakt met ❤ in Deurne • v13</span>
          <span>Ontworpen voor 2025 · geoptimaliseerd voor mobiel en desktop</span>
        </footer>
      </div>
    </div>
  );
};

export default App;

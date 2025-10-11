import { useState } from "react";
import { motion } from "framer-motion";
import QuizExperience from "./pages/QuizExperience";
import CoalitionBuilder from "./components/CoalitionBuilder";
import PrimaryButton from "./components/PrimaryButton";

const App = () => {
  const [tab, setTab] = useState<"quiz" | "coalitions">("quiz");
  const [helpOpen, setHelpOpen] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0b10] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-fuchsia-500 blur-[90px]" />
        <div className="absolute -right-40 top-32 h-80 w-80 rounded-full bg-amber-400 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-2xl">
        <header className="mb-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-extrabold tracking-tight">Stemwijzer Portal 🇳🇱</h1>
            <p className="text-xs text-white/70">29 okt 2025 • simpel • strak • mobile first</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <div className="rounded-xl bg-white/10 p-1 text-xs">
              <button
                type="button"
                onClick={() => setTab("quiz")}
                className={`rounded-lg px-2 py-1 ${tab === "quiz" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}
              >
                Stemwijzer
              </button>
              <button
                type="button"
                onClick={() => setTab("coalitions")}
                className={`rounded-lg px-2 py-1 ${tab === "coalitions" ? "bg-white text-black" : "text-white hover:bg-white/20"}`}
              >
                Coalities
              </button>
            </div>
            <button
              type="button"
              onClick={() => setHelpOpen((open) => !open)}
              className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
            >
              Uitleg
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
          </motion.div>
        </header>

        {helpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
          >
            <div className="mb-2 text-sm font-semibold">Hoe werkt dit? 🤔</div>
            <p className="text-xs text-white/80">
              Beantwoord 25 stellingen (1–5). Kies daarna je <b>kernwaarden</b> per thema. We plaatsen je in het politieke landschap
              en matchen met partijen. In <b>Coalities</b> kun je combinaties bouwen op basis van peilingen (doel: 76 zetels).
            </p>
          </motion.div>
        )}

        {tab === "quiz" ? <QuizExperience key={quizKey} /> : <CoalitionBuilder />}

        <footer className="mt-8 grid place-items-center pb-8 text-[11px] text-white/50">
          Gemaakt met ❤ in Deurne · v13
        </footer>
      </div>
    </div>
  );
};

export default App;

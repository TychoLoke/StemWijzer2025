import { motion } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";
import LikertScale from "../components/LikertScale";
import QuestionWhy from "../components/QuestionWhy";
import AxisChip from "../components/AxisChip";
import ResultsMap from "../components/ResultsMap";
import { useQuizEngine } from "../hooks/useQuizEngine";
import { AXES } from "../types";
import { AXIS_COPY, AXIS_GRADIENTS } from "../data/axes";
import { shareProfile } from "../utils/share";

const StickyNavigation = ({
  visible,
  progress,
  onPrev,
  onNext,
}: {
  visible: boolean;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 mx-auto max-w-md p-4">
      <div className="pointer-events-auto rounded-2xl bg-white/10 p-2 backdrop-blur">
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>{Math.round(progress)}% klaar</span>
          <div className="flex gap-2">
            <button type="button" onClick={onPrev} className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/20">
              ←
            </button>
            <PrimaryButton aria-label="volgende" onClick={onNext}>
              →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuizExperience = () => {
  const {
    step,
    setStep,
    totalSteps,
    answers,
    setAnswer,
    importance,
    setImportance,
    userVector,
    matches,
    persona,
    badges,
    answeredCount,
    resetAll,
    goNext,
    goPrev,
    questions,
  } = useQuizEngine();

  const progress = (Math.min(step, totalSteps) / totalSteps) * 100;
  const currentQuestion = step > 0 && step <= totalSteps ? questions[step - 1] : null;

  const copyProfile = () => shareProfile(persona, badges, userVector, matches);

  return (
    <>
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-white/70">
          <span>
            {step === 0
              ? "Intro"
              : step <= totalSteps
              ? `Vraag ${step} / ${totalSteps}`
              : step === totalSteps + 1
              ? "Kernwaarden"
              : "Resultaat"}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 via-rose-300 to-amber-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {step > 0 && step <= totalSteps && (
          <div className="mt-1 text-right text-[11px] text-white/60">
            {answeredCount} van {totalSteps} vragen met duidelijke voorkeur
          </div>
        )}
      </div>

      {step === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
        >
          <h2 className="mb-2 text-lg font-semibold">Snel kiezen, zero gedoe</h2>
          <ul className="mb-3 list-disc pl-5 text-sm text-white/80">
            <li>25 stellingen • 1–5 (oneens → eens)</li>
            <li>Persoonlijk <b>profiel</b> + partij‑uitleg</li>
            <li>Kernwaarden‑weging voor preciezere matches</li>
          </ul>
          <div className="text-xs text-white/60">Tip: kies vanuit je gevoel. Je kunt altijd terug.</div>
          <div className="mt-4 flex justify-end">
            <PrimaryButton aria-label="start quiz" onClick={() => setStep(1)}>
              Start ▶
            </PrimaryButton>
          </div>
        </motion.section>
      )}

      {currentQuestion && (
        <motion.section
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
        >
          <div className="mb-2 text-base font-semibold">{currentQuestion.text}</div>
          {currentQuestion.hint && <div className="mb-2 text-xs text-white/70">{currentQuestion.hint}</div>}
          <LikertScale value={answers[currentQuestion.id]} onChange={(value) => setAnswer(currentQuestion.id, value)} />
          <div className="mt-2 rounded-xl bg-white/5 p-2 text-[11px] text-white/80">
            <div className="mb-1 font-semibold">Wat betekent je keuze?</div>
            <div>
              Hoger (4‑5) = meer naar de rechter‑kant; Lager (1‑2) = meer naar de linker‑kant. Uitleg hieronder in gewone taal.
            </div>
          </div>
          <QuestionWhy question={currentQuestion} />
          <div className="mt-3 flex items-center justify-between text-xs text-white/70">
            <span className="font-mono">Keuze: {answers[currentQuestion.id]}</span>
            <div className="flex gap-2">
              <button type="button" onClick={goPrev} className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/20">
                Terug
              </button>
              <PrimaryButton aria-label="volgende vraag" onClick={goNext}>
                Volgende
              </PrimaryButton>
            </div>
          </div>
        </motion.section>
      )}

      {step === totalSteps + 1 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
        >
          <h2 className="mb-2 text-lg font-semibold">Kernwaarden</h2>
          <p className="mb-3 text-sm text-white/80">Wat weegt voor jou zwaarder? Dit beïnvloedt de berekening.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AXES.map((axis) => (
              <div key={axis} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-1 text-sm font-semibold">
                  {AXIS_COPY[axis].label} <span className="opacity-60">({axis})</span>
                </div>
                <div className="mb-2 text-[11px] text-white/70">
                  Links: {AXIS_COPY[axis].left} • Rechts: {AXIS_COPY[axis].right}
                </div>
                <LikertScale value={importance[axis]} onChange={(value) => setImportance(axis, value)} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/70">
            <span>Klaar? Ga door naar je resultaat.</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(totalSteps)}
                className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
              >
                Terug
              </button>
              <PrimaryButton aria-label="toon resultaat" onClick={() => setStep(totalSteps + 2)}>
                Resultaat ▶
              </PrimaryButton>
            </div>
          </div>
        </motion.section>
      )}

      {step === totalSteps + 2 && (
        <section>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2 text-lg font-bold">
            Jouw top‑matches
          </motion.h2>
          <p className="mb-3 text-sm text-white/80">Scores (0–100) met uitleg en jouw profiel.</p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
          >
            <div className="mb-1 text-sm font-semibold">Jij als type kiezer</div>
            <div className="text-base font-bold">
              {persona.emoji} {persona.name}
            </div>
            <div className="text-sm text-white/85">{persona.desc}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {badges.map((badge, index) => (
                <span key={index} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                  {badge.emoji} {badge.text}
                </span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {AXES.map((axis) => (
                <AxisChip key={axis} axis={axis} value={userVector[axis]} />
              ))}
            </div>
            <div className="mt-2 text-xs text-white/70">
              Balkjes tonen waar jij valt (−5 links/pro‑EU/groen‑snel/meer overheid • +5 rechts/soeverein/tech‑eerst/meer markt).
            </div>
            <div className="mt-3">
              <PrimaryButton aria-label="deel profiel" onClick={copyProfile}>
                Deel je profiel
              </PrimaryButton>
            </div>
          </motion.div>

          <ResultsMap userVector={userVector} highlight={matches.slice(0, 3).map((match) => match.name)} />

          <div className="mt-4 grid gap-3">
            {matches.map((match, index) => (
              <motion.div
                key={match.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20"
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">{index + 1}.</span>
                    <h3 className="text-base font-semibold">{match.name}</h3>
                  </div>
                  <span className="text-lg font-extrabold tabular-nums">
                    {match.score}
                    <span className="text-sm font-semibold">/100</span>
                  </span>
                </div>
                <p className="mb-2 text-sm text-white/80">{match.blurb}</p>
                <div className="mb-2 text-sm text-white/90">Waarom match: {match.reason}</div>
                <div className="grid grid-cols-5 gap-2 text-[10px] text-white/70">
                  {AXES.map((axis) => (
                    <div key={axis} className={`rounded-lg bg-gradient-to-r ${AXIS_GRADIENTS[axis]} p-2`}>
                      <div className="mb-1 font-semibold uppercase tracking-wide">{axis}</div>
                      <div className="font-mono">{match.axes[axis]}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-white/90 shadow-lg shadow-black/20"
          >
            <div className="mb-1 font-semibold">Wat nu? 🗳️</div>
            <ul className="list-disc pl-5 text-white/80">
              <li>Kies 1 van je top‑3 en check hun standpunten (wonen, koopkracht, klimaat, migratie).</li>
              <li>Bespreek met iemand die anders denkt. 10 minuten = slimmere keuze.</li>
              <li>Plan je stemmoment: 29 oktober 2025. 🗓️</li>
            </ul>
          </motion.div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => {
                resetAll();
                setStep(1);
              }}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
            >
              Doe opnieuw
            </button>
          </div>
        </section>
      )}

      <StickyNavigation
        visible={step > 0 && step <= totalSteps}
        progress={(step / totalSteps) * 100}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
};

export default QuizExperience;

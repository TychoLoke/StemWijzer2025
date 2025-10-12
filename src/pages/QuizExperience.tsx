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
  remaining,
  onPrev,
  onNext,
}: {
  visible: boolean;
  progress: number;
  remaining: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-3 text-xs text-white/80 shadow-lg shadow-black/30 backdrop-blur-xl">
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            {Math.round(progress)}% klaar
          </span>
          <div className="hidden h-1 flex-1 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full bg-gradient-to-r from-[#c1121f] via-white to-[#003399]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:inline-flex">
            Nog {remaining} stelling{remaining === 1 ? "" : "en"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-white/20 px-4 py-2 text-xs text-white transition hover:bg-white/10"
          >
            ← Terug
          </button>
          <PrimaryButton aria-label="volgende" onClick={onNext}>
            Volgende →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

type StageKey = "intro" | "questions" | "values" | "results";

const StepTimeline = ({
  step,
  totalSteps,
  answeredCount,
  onNavigate,
}: {
  step: number;
  totalSteps: number;
  answeredCount: number;
  onNavigate: (stage: StageKey) => void;
}) => {
  const stages: { key: StageKey; label: string; helper: string }[] = [
    { key: "intro", label: "Intro", helper: "Start" },
    { key: "questions", label: "Stellingen", helper: `${answeredCount}/${totalSteps}` },
    { key: "values", label: "Kernwaarden", helper: "Wegingen" },
    { key: "results", label: "Resultaat", helper: "Matches" },
  ];

  const activeIndex = (() => {
    if (step === 0) return 0;
    if (step > 0 && step <= totalSteps) return 1;
    if (step === totalSteps + 1) return 2;
    return 3;
  })();

  const canAccessStage = (stage: StageKey) => {
    if (stage === "intro") return true;
    if (stage === "questions") return step > 0 || answeredCount > 0;
    if (stage === "values") return step >= totalSteps + 1 || answeredCount === totalSteps;
    if (stage === "results") return step >= totalSteps + 2;
    return false;
  };

  return (
    <div className="glass-panel mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70 shadow-lg shadow-black/25 backdrop-blur">
      <div className="glass-panel__content">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/60">
          <span>Jouw route</span>
          <span>{Math.round((Math.min(step, totalSteps) / totalSteps) * 100)}%</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          {stages.map((stage, index) => {
            const reached = index < activeIndex;
            const active = index === activeIndex;
            const allowed = canAccessStage(stage.key);
            return (
              <div key={stage.key} className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => allowed && onNavigate(stage.key)}
                  disabled={!allowed}
                  className={`flex flex-1 flex-col items-center justify-center rounded-xl border px-3 py-2 text-center transition ${
                    active
                      ? "border-white/40 bg-white text-black shadow-[0_12px_30px_rgba(255,255,255,0.25)]"
                      : reached
                      ? "border-white/25 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60"
                  } ${allowed ? "hover:bg-white/15" : "cursor-not-allowed opacity-60"}`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{stage.label}</span>
                  <span className="mt-1 text-[10px] text-white/70">{stage.helper}</span>
                </button>
                {index < stages.length - 1 && (
                  <div
                    aria-hidden
                    className={`h-0.5 flex-1 rounded-full bg-gradient-to-r ${
                      index < activeIndex
                        ? "from-white via-white/80 to-white/40"
                        : "from-white/10 via-white/10 to-white/5"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SessionInsights = ({
  totalSteps,
  answeredCount,
  answers,
  elapsedSeconds,
}: {
  totalSteps: number;
  answeredCount: number;
  answers: Record<string, number>;
  elapsedSeconds: number;
}) => {
  const answeredValues = Object.values(answers);
  const distribution = answeredValues.reduce(
    (acc, value) => {
      if (value > 3) acc.agree += 1;
      if (value < 3) acc.disagree += 1;
      if (value === 1 || value === 5) acc.strong += 1;
      return acc;
    },
    { agree: 0, disagree: 0, strong: 0 },
  );

  const open = Math.max(0, totalSteps - (distribution.agree + distribution.disagree));

  const leaningScore = distribution.agree - distribution.disagree;
  const leaningCopy = (() => {
    if (leaningScore > 5) return "Overwegend instemmend";
    if (leaningScore > 1) return "Lichte voorkeur";
    if (leaningScore < -5) return "Kritische koers";
    if (leaningScore < -1) return "Meer tegenstemmen";
    return "Gebalanceerde antwoorden";
  })();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const answeredRatio = totalSteps === 0 ? 0 : answeredCount / totalSteps;

  return (
    <div className="glass-panel mb-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-4 text-sm text-white/80 shadow-lg shadow-black/30 backdrop-blur">
      <div className="glass-panel__content">
        <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/60">
          <span>Live statistieken</span>
          <span>{formatDuration(elapsedSeconds)}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] uppercase tracking-wide text-white/60">Voortgang</div>
            <div className="mt-1 text-xl font-semibold text-white">{answeredCount}</div>
            <div className="text-[11px] text-white/60">van {totalSteps} vragen met positie</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#c1121f] via-white to-[#003399]"
                style={{ width: `${Math.round(answeredRatio * 100)}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] uppercase tracking-wide text-white/60">Tonaliteit</div>
            <div className="mt-1 text-xl font-semibold text-white">{leaningCopy}</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                <div className="font-semibold text-white">{distribution.agree}</div>
                <div className="text-white/60">eens</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                <div className="font-semibold text-white">{open}</div>
                <div className="text-white/60">open</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                <div className="font-semibold text-white">{distribution.disagree}</div>
                <div className="text-white/60">oneens</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] uppercase tracking-wide text-white/60">Sterke signalen</div>
            <div className="mt-1 text-xl font-semibold text-white">{distribution.strong}</div>
            <div className="text-[11px] text-white/60">antwoorden op uiterste 1 of 5</div>
            <div className="mt-2 rounded-lg border border-dashed border-white/20 p-2 text-[11px] text-white/70">
              Tip: sterke meningen wegen extra mee bij kernwaarden.
            </div>
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
    elapsedSeconds,
    resetAll,
    goNext,
    goPrev,
    questions,
  } = useQuizEngine();

  const progress = (Math.min(step, totalSteps) / totalSteps) * 100;
  const currentQuestion = step > 0 && step <= totalSteps ? questions[step - 1] : null;

  const copyProfile = () => shareProfile(persona, badges, userVector, matches);

  const remainingQuestions = Math.max(0, totalSteps - Math.min(step, totalSteps));

  const navigateStage = (stage: StageKey) => {
    if (stage === "intro") {
      setStep(0);
      return;
    }
    if (stage === "questions") {
      const target = step === 0 ? 1 : Math.min(Math.max(step, 1), totalSteps);
      setStep(target);
      return;
    }
    if (stage === "values") {
      if (answeredCount === totalSteps || step >= totalSteps + 1) {
        setStep(totalSteps + 1);
      }
      return;
    }
    if (stage === "results") {
      if (step >= totalSteps + 2) {
        setStep(totalSteps + 2);
      }
    }
  };

  return (
    <>
      <StepTimeline step={step} totalSteps={totalSteps} answeredCount={answeredCount} onNavigate={navigateStage} />

      <SessionInsights
        totalSteps={totalSteps}
        answeredCount={answeredCount}
        answers={answers}
        elapsedSeconds={elapsedSeconds}
      />

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
            className="h-full bg-gradient-to-r from-[#c1121f] via-white to-[#003399]"
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
          className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/25 backdrop-blur"
        >
          <div className="glass-panel__content">
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
          </div>
        </motion.section>
      )}

      {currentQuestion && (
        <motion.section
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/25 backdrop-blur"
        >
          <div className="glass-panel__content space-y-3">
            <div className="text-base font-semibold">{currentQuestion.text}</div>
            {currentQuestion.hint && <div className="text-xs text-white/70">{currentQuestion.hint}</div>}
            <LikertScale value={answers[currentQuestion.id]} onChange={(value) => setAnswer(currentQuestion.id, value)} />
            <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-[11px] text-white/80">
              <div className="mb-1 font-semibold">Wat betekent je keuze?</div>
              <div>
                Hoger (4‑5) = meer naar de rechter‑kant; Lager (1‑2) = meer naar de linker‑kant. Uitleg hieronder in gewone taal.
              </div>
            </div>
            <QuestionWhy question={currentQuestion} />
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="font-mono">Keuze: {answers[currentQuestion.id]}</span>
              <div className="flex gap-2">
                <button type="button" onClick={goPrev} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs transition hover:bg-white/20">
                  Terug
                </button>
                <PrimaryButton aria-label="volgende vraag" onClick={goNext}>
                  Volgende
                </PrimaryButton>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {step === totalSteps + 1 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/25 backdrop-blur"
        >
          <div className="glass-panel__content space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Kernwaarden</h2>
              <p className="text-sm text-white/80">Wat weegt voor jou zwaarder? Dit beïnvloedt de berekening.</p>
            </div>
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
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Klaar? Ga door naar je resultaat.</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(totalSteps)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs transition hover:bg-white/20"
                >
                  Terug
                </button>
                <PrimaryButton aria-label="toon resultaat" onClick={() => setStep(totalSteps + 2)}>
                  Resultaat ▶
                </PrimaryButton>
              </div>
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
                <div className="grid grid-cols-2 gap-2 text-[10px] text-white/70 sm:grid-cols-3 lg:grid-cols-5">
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
        remaining={remainingQuestions}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
};

export default QuizExperience;

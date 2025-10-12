import { useEffect, useMemo, useState } from "react";
import type { Axis } from "../types";
import { QUESTIONS, type Question } from "../data/questions";
import {
  buildPartyMatches,
  buildUserVector,
  defaultAnswers,
  defaultImportance,
  getAnsweredCount,
  type PartyMatch,
  type UserVector,
} from "../utils/quiz";

interface Persona {
  key: string;
  name: string;
  desc: string;
  emoji: string;
}

const personaFromVector = (vector: UserVector): Persona => {
  const { econ, social, eu, green, state } = vector;
  if (econ >= 2 && state >= 2 && (eu >= 1 || social >= 1)) {
    return {
      key: "techno_liberal",
      name: "Techno‑Liberaal",
      emoji: "🤖",
      desc: "Pro‑ondernemen, innovatie, minder regels. Past bij VVD/JA21‑achtige koers.",
    };
  }
  if (green <= -2 && econ <= 0 && state <= -1) {
    return {
      key: "green_ideal",
      name: "Groene Idealist",
      emoji: "🌿",
      desc: "Klimaat en natuur eerst, sterke overheid. Dicht bij PvdD/GL‑PvdA.",
    };
  }
  if (eu >= 2 && social >= 2) {
    return {
      key: "sover_innov",
      name: "Souvereine Hervormer",
      emoji: "🛡️",
      desc: "Meer NL‑regie, techniek & kernenergie. Denk aan PVV/JA21/FVD‑spectrum.",
    };
  }
  if (econ <= 0 && state <= -1 && social <= 0) {
    return {
      key: "social_guard",
      name: "Sociale Beschermer",
      emoji: "🫶",
      desc: "Betaalbaarheid & publieke diensten nummer één. SP/GL‑PvdA‑hoek.",
    };
  }
  if (Math.abs(eu) <= 1 && Math.abs(econ) <= 1 && Math.abs(state) <= 1) {
    return {
      key: "prag_center",
      name: "Pragmatische Bruggenbouwer",
      emoji: "🧩",
      desc: "Midden, degelijkheid en uitvoerbaarheid. NSC/CDA/D66‑achtig.",
    };
  }
  return {
    key: "balanced_conserv",
    name: "Nuchtere Hervormer",
    emoji: "⚖️",
    desc: "Gemengd profiel: economie & veiligheid, en oog voor betaalbaarheid.",
  };
};

const buildBadges = (vector: UserVector) => {
  const badges: { emoji: string; text: string }[] = [];
  if (vector.econ >= 2) badges.push({ emoji: "🚀", text: "Ondernemer‑mindset" });
  if (vector.green <= -2) badges.push({ emoji: "🌿", text: "Klimaatheld" });
  if (vector.eu >= 2) badges.push({ emoji: "🛡️", text: "Soeverein‑focus" });
  if (vector.state >= 2) badges.push({ emoji: "🧩", text: "Vrije‑keuze fan" });
  if (vector.social <= -2) badges.push({ emoji: "🫶", text: "Inclusief & progressief" });
  if (!badges.length) badges.push({ emoji: "⚖️", text: "Gebalanceerd" });
  return badges.slice(0, 3);
};

export interface QuizEngineState {
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  importance: Record<Axis, number>;
  setImportance: (axis: Axis, value: number) => void;
  userVector: UserVector;
  matches: PartyMatch[];
  persona: Persona;
  badges: { emoji: string; text: string }[];
  answeredCount: number;
  elapsedSeconds: number;
  startedAt: number | null;
  resetAll: () => void;
  goNext: () => void;
  goPrev: () => void;
  questions: Question[];
}

export const useQuizEngine = (): QuizEngineState => {
  const totalSteps = QUESTIONS.length;
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>(() => defaultAnswers(QUESTIONS));
  const [importance, setImportance] = useState<Record<Axis, number>>(() => defaultImportance());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const userVector = useMemo(() => buildUserVector(answers, importance, QUESTIONS), [answers, importance]);
  const matches = useMemo(() => buildPartyMatches(userVector), [userVector]);
  const persona = useMemo(() => personaFromVector(userVector), [userVector]);
  const badges = useMemo(() => buildBadges(userVector), [userVector]);
  const answeredCount = useMemo(() => getAnsweredCount(answers), [answers]);

  useEffect(() => {
    if (step === 0) {
      setStartedAt(null);
      setElapsedSeconds(0);
      return;
    }

    if (step > 0 && !startedAt) {
      setStartedAt(Date.now());
    }
  }, [step, startedAt]);

  useEffect(() => {
    if (!startedAt || step === 0) return;
    const updateElapsed = () => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    };

    if (step >= totalSteps + 2) {
      updateElapsed();
      return;
    }

    updateElapsed();

    if (typeof window === "undefined") return;
    const interval = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(interval);
  }, [startedAt, step, totalSteps]);

  const setAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const setImportanceValue = (axis: Axis, value: number) => {
    setImportance((prev) => ({ ...prev, [axis]: value }));
  };

  const resetAll = () => {
    setAnswers(defaultAnswers(QUESTIONS));
    setImportance(defaultImportance());
    setStep(0);
    setStartedAt(null);
    setElapsedSeconds(0);
  };

  const goNext = () => setStep((current) => Math.min(totalSteps + 2, current + 1));
  const goPrev = () => setStep((current) => Math.max(1, current - 1));

  return {
    step,
    setStep,
    totalSteps,
    answers,
    setAnswer,
    importance,
    setImportance: setImportanceValue,
    userVector,
    matches,
    persona,
    badges,
    answeredCount,
    elapsedSeconds,
    startedAt,
    resetAll,
    goNext,
    goPrev,
    questions: QUESTIONS,
  };
};

import { AXES, type Axis } from "../types";
import { AXIS_COPY } from "../data/axes";
import { PARTY_WEIGHTS, PARTY_BLURBS } from "../data/parties";
import type { Question } from "../data/questions";

export const importanceToFactor = (value: number) => [0.5, 0.75, 1, 1.25, 1.5][(value || 3) - 1] ?? 1;

export type UserVector = Record<Axis, number>;

export const emptyVector = (): UserVector => ({ econ: 0, social: 0, eu: 0, green: 0, state: 0 });

export const clampAxisScore = (value: number) => Math.max(-5, Math.min(5, Math.round(value / 3)));

export const buildUserVector = (answers: Record<string, number>, importance: Record<Axis, number>, questions: Question[]) => {
  const vector: UserVector = emptyVector();

  questions.forEach((question) => {
    const answer = (answers[question.id] ?? 3) - 3; // -2..+2
    AXES.forEach((axis) => {
      const weight = question.axes[axis] ?? 0;
      const factor = importanceToFactor(importance[axis] ?? 3);
      vector[axis] += answer * weight * factor;
    });
  });

  AXES.forEach((axis) => {
    vector[axis] = clampAxisScore(vector[axis]);
  });

  return vector;
};

export const similarityScore = (user: UserVector, party: Record<Axis, number>) => {
  const distance = AXES.reduce((acc, axis) => acc + Math.abs((user[axis] ?? 0) - party[axis]), 0);
  const maxDistance = AXES.length * 10;
  return Math.round(Math.max(0, 1 - distance / maxDistance) * 100);
};

export const explainMatch = (user: UserVector, party: Record<Axis, number>) => {
  const deltas = AXES.map((axis) => ({ axis, delta: Math.abs(user[axis] - party[axis]) }))
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3)
    .map(({ axis }) => axis);

  const humanCopy: Record<Axis, string> = {
    econ: "economie & ondernemen",
    social: "maatschappij & migratie",
    eu: "EU & soevereiniteit",
    green: "klimaat & energie",
    state: "overheid vs. markt",
  };

  return `Match op ${deltas.map((axis) => humanCopy[axis]).join(", ")}.`;
};

export interface PartyMatch {
  name: string;
  score: number;
  reason: string;
  axes: Record<Axis, number>;
  blurb: string;
}

export const buildPartyMatches = (user: UserVector): PartyMatch[] =>
  Object.entries(PARTY_WEIGHTS)
    .map(([name, axes]) => ({
      name,
      score: similarityScore(user, axes),
      reason: explainMatch(user, axes),
      axes,
      blurb: PARTY_BLURBS[name],
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

export const getAnsweredCount = (answers: Record<string, number>) =>
  Object.values(answers).filter((value) => value !== 3).length;

export const defaultAnswers = (questions: Question[]) =>
  Object.fromEntries(questions.map((question) => [question.id, 3]));

export const defaultImportance = (): Record<Axis, number> => ({ econ: 3, social: 3, eu: 3, green: 3, state: 3 });

export const axisDirection = (axis: Axis, value: number) =>
  value >= 0 ? AXIS_COPY[axis].right : AXIS_COPY[axis].left;

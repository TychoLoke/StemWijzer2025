import type { Axis } from "../types";
import type { PartyMatch } from "./quiz";

export const shareProfile = async (
  persona: { name: string; emoji: string },
  badges: { emoji: string; text: string }[],
  userVec: Record<Axis, number>,
  matches: PartyMatch[],
) => {
  const topThree = matches.slice(0, 3).map((match) => match.name).join(", ");
  const summary = `Mijn Stemwijzer‑profiel: ${persona.name} (${badges.map((b) => b.emoji).join(" ")})\n` +
    `Econ:${userVec.econ} Social:${userVec.social} EU:${userVec.eu} Green:${userVec.green} State:${userVec.state}\n` +
    `Top‑matches: ${topThree}`;

  try {
    await navigator.clipboard.writeText(summary);
    alert("Profiel gekopieerd! Plak het in je chat of socials.");
  } catch {
    alert("Kopiëren niet gelukt.");
  }
};

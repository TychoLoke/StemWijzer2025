import type { Axis } from "../types";

export const AXIS_COPY: Record<Axis, { label: string; left: string; right: string; examples: string[] }> = {
  econ: {
    label: "Geld & werk",
    left: "Meer verdelen & zekerheden",
    right: "Lagere belastingen & ondernemen",
    examples: ["MKB minder regels? → rechts", "Hogere uitkeringen? → links"],
  },
  social: {
    label: "Samenleving & migratie",
    left: "Progressief/ruimhartig",
    right: "Conservatiever/strakker",
    examples: ["Strakkere migratie? → rechts", "Actief antidiscriminatie? → links"],
  },
  eu: {
    label: "Nederland & Europa",
    left: "Meer samenwerken in EU",
    right: "Meer eigen regels (soeverein)",
    examples: ["Meer EU‑samenwerking? → links", "Minder Brussel? → rechts"],
  },
  green: {
    label: "Klimaat & energie",
    left: "Sneller vergroenen",
    right: "Tech‑eerst, rustiger tempo",
    examples: ["CO₂‑regels strenger? → links", "Kernenergie sneller? → rechts"],
  },
  state: {
    label: "Overheid of markt",
    left: "Meer overheid regie/bezit",
    right: "Meer keuzevrijheid & markt",
    examples: ["Zorg centraal geregeld? → links", "Keuzevrijheid/zelf regelen? → rechts"],
  },
};

export const AXIS_GRADIENTS: Record<Axis, string> = {
  econ: "from-sky-500/30 to-cyan-400/30",
  social: "from-violet-500/30 to-fuchsia-400/30",
  eu: "from-indigo-500/30 to-blue-400/30",
  green: "from-emerald-500/30 to-teal-400/30",
  state: "from-amber-500/30 to-orange-400/30",
};

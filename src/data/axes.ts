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
  econ: "from-[#c1121f]/80 via-white/20 to-[#003399]/80",
  social: "from-[#d62828]/75 via-white/20 to-[#1d4ed8]/75",
  eu: "from-[#9d0208]/70 via-white/15 to-[#00296b]/70",
  green: "from-[#ba1b1d]/65 via-white/15 to-[#26408b]/65",
  state: "from-[#8d0801]/70 via-white/15 to-[#1a2a6c]/70",
};

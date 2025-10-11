import type { Axis } from "../types";

export const PARTY_WEIGHTS: Record<string, Record<Axis, number>> = {
  "GroenLinks/PvdA": { econ: -3, social: -3, eu: -3, green: -4, state: -3 },
  SP: { econ: -4, social: -1, eu: 1, green: -3, state: -4 },
  "Partij voor de Dieren": { econ: -3, social: -2, eu: -2, green: -5, state: -4 },
  Volt: { econ: -1, social: -2, eu: -5, green: -3, state: -2 },
  D66: { econ: -1, social: -1, eu: -4, green: -2, state: -1 },
  NSC: { econ: 0, social: 1, eu: 1, green: 0, state: 0 },
  CDA: { econ: 1, social: 2, eu: 1, green: 1, state: 1 },
  ChristenUnie: { econ: -1, social: 3, eu: -1, green: -1, state: -1 },
  VVD: { econ: 3, social: 1, eu: 1, green: 2, state: 3 },
  BBB: { econ: 2, social: 2, eu: 2, green: 3, state: 2 },
  JA21: { econ: 3, social: 3, eu: 3, green: 3, state: 3 },
  PVV: { econ: 2, social: 4, eu: 5, green: 3, state: 2 },
  FVD: { econ: 3, social: 4, eu: 5, green: 4, state: 3 },
  SGP: { econ: 2, social: 5, eu: 2, green: 2, state: 2 },
  DENK: { econ: -2, social: -2, eu: -2, green: -2, state: -2 },
};

export const PARTY_BLURBS: Record<string, string> = {
  "GroenLinks/PvdA": "Klimaatkoploper: forse CO₂-reductie, investeert in onderwijs en zorg, wil Europa versterken.",
  SP: "Betaalbaarheid eerst: hogere lonen, lagere rekeningen, stopt marktwerking in zorg en wonen.",
  "Partij voor de Dieren": "Natuur & dieren centraal: krimp veestapel, stevige klimaatactie, eerlijk voedselbeleid.",
  Volt: "Pan-Europees: grensoverschrijdende oplossingen, digitale rechten beschermen, investeren in innovatie.",
  D66: "Sociaal-liberaal: kansengelijkheid in onderwijs, regie op klimaat, vaste plek voor Nederland in de EU.",
  NSC: "Bestuurlijke vernieuwing: eerlijk bestuur, minder Haagse deals, herstel vertrouwen in publieke diensten.",
  CDA: "Waardenpartij: sterke gemeenschappen, betaalbaar gezinshuis, verantwoordelijkheid voor boeren en middenstand.",
  ChristenUnie: "Sociaal-christelijk: waardige zorg, bestaanszekerheid, rentmeesterschap voor de schepping.",
  VVD: "Vrijheidsagenda: lagere lasten voor werkenden, sterke economie, stevige aanpak van criminaliteit.",
  BBB: "Regio op 1: ruimte voor boeren, praktische klimaatoplossingen, minder regels voor ondernemers.",
  JA21: "Conservatief-liberaal: strakke migratie, investeren in defensie, kernenergie voor zekerheid.",
  PVV: "Nationaal-conservatief: koopkracht en zorg betaalbaar houden, grenzen scherper bewaken, meer Nederlandse soevereiniteit.",
  FVD: "Radicaal soeverein: uit EU-integratie, herindustrialisatie, en stevig inzetten op kernenergie.",
  SGP: "Traditioneel & verantwoordelijk: gezin, geloofsvrijheid, solide overheidsfinanciën en rentmeesterschap.",
  DENK: "Inclusieve stem: strijdt tegen discriminatie, investeert in kansengelijkheid en internationale solidariteit.",
};

export const PARTY_COLORS: Record<string, string> = {
  PVV: "#1E3A8A",
  VVD: "#FF7F00",
  CDA: "#006F53",
  D66: "#00A95C",
  "GroenLinks/PvdA": "#D22E2E",
  JA21: "#0F172A",
  BBB: "#2F855A",
  FVD: "#7F1D1D",
  SP: "#E10600",
  "Partij voor de Dieren": "#00753A",
  ChristenUnie: "#2563EB",
  SGP: "#F97316",
  Volt: "#6D28D9",
  DENK: "#11B5AE",
  NSC: "#0EA5E9",
  Overigen: "#9CA3AF",
};

export const PARTIES_LIST = [
  "PVV",
  "CDA",
  "GroenLinks/PvdA",
  "VVD",
  "JA21",
  "D66",
  "NSC",
  "BBB",
  "FVD",
  "SP",
  "Partij voor de Dieren",
  "ChristenUnie",
  "SGP",
  "Volt",
  "DENK",
  "Overigen",
] as const;

export const partyColorSafe = (party: string) => PARTY_COLORS[party] ?? "#9CA3AF";

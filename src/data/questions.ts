import type { Axis } from "../types";

export interface Question {
  id: string;
  text: string;
  hint?: string;
  axes: Partial<Record<Axis, number>>;
}

export const QUESTIONS: Question[] = [
  { id: "q1", text: "🏠 Sneller bouwen, kortere inspraaktermijnen.", hint: "Tempo boven procedure", axes: { state: 1, social: 1 } },
  { id: "q2", text: "🧾 Minder belasting & regels voor werkenden en MKB.", axes: { econ: 1, state: 1 } },
  { id: "q3", text: "🛒 Tijdelijk btw omlaag op basisboodschappen.", axes: { econ: -1, state: -1 } },
  { id: "q4", text: "🌍 EU‑samenwerking is goed voor NL.", hint: "Pro‑EU", axes: { eu: -2 } },
  { id: "q5", text: "🇳🇱 Meer soevereiniteit: minder Brussel.", axes: { eu: 2 } },
  { id: "q6", text: "⚛️ Kernenergie hoort bij de klimaatoplossing.", axes: { green: 2, state: 1 } },
  { id: "q7", text: "🌿 Klimaat sneller & strenger, ook als het geld kost.", axes: { green: -2, state: -1 } },
  { id: "q8", text: "🧑‍🎓 Onderwijs & tech‑skills extra investeren.", axes: { econ: -1, state: -1 } },
  { id: "q9", text: "🛡️ Meer geld naar defensie (2,5% bbp).", axes: { social: 1, eu: 1 } },
  { id: "q10", text: "🧑‍⚕️ Zorg: meer keuzevrijheid, minder centraal.", axes: { state: 1 } },
  { id: "q11", text: "📦 Migratie strakker regelen om druk te verlagen.", axes: { social: 2, eu: 1 } },
  { id: "q12", text: "🧑‍💻 Minder regels → meer innovatie & startups.", axes: { econ: 2, state: 2 } },
  { id: "q13", text: "🏘️ Starters moeten koopkansen krijgen (fiscale hulp).", axes: { econ: -1, state: -1 } },
  { id: "q14", text: "🚌 Meer OV & fiets, minder auto‑voorrang in steden.", axes: { green: -1, state: -1 } },
  { id: "q15", text: "🚗 Lagere accijnzen/wegenlasten, auto blijft belangrijk.", axes: { green: 1, state: 1 } },
  { id: "q16", text: "📱 Privacy & online vrijheid beschermen.", axes: { state: -1 } },
  { id: "q17", text: "🧑‍🔬 Nederland moet top zijn in chips/AI/biotech.", axes: { econ: 1, state: 1 } },
  { id: "q18", text: "🤝 Gelijke rechten & diversiteit actief beschermen.", axes: { social: -2 } },
  { id: "q19", text: "💰 Bedrijven moeten meer bijdragen aan publieke voorzieningen.", axes: { econ: -1, state: -1 } },
  { id: "q20", text: "🕊️ Nederland moet terughoudend zijn in internationale conflicten.", axes: { eu: 1, social: 1 } },
  { id: "q21", text: "🌱 Meer investeren in lokale duurzame landbouw.", axes: { green: -1, econ: -1 } },
  { id: "q22", text: "📚 Gratis MBO/HBO‑onderwijs voor kansarme jongeren.", axes: { econ: -2, state: -2 } },
  { id: "q23", text: "⚙️ Minder politieke inmenging bij bedrijven.", axes: { state: 2, econ: 2 } },
  { id: "q24", text: "🏛️ Sterke rechtsstaat en onafhankelijke media stimuleren.", axes: { state: -1, social: -1 } },
  { id: "q25", text: "🌍 NL moet koploper blijven in innovatie en technologie.", axes: { econ: 2, green: 1 } },
];

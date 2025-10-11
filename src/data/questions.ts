import type { Axis } from "../types";

export interface Question {
  id: string;
  text: string;
  hint?: string;
  axes: Partial<Record<Axis, number>>;
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "🏠 Woningbouwprojecten mogen sneller door, ook als bezwaarprocedures worden ingekort.",
    hint: "Tempo boven uitgebreide inspraak.",
    axes: { state: 1, social: 1 },
  },
  {
    id: "q2",
    text: "🧾 De belasting- en regeldruk voor werkenden en mkb moet fors omlaag.",
    hint: "Lagere lasten, minder inspecties.",
    axes: { econ: 1, state: 1 },
  },
  {
    id: "q3",
    text: "🛒 De btw op basisboodschappen moet tijdelijk omlaag om koopkracht te beschermen.",
    hint: "Overheid grijpt in voor lagere prijzen.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q4",
    text: "🌍 Meer Europese samenwerking is goed voor Nederland.",
    hint: "Pro-EU, samen oplossen.",
    axes: { eu: -2 },
  },
  { id: "q5", text: "🇳🇱 Nederland moet minder regels uit Brussel overnemen voor meer soevereiniteit.", axes: { eu: 2 } },
  { id: "q6", text: "⚛️ Kernenergie moet onderdeel zijn van de klimaatmix.", axes: { green: 2, state: 1 } },
  {
    id: "q7",
    text: "🌿 Klimaatbeleid mag sneller en strenger, zelfs als dat extra geld kost.",
    axes: { green: -2, state: -1 },
  },
  {
    id: "q8",
    text: "🧑‍🎓 De overheid moet extra investeren in onderwijs en techniekvaardigheden.",
    axes: { econ: -1, state: -1 },
  },
  { id: "q9", text: "🛡️ Defensie-uitgaven moeten naar 2,5% van het bbp.", axes: { social: 1, eu: 1 } },
  {
    id: "q10",
    text: "🧑‍⚕️ Zorgverzekerden verdienen meer keuzevrijheid; minder centrale sturing.",
    axes: { state: 1 },
  },
  {
    id: "q11",
    text: "📦 Migratie moet strakker worden gereguleerd om druk op voorzieningen te verlagen.",
    axes: { social: 2, eu: 1 },
  },
  {
    id: "q12",
    text: "🧑‍💻 Minder regels en snellere vergunningen helpen innovatie en startups vooruit.",
    axes: { econ: 2, state: 2 },
  },
  {
    id: "q13",
    text: "🏘️ Starters op de woningmarkt moeten fiscaal worden geholpen om te kopen.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q14",
    text: "🚌 Steden moeten meer ruimte geven aan OV en fiets, minder aan de auto.",
    axes: { green: -1, state: -1 },
  },
  {
    id: "q15",
    text: "🚗 Accijnzen en wegenlasten moeten omlaag zodat de auto betaalbaar blijft.",
    axes: { green: 1, state: 1 },
  },
  {
    id: "q16",
    text: "📱 De overheid moet privacy en online vrijheid strenger beschermen.",
    axes: { state: -1 },
  },
  {
    id: "q17",
    text: "🧑‍🔬 Nederland moet vooroplopen in chips, AI en biotech door actief te investeren.",
    axes: { econ: 1, state: 1 },
  },
  {
    id: "q18",
    text: "🤝 De overheid moet actief gelijke rechten en diversiteit beschermen.",
    axes: { social: -2 },
  },
  {
    id: "q19",
    text: "💰 Grote bedrijven moeten meer bijdragen aan publieke voorzieningen.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q20",
    text: "🕊️ Nederland moet terughoudend zijn met deelname aan internationale conflicten.",
    axes: { eu: 1, social: 1 },
  },
  {
    id: "q21",
    text: "🌱 De overheid moet extra investeren in lokale, duurzame landbouw.",
    axes: { green: -1, econ: -1 },
  },
  {
    id: "q22",
    text: "📚 Kansarme jongeren moeten gratis mbo/hbo kunnen volgen.",
    axes: { econ: -2, state: -2 },
  },
  {
    id: "q23",
    text: "⚙️ Politiek moet zich minder bemoeien met bedrijven en markten.",
    axes: { state: 2, econ: 2 },
  },
  {
    id: "q24",
    text: "🏛️ Een sterke rechtsstaat en onafhankelijke media verdienen extra bescherming.",
    axes: { state: -1, social: -1 },
  },
  {
    id: "q25",
    text: "🌍 Nederland moet koploper blijven in innovatie en technologie.",
    axes: { econ: 2, green: 1 },
  },
];

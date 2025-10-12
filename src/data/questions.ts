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
    text: "🏠 Bouwprojecten voor nieuwe woningen moeten sneller kunnen starten, ook als bezwaarprocedures korter worden.",
    hint: "Sneller bouwen gaat boven uitgebreide inspraak.",
    axes: { state: 1 },
  },
  {
    id: "q2",
    text: "🧾 Belastingen en regels voor werkenden en mkb moeten flink omlaag.",
    hint: "Lagere lasten en minder overheid.",
    axes: { econ: 2, state: 2 },
  },
  {
    id: "q3",
    text: "🛒 De btw op basisboodschappen moet tijdelijk omlaag en de overheid vangt het inkomstenverlies op.",
    hint: "Overheid grijpt in om boodschappen goedkoper te maken.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q4",
    text: "🌍 Nederland heeft baat bij meer samenwerking en besluitvorming binnen de Europese Unie.",
    hint: "Meer macht naar Brussel om problemen samen op te lossen.",
    axes: { eu: -2 },
  },
  {
    id: "q5",
    text: "🇳🇱 Nederland moet meer eigen regels kunnen maken en minder verplichtingen uit Brussel overnemen.",
    hint: "Nationale zeggenschap gaat voor EU-afspraken.",
    axes: { eu: 2 },
  },
  {
    id: "q6",
    text: "⚛️ Kerncentrales moeten een vaste plek krijgen in de Nederlandse energievoorziening.",
    hint: "Technologische oplossingen zoals kernenergie helpen het klimaat.",
    axes: { green: 1 },
  },
  {
    id: "q7",
    text: "🌿 Het klimaatbeleid mag sneller en strenger worden, ook als dat extra geld kost.",
    hint: "De overheid mag meer ingrijpen voor het klimaat.",
    axes: { green: -2, state: -1 },
  },
  {
    id: "q8",
    text: "🧑‍🎓 De overheid moet extra investeren in onderwijs en techniekopleidingen.",
    hint: "Meer publieke uitgaven voor kennis en vaardigheden.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q9",
    text: "🛡️ Nederland moet het defensiebudget verhogen naar 2,5% van het bbp om bondgenoten na te komen.",
    hint: "Meer geld naar defensie en NAVO-afspraken.",
    axes: { social: 1, eu: -1 },
  },
  {
    id: "q10",
    text: "🧑‍⚕️ Zorgverzekerden moeten meer keuzevrijheid krijgen, met minder centrale sturing vanuit de overheid.",
    hint: "Marktwerking boven landelijke regels in de zorg.",
    axes: { state: 1 },
  },
  {
    id: "q11",
    text: "📦 Migratie moet strenger worden begrensd om druk op voorzieningen te verlagen.",
    hint: "Strakkere toelating en nationale controle.",
    axes: { social: 2, eu: 1 },
  },
  {
    id: "q12",
    text: "🧑‍💻 Minder regels en snellere vergunningen moeten innovatie en startups vooruit helpen.",
    hint: "Overheid doet een stap terug voor ondernemers.",
    axes: { econ: 2, state: 2 },
  },
  {
    id: "q13",
    text: "🏘️ Starters op de woningmarkt moeten fiscale steun krijgen om een huis te kunnen kopen.",
    hint: "Overheid helpt jonge kopers met geld of belastingkorting.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q14",
    text: "🚌 Steden moeten meer ruimte maken voor openbaar vervoer en fiets, ook als de auto minder plek krijgt.",
    hint: "Voorrang voor groen vervoer boven autorijden.",
    axes: { green: -1, state: -1 },
  },
  {
    id: "q15",
    text: "🚗 Accijnzen en andere autokosten moeten omlaag zodat autorijden betaalbaar blijft.",
    hint: "Lagere lasten en minder klimaatdruk op de auto.",
    axes: { green: 1, state: 1 },
  },
  {
    id: "q16",
    text: "📱 De overheid moet privacy en online vrijheid strenger beschermen tegen bedrijven en diensten.",
    hint: "Sterke regels om burgers digitaal te beschermen.",
    axes: { state: -1, social: -1 },
  },
  {
    id: "q17",
    text: "🧑‍🔬 Nederland moet vooroplopen in chips, AI en biotech via stevige publieke investeringen.",
    hint: "Staat steunt de hightechsector met geld en plannen.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q18",
    text: "🤝 De overheid moet actief gelijke rechten en diversiteit beschermen en stimuleren.",
    hint: "Meer beleid tegen discriminatie en uitsluiting.",
    axes: { social: -2 },
  },
  {
    id: "q19",
    text: "💰 Grote bedrijven moeten meer belasting betalen om publieke voorzieningen te financieren.",
    hint: "Grotere bijdrage van het bedrijfsleven aan de samenleving.",
    axes: { econ: -1, state: -1 },
  },
  {
    id: "q20",
    text: "🕊️ Nederland moet terughoudend zijn met deelname aan militaire missies in het buitenland.",
    hint: "Eerst nationale belangen, pas later internationale interventies.",
    axes: { eu: 1, social: 1 },
  },
  {
    id: "q21",
    text: "🌱 De overheid moet extra investeren in lokale en duurzame landbouw.",
    hint: "Publiek geld voor boeren die groen werken.",
    axes: { green: -1, econ: -1 },
  },
  {
    id: "q22",
    text: "📚 Jongeren met weinig geld moeten gratis mbo- of hbo-onderwijs kunnen volgen.",
    hint: "Onderwijs als publieke voorziening zonder kosten.",
    axes: { econ: -2, state: -2 },
  },
  {
    id: "q23",
    text: "⚙️ Politiek moet zich minder bemoeien met bedrijven en markten.",
    hint: "Meer ruimte voor ondernemers, minder regels.",
    axes: { state: 2, econ: 2 },
  },
  {
    id: "q24",
    text: "🏛️ De overheid moet extra investeren in een onafhankelijke rechtspraak en journalistiek.",
    hint: "Sterke publieke waarborgen voor democratie en pers.",
    axes: { state: -1, social: -1 },
  },
  {
    id: "q25",
    text: "🌍 Nederland moet koploper blijven in innovatie en technologie door bedrijven ruimte te geven.",
    hint: "Groei via ondernemerschap en technologische oplossingen.",
    axes: { econ: 2, green: 1, state: 1 },
  },
];

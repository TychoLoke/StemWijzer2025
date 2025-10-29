import { PartyProjection } from "@/types/poll";

interface CoalitionBlueprint {
  id: string;
  name: string;
  description: string;
  parties: string[];
  tone: "progressive" | "centrist" | "right" | "broad";
}

export interface RecommendedCoalition {
  id: string;
  name: string;
  description: string;
  parties: string[];
  seatTotal: number;
  surplus: number;
  tone: CoalitionBlueprint["tone"];
}

const BLUEPRINTS: CoalitionBlueprint[] = [
  {
    id: "purple-plus",
    name: "Paars-plus",
    description: "Progressief-liberaal blok rond D66, VVD, GroenLinks-PvdA en CDA.",
    parties: ["d66", "vvd", "glpvda", "cda"],
    tone: "progressive",
  },
  {
    id: "centrum-rechts",
    name: "Centrumrechts vernieuwd",
    description: "Hervormingsgezind kabinet met D66, VVD, CDA en JA21.",
    parties: ["d66", "vvd", "cda", "ja21"],
    tone: "centrist",
  },
  {
    id: "nationaal-rechts",
    name: "Nationaal rechts",
    description: "Rechtse meerderheid met VVD, PVV, CDA, JA21, BBB en SGP.",
    parties: ["vvd", "pvv", "cda", "ja21", "bbb", "sgp"],
    tone: "right",
  },
  {
    id: "klimaat-zorg",
    name: "Klimaat & Zorg",
    description: "Groen-progressieve samenwerking met extra sociaal accent.",
    parties: ["glpvda", "d66", "cda", "volt", "pvdd", "sp", "cu", "denk"],
    tone: "broad",
  },
];

export function getRecommendedCoalitions(
  parties: PartyProjection[],
  majority: number,
): RecommendedCoalition[] {
  const map = new Map(parties.map((party) => [party.id, party] as const));

  return BLUEPRINTS.flatMap((blueprint) => {
    const included = blueprint.parties
      .map((id) => map.get(id))
      .filter((party): party is PartyProjection => Boolean(party));

    if (included.length !== blueprint.parties.length) {
      return [];
    }

    const seatTotal = included.reduce((sum, party) => sum + party.seats, 0);
    if (seatTotal < majority) {
      return [];
    }

    const surplus = seatTotal - majority;
    return [
      {
        id: blueprint.id,
        name: blueprint.name,
        description: blueprint.description,
        parties: blueprint.parties,
        seatTotal,
        surplus,
        tone: blueprint.tone,
      },
    ];
  }).sort((a, b) => {
    if (a.surplus !== b.surplus) {
      return a.surplus - b.surplus;
    }
    if (a.parties.length !== b.parties.length) {
      return a.parties.length - b.parties.length;
    }
    return a.seatTotal - b.seatTotal;
  });
}

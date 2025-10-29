import { PartyProjection } from "@/types/poll";

export interface CoalitionBlueprint {
  id: string;
  name: string;
  orientation: string;
  parties: string[];
}

export const FEATURED_COALITION_PRESETS: CoalitionBlueprint[] = [
  {
    id: "purple-plus",
    name: "Paars-plus akkoord",
    orientation: "Centrum",
    parties: ["d66", "vvd", "cda", "glpvda"],
  },
  {
    id: "modern-vernieuwers",
    name: "Zakelijke vernieuwers",
    orientation: "Centrumrechts",
    parties: ["d66", "vvd", "cda", "ja21"],
  },
  {
    id: "constructief-rechts",
    name: "Constructief rechts blok",
    orientation: "Rechts",
    parties: ["pvv", "vvd", "cda", "ja21", "bbb"],
  },
  {
    id: "groene-samenwerking",
    name: "Groene samenwerking",
    orientation: "Centrumlinks",
    parties: ["glpvda", "d66", "cda", "sp", "pvdd", "denk", "volt"],
  },
];

export const PARTY_ALIGNMENT: Record<string, number> = {
  glpvda: -3,
  sp: -3,
  pvdd: -2,
  denk: -2,
  volt: -1,
  d66: 0,
  cu: 0,
  "50plus": 0,
  cda: 1,
  nsc: 1,
  bbb: 1,
  vvd: 2,
  ja21: 3,
  sgp: 3,
  pvv: 4,
  fvd: 4,
};

export function resolveBlueprint(
  blueprint: CoalitionBlueprint,
  partyMap: Map<string, PartyProjection>
) {
  const parties = blueprint.parties
    .map((id) => partyMap.get(id))
    .filter((party): party is PartyProjection => Boolean(party));

  const seats = parties.reduce((sum, party) => sum + party.seats, 0);

  return {
    ...blueprint,
    parties,
    seats,
  };
}

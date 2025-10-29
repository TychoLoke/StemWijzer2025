import { MunicipalityResultSet } from "@/types/municipality";
import { PartyProjection } from "@/types/poll";

interface AggregateOptions {
  municipalityName?: string;
  reportingLabel?: string;
  notePrefix?: string;
}

function safePercentage(value: number, total: number): number {
  if (total <= 0) return 0;
  return (value / total) * 100;
}

export function aggregateMunicipalityResults(
  results: MunicipalityResultSet[],
  { municipalityName = "Landelijk totaal", reportingLabel, notePrefix }: AggregateOptions = {},
): MunicipalityResultSet {
  const partyMap = new Map<
    string,
    {
      slug: string;
      name: string;
      votes2025: number;
      votes2021: number;
    }
  >();

  let latestUpdate = "";

  results.forEach((result) => {
    if (!latestUpdate || new Date(result.updatedAt) > new Date(latestUpdate)) {
      latestUpdate = result.updatedAt;
    }
    result.parties.forEach((party) => {
      const current = partyMap.get(party.slug);
      if (current) {
        current.votes2025 += party.votes2025;
        current.votes2021 += party.votes2021;
      } else {
        partyMap.set(party.slug, {
          slug: party.slug,
          name: party.name,
          votes2025: party.votes2025,
          votes2021: party.votes2021,
        });
      }
    });
  });

  const parties = Array.from(partyMap.values());
  const totalVotes2025 = parties.reduce((sum, party) => sum + party.votes2025, 0);
  const totalVotes2021 = parties.reduce((sum, party) => sum + party.votes2021, 0);

  const combinedParties = parties
    .map((party) => ({
      slug: party.slug,
      name: party.name,
      votes2025: party.votes2025,
      votes2021: party.votes2021,
      share2025: safePercentage(party.votes2025, totalVotes2025),
      share2021: safePercentage(party.votes2021, totalVotes2021),
      shareDelta: safePercentage(party.votes2025, totalVotes2025) - safePercentage(party.votes2021, totalVotes2021),
    }))
    .sort((a, b) => b.votes2025 - a.votes2025);

  const reporting =
    reportingLabel ?? `${results.length} gemeent${results.length === 1 ? "e" : "en"} binnen (${totalVotes2025} stemmen)`;

  const note =
    results.length > 0
      ? `${notePrefix ?? "Gecombineerde telling van"} ${results
          .map((result) => result.municipality)
          .join(", ")}.`
      : undefined;

  return {
    municipality: municipalityName,
    updatedAt: latestUpdate || new Date().toISOString(),
    reporting,
    note,
    parties: combinedParties,
  };
}

function allocateSeats(
  parties: MunicipalityResultSet["parties"],
  key: "votes2025" | "votes2021",
  totalSeats: number,
): Map<string, number> {
  const allocations = new Map<string, number>();
  const votes = parties.map((party) => ({
    slug: party.slug,
    votes: party[key],
  }));

  for (let seat = 0; seat < totalSeats; seat += 1) {
    let leadingSlug: string | null = null;
    let leadingScore = -Infinity;

    votes.forEach((party) => {
      if (party.votes <= 0) {
        return;
      }
      const allocated = allocations.get(party.slug) ?? 0;
      const score = party.votes / (allocated + 1);
      if (score > leadingScore) {
        leadingScore = score;
        leadingSlug = party.slug;
      }
    });

    if (!leadingSlug) {
      break;
    }

    allocations.set(leadingSlug, (allocations.get(leadingSlug) ?? 0) + 1);
  }

  return allocations;
}

export function projectSeatsFromMunicipalities(
  result: MunicipalityResultSet,
  totalSeats = 150,
): PartyProjection[] {
  const seats2025 = allocateSeats(result.parties, "votes2025", totalSeats);
  const seats2021 = allocateSeats(result.parties, "votes2021", totalSeats);

  const withSeats = new Map<string, { seats: number; seats2021: number; name: string }>();

  result.parties.forEach((party) => {
    const seatsCurrent = seats2025.get(party.slug) ?? 0;
    const seatsPrev = seats2021.get(party.slug) ?? 0;
    if (seatsCurrent > 0 || seatsPrev > 0) {
      withSeats.set(party.slug, {
        seats: seatsCurrent,
        seats2021: seatsPrev,
        name: party.name,
      });
    }
  });

  const projections: PartyProjection[] = Array.from(withSeats.entries())
    .map(([slug, data]) => ({
      id: slug,
      name: data.name,
      seats: data.seats,
      seatDelta: data.seats - data.seats2021,
    }))
    .sort((a, b) => b.seats - a.seats || a.name.localeCompare(b.name));

  return projections;
}

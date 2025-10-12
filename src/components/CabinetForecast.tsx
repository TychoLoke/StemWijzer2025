import { useMemo } from "react";
import { PRESETS } from "../data/presets";
import { PARTIES_LIST, partyColorSafe, PARTY_WEIGHTS } from "../data/parties";
import type { SeatMap } from "../types";
import { AXES } from "../types";

type ForecastCandidate = {
  parties: string[];
  seats: number;
  surplus: number;
  compatibility: number;
  title: string;
  description: string;
  focus: string;
  stability: string;
  likelihood: string;
};

type CabinetForecastProps = {
  seats: SeatMap;
  presetLabel: string;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const computeCompatibility = (parties: string[]): number => {
  if (parties.length === 0) {
    return 0;
  }

  const spread = AXES.reduce((total, axis) => {
    const values = parties.map((party) => PARTY_WEIGHTS[party]?.[axis] ?? 0);
    const axisSpread = Math.max(...values) - Math.min(...values);
    return total + axisSpread;
  }, 0);

  const normalized = 100 - (spread / (AXES.length * 10)) * 100;
  return clamp(Math.round(normalized), 5, 97);
};

const buildFocus = (parties: string[]): string => {
  const includes = (name: string) => parties.includes(name);
  const themes: string[] = [];

  if (includes("PVV") || includes("JA21") || includes("SGP")) {
    themes.push("strenger migratie- en veiligheidsbeleid");
  }
  if (includes("VVD") || includes("D66")) {
    themes.push("economie en innovatie");
  }
  if (includes("CDA") || includes("BBB") || includes("ChristenUnie")) {
    themes.push("regio, zorg en bestaanszekerheid");
  }
  if (
    includes("GroenLinks/PvdA") ||
    includes("Volt") ||
    includes("Partij voor de Dieren")
  ) {
    themes.push("klimaat en sociale investeringen");
  }

  if (themes.length === 0) {
    themes.push("breed compromis op hoofdlijnen");
  }

  const shortList = themes.slice(0, 2).join(" • ");
  return shortList;
};

const stabilityLabel = (surplus: number): string => {
  if (surplus <= 4) return "krappe meerderheid";
  if (surplus <= 12) return "werkbare buffer";
  return "ruime marge";
};

const likelihoodLabel = (compatibility: number, surplus: number): string => {
  if (compatibility >= 72 && surplus <= 18) return "realistisch";
  if (compatibility >= 58) return "mogelijk met stevige onderhandelingen";
  return "politiek precair";
};

const determineNarrative = (parties: string[], compatibility: number): { title: string; description: string } => {
  const includes = (name: string) => parties.includes(name);

  if (includes("PVV") && includes("VVD") && includes("JA21") && includes("CDA")) {
    return {
      title: "Veiligheidsblok rechts",
      description:
        "Nationalistische en liberale partijen vinden elkaar op migratie, orde en lagere lasten. CDA zorgt voor verbindende toon richting het midden.",
    };
  }

  if (includes("GroenLinks/PvdA") && includes("D66") && includes("Volt")) {
    return {
      title: "Progressief investeringskabinet",
      description:
        "Sterk pro-Europees trio dat klimaat, onderwijs en bestaanszekerheid prioriteert; aanvullende partij zorgt voor meerderheid.",
    };
  }

  if (includes("PVV") && includes("CDA") && includes("BBB")) {
    return {
      title: "Platteland & soevereiniteit",
      description:
        "Combinatie van rurale belangen en soevereiniteitspolitiek; afspraken over landbouw en migratie domineren de formatie.",
    };
  }

  if (includes("GroenLinks/PvdA") && includes("CDA") && includes("VVD")) {
    return {
      title: "Breed centrumcompromis",
      description:
        "Linkse investeringen gekoppeld aan financieel pragmatisme uit het midden. Zou stabiliteit kunnen bieden als inhoudelijke afstand overbrugbaar is.",
    };
  }

  if (includes("PVV") && includes("VVD")) {
    return {
      title: "Rechts akkoord rond migratie",
      description:
        "PVV en VVD geven toon aan op migratie en veiligheid; coalitiepartners bewaken bestuurbaarheid en internationale positie.",
    };
  }

  if (includes("GroenLinks/PvdA") && includes("D66")) {
    return {
      title: "Sociaal-groen herstelkabinet",
      description:
        "Progressieve partijen zetten zwaar in op klimaat, zorg en kansengelijkheid, met partners die begrotingsdiscipline moeten verzekeren.",
    };
  }

  if (compatibility >= 70) {
    return {
      title: "Cohesief meerderheidsblok",
      description:
        "Partijen liggen inhoudelijk dicht bij elkaar en kunnen met beperkte concessies een stabiele agenda opstellen.",
    };
  }

  return {
    title: "Hybride onderhandelingscoalitie",
    description:
      "Inhoudelijke verschillen zijn aanzienlijk; succes hangt af van stevige deals op kernonderwerpen.",
  };
};

const buildCandidate = (parties: string[], seatMap: SeatMap): ForecastCandidate => {
  const seats = parties.reduce((total, party) => total + (seatMap[party] ?? 0), 0);
  const surplus = seats - 76;
  const compatibility = computeCompatibility(parties);
  const narrative = determineNarrative(parties, compatibility);

  return {
    parties,
    seats,
    surplus,
    compatibility,
    title: narrative.title,
    description: narrative.description,
    focus: buildFocus(parties),
    stability: stabilityLabel(surplus),
    likelihood: likelihoodLabel(compatibility, surplus),
  };
};

const generateCoalitions = (seatMap: SeatMap): ForecastCandidate[] => {
  const viableParties = PARTIES_LIST.filter((party) => party !== "Overigen" && (seatMap[party] ?? 0) > 0);
  const results: ForecastCandidate[] = [];

  const search = (start: number, current: string[], seats: number) => {
    if (current.length >= 2 && current.length <= 4 && seats >= 76) {
      const sorted = [...current].sort((a, b) => (seatMap[b] ?? 0) - (seatMap[a] ?? 0));
      results.push(buildCandidate(sorted, seatMap));
    }

    if (current.length === 4) {
      return;
    }

    for (let index = start; index < viableParties.length; index += 1) {
      const party = viableParties[index];
      search(index + 1, [...current, party], seats + (seatMap[party] ?? 0));
    }
  };

  search(0, [], 0);

  const unique = new Map<string, ForecastCandidate>();

  results.forEach((candidate) => {
    const key = candidate.parties.slice().sort().join("|");
    const existing = unique.get(key);
    if (!existing || candidate.compatibility > existing.compatibility) {
      unique.set(key, candidate);
    }
  });

  return Array.from(unique.values())
    .filter((candidate) => candidate.seats >= 76)
    .sort((a, b) => {
      if (b.compatibility !== a.compatibility) return b.compatibility - a.compatibility;
      if (a.surplus !== b.surplus) return a.surplus - b.surplus;
      if (a.parties.length !== b.parties.length) return a.parties.length - b.parties.length;
      return b.seats - a.seats;
    })
    .slice(0, 4);
};

const CabinetForecast = ({ seats, presetLabel }: CabinetForecastProps) => {
  const coalitions = useMemo(() => generateCoalitions(seats), [seats]);

  const basePreset = PRESETS[presetLabel];
  const hasAdjustments = useMemo(() => {
    if (!basePreset) {
      return true;
    }
    return PARTIES_LIST.some((party) => (seats[party] ?? 0) !== (basePreset[party] ?? 0));
  }, [seats, presetLabel, basePreset]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-white/60">verwachte meerderheidscoalities</div>
          <p className="text-sm text-white/70">
            Gebaseerd op {presetLabel}
            {hasAdjustments ? " (met aangepaste zetels)" : ""}. We tonen de meest samenhangende meerderheden tot vier partijen.
          </p>
        </div>
        <div className="self-start rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
          Forecast
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {coalitions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 p-5 text-sm text-white/60">
            Geen meerderheden gevonden met de huidige zetelverdeling. Voeg partijen toe of verhoog zetelaantallen voor een meerderheid.
          </div>
        ) : (
          coalitions.map((coalition, index) => {
            const compatibilityColor =
              coalition.compatibility >= 72
                ? "from-lime-300 via-emerald-300 to-lime-200"
                : coalition.compatibility >= 58
                  ? "from-amber-200 via-amber-300 to-amber-400"
                  : "from-rose-300 via-rose-400 to-rose-500";

            return (
              <div
                key={coalition.parties.join("-")}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_10px_30px_rgba(8,12,24,0.35)]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-3xl" aria-hidden />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-white/50">Scenario #{index + 1}</div>
                    <div className="text-lg font-semibold text-white">{coalition.title}</div>
                  </div>
                  <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm font-semibold">
                    {coalition.seats} zetels
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {coalition.parties.map((party) => (
                    <span
                      key={party}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1"
                      style={{ backgroundColor: `${partyColorSafe(party)}1F` }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: partyColorSafe(party) }}
                      />
                      {party}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-white/70">{coalition.description}</p>
                <p className="mt-2 text-xs font-medium text-white/70">Focus: {coalition.focus}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-white/60">
                    <span>Samenhang</span>
                    <span>{coalition.compatibility}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/10">
                    <div
                      className={`h-full bg-gradient-to-r ${compatibilityColor}`}
                      style={{ width: `${coalition.compatibility}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/60">
                  <span>Stabiliteit: {coalition.stability}</span>
                  <span>Marge boven 76: {coalition.surplus}</span>
                  <span>Kans: {coalition.likelihood}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CabinetForecast;

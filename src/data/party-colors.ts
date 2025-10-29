export interface PartyBranding {
  primary: string;
  secondary: string;
  contrastText: string;
  muted: string;
  ring: string;
}

export const PARTY_COLORS: Record<string, PartyBranding> = {
  d66: {
    primary: "#008754",
    secondary: "#00b56f",
    contrastText: "#f4fff8",
    muted: "rgba(0, 181, 111, 0.15)",
    ring: "rgba(0, 181, 111, 0.45)",
  },
  pvv: {
    primary: "#0f4aa3",
    secondary: "#2d7dff",
    contrastText: "#f2f7ff",
    muted: "rgba(45, 125, 255, 0.18)",
    ring: "rgba(45, 125, 255, 0.45)",
  },
  vvd: {
    primary: "#ff6a00",
    secondary: "#ff9240",
    contrastText: "#fff7f0",
    muted: "rgba(255, 146, 64, 0.18)",
    ring: "rgba(255, 122, 0, 0.45)",
  },
  glpvda: {
    primary: "#e50045",
    secondary: "#00994d",
    contrastText: "#fff5f7",
    muted: "rgba(229, 0, 69, 0.16)",
    ring: "rgba(229, 0, 69, 0.45)",
  },
  cda: {
    primary: "#0a7a43",
    secondary: "#24b678",
    contrastText: "#f3fffa",
    muted: "rgba(36, 182, 120, 0.18)",
    ring: "rgba(36, 182, 120, 0.45)",
  },
  ja21: {
    primary: "#00296f",
    secondary: "#0f47c0",
    contrastText: "#f1f4ff",
    muted: "rgba(15, 71, 192, 0.18)",
    ring: "rgba(15, 71, 192, 0.45)",
  },
  fvd: {
    primary: "#650021",
    secondary: "#a0002a",
    contrastText: "#fff5f8",
    muted: "rgba(160, 0, 42, 0.18)",
    ring: "rgba(160, 0, 42, 0.45)",
  },
  bbb: {
    primary: "#6bbf59",
    secondary: "#95d780",
    contrastText: "#f6fff6",
    muted: "rgba(107, 191, 89, 0.18)",
    ring: "rgba(107, 191, 89, 0.45)",
  },
  sp: {
    primary: "#d40000",
    secondary: "#ff4a4a",
    contrastText: "#fff5f5",
    muted: "rgba(255, 74, 74, 0.18)",
    ring: "rgba(212, 0, 0, 0.45)",
  },
  denk: {
    primary: "#00a6a1",
    secondary: "#2bd9d3",
    contrastText: "#f3fffe",
    muted: "rgba(43, 217, 211, 0.18)",
    ring: "rgba(0, 166, 161, 0.45)",
  },
  pvdd: {
    primary: "#006c3b",
    secondary: "#33a36d",
    contrastText: "#f4fff8",
    muted: "rgba(51, 163, 109, 0.18)",
    ring: "rgba(51, 163, 109, 0.45)",
  },
  sgp: {
    primary: "#f26f21",
    secondary: "#f99c5b",
    contrastText: "#fff8f1",
    muted: "rgba(249, 156, 91, 0.2)",
    ring: "rgba(242, 111, 33, 0.45)",
  },
  cu: {
    primary: "#009fe3",
    secondary: "#53c7ff",
    contrastText: "#f1fbff",
    muted: "rgba(83, 199, 255, 0.2)",
    ring: "rgba(0, 159, 227, 0.45)",
  },
  "50plus": {
    primary: "#7f1d7a",
    secondary: "#c084fc",
    contrastText: "#fff5ff",
    muted: "rgba(192, 132, 252, 0.2)",
    ring: "rgba(127, 29, 122, 0.45)",
  },
  volt: {
    primary: "#502379",
    secondary: "#7c3aed",
    contrastText: "#f4f0ff",
    muted: "rgba(124, 58, 237, 0.18)",
    ring: "rgba(80, 35, 121, 0.45)",
  },
  nsc: {
    primary: "#2a7b4f",
    secondary: "#47a56f",
    contrastText: "#f1fff7",
    muted: "rgba(71, 165, 111, 0.18)",
    ring: "rgba(42, 123, 79, 0.45)",
  },
};

const DEFAULT_BRANDING: PartyBranding = {
  primary: "#475569",
  secondary: "#64748b",
  contrastText: "#f8fafc",
  muted: "rgba(148, 163, 184, 0.2)",
  ring: "rgba(148, 163, 184, 0.35)",
};

export function getPartyBranding(id: string): PartyBranding {
  return PARTY_COLORS[id] ?? DEFAULT_BRANDING;
}

export function getPartyGradient(id: string): string {
  const branding = getPartyBranding(id);
  return `linear-gradient(90deg, ${branding.primary}, ${branding.secondary})`;
}

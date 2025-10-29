const PARTY_COLORS: Record<string, { primary: string; secondary?: string }> = {
  glpvda: { primary: "#009E3D", secondary: "#E5001A" },
  d66: { primary: "#009F4D" },
  pvv: { primary: "#002776" },
  vvd: { primary: "#FF6200" },
  cda: { primary: "#00975F" },
  ja21: { primary: "#1E2A78" },
  fvd: { primary: "#8B1C2B" },
  bbb: { primary: "#2C6E49" },
  sp: { primary: "#E2001A" },
  denk: { primary: "#0097A7" },
  pvdd: { primary: "#74A12E" },
  sgp: { primary: "#E76F51" },
  cu: { primary: "#00A8E8" },
  "50plus": { primary: "#7A2A8A" },
  volt: { primary: "#4C1D95" },
  nsc: { primary: "#1E88E5" },
};

export function getPartyColor(
  id: string
): { primary: string; secondary?: string } {
  return (
    PARTY_COLORS[id] ?? {
      primary: "#4B5563",
    }
  );
}

export function getPartyGradient(id: string): string {
  const { primary, secondary } = getPartyColor(id);
  if (secondary) {
    return `linear-gradient(135deg, ${primary}, ${secondary})`;
  }
  return primary;
}

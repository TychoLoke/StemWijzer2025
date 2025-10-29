export interface MunicipalityPartyResult {
  slug: string;
  name: string;
  votes2025: number;
  votes2021: number;
  share2025: number;
  share2021: number;
  shareDelta: number;
}

export interface MunicipalityResultSet {
  municipality: string;
  updatedAt: string;
  reporting: string;
  note?: string;
  parties: MunicipalityPartyResult[];
}

export interface PartyProjection {
  id: string;
  name: string;
  pct: number;
  pctRange: [number, number];
  seats: number;
  seatMargin: number;
}

export interface SlotPeilingResponse {
  updatedAt: string;
  provider: {
    id: string;
    label: string;
    note?: string;
  };
  majority: number;
  methodology: {
    sample: string;
    notes: string;
  };
  parties: PartyProjection[];
}

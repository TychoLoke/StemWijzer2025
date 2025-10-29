export interface PartyProjection {
  id: string;
  name: string;
  seats: number;
  seatDelta: number;
}

export interface ExitPollSnapshot {
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

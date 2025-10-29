import { SlotPeilingResponse } from "@/types/poll";

export const slotPeilingData: SlotPeilingResponse = {
  updatedAt: "2025-10-28T09:00:00+01:00",
  provider: {
    id: "ipsos-io_2025-10-28",
    label: "Ipsos I&O — Slotpeiling 28 okt 2025",
    note: "Laatste peiling voor de stembus-sluiting; zetels met marges (Ipsos I&O).",
  },
  majority: 76,
  methodology: {
    sample: "n=2.505 (rolling panel); veldwerk 25 okt 18:00 – 28 okt 09:00",
    notes: "Zetels zijn virtueel; marges per partij zoals gerapporteerd door Ipsos I&O.",
  },
  parties: [
    { id: "d66", name: "D66", pct: 15.4, pctRange: [13.9, 16.9], seats: 23, seatMargin: 3 },
    { id: "glpvda", name: "GroenLinks-PvdA", pct: 15.0, pctRange: [13.6, 16.4], seats: 23, seatMargin: 3 },
    { id: "pvv", name: "PVV", pct: 14.8, pctRange: [13.4, 16.2], seats: 23, seatMargin: 3 },
    { id: "cda", name: "CDA", pct: 12.7, pctRange: [11.4, 14.0], seats: 19, seatMargin: 3 },
    { id: "vvd", name: "VVD", pct: 10.9, pctRange: [9.6, 12.2], seats: 17, seatMargin: 2 },
    { id: "ja21", name: "JA21", pct: 7.4, pctRange: [6.3, 8.5], seats: 11, seatMargin: 2 },
    { id: "fvd", name: "FvD", pct: 4.0, pctRange: [3.2, 4.8], seats: 6, seatMargin: 2 },
    { id: "bbb", name: "BBB", pct: 3.2, pctRange: [2.5, 3.9], seats: 5, seatMargin: 2 },
    { id: "sp", name: "SP", pct: 2.7, pctRange: [2.0, 3.4], seats: 4, seatMargin: 1 },
    { id: "pvdd", name: "Partij voor de Dieren", pct: 2.6, pctRange: [2.0, 3.2], seats: 4, seatMargin: 1 },
    { id: "sgp", name: "SGP", pct: 2.4, pctRange: [1.8, 3.0], seats: 3, seatMargin: 1 },
    { id: "denk", name: "DENK", pct: 2.3, pctRange: [1.7, 2.9], seats: 3, seatMargin: 1 },
    { id: "cu", name: "ChristenUnie", pct: 2.2, pctRange: [1.6, 2.8], seats: 3, seatMargin: 1 },
    { id: "50plus", name: "50PLUS", pct: 2.1, pctRange: [1.5, 2.7], seats: 3, seatMargin: 1 },
    { id: "volt", name: "Volt", pct: 1.6, pctRange: [1.1, 2.1], seats: 2, seatMargin: 1 },
    { id: "nsc", name: "NSC", pct: 0.7, pctRange: [0.4, 1.0], seats: 1, seatMargin: 1 },
  ],
};

import { ExitPollSnapshot } from "@/types/poll";

export const exitPollSnapshot: ExitPollSnapshot = {
  updatedAt: "2025-10-29T21:15:00+01:00",
  provider: {
    id: "ipsos-io_exitpoll_2025-10-29T21:15",
    label: "Ipsos I&O — Exitpoll 21:15",
    note: "Gegevens afkomstig van de 21:15-stand van de exitpoll (Ipsos I&O).",
  },
  majority: 76,
  methodology: {
    sample: "n≈20.000 stembusinterviews; realtime weging tot 21:15 CET",
    notes: "Resultaat is een exitpoll. Werkelijke uitslag kan afwijken.",
  },
  parties: [
    { id: "d66", name: "D66", seats: 27, seatDelta: 18 },
    { id: "pvv", name: "PVV", seats: 25, seatDelta: -12 },
    { id: "vvd", name: "VVD", seats: 23, seatDelta: -1 },
    { id: "glpvda", name: "GroenLinks-PvdA", seats: 20, seatDelta: -5 },
    { id: "cda", name: "CDA", seats: 19, seatDelta: 14 },
    { id: "ja21", name: "JA21", seats: 9, seatDelta: 8 },
    { id: "fvd", name: "FvD", seats: 6, seatDelta: 3 },
    { id: "bbb", name: "BBB", seats: 4, seatDelta: -3 },
    { id: "sp", name: "SP", seats: 3, seatDelta: -2 },
    { id: "denk", name: "DENK", seats: 3, seatDelta: 0 },
    { id: "pvdd", name: "Partij voor de Dieren", seats: 3, seatDelta: 0 },
    { id: "sgp", name: "SGP", seats: 3, seatDelta: 0 },
    { id: "cu", name: "ChristenUnie", seats: 2, seatDelta: -1 },
    { id: "50plus", name: "50PLUS", seats: 2, seatDelta: 2 },
    { id: "volt", name: "Volt", seats: 1, seatDelta: -1 },
    { id: "nsc", name: "NSC", seats: 0, seatDelta: -20 },
  ],
};

export const AXES = ["econ", "social", "eu", "green", "state"] as const;

export type Axis = (typeof AXES)[number];

export type SeatMap = Record<string, number>;

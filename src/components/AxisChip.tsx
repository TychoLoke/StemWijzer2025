import { AXIS_GRADIENTS } from "../data/axes";
import type { Axis } from "../types";

interface AxisChipProps {
  axis: Axis;
  value: number;
}

export const AxisChip = ({ axis, value }: AxisChipProps) => (
  <div className={`rounded-xl bg-gradient-to-r ${AXIS_GRADIENTS[axis]} p-2 text-[10px] text-white/90`}>
    <div className="flex items-center justify-between">
      <span className="font-semibold uppercase tracking-wide">{axis}</span>
      <span className="font-mono">{value}</span>
    </div>
    <div className="mt-1 h-1 w-full overflow-hidden rounded bg-white/20">
      <div className="h-full bg-white" style={{ width: `${(value + 5) * 10}%` }} />
    </div>
  </div>
);

export default AxisChip;

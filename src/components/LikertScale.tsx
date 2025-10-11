interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const LABELS = ["1", "2", "3", "4", "5"];

export const LikertScale = ({ value, onChange }: LikertScaleProps) => (
  <div>
    <div className="grid grid-cols-5 gap-2">
      {LABELS.map((label, index) => {
        const optionValue = index + 1;
        const selected = value === optionValue;
        return (
          <button
            type="button"
            key={label}
            onClick={() => onChange(optionValue)}
            className={`rounded-xl px-3 py-3 text-sm font-medium ${
              selected ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
    <div className="mt-2 grid grid-cols-3 text-[11px] text-white/60">
      <span>1 = oneens</span>
      <span className="text-center">3 = neutraal</span>
      <span className="text-right">5 = eens</span>
    </div>
  </div>
);

export default LikertScale;

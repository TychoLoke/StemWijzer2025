import { AXES } from "../types";
import { AXIS_COPY } from "../data/axes";
import type { Question } from "../data/questions";

interface QuestionWhyProps {
  question: Question;
}

export const QuestionWhy = ({ question }: QuestionWhyProps) => (
  <details className="mt-2 text-xs text-white/80">
    <summary className="cursor-pointer select-none text-white/80">Waarom deze vraag?</summary>
    <div className="mt-2 rounded-lg bg-white/5 p-2">
      {AXES.map((axis) => {
        if (!(axis in question.axes)) return null;
        const direction = (question.axes[axis] ?? 0) > 0 ? "rechts" : "links";
        const copy = AXIS_COPY[axis];
        return (
          <div key={axis} className="mb-2">
            <div className="mb-1 font-semibold">
              {copy.label} <span className="opacity-70">({axis})</span>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="mb-1">
                Hoger (4–5) duwt je meer naar <b>{direction}</b> op deze as.
              </div>
              <ul className="list-disc pl-5">
                {copy.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
      {question.hint && <div className="mt-1 text-white/70">💡 {question.hint}</div>}
    </div>
  </details>
);

export default QuestionWhy;

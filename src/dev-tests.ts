import { AXES } from "./types";
import { AXIS_COPY } from "./data/axes";
import { QUESTIONS } from "./data/questions";
import { PRESETS } from "./data/presets";
import { PARTIES_LIST } from "./data/parties";
import { buildUserVector, defaultAnswers, defaultImportance, importanceToFactor } from "./utils/quiz";
import ResultsMap from "./components/ResultsMap";

(function runDevTests() {
  if (typeof window === "undefined") return;
  const assert = (condition: boolean, message: string) => {
    console[condition ? "log" : "warn"](`[TEST ${condition ? "OK" : "FAIL"}] ${message}`);
  };

  try {
    assert(Array.isArray(AXES) && AXES.length === 5, "AXES defined (5)");
    AXES.forEach((axis) => {
      const copy = AXIS_COPY[axis];
      assert(!!copy && !!copy.label && !!copy.left && !!copy.right, `AXIS_COPY for ${axis}`);
    });
    assert([0.5, 0.75, 1, 1.25, 1.5].every((value, index) => value === importanceToFactor(index + 1)), "weight table intact");

    Object.entries(PRESETS).forEach(([name, seatMap]) => {
      const total = Object.values(seatMap).reduce((acc, value) => acc + value, 0);
      assert(total === 150, `preset ${name} sums to 150 (got ${total})`);
      Object.keys(seatMap).forEach((party) =>
        assert((PARTIES_LIST as readonly string[]).includes(party), `preset ${name}: '${party}' ∈ PARTIES_LIST`),
      );
    });

    const answers = defaultAnswers(QUESTIONS);
    const imp = defaultImportance();
    const vector = buildUserVector(answers, imp, QUESTIONS);
    const hasNaN = AXES.some((axis) => Number.isNaN(vector[axis]));
    assert(!hasNaN, "userVec yields valid numbers");

    assert(typeof ResultsMap === "function", "ResultsMap component is defined");
  } catch (error) {
    console.warn("[TEST ERROR]", error);
  }
})();

import { useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { partyColorSafe, PARTY_WEIGHTS } from "../data/parties";
import type { Axis } from "../types";
import PrimaryButton from "./PrimaryButton";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const party = payload[0].payload;
  const name = party.name ?? "—";
  return (
    <div className="rounded-lg border border-white/10 bg-[#111] p-2 text-xs text-white">
      <div className="font-semibold">{name}</div>
      <div>Economie: <b>{party.x}</b></div>
      <div>Sociaal: <b>{party.y}</b></div>
    </div>
  );
};

const CustomLegend = ({ payload }: any) => {
  if (!payload) return null;
  return (
    <div className="mt-2 flex items-center gap-4 text-white">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: item.color }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

interface ResultsMapProps {
  userVector?: Record<Axis, number>;
  highlight?: string[];
  showAllLabels?: boolean;
}

export const ResultsMap = ({ userVector, highlight, showAllLabels: showAllLabelsProp = true }: ResultsMapProps) => {
  const safeVector = userVector ?? { econ: 0, social: 0, eu: 0, green: 0, state: 0 };
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(showAllLabelsProp);

  const partyPoints = useMemo(
    () =>
      Object.entries(PARTY_WEIGHTS).map(([name, axes]) => ({
        name,
        x: axes.econ,
        y: axes.social,
        fill: partyColorSafe(name),
        r: highlight?.includes(name) ? 6 : 4,
      })),
    [highlight],
  );

  const youPoint = { name: "Jij", x: safeVector.econ, y: safeVector.social, fill: "#FFFFFF", r: 7 };

  const downloadPng = async () => {
    const node = chartRef.current;
    if (!node) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(node, { backgroundColor: "#0b0b10", scale: 2 });
    const url = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "stemwijzer-kaart.png";
    anchor.click();
  };

  return (
    <div ref={chartRef} className="rounded-2xl bg-white/5 p-4 text-white shadow-lg shadow-black/20">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">📊 Jouw positie in het politiek landschap</h2>
        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="accent-white"
              checked={showAllLabels}
              onChange={(event) => setShowAllLabels(event.target.checked)}
            />
            <span>alle labels</span>
          </label>
          <PrimaryButton aria-label="download kaart" onClick={downloadPng}>
            Download PNG
          </PrimaryButton>
        </div>
      </div>
      <p className="mb-3 text-sm text-white/80">
        x‑as: economie (links↔rechts) • y‑as: samenleving (progressief↔conservatief)
      </p>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <ReferenceArea x1={-5} x2={0} y1={0} y2={5} fill="rgba(56,189,248,0.06)" strokeOpacity={0} />
            <ReferenceArea x1={0} x2={5} y1={0} y2={5} fill="rgba(253,186,116,0.06)" strokeOpacity={0} />
            <ReferenceArea x1={-5} x2={0} y1={-5} y2={0} fill="rgba(134,239,172,0.06)" strokeOpacity={0} />
            <ReferenceArea x1={0} x2={5} y1={-5} y2={0} fill="rgba(196,181,253,0.06)" strokeOpacity={0} />
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
            <XAxis
              type="number"
              dataKey="x"
              name="Economie"
              domain={[-5, 5]}
              tick={{ fill: "#fff", fontSize: 10 }}
              axisLine={{ stroke: "rgba(255,255,255,0.3)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Sociaal"
              domain={[-5, 5]}
              tick={{ fill: "#fff", fontSize: 10 }}
              axisLine={{ stroke: "rgba(255,255,255,0.3)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
            />
            <ReferenceLine x={0} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            <Scatter name="Partijen" data={partyPoints}>
              {partyPoints.map((point, index) => (
                <Cell key={`party-${index}`} fill={point.fill} />
              ))}
              {showAllLabels && <LabelList dataKey="name" position="top" style={{ fill: "#fff", fontSize: 10 }} />}
            </Scatter>

            <Scatter name="Jij" data={[youPoint]}>
              <Cell key="you" fill="#ffffff" stroke="#000" strokeWidth={1.5} />
              <LabelList dataKey="name" position="top" style={{ fill: "#fff", fontSize: 11, fontWeight: 700 }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">
          <div className="flex items-start justify-start p-2">sociaal-progressief</div>
          <div className="flex items-start justify-end p-2 text-right">sociaal-conservatief</div>
          <div className="flex items-end justify-start p-2">economisch-links</div>
          <div className="flex items-end justify-end p-2 text-right">economisch-rechts</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-white/70">
        💡 Tip: dichterbij = meer overeenstemming in economische & sociale koers.
      </div>
    </div>
  );
};

export default ResultsMap;

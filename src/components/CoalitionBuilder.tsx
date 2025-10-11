import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Label,
} from "recharts";
import { PRESETS } from "../data/presets";
import { PARTIES_LIST, partyColorSafe } from "../data/parties";
import type { SeatMap } from "../types";

const SeatTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const [data] = payload;
  return (
    <div className="rounded-lg border border-white/10 bg-[#111] px-2 py-1 text-xs text-white">
      <div className="font-semibold">{data?.payload?.name}</div>
      <div>{data?.payload?.seats} zetels</div>
    </div>
  );
};

export const CoalitionBuilder = () => {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("Ipsos I&O – 29 sep 2025");
  const [seats, setSeats] = useState<SeatMap>({ ...PRESETS["Ipsos I&O – 29 sep 2025"] });
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSeats({ ...PRESETS[presetKey] });
    setSelected({});
  }, [presetKey]);

  const totalSeats = useMemo(() => PARTIES_LIST.reduce((total, party) => total + (seats[party] ?? 0), 0), [seats]);
  const coalitionSeats = useMemo(
    () => PARTIES_LIST.reduce((total, party) => total + ((selected[party] ? seats[party] : 0) ?? 0), 0),
    [selected, seats],
  );
  const majority = coalitionSeats >= 76;

  const setSeat = (party: string, value: number) => {
    setSeats((prev) => ({ ...prev, [party]: Math.max(0, Math.min(150, Math.round(value))) }));
  };

  const toggleParty = (party: string) => setSelected((prev) => ({ ...prev, [party]: !prev[party] }));

  const percent = Math.min(100, Math.round((coalitionSeats / 150) * 100));

  const coalitionBreakdown = useMemo(
    () =>
      PARTIES_LIST.filter((party) => selected[party] && (seats[party] ?? 0) > 0)
        .map((party) => ({
          name: party,
          seats: seats[party] ?? 0,
          color: partyColorSafe(party),
        }))
        .sort((a, b) => b.seats - a.seats),
    [selected, seats],
  );

  const maxSelectedSeats = useMemo(
    () => (coalitionBreakdown.length > 0 ? Math.max(...coalitionBreakdown.map((entry) => entry.seats)) : 0),
    [coalitionBreakdown],
  );

  const barChartHeight = Math.max(160, coalitionBreakdown.length * 34 + 60);

  const pieData = useMemo(
    () => [
      { name: "Coalitie", value: coalitionSeats, color: majority ? "#bef264" : "#ffffff" },
      { name: "Overig", value: Math.max(0, 150 - coalitionSeats), color: "rgba(255,255,255,0.2)" },
    ],
    [coalitionSeats, majority],
  );

  return (
    <section className="rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">🧩 Coalitie‑bouwer</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-white/70">Preset:</span>
          {Object.keys(PRESETS).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setPresetKey(key as keyof typeof PRESETS)}
              className={`rounded-lg px-2 py-1 ${presetKey === key ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-[11px] text-white/80 sm:grid-cols-3">
        {PARTIES_LIST.map((party) => (
          <div key={party} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: partyColorSafe(party) }}></span>
            <span className="truncate">{party}</span>
          </div>
        ))}
      </div>

      <div className="mb-2 text-xs text-white/80">
        Totaal: <b>{totalSeats}</b>/150 • Geselecteerd: <b>{coalitionSeats}</b>
        {majority && <span className="ml-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-black">MEERDERHEID</span>}
      </div>
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${majority ? "bg-green-300" : "bg-white"}`} style={{ width: `${percent}%` }} />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="mb-2 text-xs uppercase tracking-wide text-white/60">verdeling geselecteerde partijen</div>
          {coalitionBreakdown.length === 0 ? (
            <div className="rounded-lg border border-dashed border-white/20 p-6 text-center text-xs text-white/60">
              Selecteer partijen om de visuele verdeling te zien.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={barChartHeight}>
              <BarChart
                data={coalitionBreakdown}
                layout="vertical"
                margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                <XAxis type="number" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} domain={[0, Math.max(30, Math.min(150, Math.ceil(maxSelectedSeats / 5) * 5 + 5))]} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fill: "#ffffff", fontSize: 11 }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.08)" }} content={<SeatTooltip />} />
                <Bar dataKey="seats" radius={[0, 8, 8, 0]}
                  label={{ position: "right", fill: "#ffffff", fontSize: 11 }}
                >
                  {coalitionBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="mb-2 text-xs uppercase tracking-wide text-white/60">route naar 76 zetels</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                startAngle={210}
                endAngle={-30}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={1.5}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
                <Label
                  position="center"
                  content={() => (
                    <div className="text-center text-white">
                      <div className="text-lg font-semibold">{coalitionSeats}</div>
                      <div className="text-[11px] uppercase tracking-wide text-white/60">van 150</div>
                      <div className={`mt-1 text-xs font-semibold ${majority ? "text-lime-300" : "text-white/60"}`}>
                        {majority ? "meerderheid" : `${Math.max(0, 76 - coalitionSeats)} te gaan`}
                      </div>
                    </div>
                  )}
                />
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} zetels`, name]}
                contentStyle={{ backgroundColor: "#111", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PARTIES_LIST.map((party) => (
          <div
            key={party}
            className={`flex items-center justify-between rounded-xl border border-white/10 p-2 ${selected[party] ? "bg-white text-black" : "bg-white/5"}`}
            style={{ borderLeft: `6px solid ${partyColorSafe(party)}` }}
          >
            <button type="button" onClick={() => toggleParty(party)} className="flex-1 text-left text-sm font-semibold">
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: partyColorSafe(party) }}
              />
              {party}
            </button>
            <div className="flex items-center gap-2">
              <input
                aria-label={`zetels voor ${party}`}
                type="number"
                inputMode="numeric"
                className={`w-16 rounded-lg border-0 bg-white/10 px-2 py-1 text-right text-sm outline-none ${
                  selected[party] ? "bg-black/10 text-black" : "text-white"
                }`}
                value={seats[party] ?? 0}
                onChange={(event) => setSeat(party, parseInt(event.target.value || "0", 10))}
              />
              <span className="text-xs opacity-70">zetels</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoalitionBuilder;

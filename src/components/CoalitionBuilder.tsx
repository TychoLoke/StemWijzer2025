import { useEffect, useMemo, useState } from "react";
import { PRESETS } from "../data/presets";
import { PARTIES_LIST, partyColorSafe } from "../data/parties";
import type { SeatMap } from "../types";

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

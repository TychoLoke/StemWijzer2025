"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CUTOFF_ISO } from "@/lib/constants";

type CountdownProps = {
  serverNowEndpoint: string;
};

function formatRemaining(ms: number): string {
  if (ms <= 0) return "T-00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  if (hours > 0) {
    const hh = hours.toString().padStart(2, "0");
    return `T-${hh}:${mm}:${ss}`;
  }
  return `T-${mm}:${ss}`;
}

async function fetchServerNow(endpoint: string): Promise<Date> {
  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Kan server-tijd niet laden");
  }
  const data = await response.json();
  return new Date(data.now);
}

export function Countdown({ serverNowEndpoint }: CountdownProps) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateRemaining = useCallback(async () => {
    try {
      const serverNow = await fetchServerNow(serverNowEndpoint);
      const cutoff = new Date(CUTOFF_ISO);
      setRemaining(cutoff.getTime() - serverNow.getTime());
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [serverNowEndpoint]);

  useEffect(() => {
    void updateRemaining();
    const syncInterval = setInterval(() => {
      void updateRemaining();
    }, 10000);
    return () => clearInterval(syncInterval);
  }, [updateRemaining]);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      window.location.reload();
      return;
    }
    const tick = () => {
      setRemaining((prev) => (prev === null ? prev : prev - 1000));
    };
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const label = useMemo(() => {
    if (error) return "Server niet bereikbaar";
    if (remaining === null) return "Laden…";
    return formatRemaining(remaining);
  }, [error, remaining]);

  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-5 shadow-lg shadow-indigo-500/10">
      <span className="text-xs uppercase tracking-widest text-indigo-300">Countdown tot sluiting</span>
      <span className="text-4xl font-semibold text-white" aria-live="polite">
        {label}
      </span>
      <span className="text-sm text-slate-300">
        Sluiting: 29 okt 2025 21:00 ({CUTOFF_ISO})
      </span>
    </div>
  );
}

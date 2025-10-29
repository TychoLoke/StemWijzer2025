"use client";

import { useState } from "react";

interface ForceUpdateButtonProps {
  className?: string;
}

export function ForceUpdateButton({ className }: ForceUpdateButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setStatus("loading");
    setMessage(null);
    try {
      const secret = process.env.NEXT_PUBLIC_REVALIDATE_PUBLIC;
      const url = secret
        ? `/api/revalidate?secret=${encodeURIComponent(secret)}`
        : "/api/revalidate";
      const response = await fetch(url, { method: "POST" });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setStatus("success");
      setMessage("Cache ververst");
    } catch (error) {
      setStatus("error");
      setMessage((error as Error).message ?? "Fout bij verversen");
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setMessage(null);
      }, 4000);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Bezig…" : "Forceer update"}
      </button>
      {message && (
        <p className="mt-2 text-xs text-slate-300">{message}</p>
      )}
    </div>
  );
}

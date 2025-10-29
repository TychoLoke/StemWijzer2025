import type { Metadata } from "next";
import "./globals.css";
import { SITE_TZ } from "@/lib/constants";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "StemWijzer 2025 — Slotpeiling & Coalitiebouwer",
  description:
    "Volg de slotpeiling van Ipsos I&O en bouw coalities naar een meerderheid van 76 zetels.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "StemWijzer 2025",
    description:
      "Live slotpeiling, countdown en coalitiebouwer met meerderheid van 76 zetels.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" data-tz={SITE_TZ}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium uppercase tracking-wide text-slate-300">
                  StemWijzer 2025
                </span>
                <span className="text-lg font-semibold text-white">
                  Slotpeiling & coalitiebouwer
                </span>
              </div>
              <nav className="hidden gap-4 text-sm font-medium text-slate-300 md:flex">
                <a className="transition hover:text-white" href="/">
                  Home
                </a>
                <a className="transition hover:text-white" href="/slotpeiling">
                  Slotpeiling
                </a>
                <a className="transition hover:text-white" href="/coalitie">
                  Coalitiebouwer
                </a>
                <a className="transition hover:text-white" href="/uitleg">
                  Uitleg
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1 bg-slate-950">{children}</main>
          <footer className="border-t border-white/10 bg-slate-900/80">
            <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-400">
              Data: Ipsos I&O slotpeiling 28 okt 2025 · Tijdzone: {SITE_TZ}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

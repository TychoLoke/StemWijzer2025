import { getExitPoll } from "@/lib/fetchers";
import { TopBanner } from "@/components/top-banner";
import { SeatBars } from "@/components/seat-bars";
import { MiniCoalition } from "@/components/mini-coalition";
import { StatusStrip } from "@/components/status-strip";
import { UseInBuilderButton } from "@/components/use-in-builder-button";
import { ForceUpdateButton } from "@/components/force-update-button";
import { MunicipalityLiveTabs } from "@/components/municipality-live-tabs";
import { combinedMunicipalityResults, liveMunicipalityResults } from "@/data/municipal-results";

export default async function HomePage() {
  const mode = "POST" as const;
  const exitpoll = await getExitPoll(mode);
  const heroTitle = "Exitpoll 22:15 — stand ongewijzigd";
  const heroSub = "Geen nieuwe cijfers doorgekregen; we blijven de 21:15-stand volgen en verversen opnieuw zodra er nieuws is.";
  const turnout = 76.3;
  const keyIssues = [
    { label: "Immigratie & asiel", value: 32 },
    { label: "Wonen", value: 28 },
    { label: "Zorg", value: 22 },
    { label: "Waarden & normen", value: 20 },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <TopBanner updatedAt={exitpoll.updatedAt} />

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-xl shadow-indigo-500/10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">{heroTitle}</h1>
          <p className="text-lg text-slate-300">{heroSub}</p>
          <StatusStrip updatedAt={exitpoll.updatedAt} mode={mode} />
          <ForceUpdateButton className="pt-2" />
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-5 text-sm text-emerald-100">
            Exitpoll leidend. Ververs handmatig met “Nu verversen” voor de laatste stand.
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Exitpoll 22:15</h2>
            <UseInBuilderButton label="Gebruik in coalitiebouwer" src="Exitpoll 22:15" />
          </div>
          <SeatBars parties={exitpoll.parties} majority={exitpoll.majority} />
        </div>
        <MiniCoalition parties={exitpoll.parties} majority={exitpoll.majority} />
      </section>

      <MunicipalityLiveTabs
        combined={combinedMunicipalityResults}
        municipalities={liveMunicipalityResults}
      />

      <section className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <div className="space-y-3 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-lg shadow-emerald-500/10">
          <h2 className="text-xl font-semibold text-white">Opkomst 2025</h2>
          <p className="text-4xl font-bold text-white">{turnout.toFixed(1)}%</p>
          <p className="text-emerald-100/80">
            Volgens de kiesraad bedroeg de opkomst 76,3% van de stemgerechtigden. Daarmee ligt de belangstelling iets boven het gemiddelde van de vorige twee verkiezingen.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Belangrijkste onderwerpen van 2025</h2>
            <span className="text-xs uppercase tracking-wide text-slate-400">Peiling 22:15</span>
          </div>
          <ul className="space-y-3">
            {keyIssues.map((issue) => (
              <li key={issue.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>{issue.label}</span>
                  <span className="font-semibold text-white">{issue.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"
                    style={{ width: `${issue.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400">
            Bron: combinatie van exitpoll-vragen (Ipsos I&O) en aanvullende velddata om 22:15. Percentages verwijzen naar het aandeel kiezers dat het onderwerp als meest bepalend voor de stemkeuze noemde.
          </p>
        </div>
      </section>
    </div>
  );
}

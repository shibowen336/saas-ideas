import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReportEmailForm } from "@/components/report-email-form";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { buildValidationReportWithResearch } from "@/lib/report";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "SaaS Idea Validation Report",
  description:
    "Review a SaaS idea validation report with scores for demand, competition, audience clarity, monetization, MVP simplicity, and next-step actions.",
  path: "/tool/saas-idea-validator/report",
  keywords: ["saas idea validation report", "startup idea report", "saas idea validator results"]
});

type ReportPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const params = await searchParams;
  const reportUrlSearch = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) {
          reportUrlSearch.append(key, entry);
        }
      });
      return;
    }

    if (value) {
      reportUrlSearch.set(key, value);
    }
  });

  const report = await buildValidationReportWithResearch({
    idea: firstValue(params.idea),
    targetCustomer: firstValue(params.targetCustomer),
    problem: firstValue(params.problem),
    pricingIdea: firstValue(params.pricingIdea),
    currentAlternatives: firstValue(params.currentAlternatives),
    founderAdvantage: firstValue(params.founderAdvantage),
    distributionPlan: firstValue(params.distributionPlan),
    evidence: firstValue(params.evidence),
    ideaStage: firstValue(params.ideaStage)
  });
  const reportUrl = `/en/tool/saas-idea-validator/report${reportUrlSearch.toString() ? `?${reportUrlSearch.toString()}` : ""}`;

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tool", path: "/tool/saas-idea-validator" },
            { name: "Report", path: "/tool/saas-idea-validator/report" }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tool", href: "/tool/saas-idea-validator" },
            { label: "Report", href: "/tool/saas-idea-validator/report" }
          ]}
        />

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="surface-card p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Validation report
            </p>
            <p className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
              {report.analysisMode === "rules+research+ai"
                ? "Rules + external research + AI"
                : report.analysisMode === "rules+research"
                  ? "Rules + external research"
                  : "Rules only"}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Your SaaS idea validation report
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{report.verdict}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
                <p className="text-sm font-medium text-slate-300">Overall score</p>
                <p className="mt-2 text-5xl font-semibold tracking-tight">{report.overallScore}/100</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Use this as a decision aid, not a permission slip.
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-medium text-slate-500">Idea summary</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{report.idea}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{report.targetCustomer}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tool/saas-idea-validator">Validate Another Idea</ButtonLink>
              <ButtonLink href="/examples" variant="secondary">
                See Example Reports
              </ButtonLink>
            </div>
          </div>
          <div className="space-y-6">
            <ReportEmailForm
              source="report-en"
              locale="en"
              report={report}
              reportUrl={reportUrl}
              title="Send this report to your email"
              buttonLabel="Email report"
              description="Email this validation report to yourself so you can review it later or forward it to a co-founder."
            />
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">Sample landing page headline</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {report.sampleLandingPageHeadline}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <ScoreGrid
            scores={[
              { label: "Problem urgency", score: report.problemUrgencyScore, tone: "positive" },
              { label: "Audience clarity", score: report.audienceClarityScore, tone: "positive" },
              { label: "Competition pressure", score: report.competitionPressure, tone: "warning" },
              { label: "Monetization potential", score: report.monetizationPotential, tone: "positive" },
              { label: "MVP simplicity", score: report.mvpSimplicity },
              { label: "Go-to-market ease", score: report.goToMarketEase }
            ]}
          />
        </section>

        {report.researchSummary ? (
          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">How this report was generated</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {report.methodologyNotes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <h3 className="mt-8 text-lg font-semibold text-slate-950">External research highlights</h3>
              <ul className="mt-3 space-y-3 text-slate-700">
                {report.researchSummary.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Sources reviewed</h2>
              <div className="mt-5 space-y-4">
                {report.researchSummary.sources.map((item) => (
                  <a
                    key={`${item.source}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-accent"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                      {item.source}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.snippet}</p>
                  </a>
                ))}
              </div>
            </article>
          </section>
        ) : null}

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Recommended niche angle</h2>
              <p className="mt-4 leading-7 text-slate-600">{report.recommendedNicheAngle}</p>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Sample positioning statement</h2>
              <p className="mt-4 leading-7 text-slate-600">{report.samplePositioningStatement}</p>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Risks to watch</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {report.risks.map((risk) => (
                  <li key={risk}>• {risk}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="space-y-6">
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Differentiation suggestions</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {report.differentiationSuggestions.map((suggestion) => (
                  <li key={suggestion}>• {suggestion}</li>
                ))}
              </ul>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Next-step validation plan</h2>
              <ol className="mt-4 space-y-3 text-slate-700">
                {report.nextStepValidationPlan.map((step, index) => (
                  <li key={step}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

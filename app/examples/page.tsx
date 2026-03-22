import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { exampleReports, getExampleReportSlug } from "@/content/example-reports";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "SaaS Idea Validation Report Examples",
  description:
    "Browse realistic SaaS idea validation report examples covering ecommerce, agency software, AI SaaS, and founder-focused niche positioning.",
  path: "/examples",
  keywords: [
    "saas idea validation examples",
    "startup idea validator examples",
    "micro saas idea validation examples"
  ]
});

export default function ExamplesPage() {
  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Examples", path: "/examples" }
          ])}
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Examples", href: "/examples" }]} />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow="Examples"
            title="Realistic SaaS idea validation report examples"
            description="These examples are built to satisfy real founder search intent. Each one explains why the idea scored the way it did, where the risks are, and what should be validated next."
          />
        </div>

        <div className="mt-12 space-y-10">
          {exampleReports.map((report) => (
            <article key={report.slug} className="surface-card overflow-hidden">
              <div className="border-b border-slate-200 bg-white px-8 py-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                      {report.category}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                      <Link href={`/examples/${getExampleReportSlug("en", report)}`} className="hover:text-accent">
                        {report.idea}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{report.summary}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-slate-950 px-6 py-5 text-white">
                    <p className="text-sm font-medium text-slate-300">Overall score</p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight">{report.overallScore}/100</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <ScoreGrid
                  scores={[
                    { label: "Problem urgency", score: report.problemUrgencyScore, tone: "positive" },
                    { label: "Audience clarity", score: report.audienceClarityScore, tone: "positive" },
                    { label: "Competition pressure", score: report.competitionPressure, tone: "warning" },
                    { label: "Monetization", score: report.monetizationPotential, tone: "positive" },
                    { label: "MVP simplicity", score: report.mvpSimplicity },
                    { label: "Go-to-market ease", score: report.goToMarketEase }
                  ]}
                />

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-6">
                    <div className="rounded-[1.75rem] bg-sand p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        Positioning statement
                      </p>
                      <p className="mt-4 text-lg leading-8 text-slate-700">
                        {report.samplePositioningStatement}
                      </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-200 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        Recommended niche angle
                      </p>
                      <p className="mt-4 leading-7 text-slate-700">{report.recommendedNicheAngle}</p>
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-200 p-6">
                      <h3 className="text-xl font-semibold text-slate-950">Next-step validation plan</h3>
                      <ul className="mt-4 space-y-3 text-slate-700">
                        {report.nextStepValidationPlan.map((step) => (
                          <li key={step}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {report.longFormInsights.map((insight) => (
                      <section key={insight.title} className="rounded-[1.75rem] border border-slate-200 p-6">
                        <h3 className="text-2xl font-semibold text-slate-950">{insight.title}</h3>
                        {insight.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                            {paragraph}
                          </p>
                        ))}
                      </section>
                    ))}
                    <section className="rounded-[1.75rem] border border-slate-200 p-6">
                      <h3 className="text-2xl font-semibold text-slate-950">Risks to watch</h3>
                      <ul className="mt-4 space-y-3 text-slate-700">
                        {report.risks.map((risk) => (
                          <li key={risk}>• {risk}</li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
                <div className="mt-8">
                  <ButtonLink href={`/examples/${getExampleReportSlug("en", report)}`} variant="secondary">
                    Read the full example report
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">Ready to score your own idea?</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Use the same framework on your own SaaS concept, then compare the result with these
            examples before you build.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/tool/saas-idea-validator">Validate My Idea</ButtonLink>
            <ButtonLink href="/blog/saas-pricing-validation" variant="secondary">
              Learn Pricing Validation
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

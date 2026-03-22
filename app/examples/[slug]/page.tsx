import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import {
  exampleReports,
  getExampleReport,
  getExampleReportSlug,
  getLocalizedExampleReport
} from "@/content/example-reports";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type ExampleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return exampleReports.map((report) => ({ slug: getExampleReportSlug("en", report) }));
}

export async function generateMetadata({ params }: ExampleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getExampleReport(slug);

  if (!report) {
    return createMetadata({
      title: "Example not found",
      description: "The requested example report could not be found.",
      path: `/examples/${slug}`,
      noIndex: true
    });
  }

  const localizedReport = getLocalizedExampleReport(report, "en");

  return createMetadata({
    title: `${localizedReport.idea} Example Report`,
    description: localizedReport.summary,
    path: `/examples/${report.slug}`,
    keywords: [localizedReport.category.toLowerCase(), "saas idea validation examples"],
    type: "article"
  });
}

export default async function ExampleDetailPage({ params }: ExampleDetailPageProps) {
  const { slug } = await params;
  const report = getExampleReport(slug);

  if (!report) {
    notFound();
  }

  const localizedReport = getLocalizedExampleReport(report, "en");
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            articleSchema({
              locale: "en",
              title: `${localizedReport.idea} Example Report`,
              description: localizedReport.summary,
              path: `/examples/${localizedReport.slug}`
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Examples", path: "/examples" },
              { name: localizedReport.idea, path: `/examples/${localizedReport.slug}` }
            ])
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Examples", href: "/examples" },
            { label: localizedReport.idea, href: `/examples/${localizedReport.slug}` }
          ]}
        />

        <article className="mt-8">
          <header className="grid gap-8 lg:grid-cols-[1fr_0.32fr]">
            <div className="surface-card p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {localizedReport.category}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {localizedReport.idea}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">{localizedReport.summary}</p>
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.75rem] bg-sand p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    Target buyer and problem
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-700">
                    {localizedReport.targetCustomer}. {localizedReport.problem}
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    Why this example matters
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-700">{localizedReport.verdict}</p>
                </div>
              </div>
            </div>

            <div className="surface-card p-8 text-center">
              <p className="text-sm font-medium text-slate-500">Overall score</p>
              <p className="mt-3 text-6xl font-semibold tracking-tight text-slate-950">
                {localizedReport.overallScore}
              </p>
              <p className="mt-2 text-sm text-slate-500">/100</p>
            </div>
          </header>

          <section className="mt-10">
            <ScoreGrid
              scores={[
                { label: "Problem urgency", score: localizedReport.problemUrgencyScore, tone: "positive" },
                { label: "Audience clarity", score: localizedReport.audienceClarityScore, tone: "positive" },
                { label: "Competition pressure", score: localizedReport.competitionPressure, tone: "warning" },
                { label: "Monetization", score: localizedReport.monetizationPotential, tone: "positive" },
                { label: "MVP simplicity", score: localizedReport.mvpSimplicity },
                { label: "Go-to-market ease", score: localizedReport.goToMarketEase }
              ]}
            />
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Pricing idea
                </p>
                <p className="mt-4 leading-7 text-slate-700">{localizedReport.pricingIdea}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Current alternatives
                </p>
                <p className="mt-4 leading-7 text-slate-700">{localizedReport.currentAlternatives}</p>
              </div>
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Positioning statement
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  {localizedReport.samplePositioningStatement}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {localizedReport.longFormInsights.map((insight) => (
                <section key={insight.title} className="rounded-[1.75rem] border border-slate-200 p-6">
                  <h2 className="text-2xl font-semibold text-slate-950">{insight.title}</h2>
                  {insight.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">Recommended niche angle</h2>
              <p className="mt-4 leading-7 text-slate-600">{localizedReport.recommendedNicheAngle}</p>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">Next-step validation plan</h2>
              <ol className="mt-4 space-y-3 text-slate-700">
                {localizedReport.nextStepValidationPlan.map((step, index) => (
                  <li key={step}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">Risks to watch</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {localizedReport.risks.map((risk) => (
                  <li key={risk}>- {risk}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-10 surface-card p-8">
            <h2 className="text-3xl font-semibold text-slate-950">
              Use this example to evaluate your own idea
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Once you understand why this idea scored the way it did, run the same framework on
              your own SaaS angle, then compare the result with the examples library and the core
              validation guide.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tool/saas-idea-validator">Run the SaaS idea validator</ButtonLink>
              <ButtonLink href="/examples" variant="secondary">
                Browse more example reports
              </ButtonLink>
              <ButtonLink
                href={`/blog/${validationGuide ? getBlogPostSlug("en", validationGuide) : "how-to-validate-a-saas-idea"}`}
                variant="secondary"
              >
                Read how to validate a SaaS idea
              </ButtonLink>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

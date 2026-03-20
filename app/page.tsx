import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { exampleReports } from "@/content/example-reports";
import { homeFaqs } from "@/content/faq";
import { createMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Validate Your SaaS Idea Before You Build",
  description:
    "SaaS Idea Validator helps founders score demand, competition, audience clarity, monetization, MVP complexity, and next-step validation actions before building.",
  path: "/",
  keywords: [
    "saas idea validator",
    "validate saas idea",
    "startup idea validator",
    "micro saas idea validation"
  ]
});

const previewReport = exampleReports[0];

export default function HomePage() {
  return (
    <main>
      <SchemaScript schema={faqSchema(homeFaqs)} />
      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Founder-first validation workflow
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Validate your SaaS idea before you build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Score demand, competition, audience clarity, monetization potential, MVP
              complexity, and next-step validation actions in one focused founder report.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tool/saas-idea-validator">Validate My Idea</ButtonLink>
              <ButtonLink href="/examples" variant="secondary">
                See Example Report
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="surface-card p-5">
                <dt className="text-sm font-medium text-slate-500">Demand and urgency</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">Buyer-first</dd>
              </div>
              <div className="surface-card p-5">
                <dt className="text-sm font-medium text-slate-500">Competition and wedge</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">Niche-aware</dd>
              </div>
              <div className="surface-card p-5">
                <dt className="text-sm font-medium text-slate-500">Next-step actions</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">Build later</dd>
              </div>
            </dl>
          </div>
          <aside className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-950 px-8 py-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Example report preview
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{previewReport.idea}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{previewReport.summary}</p>
            </div>
            <div className="p-8">
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-medium text-slate-500">Overall score</p>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-950">
                  {previewReport.overallScore}/100
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{previewReport.verdict}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">Recommended niche angle</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {previewReport.recommendedNicheAngle}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">Sample headline</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {previewReport.sampleLandingPageHeadline}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What the tool scores"
            title="A validation framework built for indie hackers and solo founders"
            description="The report translates a rough startup concept into a structured decision: validate harder, narrow the angle, or build with confidence."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Demand", "Find out whether the pain is strong enough to support real buyer conversations."],
              ["Competition pressure", "See how crowded the category feels before you default to a generic value proposition."],
              ["Audience clarity", "Understand whether your first customer is defined tightly enough to reach and interview."],
              ["Monetization", "Pressure-test whether the idea connects to measurable value and believable pricing."],
              ["MVP simplicity", "Keep the first version narrow enough to build without accidental platform sprawl."],
              ["Next steps", "Get founder-ready actions like interviews, landing page tests, and concierge pilots."]
            ].map(([title, copy]) => (
              <article key={title} className="surface-card p-6">
                <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow="How it works"
            title="Go from rough idea to concrete validation plan"
            description="The flow is simple on purpose. The product is meant to sharpen thinking and reduce wasted build cycles, not add process overhead."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["Describe the idea", "Enter the SaaS concept, target customer, problem, pricing angle, and current alternatives."],
              ["Get a structured report", "Review your overall score, score breakdown, key risks, differentiation suggestions, and a recommended niche angle."],
              ["Run the next tests", "Use the report to guide interviews, landing page experiments, and high-signal validation actions before you code."]
            ].map(([title, copy], index) => (
              <article key={title} className="surface-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Step {index + 1}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="See a report"
              title="Preview the scoring logic before you enter your own idea"
              description="Example reports are fully indexable and explain why certain concepts score higher than others."
            />
            <p className="mt-6 article-copy">
              The example library is designed for real search intent. Founders can compare how a
              micro SaaS idea, a vertical SaaS workflow, or an AI SaaS concept performs across
              demand, monetization, competition, and go-to-market ease.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/examples">Browse Example Reports</ButtonLink>
              <ButtonLink href="/tool/saas-idea-validator" variant="secondary">
                Try the Tool
              </ButtonLink>
            </div>
          </div>
          <div>
            <ScoreGrid
              scores={[
                { label: "Overall score", score: previewReport.overallScore, tone: "positive" },
                { label: "Problem urgency", score: previewReport.problemUrgencyScore, tone: "positive" },
                { label: "Audience clarity", score: previewReport.audienceClarityScore, tone: "positive" },
                { label: "Competition pressure", score: previewReport.competitionPressure, tone: "warning" },
                { label: "Monetization", score: previewReport.monetizationPotential, tone: "positive" },
                { label: "MVP simplicity", score: previewReport.mvpSimplicity }
              ]}
            />
            <div className="mt-6 surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Founder takeaway
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{previewReport.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Social proof placeholders"
            title="Designed for a conversion-ready launch"
            description="These blocks are ready for customer logos, testimonials, and founder outcomes once the first validation cohorts are live."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              "Placeholder testimonial: Found a narrower niche in one session instead of spending six weeks building.",
              "Placeholder testimonial: Used the report to pitch the idea to a co-founder and align on what to validate first.",
              "Placeholder testimonial: Turned a vague AI idea into a concrete offer with a believable pricing angle."
            ].map((quote) => (
              <blockquote key={quote} className="surface-card p-8 text-lg leading-8 text-slate-700">
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions from founders validating startup ideas"
              description="These are the questions founders usually ask before they trust a validation framework enough to use it."
            />
            <div className="mt-10">
              <FaqList items={homeFaqs} />
            </div>
          </div>
          <div className="surface-card h-fit p-6">
            <h2 className="text-2xl font-semibold text-slate-950">Keep exploring</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              <li>
                <Link href="/blog/how-to-validate-a-saas-idea" className="text-accent hover:underline">
                  Read the guide to validating a SaaS idea
                </Link>
              </li>
              <li>
                <Link href="/blog/micro-saas-ideas" className="text-accent hover:underline">
                  Browse micro SaaS idea inspiration
                </Link>
              </li>
              <li>
                <Link href="/tool/saas-idea-validator" className="text-accent hover:underline">
                  Run the validator on your own idea
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

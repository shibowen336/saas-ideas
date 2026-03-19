import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ToolIdeaForm } from "@/components/tool-idea-form";
import { ButtonLink } from "@/components/ui/button-link";
import { toolFaqs } from "@/content/faq";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "SaaS Idea Validator Tool",
  description:
    "Use the SaaS Idea Validator tool to score demand, competition, audience clarity, monetization potential, MVP simplicity, and founder next steps.",
  path: "/tool/saas-idea-validator",
  keywords: [
    "saas idea validator",
    "validate saas idea",
    "startup idea validator",
    "saas idea generator and validator"
  ]
});

export default function ToolPage() {
  return (
    <main className="section-space pb-32 md:pb-20">
      <div className="page-shell">
        <SchemaScript
          schema={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Tool", path: "/tool/saas-idea-validator" }
            ]),
            faqSchema(toolFaqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tool", href: "/tool/saas-idea-validator" }
          ]}
        />

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Main tool"
              title="Validate your SaaS idea with a founder-focused scoring framework"
              description="This tool helps builders decide whether an idea has enough demand, clarity, and differentiation to justify deeper validation or an MVP."
            />
            <div className="mt-6 article-copy">
              <p>
                SaaS Idea Validator is built for founders who want a practical answer, not a hype
                score. Enter your concept, target customer, problem, pricing angle, and current
                alternatives. The report highlights where the opportunity looks strong and where
                the story still feels thin.
              </p>
              <p>
                The goal is not to tell you whether an idea is magically good or bad. The goal is
                to help you spot what should happen next: interviews, pricing validation, a
                narrower niche, or a simple landing page test.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/examples" variant="secondary">
                See Example Reports
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost">
                Compare plans
              </ButtonLink>
            </div>
          </div>
          <div id="validator-form">
            <ToolIdeaForm />
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">What the tool does</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The report scores demand, audience clarity, competition pressure, monetization,
              MVP simplicity, and go-to-market ease. It also returns risks, differentiation
              suggestions, a recommended niche angle, a positioning statement, and a sample
              landing page headline.
            </p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Who it is for</h2>
            <p className="mt-4 leading-7 text-slate-600">
              It is especially useful for indie hackers, solo founders, developers exploring micro
              SaaS ideas, and builders testing AI SaaS angles. If you are deciding whether an idea
              deserves a month of effort, this is the right stage to use it.
            </p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">How to interpret the results</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Higher scores mean the story is easier to believe. Lower scores mean the idea still
              needs sharper customer definition, stronger proof of urgency, or a clearer path to
              monetization. Treat the result as a starting brief for validation, not a final
              verdict.
            </p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Common founder mistakes</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The usual mistakes are broad audience definitions, weak pricing logic, ignoring the
              real workaround, and overbuilding the MVP. Most low-signal ideas become stronger when
              the founder narrows the workflow and tests the promise manually first.
            </p>
          </article>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions about the SaaS idea validator"
              description="Use the report to guide the next conversation and experiment, not as a shortcut around validation."
            />
            <div className="mt-10">
              <FaqList items={toolFaqs} />
            </div>
          </div>
          <div className="space-y-6">
            <NewsletterForm
              source="tool-page"
              title="Save your report and get follow-up validation prompts"
              buttonLabel="Save report"
            />
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">Keep validating</h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                <li>
                  <Link href="/examples" className="text-accent hover:underline">
                    Compare with example reports
                  </Link>
                </li>
                <li>
                  <Link href="/blog/how-to-validate-a-saas-idea" className="text-accent hover:underline">
                    Read the SaaS validation guide
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-accent hover:underline">
                    Upgrade for saved reports and collaboration
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <MobileStickyCta />
    </main>
  );
}

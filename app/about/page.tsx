import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "About SaaS Idea Validator",
  description:
    "Learn why SaaS Idea Validator exists and how it helps founders validate startup ideas before spending months on the wrong build.",
  path: "/about",
  keywords: ["about saas idea validator", "startup idea validation tool", "founder validation framework"]
});

export default function AboutPage() {
  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" }
          ])}
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A validation tool built to stop founders from building blind"
              description="SaaS Idea Validator exists for one reason: most startup ideas do not fail because founders cannot build. They fail because founders build before they pressure-test the market."
            />
          </div>
          <div className="article-copy">
            <p>
              The product is designed for indie hackers, solo founders, and small product teams
              that need a faster way to evaluate whether an idea deserves more attention. Instead
              of producing vague inspiration, it forces clearer thinking around demand,
              competition, positioning, monetization, and the right next validation steps.
            </p>
            <p>
              The philosophy is simple: keep the first version honest, specific, and tied to real
              search intent. Great SaaS businesses usually start from a painful niche workflow, a
              reachable buyer, and a founder willing to validate manually before automating.
            </p>
          </div>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            ["Practical over hype", "Every report is meant to help a founder decide what to test next, not flatter the idea."],
            ["Specific beats broad", "The strongest ideas usually become stronger when the audience and problem get narrower."],
            ["Validation before velocity", "Shipping fast is useful only when you are shipping toward real demand."]
          ].map(([title, copy]) => (
            <article key={title} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">What founders should do next</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            If you have an idea already, use the validator. If you are still exploring, browse the
            example reports and blog guides first, then run your strongest concept through the
            framework.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/tool/saas-idea-validator">Validate My Idea</ButtonLink>
            <ButtonLink href="/examples" variant="secondary">
              See Example Reports
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

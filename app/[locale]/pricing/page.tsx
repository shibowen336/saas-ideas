import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { pricingFaqs } from "@/content/faq";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getUiCopy, isLocale, localizedStaticPath } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type PricingPageProps = {
  params: Promise<{ locale: string }>;
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For founders who need a fast first-pass validation report.",
    features: [
      "Core SaaS idea validation report",
      "Score breakdown across 6 dimensions",
      "Recommended niche angle and next-step plan",
      "Access to example reports and blog content"
    ]
  },
  {
    name: "Pro",
    price: "$24/mo",
    description: "For solo founders actively validating multiple concepts.",
    features: [
      "Everything in Free",
      "Saved reports and idea history",
      "Deeper report notes and reusable validation checklists",
      "Priority access to new examples and launch templates"
    ]
  },
  {
    name: "Studio",
    price: "$79/mo",
    description: "For agencies, venture studios, and small product teams reviewing multiple bets.",
    features: [
      "Everything in Pro",
      "Team seats and shared report access",
      "Founder workshop templates",
      "Priority support and roadmap feedback"
    ]
  }
];

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.pricing.title,
    description: copy.pageMeta.pricing.description,
    pathname: "/pricing",
    keywords: ["saas idea validator pricing", "startup idea validator pricing", "saas idea validation tool pricing"]
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: "Pricing", path: localizedStaticPath(resolvedLocale, "pricing") }
            ]),
            faqSchema(pricingFaqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: "Pricing", href: localizedStaticPath(resolvedLocale, "pricing") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing for founders validating before they build"
            description="Start free, then upgrade when you want saved reports, repeatable workflows, and shared access for a small team."
          />
        </div>
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.name} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{tier.name}</h2>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{tier.price}</p>
              <p className="mt-4 leading-7 text-slate-600">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                  {tier.name === "Free" ? "Start Free" : `Choose ${tier.name}`}
                </ButtonLink>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Pricing questions founders usually ask"
              description="Clear expectations help keep the purchase decision simple."
            />
            <div className="mt-10">
              <FaqList items={pricingFaqs} />
            </div>
          </div>
          <div>
            <NewsletterForm
              source={`pricing-${resolvedLocale}`}
              title="Get launch offers and pricing updates"
              buttonLabel="Join the list"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

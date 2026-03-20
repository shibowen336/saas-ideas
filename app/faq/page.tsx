import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { globalFaqs } from "@/content/faq";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about SaaS Idea Validator, idea scoring, report interpretation, and founder validation workflows.",
  path: "/faq",
  keywords: ["saas idea validator faq", "how to validate a saas idea", "startup idea validation faq"]
});

export default function FaqPage() {
  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" }
            ]),
            faqSchema(globalFaqs)
          ]}
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }]} />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions founders ask before validating a SaaS idea"
            description="The answers below cover how the scoring works, what the tool is useful for, and how to use the report without over-reading a single score."
          />
        </div>
        <section className="mt-12">
          <FaqList items={globalFaqs} />
        </section>
        <section className="mt-16 surface-card p-8">
          <h2 className="text-3xl font-semibold text-slate-950">Need more context?</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Explore the{" "}
            <Link href="/examples" className="text-accent hover:underline">
              example reports
            </Link>{" "}
            or read the{" "}
            <Link href="/blog/how-to-validate-a-saas-idea" className="text-accent hover:underline">
              detailed SaaS idea validation guide
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

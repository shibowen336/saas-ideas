import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { globalFaqs } from "@/content/faq";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FaqPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.faq.title,
    description: copy.pageMeta.faq.description,
    pathname: "/faq",
    keywords: ["saas idea validator faq", "how to validate a saas idea", "startup idea validation faq"]
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: "FAQ", path: localizedStaticPath(resolvedLocale, "faq") }
            ]),
            faqSchema(globalFaqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: "FAQ", href: localizedStaticPath(resolvedLocale, "faq") }
          ]}
        />
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
            <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
              example reports
            </Link>{" "}
            or read the{" "}
            <Link
              href={localizedPath(resolvedLocale, "/blog/how-to-validate-a-saas-idea")}
              className="text-accent hover:underline"
            >
              detailed SaaS idea validation guide
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

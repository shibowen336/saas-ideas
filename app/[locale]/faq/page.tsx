import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { getGlobalFaqs } from "@/content/faq";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

const faqPageCopy = {
  en: {
    eyebrow: "FAQ",
    title: "Questions founders ask before validating a SaaS idea",
    description:
      "The answers below cover how the scoring works, what the tool is useful for, and how to use the report without over-reading a single score.",
    moreTitle: "Need more context?",
    examplesLabel: "example reports",
    guideLabel: "detailed SaaS idea validation guide"
  },
  zh: {
    eyebrow: "常见问题",
    title: "创始人在验证 SaaS 想法前最常问的问题",
    description:
      "下面这些回答会解释评分是怎么来的、这个工具适合解决什么问题，以及为什么你不该把一项分数当成全部结论。",
    moreTitle: "还想继续看？",
    examplesLabel: "示例报告",
    guideLabel: "更完整的 SaaS 想法验证指南"
  }
} as const;

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
  const copy = faqPageCopy[resolvedLocale];
  const faqs = getGlobalFaqs(resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: resolvedLocale === "zh" ? "常见问题" : "FAQ", path: localizedStaticPath(resolvedLocale, "faq") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "常见问题" : "FAQ", href: localizedStaticPath(resolvedLocale, "faq") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>
        <section className="mt-12">
          <FaqList items={faqs} />
        </section>
        <section className="mt-16 surface-card p-8">
          <h2 className="text-3xl font-semibold text-slate-950">{copy.moreTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {resolvedLocale === "zh" ? "你可以先看看" : "Explore the"}{" "}
            <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
              {copy.examplesLabel}
            </Link>{" "}
            {resolvedLocale === "zh" ? "或者阅读" : "or read the"}{" "}
            <Link
              href={localizedPath(resolvedLocale, `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`)}
              className="text-accent hover:underline"
            >
              {copy.guideLabel}
            </Link>
            {resolvedLocale === "zh" ? "。" : "."}
          </p>
        </section>
      </div>
    </main>
  );
}

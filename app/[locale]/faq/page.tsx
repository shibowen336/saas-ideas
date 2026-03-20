import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
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
    moreDescription:
      "Start with the examples library or move into the full SaaS idea validation guide for a deeper founder workflow.",
    examplesCta: "See example reports",
    guideCta: "Read the full SaaS idea validation guide",
    home: "Home",
    faq: "FAQ"
  },
  zh: {
    eyebrow: "常见问题",
    title: "创始人在验证 SaaS 想法前最常问的问题",
    description:
      "下面这些回答会解释评分是怎么来的、这个工具适合解决什么问题，以及为什么你不该把一项分数当成全部结论。",
    moreTitle: "还想继续看？",
    moreDescription: "你可以先看示例报告，或者继续阅读更完整的 SaaS 想法验证指南。",
    examplesCta: "查看示例报告",
    guideCta: "阅读完整的 SaaS 想法验证指南",
    home: "首页",
    faq: "常见问题"
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
  const guideHref = localizedPath(
    resolvedLocale,
    `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
  );

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: copy.home, path: localizedStaticPath(resolvedLocale, "home") },
              { name: copy.faq, path: localizedStaticPath(resolvedLocale, "faq") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: copy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: copy.faq, href: localizedStaticPath(resolvedLocale, "faq") }
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
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.moreDescription}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")}>{copy.examplesCta}</ButtonLink>
            <ButtonLink href={guideHref} variant="secondary">
              {copy.guideCta}
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

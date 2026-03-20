import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug, getLocalizedBlogPost } from "@/content/blog-posts";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";

type BlogIndexPageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  en: {
    eyebrow: "Founder guides",
    title: "SaaS idea validation blog for founders",
    description:
      "Read practical guides on how to validate a SaaS idea, compare micro SaaS and AI SaaS opportunities, and test pricing before you build.",
    intro:
      "This blog is for indie hackers, solopreneurs, and early-stage SaaS founders who want clearer validation frameworks, sharper positioning, and more useful examples before they build.",
    support:
      "Start with the core guides below, then move into the validator and examples library when you are ready to score your own idea.",
    hubTitle: "Start with the core SaaS idea validation guides",
    archiveTitle: "Browse the full founder guide library",
    read: "Read the full guide",
    relatedTitle: "Move from research to validation",
    toolTitle: "Use the SaaS idea validation tool",
    toolCopy: "Generate a structured report with scores, risks, wedge ideas, and next validation steps.",
    examplesTitle: "Review SaaS idea validation examples",
    examplesCopy: "Compare real example reports before you pressure-test your own startup angle.",
    pricingTitle: "Learn SaaS pricing validation",
    pricingCopy: "Understand willingness to pay, pricing logic, and early packaging decisions."
  },
  zh: {
    eyebrow: "创始人指南",
    title: "面向创始人的 SaaS 想法验证博客",
    description:
      "阅读关于如何验证 SaaS 想法、比较 micro SaaS 和 AI SaaS 机会，以及在开发前测试定价的实用指南。",
    intro:
      "这个博客面向独立开发者、单人创始人和早期 SaaS 团队，帮助你在真正开始构建前获得更清晰的验证框架、更扎实的定位思路和更有用的示例。",
    support:
      "你可以先从下面的核心指南开始，再进入验证工具和示例库，进一步评估自己的想法。",
    hubTitle: "先读这些核心 SaaS 想法验证指南",
    archiveTitle: "浏览完整的创始人内容库",
    read: "阅读全文",
    relatedTitle: "从研究进入验证",
    toolTitle: "使用 SaaS 想法验证工具",
    toolCopy: "生成包含得分、风险、切口建议和下一步动作的结构化报告。",
    examplesTitle: "查看 SaaS 想法验证示例",
    examplesCopy: "先研究真实示例报告，再去评估你自己的方向。",
    pricingTitle: "学习 SaaS 定价验证",
    pricingCopy: "理解付费意愿、定价逻辑和早期套餐决策。"
  }
} as const;

export async function generateMetadata({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    absoluteTitle: copy.pageMeta.blog.title,
    title: copy.pageMeta.blog.title,
    description: copy.pageMeta.blog.description,
    pathname: "/blog"
  });
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = pageCopy[resolvedLocale];
  const formattedLocale = resolvedLocale === "zh" ? "zh-CN" : "en-US";

  const contentHubs = [
    "how-to-validate-a-saas-idea",
    "saas-idea-validation-checklist",
    "micro-saas-ideas",
    "ai-saas-ideas",
    "saas-pricing-validation"
  ]
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<(typeof blogPosts)[number]> => Boolean(post));

  const pricingHub = contentHubs.find((post) => post.slug === "saas-pricing-validation") ?? blogPosts[0];

  const blogListItems = blogPosts.map((post) => ({
    name: getLocalizedBlogPost(post, resolvedLocale).title,
    url: localizedPath(resolvedLocale, `/blog/${getBlogPostSlug(resolvedLocale, post)}`)
  }));

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: resolvedLocale === "zh" ? "博客" : "Blog", path: localizedStaticPath(resolvedLocale, "blog") }
            ]),
            itemListSchema(blogListItems)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "博客" : "Blog", href: localizedStaticPath(resolvedLocale, "blog") }
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{copy.description}</p>
          <p className="mt-6 article-copy">{copy.intro}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {copy.support}{" "}
            <Link href={localizedStaticPath(resolvedLocale, "tool")} className="text-accent hover:underline">
              {resolvedLocale === "zh" ? "开始验证你的 SaaS 想法" : "Use the SaaS idea validation tool"}
            </Link>{" "}
            {resolvedLocale === "zh" ? "或先查看" : "or review"}{" "}
            <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
              {resolvedLocale === "zh" ? "示例报告" : "SaaS idea validation examples"}
            </Link>
            .
          </p>
        </div>

        <section className="mt-12">
          <SectionHeading title={copy.hubTitle} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {contentHubs.map((post) => {
              const localizedPost = getLocalizedBlogPost(post, resolvedLocale);

              return (
                <Link
                  key={post.slug}
                  href={localizedPath(resolvedLocale, `/blog/${getBlogPostSlug(resolvedLocale, post)}`)}
                  className="surface-card p-6 transition hover:-translate-y-0.5 hover:border-accent"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {localizedPost.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">{localizedPost.title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{localizedPost.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading title={copy.archiveTitle} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => {
              const localizedPost = getLocalizedBlogPost(post, resolvedLocale);
              const localizedSlug = getBlogPostSlug(resolvedLocale, post);
              const formattedDate = new Intl.DateTimeFormat(formattedLocale, {
                dateStyle: "long"
              }).format(new Date(localizedPost.publishedTime));

              return (
                <article key={post.slug} className="surface-card p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {localizedPost.category}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                    <Link href={localizedPath(resolvedLocale, `/blog/${localizedSlug}`)} className="hover:text-accent">
                      {localizedPost.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-slate-500">
                    {formattedDate}
                    {" • "}
                    {localizedPost.readingTime}
                  </p>
                  <p className="mt-4 leading-7 text-slate-600">{localizedPost.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {localizedPost.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <ButtonLink href={localizedPath(resolvedLocale, `/blog/${localizedSlug}`)} variant="secondary">
                      {copy.read}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{copy.relatedTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href={localizedStaticPath(resolvedLocale, "tool")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{copy.toolTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy.toolCopy}</p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "examples")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{copy.examplesTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy.examplesCopy}</p>
            </Link>
            <Link
              href={localizedPath(resolvedLocale, `/blog/${getBlogPostSlug(resolvedLocale, pricingHub)}`)}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{copy.pricingTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy.pricingCopy}</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug, getLocalizedBlogPost } from "@/content/blog-posts";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type BlogIndexPageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  en: {
    eyebrow: "Content hub",
    title: "SaaS idea validation guides, examples, and founder research content",
    description:
      "Use the blog to learn how to validate a SaaS idea, compare micro SaaS ideas, explore AI SaaS angles, and pressure-test pricing before you build.",
    intro:
      "This blog supports both informational and commercial search intent. Founders can move from educational guides into the tool, the example report library, and focused validation pages without losing context.",
    hubTitle: "Core content hubs",
    read: "Read founder guide",
    relatedTitle: "Keep exploring the validation workflow",
    toolTitle: "Validate a SaaS idea",
    toolCopy: "Run the main tool and get a structured startup idea scoring report.",
    examplesTitle: "Study SaaS idea validation examples",
    examplesCopy: "Compare realistic example reports before you evaluate your own angle.",
    pricingTitle: "Learn SaaS pricing validation",
    pricingCopy: "Read how to validate pricing, willingness to pay, and packaging logic early."
  },
  zh: {
    eyebrow: "内容枢纽",
    title: "SaaS 想法验证指南、示例和创始人研究内容",
    description:
      "通过博客学习如何验证 SaaS 想法、比较 micro SaaS 方向、评估 AI SaaS 机会，并在开发前验证定价。",
    intro:
      "这个博客不是松散文章列表，而是围绕验证流程组织的内容枢纽。创始人可以从指南进入工具、示例报告和细分验证页面，逐步推进判断。",
    hubTitle: "核心内容主题",
    read: "阅读这篇指南",
    relatedTitle: "继续推进你的验证流程",
    toolTitle: "验证 SaaS 想法",
    toolCopy: "使用主工具生成一份结构化创业想法评分报告。",
    examplesTitle: "查看 SaaS 想法验证示例",
    examplesCopy: "先研究真实示例报告，再评估你自己的方向。",
    pricingTitle: "学习 SaaS 定价验证",
    pricingCopy: "了解如何更早验证价格、付费意愿和套餐逻辑。"
  }
} as const;

export async function generateMetadata({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.blog.title,
    description: copy.pageMeta.blog.description,
    pathname: "/blog",
    keywords: [
      "how to validate a saas idea",
      "saas idea validation blog",
      "micro saas ideas",
      "ai saas ideas",
      "saas pricing validation"
    ]
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

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
            { name: resolvedLocale === "zh" ? "博客" : "Blog", path: localizedStaticPath(resolvedLocale, "blog") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "博客" : "Blog", href: localizedStaticPath(resolvedLocale, "blog") }
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <p className="mt-6 article-copy">{copy.intro}</p>
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

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
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
                  {" · "}
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

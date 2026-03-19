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

export async function generateMetadata({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.blog.title,
    description: copy.pageMeta.blog.description,
    pathname: "/blog",
    keywords: ["saas idea blog", "how to validate a saas idea", "micro saas ideas", "ai saas ideas"]
  });
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          blog: "博客",
          eyebrow: "博客",
          title: "帮助创始人验证并收窄 SaaS 想法的内容",
          description: "这些内容以真实搜索意图为基础，提供实操指南、案例和想法清单，而不是薄弱的 SEO 填充页。",
          read: "阅读文章",
          related: "继续探索相关验证路径",
          toolTitle: "使用工具",
          toolCopy: "给你自己的想法生成一份结构化报告。",
          examplesTitle: "研究示例",
          examplesCopy: "先看真实感更强的报告，再评估你自己的方向。",
          pricingTitle: "比较方案",
          pricingCopy: "查看哪个方案更适合你的阶段和工作流。"
        }
      : {
          home: "Home",
          blog: "Blog",
          eyebrow: "Blog",
          title: "Founder-focused content for validating and narrowing SaaS ideas",
          description: "Practical guides, examples, and idea lists built around real search intent instead of thin SEO filler.",
          read: "Read article",
          related: "Explore related validation paths",
          toolTitle: "Use the tool",
          toolCopy: "Generate a structured report for your own idea.",
          examplesTitle: "Study examples",
          examplesCopy: "Review realistic reports before you evaluate your own.",
          pricingTitle: "Compare plans",
          pricingCopy: "See which plan fits your stage and workflow."
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            { name: pageCopy.blog, path: localizedStaticPath(resolvedLocale, "blog") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: pageCopy.blog, href: localizedStaticPath(resolvedLocale, "blog") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow={pageCopy.eyebrow}
            title={pageCopy.title}
            description={pageCopy.description}
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => {
            const localizedPost = getLocalizedBlogPost(post, resolvedLocale);
            const localizedSlug = getBlogPostSlug(resolvedLocale, post);
            const formattedDate = new Intl.DateTimeFormat(resolvedLocale === "zh" ? "zh-CN" : "en-US", {
              dateStyle: "long"
            }).format(new Date(localizedPost.publishedTime));

            return (
              <article key={post.slug} className="surface-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {localizedPost.category}
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                  <Link
                    href={localizedPath(resolvedLocale, `/blog/${localizedSlug}`)}
                    className="hover:text-accent"
                  >
                    {localizedPost.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  {formattedDate} · {localizedPost.readingTime}
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
                    {pageCopy.read}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.related}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href={localizedStaticPath(resolvedLocale, "tool")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.toolTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pageCopy.toolCopy}</p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "examples")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.examplesTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pageCopy.examplesCopy}</p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "pricing")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.pricingTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pageCopy.pricingCopy}</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

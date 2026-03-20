import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug, getLocalizedBlogPost } from "@/content/blog-posts";
import {
  getLocalizedProgrammaticPage,
  getProgrammaticPageByLocaleSlug,
  getProgrammaticPageSlug,
  programmaticPages
} from "@/content/programmatic-pages";
import { isLocale, locales, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type ProgrammaticPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    programmaticPages.map((page) => ({ locale, slug: getProgrammaticPageSlug(locale, page) }))
  );
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = getProgrammaticPageByLocaleSlug(resolvedLocale, slug);

  if (!page) {
    return createLocalizedMetadata({
      locale: resolvedLocale,
      title: "Page not found",
      description: "The requested page could not be found.",
      pathname: `/programmatic/${slug}`,
      noIndex: true
    });
  }

  const localizedPage = getLocalizedProgrammaticPage(page, resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: localizedPage.title,
    description: localizedPage.description,
    pathnames: {
      en: localizedPath("en", `/programmatic/${getProgrammaticPageSlug("en", page)}`),
      zh: localizedPath("zh", `/programmatic/${getProgrammaticPageSlug("zh", page)}`)
    },
    keywords: [localizedPage.h1.toLowerCase(), "validate saas idea", "startup idea validation"]
  });
}

function getRelatedBlogPostSlug(pageSlug: string) {
  if (pageSlug.includes("ai")) {
    return "ai-saas-ideas";
  }

  if (pageSlug.includes("recruit")) {
    return "micro-saas-ideas";
  }

  if (pageSlug.includes("account")) {
    return "saas-pricing-validation";
  }

  return "how-to-validate-a-saas-idea";
}

export default async function ProgrammaticPage({ params }: ProgrammaticPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = getProgrammaticPageByLocaleSlug(resolvedLocale, slug);

  if (!page) {
    notFound();
  }

  const localizedPage = getLocalizedProgrammaticPage(page, resolvedLocale);
  const relatedBlog = blogPosts.find((post) => post.slug === getRelatedBlogPostSlug(page.slug));
  const localizedRelatedBlog = relatedBlog
    ? getLocalizedBlogPost(relatedBlog, resolvedLocale)
    : null;
  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          eyebrow: "细分验证页面",
          useTool: "使用验证工具",
          examples: "查看示例报告",
          painPoints: "关键痛点",
          ideaExamples: "示例想法",
          framework: "验证框架",
          whyThisPageTitle: "这个细分方向为什么值得单独分析",
          whyThisPageBody:
            "这类页面不是为了堆关键词，而是为了把某个买家、行业或创业类型的验证难点拆开讲清楚，让创始人知道应该先验证什么。",
          relatedTitle: "继续深入相关资源",
          relatedGuide: "阅读相关验证指南",
          relatedExamples: "对照 SaaS 想法验证示例",
          relatedTool: "把你的想法放进主工具里评分"
        }
      : {
          home: "Home",
          eyebrow: "Focused validation page",
          useTool: "Use the validator",
          examples: "See example reports",
          painPoints: "Key pain points",
          ideaExamples: "Example ideas",
          framework: "Validation framework",
          whyThisPageTitle: "Why this niche deserves a dedicated validation page",
          whyThisPageBody:
            "This page exists to unpack the validation problems that are specific to one buyer type, one industry, or one startup angle. The goal is to make the guidance more useful than a generic landing page.",
          relatedTitle: "Continue with related validation resources",
          relatedGuide: "Read the related validation guide",
          relatedExamples: "Compare SaaS idea validation examples",
          relatedTool: "Score your own idea in the main tool"
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            {
              name: localizedPage.h1,
              path: localizedPath(resolvedLocale, `/programmatic/${localizedPage.slug}`)
            }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            {
              label: localizedPage.h1,
              href: localizedPath(resolvedLocale, `/programmatic/${localizedPage.slug}`)
            }
          ]}
        />

        <article className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-slate-950">
              {localizedPage.h1}
            </h1>
            <div className="article-copy mt-6">
              {localizedPage.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{localizedPage.ctaTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{localizedPage.ctaCopy}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                  {pageCopy.useTool}
                </ButtonLink>
                <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                  {pageCopy.examples}
                </ButtonLink>
              </div>
            </div>

            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.whyThisPageTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{pageCopy.whyThisPageBody}</p>
            </div>
          </div>
        </article>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.painPoints}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {localizedPage.painPoints.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.ideaExamples}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {localizedPage.exampleIdeas.map((idea) => (
                <li key={idea}>- {idea}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.framework}</h2>
            <ol className="mt-4 space-y-3 text-slate-700">
              {localizedPage.validationFramework.map((step, index) => (
                <li key={step}>
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className="mt-12 surface-card p-8">
          <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.relatedTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href={localizedPath(
                resolvedLocale,
                `/blog/${getBlogPostSlug(resolvedLocale, relatedBlog ?? blogPosts[0])}`
              )}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.relatedGuide}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {localizedRelatedBlog?.title ?? ""}
              </p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "examples")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.relatedExamples}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {resolvedLocale === "zh"
                  ? "查看可索引的示例报告，理解不同方向为什么会拿到不同建议。"
                  : "Review indexable example reports to see why different startup ideas earn different recommendations."}
              </p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "tool")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">{pageCopy.relatedTool}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {resolvedLocale === "zh"
                  ? "把你的行业或细分想法放进主工具，用统一框架评估需求、竞争和变现。"
                  : "Run your own niche or industry angle through the main tool using the same demand, competition, and monetization framework."}
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

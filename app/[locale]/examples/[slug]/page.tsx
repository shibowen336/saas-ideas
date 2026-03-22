import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import {
  exampleReports,
  getExampleReportByLocaleSlug,
  getExampleReportSlug,
  getLocalizedExampleReport
} from "@/content/example-reports";
import { getUiCopy, isLocale, locales, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type ExampleDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const copy = {
  en: {
    home: "Home",
    examples: "SaaS Idea Validation Examples",
    targetContext: "Target buyer and problem",
    overall: "Overall score",
    problem: "Problem urgency",
    audience: "Audience clarity",
    competition: "Competition pressure",
    monetization: "Monetization",
    mvp: "MVP simplicity",
    gtm: "Go-to-market ease",
    summaryTitle: "Why this example matters",
    pricingIdea: "Pricing idea",
    alternatives: "Current alternatives",
    verdict: "Verdict",
    positioning: "Positioning statement",
    headline: "Sample landing page headline",
    niche: "Recommended niche angle",
    nextPlan: "Next-step validation plan",
    risks: "Risks to watch",
    relatedTitle: "Use this example to evaluate your own idea",
    relatedBody:
      "Once you understand why this idea scored the way it did, run the same framework on your own SaaS angle, then compare the result with the examples library and the core validation guide.",
    relatedPrimary: "Run the SaaS idea validator",
    relatedSecondary: "Browse more example reports",
    relatedGuide: "Read how to validate a SaaS idea"
  },
  zh: {
    home: "首页",
    examples: "SaaS 想法验证示例",
    targetContext: "目标买家与问题",
    overall: "综合得分",
    problem: "问题紧迫度",
    audience: "受众清晰度",
    competition: "竞争压力",
    monetization: "变现潜力",
    mvp: "MVP 简洁度",
    gtm: "获客可行性",
    summaryTitle: "为什么这个示例值得研究",
    pricingIdea: "定价思路",
    alternatives: "当前替代方案",
    verdict: "结论",
    positioning: "定位语句",
    headline: "示例落地页标题",
    niche: "推荐切口",
    nextPlan: "下一步验证计划",
    risks: "需要关注的风险",
    relatedTitle: "用这个示例反过来评估你的想法",
    relatedBody:
      "看懂这个方向为什么这样得分之后，再用同一套框架评估你自己的 SaaS 想法，并与更多示例和核心验证指南交叉对照。",
    relatedPrimary: "运行 SaaS 想法验证工具",
    relatedSecondary: "查看更多示例报告",
    relatedGuide: "阅读如何验证 SaaS 想法"
  }
} as const;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    exampleReports.map((report) => ({ locale, slug: getExampleReportSlug(locale, report) }))
  );
}

export async function generateMetadata({ params }: ExampleDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const report = getExampleReportByLocaleSlug(resolvedLocale, slug);

  if (!report) {
    return createLocalizedMetadata({
      locale: resolvedLocale,
      title: "Example not found",
      description: "The requested example report could not be found.",
      pathname: `/examples/${slug}`,
      noIndex: true
    });
  }

  const localizedReport = getLocalizedExampleReport(report, resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: `${localizedReport.idea} Example Report`,
    description: localizedReport.summary,
    pathnames: {
      en: localizedPath("en", `/examples/${getExampleReportSlug("en", report)}`),
      zh: localizedPath("zh", `/examples/${getExampleReportSlug("zh", report)}`)
    },
    keywords: [
      localizedReport.category.toLowerCase(),
      "saas idea validation examples",
      "startup idea scoring examples"
    ],
    type: "article"
  });
}

export default async function ExampleDetailPage({ params }: ExampleDetailPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const report = getExampleReportByLocaleSlug(resolvedLocale, slug);

  if (!report) {
    notFound();
  }

  const page = copy[resolvedLocale];
  const localizedReport = getLocalizedExampleReport(report, resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const detailPath = localizedPath(resolvedLocale, `/examples/${localizedReport.slug}`);

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            articleSchema({
              locale: resolvedLocale,
              title: `${localizedReport.idea} Example Report`,
              description: localizedReport.summary,
              path: detailPath
            }),
            breadcrumbSchema([
              { name: page.home, path: localizedStaticPath(resolvedLocale, "home") },
              { name: page.examples, path: localizedStaticPath(resolvedLocale, "examples") },
              { name: localizedReport.idea, path: detailPath }
            ])
          ]}
        />
        <Breadcrumbs
          items={[
            { label: page.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: page.examples, href: localizedStaticPath(resolvedLocale, "examples") },
            { label: localizedReport.idea, href: detailPath }
          ]}
        />

        <article className="mt-8">
          <header className="grid gap-8 lg:grid-cols-[1fr_0.32fr]">
            <div className="surface-card p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {localizedReport.category}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {localizedReport.idea}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">{localizedReport.summary}</p>
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.75rem] bg-sand p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {page.targetContext}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-700">
                    {localizedReport.targetCustomer}. {localizedReport.problem}
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {page.summaryTitle}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-700">{localizedReport.verdict}</p>
                </div>
              </div>
            </div>

            <div className="surface-card p-8 text-center">
              <p className="text-sm font-medium text-slate-500">{page.overall}</p>
              <p className="mt-3 text-6xl font-semibold tracking-tight text-slate-950">
                {localizedReport.overallScore}
              </p>
              <p className="mt-2 text-sm text-slate-500">/100</p>
            </div>
          </header>

          <section className="mt-10">
            <ScoreGrid
              locale={resolvedLocale}
              scores={[
                { label: page.problem, score: localizedReport.problemUrgencyScore, tone: "positive" },
                { label: page.audience, score: localizedReport.audienceClarityScore, tone: "positive" },
                { label: page.competition, score: localizedReport.competitionPressure, tone: "warning" },
                { label: page.monetization, score: localizedReport.monetizationPotential, tone: "positive" },
                { label: page.mvp, score: localizedReport.mvpSimplicity },
                { label: page.gtm, score: localizedReport.goToMarketEase }
              ]}
            />
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {page.pricingIdea}
                </p>
                <p className="mt-4 leading-7 text-slate-700">{localizedReport.pricingIdea}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {page.alternatives}
                </p>
                <p className="mt-4 leading-7 text-slate-700">{localizedReport.currentAlternatives}</p>
              </div>
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {page.positioning}
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  {localizedReport.samplePositioningStatement}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {page.headline}
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  {localizedReport.sampleLandingPageHeadline}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {localizedReport.longFormInsights.map((insight) => (
                <section key={insight.title} className="rounded-[1.75rem] border border-slate-200 p-6">
                  <h2 className="text-2xl font-semibold text-slate-950">{insight.title}</h2>
                  {insight.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{page.verdict}</h2>
              <p className="mt-4 leading-7 text-slate-600">{localizedReport.verdict}</p>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{page.niche}</h2>
              <p className="mt-4 leading-7 text-slate-600">{localizedReport.recommendedNicheAngle}</p>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{page.risks}</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {localizedReport.risks.map((risk) => (
                  <li key={risk}>- {risk}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[1.75rem] border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{page.nextPlan}</h2>
              <ol className="mt-4 space-y-3 text-slate-700">
                {localizedReport.nextStepValidationPlan.map((step, index) => (
                  <li key={step}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-3xl font-semibold text-slate-950">{page.relatedTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{page.relatedBody}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                  {page.relatedPrimary}
                </ButtonLink>
                <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                  {page.relatedSecondary}
                </ButtonLink>
                <ButtonLink
                  href={localizedPath(
                    resolvedLocale,
                    `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
                  )}
                  variant="secondary"
                >
                  {page.relatedGuide}
                </ButtonLink>
              </div>
            </article>
          </section>
        </article>
      </div>
    </main>
  );
}

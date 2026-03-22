import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import {
  exampleReports,
  getExampleReportSlug,
  getLocalizedExampleReport
} from "@/content/example-reports";
import { getProgrammaticPageSlug, programmaticPages } from "@/content/programmatic-pages";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";

type ExamplesPageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    eyebrow: "Examples library",
    title: "SaaS idea validation examples and startup idea scoring examples",
    description:
      "Study SaaS idea validation examples, startup idea scoring examples, and founder-style reports for micro SaaS, AI SaaS, ecommerce SaaS, and vertical SaaS ideas.",
    intro:
      "This page is for founders comparing different SaaS startup angles before they build. Each example shows how one idea scores, where the risks sit, what niche wedge looks strongest, and what should be validated next.",
    support:
      "Use these reports to compare ideas, then run your own SaaS idea through the validator to see which direction deserves deeper validation.",
    supportPrimary: "Validate a SaaS idea now",
    supportSecondary: "Read the validation guide",
    detailCta: "Read the full example report",
    clusterEyebrow: "Browse by intent",
    clusterTitle: "Browse SaaS idea examples by category and validation intent",
    overall: "Overall score",
    problem: "Problem urgency",
    audience: "Audience clarity",
    competition: "Competition pressure",
    monetization: "Monetization",
    mvp: "MVP simplicity",
    gtm: "Go-to-market ease",
    positioning: "Positioning statement",
    niche: "Recommended niche angle",
    nextPlan: "Next-step validation plan",
    risks: "Risks to watch",
    reportContext: "Target buyer and problem",
    related: "Related resources",
    relatedTool: "Validate a SaaS idea with the tool",
    relatedGuide: "Read the SaaS idea validation guide",
    relatedPricing: "Learn how to validate SaaS pricing",
    relatedBody:
      "After reviewing the example, use the tool, validation guide, and pricing guide together to compare your own idea against the same criteria.",
    finalTitle: "Ready to compare your own SaaS idea against these examples?",
    finalBody:
      "Run the validator, then compare your score, wedge, and next-step plan with these example reports before you spend more time building.",
    finalPrimary: "Run my SaaS idea through the validator",
    finalSecondary: "Read how to validate a SaaS idea",
    home: "Home",
    examples: "SaaS Idea Validation Examples"
  },
  zh: {
    eyebrow: "示例库",
    title: "帮助创始人比较不同方向的 SaaS 想法验证示例",
    description:
      "查看更真实、更具体的 SaaS 想法验证示例，了解不同方向在需求、竞争、受众清晰度、变现和 MVP 范围上的差异。",
    intro:
      "这些示例报告本身就是有用内容，而不只是占位卡片。每一份都会解释为什么这个方向有吸引力、风险在哪里、切口应该如何收窄，以及下一步该做什么验证。",
    support:
      "先用这些报告对比方向，再把你自己的 SaaS 想法放进验证工具，看看哪个方向更值得继续推进。",
    supportPrimary: "现在就开始验证",
    supportSecondary: "阅读验证指南",
    detailCta: "阅读完整示例报告",
    clusterEyebrow: "按研究意图浏览",
    clusterTitle: "从你正在研究的 SaaS 方向进入对应内容",
    overall: "综合得分",
    problem: "问题紧迫度",
    audience: "受众清晰度",
    competition: "竞争压力",
    monetization: "变现潜力",
    mvp: "MVP 简洁度",
    gtm: "获客可行性",
    positioning: "定位语句",
    niche: "推荐切口",
    nextPlan: "下一步验证计划",
    risks: "需要关注的风险",
    reportContext: "目标买家与问题",
    related: "相关资源",
    relatedTool: "用工具验证你的 SaaS 想法",
    relatedGuide: "阅读 SaaS 想法验证指南",
    relatedPricing: "学习如何验证 SaaS 定价",
    relatedBody: "看完这份示例后，继续用工具、验证指南和定价内容交叉判断，路径会更清楚。",
    finalTitle: "准备把自己的想法和这些示例对照了吗？",
    finalBody: "先跑一份报告，再把你的得分、切口和这些示例做对照，然后再决定是否继续投入开发。",
    finalPrimary: "验证我的 SaaS 想法",
    finalSecondary: "阅读如何验证 SaaS 想法",
    home: "首页",
    examples: "SaaS 想法验证示例"
  }
} as const;

export async function generateMetadata({ params }: ExamplesPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const ui = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    absoluteTitle: ui.pageMeta.examples.title,
    title: ui.pageMeta.examples.title,
    description: ui.pageMeta.examples.description,
    pathname: "/examples"
  });
}

export default async function ExamplesPage({ params }: ExamplesPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = copy[resolvedLocale];
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const pricingGuide = blogPosts.find((post) => post.slug === "saas-pricing-validation");
  const aiIdeasGuide = blogPosts.find((post) => post.slug === "ai-saas-ideas");
  const microIdeasGuide = blogPosts.find((post) => post.slug === "micro-saas-ideas");
  const accountantIdeasPage = programmaticPages.find((entry) => entry.slug === "industry-saas-ideas-for-accountants");

  const clusterLinks = [
    {
      title: resolvedLocale === "zh" ? "AI SaaS 验证示例" : "AI SaaS validation examples",
      body:
        resolvedLocale === "zh"
          ? "查看 AI 工作流产品应该如何验证买家、信任和竞争。"
          : "Explore how AI workflow ideas should be validated for trust, buyer clarity, and competition.",
      href: localizedPath(
        resolvedLocale,
        `/blog/${aiIdeasGuide ? getBlogPostSlug(resolvedLocale, aiIdeasGuide) : "ai-saas-ideas"}`
      )
    },
    {
      title: resolvedLocale === "zh" ? "Micro SaaS 想法示例" : "Micro SaaS idea validation examples",
      body:
        resolvedLocale === "zh"
          ? "从更窄、更容易验证的工作流切口开始。"
          : "Start with narrower, easier-to-validate workflow ideas and founder-friendly wedges.",
      href: localizedPath(
        resolvedLocale,
        `/blog/${microIdeasGuide ? getBlogPostSlug(resolvedLocale, microIdeasGuide) : "micro-saas-ideas"}`
      )
    },
    {
      title: resolvedLocale === "zh" ? "垂直 SaaS 想法" : "Vertical SaaS ideas",
      body:
        resolvedLocale === "zh"
          ? "进入行业型 SaaS 切口，理解工作流、买家和商业路径。"
          : "See how industry-specific SaaS ideas differ by workflow, buyer, and commercial path.",
      href: localizedPath(
        resolvedLocale,
        `/programmatic/${accountantIdeasPage ? getProgrammaticPageSlug(resolvedLocale, accountantIdeasPage) : "industry-saas-ideas-for-accountants"}`
      )
    },
    {
      title: resolvedLocale === "zh" ? "电商 SaaS 验证示例" : "Ecommerce SaaS validation examples",
      body:
        resolvedLocale === "zh"
          ? "对照电商 SaaS 在需求、变现和分发上的强弱。"
          : "Compare ecommerce SaaS ideas where demand, monetization, and distribution are easier to pressure-test.",
      href: localizedPath(
        resolvedLocale,
        `/examples/${getExampleReportSlug(
          resolvedLocale,
          exampleReports.find((report) => report.slug === "shopify-onboarding-assistant") ?? exampleReports[0]
        )}`
      )
    },
    {
      title: resolvedLocale === "zh" ? "SaaS 想法评分示例" : "SaaS idea scoring examples",
      body:
        resolvedLocale === "zh"
          ? "直接查看完整评分报告，理解不同方向为什么得分不同。"
          : "Review full scoring reports to see why different startup ideas earn different recommendations.",
      href: localizedPath(
        resolvedLocale,
        `/examples/${getExampleReportSlug(resolvedLocale, exampleReports[0])}`
      )
    }
  ];

  const exampleListItems = exampleReports.map((report) => ({
    name: getLocalizedExampleReport(report, resolvedLocale).idea,
    url: localizedPath(resolvedLocale, `/examples/${getExampleReportSlug(resolvedLocale, report)}`)
  }));

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: page.home, path: localizedStaticPath(resolvedLocale, "home") },
              { name: page.examples, path: localizedStaticPath(resolvedLocale, "examples") }
            ]),
            itemListSchema(exampleListItems)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: page.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: page.examples, href: localizedStaticPath(resolvedLocale, "examples") }
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{page.eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{page.description}</p>
          <p className="mt-6 article-copy">{page.intro}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">{page.support}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{page.supportPrimary}</ButtonLink>
            <ButtonLink
              href={localizedPath(
                resolvedLocale,
                `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
              )}
              variant="secondary"
            >
              {page.supportSecondary}
            </ButtonLink>
          </div>
        </div>

        <section className="mt-12">
          <SectionHeading eyebrow={page.clusterEyebrow} title={page.clusterTitle} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {clusterLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="surface-card p-6 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <div id="examples-list" className="mt-12 space-y-10">
          {exampleReports.map((report) => {
            const localizedReport = getLocalizedExampleReport(report, resolvedLocale);
            const reportHref = localizedPath(
              resolvedLocale,
              `/examples/${getExampleReportSlug(resolvedLocale, report)}`
            );

            return (
              <article key={report.slug} id={report.slug} className="surface-card overflow-hidden scroll-mt-28">
                <div className="border-b border-slate-200 bg-white px-8 py-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        {localizedReport.category}
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                        <Link href={reportHref} className="hover:text-accent">
                          {localizedReport.idea}
                        </Link>
                      </h2>
                      <p className="mt-4 text-base leading-7 text-slate-600">
                        <span className="font-semibold text-slate-950">{page.reportContext}:</span>{" "}
                        {localizedReport.targetCustomer}. {localizedReport.problem}
                      </p>
                      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{localizedReport.summary}</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-slate-950 px-6 py-5 text-white">
                      <p className="text-sm font-medium text-slate-300">{page.overall}</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">{localizedReport.overallScore}/100</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
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

                  <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="space-y-6">
                      <div className="rounded-[1.75rem] bg-sand p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{page.positioning}</p>
                        <p className="mt-4 text-lg leading-8 text-slate-700">{localizedReport.samplePositioningStatement}</p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{page.niche}</p>
                        <p className="mt-4 leading-7 text-slate-700">{localizedReport.recommendedNicheAngle}</p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <h3 className="text-xl font-semibold text-slate-950">{page.nextPlan}</h3>
                        <ul className="mt-4 space-y-3 text-slate-700">
                          {localizedReport.nextStepValidationPlan.map((step) => (
                            <li key={step}>- {step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {localizedReport.longFormInsights.map((insight) => (
                        <section key={insight.title} className="rounded-[1.75rem] border border-slate-200 p-6">
                          <h3 className="text-2xl font-semibold text-slate-950">{insight.title}</h3>
                          {insight.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                              {paragraph}
                            </p>
                          ))}
                        </section>
                      ))}
                      <section className="rounded-[1.75rem] border border-slate-200 p-6">
                        <h3 className="text-2xl font-semibold text-slate-950">{page.risks}</h3>
                        <ul className="mt-4 space-y-3 text-slate-700">
                          {localizedReport.risks.map((risk) => (
                            <li key={risk}>- {risk}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.75rem] border border-slate-200 p-6">
                    <h3 className="text-xl font-semibold text-slate-950">{page.related}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{page.relatedBody}</p>
                    <div className="mt-6 flex flex-col gap-3">
                      <ButtonLink href={reportHref} variant="secondary">
                        {page.detailCta}
                      </ButtonLink>
                      <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{page.relatedTool}</ButtonLink>
                      <ButtonLink
                        href={localizedPath(
                          resolvedLocale,
                          `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
                        )}
                        variant="secondary"
                      >
                        {page.relatedGuide}
                      </ButtonLink>
                      <ButtonLink
                        href={localizedPath(
                          resolvedLocale,
                          `/blog/${pricingGuide ? getBlogPostSlug(resolvedLocale, pricingGuide) : "saas-pricing-validation"}`
                        )}
                        variant="secondary"
                      >
                        {page.relatedPricing}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{page.finalTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.finalBody}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{page.finalPrimary}</ButtonLink>
            <ButtonLink
              href={localizedPath(
                resolvedLocale,
                `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
              )}
              variant="secondary"
            >
              {page.finalSecondary}
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { exampleReports, getLocalizedExampleReport } from "@/content/example-reports";
import { getProgrammaticPageSlug, programmaticPages } from "@/content/programmatic-pages";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";

type ExamplesPageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  en: {
    eyebrow: "Examples library",
    title: "SaaS idea validation examples for founders comparing different startup angles",
    description:
      "Study realistic SaaS idea validation examples to see how different startup ideas score across demand, competition, audience clarity, monetization, and MVP scope before you build.",
    intro:
      "These example reports are meant to be useful on their own. Each one explains what makes the idea attractive, where the risks sit, how the wedge could be sharpened, and what the next validation tests should look like.",
    clusterEyebrow: "Browse by intent",
    clusterTitle: "Jump to the type of SaaS idea you are researching",
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
    related: "Related resources",
    relatedTool: "Validate a SaaS idea with the tool",
    relatedGuide: "Read the SaaS idea validation guide",
    relatedPricing: "Learn how to validate SaaS pricing",
    finalTitle: "Ready to compare your own idea against these examples?",
    finalBody:
      "Run the tool, then compare your score and wedge with these example reports before you spend more time building.",
    finalPrimary: "Validate my SaaS idea",
    finalSecondary: "Compare pricing"
  },
  zh: {
    eyebrow: "示例库",
    title: "帮助创始人比较不同创业方向的 SaaS 想法验证示例",
    description:
      "查看真实感更强的 SaaS 想法验证示例，了解不同创业方向在需求、竞争、受众清晰度、变现和 MVP 范围上的差异。",
    intro:
      "这些示例报告本身就是有用内容，而不只是占位卡片。每一份都解释了为什么这个方向有吸引力、风险在哪里、切口应该如何收窄，以及下一步该做什么验证。",
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
    related: "相关资源",
    relatedTool: "用工具验证你的 SaaS 想法",
    relatedGuide: "阅读 SaaS 想法验证指南",
    relatedPricing: "学习如何验证 SaaS 定价",
    finalTitle: "准备把自己的想法和这些示例对照了吗？",
    finalBody:
      "先跑一份报告，再把你的得分、切口和这些示例做对照，然后再决定是否继续投入开发。",
    finalPrimary: "验证我的 SaaS 想法",
    finalSecondary: "查看定价"
  }
} as const;

export async function generateMetadata({ params }: ExamplesPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.examples.title,
    description: copy.pageMeta.examples.description,
    pathname: "/examples",
    keywords: [
      "saas idea validation examples",
      "startup idea scoring examples",
      "micro saas idea validation examples"
    ]
  });
}

export default async function ExamplesPage({ params }: ExamplesPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = pageCopy[resolvedLocale];
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const pricingGuide = blogPosts.find((post) => post.slug === "saas-pricing-validation");
  const aiIdeasGuide = blogPosts.find((post) => post.slug === "ai-saas-ideas");
  const microIdeasGuide = blogPosts.find((post) => post.slug === "micro-saas-ideas");
  const accountantIdeasPage = programmaticPages.find(
    (page) => page.slug === "industry-saas-ideas-for-accountants"
  );

  const clusterLinks = [
    {
      title: resolvedLocale === "zh" ? "AI SaaS 想法" : "AI SaaS ideas",
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
      title: resolvedLocale === "zh" ? "Micro SaaS 想法" : "Micro SaaS ideas",
      body:
        resolvedLocale === "zh"
          ? "从更窄、更易验证的工作流型 SaaS 方向开始。"
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
          ? "进入行业型 SaaS 切口，理解工作流和买家差异。"
          : "See how industry-specific SaaS ideas differ by workflow, buyer, and commercial path.",
      href: localizedPath(
        resolvedLocale,
        `/programmatic/${accountantIdeasPage ? getProgrammaticPageSlug(resolvedLocale, accountantIdeasPage) : "industry-saas-ideas-for-accountants"}`
      )
    },
    {
      title: resolvedLocale === "zh" ? "电商 SaaS 想法" : "Ecommerce SaaS ideas",
      body:
        resolvedLocale === "zh"
          ? "对照电商 SaaS 在需求、变现和分发上的强弱。"
          : "Compare ecommerce SaaS ideas where demand, monetization, and distribution are easier to pressure-test.",
      href: "#shopify-onboarding-assistant"
    },
    {
      title:
        resolvedLocale === "zh" ? "创业想法评分示例" : "Startup idea scoring examples",
      body:
        resolvedLocale === "zh"
          ? "直接查看完整评分报告，理解不同方向为什么得分不同。"
          : "Review full scoring reports to see why different startup ideas earn different recommendations.",
      href: "#examples-list"
    }
  ];

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
            { name: resolvedLocale === "zh" ? "示例" : "Examples", path: localizedStaticPath(resolvedLocale, "examples") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "示例" : "Examples", href: localizedStaticPath(resolvedLocale, "examples") }
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <p className="mt-6 article-copy">{copy.intro}</p>
        </div>

        <section className="mt-12">
          <SectionHeading eyebrow={copy.clusterEyebrow} title={copy.clusterTitle} />
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

            return (
              <article key={report.slug} id={report.slug} className="surface-card overflow-hidden scroll-mt-28">
                <div className="border-b border-slate-200 bg-white px-8 py-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        {localizedReport.category}
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                        {localizedReport.idea}
                      </h2>
                      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                        {localizedReport.summary}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-slate-950 px-6 py-5 text-white">
                      <p className="text-sm font-medium text-slate-300">{copy.overall}</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">
                        {localizedReport.overallScore}/100
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <ScoreGrid
                    locale={resolvedLocale}
                    scores={[
                      { label: copy.problem, score: localizedReport.problemUrgencyScore, tone: "positive" },
                      { label: copy.audience, score: localizedReport.audienceClarityScore, tone: "positive" },
                      { label: copy.competition, score: localizedReport.competitionPressure, tone: "warning" },
                      { label: copy.monetization, score: localizedReport.monetizationPotential, tone: "positive" },
                      { label: copy.mvp, score: localizedReport.mvpSimplicity },
                      { label: copy.gtm, score: localizedReport.goToMarketEase }
                    ]}
                  />

                  <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="space-y-6">
                      <div className="rounded-[1.75rem] bg-sand p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                          {copy.positioning}
                        </p>
                        <p className="mt-4 text-lg leading-8 text-slate-700">
                          {localizedReport.samplePositioningStatement}
                        </p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                          {copy.niche}
                        </p>
                        <p className="mt-4 leading-7 text-slate-700">
                          {localizedReport.recommendedNicheAngle}
                        </p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <h3 className="text-xl font-semibold text-slate-950">{copy.nextPlan}</h3>
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
                        <h3 className="text-2xl font-semibold text-slate-950">{copy.risks}</h3>
                        <ul className="mt-4 space-y-3 text-slate-700">
                          {localizedReport.risks.map((risk) => (
                            <li key={risk}>- {risk}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.75rem] border border-slate-200 p-6">
                    <h3 className="text-xl font-semibold text-slate-950">{copy.related}</h3>
                    <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                      <li>
                        <Link href={localizedStaticPath(resolvedLocale, "tool")} className="text-accent hover:underline">
                          {copy.relatedTool}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={localizedPath(
                            resolvedLocale,
                            `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
                          )}
                          className="text-accent hover:underline"
                        >
                          {copy.relatedGuide}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={localizedPath(
                            resolvedLocale,
                            `/blog/${pricingGuide ? getBlogPostSlug(resolvedLocale, pricingGuide) : "saas-pricing-validation"}`
                          )}
                          className="text-accent hover:underline"
                        >
                          {copy.relatedPricing}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{copy.finalTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.finalBody}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{copy.finalPrimary}</ButtonLink>
            <ButtonLink href={localizedStaticPath(resolvedLocale, "pricing")} variant="secondary">
              {copy.finalSecondary}
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

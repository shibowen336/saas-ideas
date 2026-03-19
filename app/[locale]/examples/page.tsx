import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { exampleReports, getLocalizedExampleReport } from "@/content/example-reports";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getUiCopy, isLocale, localizedStaticPath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";

type ExamplesPageProps = {
  params: Promise<{ locale: string }>;
};

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
      "startup idea validator examples",
      "micro saas idea validation examples"
    ]
  });
}

export default async function ExamplesPage({ params }: ExamplesPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          examples: "示例",
          eyebrow: "示例",
          title: "更接近真实决策场景的 SaaS 想法验证报告示例",
          description:
            "这些示例不是薄内容占位页。每一份都解释了为什么这个想法会得到这样的分数、风险在哪里，以及下一步该验证什么。",
          overall: "总分",
          problem: "问题紧迫度",
          audience: "受众清晰度",
          competition: "竞争压力",
          monetization: "变现潜力",
          mvp: "MVP 简洁度",
          gtm: "Go-to-market 难度",
          positioning: "定位陈述",
          niche: "推荐细分角度",
          nextPlan: "下一步验证计划",
          risks: "需要关注的风险",
          ctaTitle: "准备好给你自己的想法打分了吗？",
          ctaCopy:
            "把同样的框架用到你自己的 SaaS 想法上，然后再对照这些示例，决定是否值得开建。",
          validate: "验证我的想法",
          pricing: "查看方案"
        }
      : {
          home: "Home",
          examples: "Examples",
          eyebrow: "Examples",
          title: "Realistic SaaS idea validation report examples",
          description:
            "These examples are built to satisfy real founder search intent. Each one explains why the idea scored the way it did, where the risks are, and what should be validated next.",
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
          ctaTitle: "Ready to score your own idea?",
          ctaCopy:
            "Use the same framework on your own SaaS concept, then compare the result with these examples before you build.",
          validate: "Validate My Idea",
          pricing: "Compare Plans"
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            { name: pageCopy.examples, path: localizedStaticPath(resolvedLocale, "examples") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: pageCopy.examples, href: localizedStaticPath(resolvedLocale, "examples") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow={pageCopy.eyebrow}
            title={pageCopy.title}
            description={pageCopy.description}
          />
        </div>

        <div className="mt-12 space-y-10">
          {exampleReports.map((report) => {
            const localizedReport = getLocalizedExampleReport(report, resolvedLocale);

            return (
              <article key={report.slug} className="surface-card overflow-hidden">
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
                      <p className="text-sm font-medium text-slate-300">{pageCopy.overall}</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">
                        {localizedReport.overallScore}/100
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <ScoreGrid
                    scores={[
                      { label: pageCopy.problem, score: localizedReport.problemUrgencyScore, tone: "positive" },
                      { label: pageCopy.audience, score: localizedReport.audienceClarityScore, tone: "positive" },
                      { label: pageCopy.competition, score: localizedReport.competitionPressure, tone: "warning" },
                      { label: pageCopy.monetization, score: localizedReport.monetizationPotential, tone: "positive" },
                      { label: pageCopy.mvp, score: localizedReport.mvpSimplicity },
                      { label: pageCopy.gtm, score: localizedReport.goToMarketEase }
                    ]}
                  />

                  <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="space-y-6">
                      <div className="rounded-[1.75rem] bg-sand p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                          {pageCopy.positioning}
                        </p>
                        <p className="mt-4 text-lg leading-8 text-slate-700">
                          {localizedReport.samplePositioningStatement}
                        </p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                          {pageCopy.niche}
                        </p>
                        <p className="mt-4 leading-7 text-slate-700">
                          {localizedReport.recommendedNicheAngle}
                        </p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 p-6">
                        <h3 className="text-xl font-semibold text-slate-950">{pageCopy.nextPlan}</h3>
                        <ul className="mt-4 space-y-3 text-slate-700">
                          {localizedReport.nextStepValidationPlan.map((step) => (
                            <li key={step}>• {step}</li>
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
                        <h3 className="text-2xl font-semibold text-slate-950">{pageCopy.risks}</h3>
                        <ul className="mt-4 space-y-3 text-slate-700">
                          {localizedReport.risks.map((risk) => (
                            <li key={risk}>• {risk}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{pageCopy.ctaCopy}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{pageCopy.validate}</ButtonLink>
            <ButtonLink href={localizedStaticPath(resolvedLocale, "pricing")} variant="secondary">
              {pageCopy.pricing}
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

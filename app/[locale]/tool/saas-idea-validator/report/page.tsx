import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { getUiCopy, isLocale, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { buildValidationReport } from "@/lib/report";
import { breadcrumbSchema } from "@/lib/schema";

type ReportPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: ReportPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.report.title,
    description: copy.pageMeta.report.description,
    pathname: "/tool/saas-idea-validator/report",
    keywords: ["saas idea validation report", "startup idea report", "saas idea validator results"]
  });
}

export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const query = await searchParams;
  const report = buildValidationReport(
    {
      idea: firstValue(query.idea),
      targetCustomer: firstValue(query.targetCustomer),
      problem: firstValue(query.problem),
      pricingIdea: firstValue(query.pricingIdea),
      currentAlternatives: firstValue(query.currentAlternatives),
      founderAdvantage: firstValue(query.founderAdvantage),
      distributionPlan: firstValue(query.distributionPlan),
      evidence: firstValue(query.evidence),
      ideaStage: firstValue(query.ideaStage)
    },
    resolvedLocale
  );
  const executiveSummary = report.executiveSummary ?? [];
  const strengths = report.strengths ?? [];
  const weaknesses = report.weaknesses ?? [];
  const scoreRationales = report.scoreRationales ?? [];
  const launchChannels = report.launchChannels ?? [];
  const validationExperiments = report.validationExperiments ?? [];
  const mvpMustHave = report.mvpMustHave ?? [];
  const mvpAvoidNow = report.mvpAvoidNow ?? [];

  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          tool: "工具",
          report: "报告",
          eyebrow: "创始人验证备忘录",
          title: "你的 SaaS 想法验证备忘录",
          overall: "综合得分",
          confidence: "当前把握度",
          recommendation: "当前推荐动作",
          summary: "执行摘要",
          validateAnother: "再验证一个想法",
          examples: "查看示例报告",
          saveTitle: "保存这份验证备忘录",
          saveButton: "保存报告",
          saveDescription: "获取后续访谈提纲、定价测试提示和试点执行建议。",
          scoreTitle: "核心维度评分",
          problem: "问题紧迫度",
          audience: "受众清晰度",
          competition: "竞争压力",
          monetization: "变现潜力",
          mvp: "MVP 简洁度",
          gtm: "获客可行性",
          whyWorks: "为什么这个方向有机会",
          whatWeakens: "什么会削弱它",
          scoreRationales: "逐项评分依据",
          pricing: "定价判断",
          channels: "建议优先尝试的获客路径",
          experiments: "优先验证实验",
          niche: "推荐切口",
          positioning: "示例定位语句",
          headline: "示例落地页标题",
          differentiation: "差异化建议",
          mvpNow: "第一版必须包含",
          mvpLater: "现在不要做",
          nextSteps: "接下来 2 周最值得做的动作",
          risks: "关键风险"
        }
      : {
          home: "Home",
          tool: "Tool",
          report: "Report",
          eyebrow: "Founder validation memo",
          title: "Your SaaS idea validation memo",
          overall: "Overall score",
          confidence: "Current confidence",
          recommendation: "Recommended next move",
          summary: "Executive summary",
          validateAnother: "Validate Another Idea",
          examples: "See Example Reports",
          saveTitle: "Save this validation memo",
          saveButton: "Save report",
          saveDescription: "Get interview prompts, pricing-test ideas, and pilot execution notes.",
          scoreTitle: "Core scoring dimensions",
          problem: "Problem urgency",
          audience: "Audience clarity",
          competition: "Competition pressure",
          monetization: "Monetization potential",
          mvp: "MVP simplicity",
          gtm: "Go-to-market ease",
          whyWorks: "Why this could work",
          whatWeakens: "What weakens it",
          scoreRationales: "Score rationale",
          pricing: "Pricing commentary",
          channels: "Recommended launch channels",
          experiments: "Priority validation experiments",
          niche: "Recommended wedge",
          positioning: "Sample positioning statement",
          headline: "Sample landing page headline",
          differentiation: "Differentiation suggestions",
          mvpNow: "Must-have in v1",
          mvpLater: "Do not build yet",
          nextSteps: "Best next actions for the next 2 weeks",
          risks: "Key risks"
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            { name: pageCopy.tool, path: localizedStaticPath(resolvedLocale, "tool") },
            { name: pageCopy.report, path: localizedStaticPath(resolvedLocale, "report") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: pageCopy.tool, href: localizedStaticPath(resolvedLocale, "tool") },
            { label: pageCopy.report, href: localizedStaticPath(resolvedLocale, "report") }
          ]}
        />

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-card p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {pageCopy.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{report.verdict}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
                <p className="text-sm font-medium text-slate-300">{pageCopy.overall}</p>
                <p className="mt-2 text-5xl font-semibold tracking-tight">{report.overallScore}/100</p>
              </div>
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-medium text-slate-500">{pageCopy.confidence}</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{report.confidenceLabel}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 p-6">
                <p className="text-sm font-medium text-slate-500">{pageCopy.recommendation}</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{report.recommendation}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.summary}</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {executiveSummary.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                {pageCopy.validateAnother}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {pageCopy.examples}
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-6">
            <NewsletterForm
              source={`report-${resolvedLocale}`}
              title={pageCopy.saveTitle}
              buttonLabel={pageCopy.saveButton}
              locale={resolvedLocale}
              description={pageCopy.saveDescription}
            />

            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.niche}</h2>
              <p className="mt-4 leading-7 text-slate-600">{report.recommendedNicheAngle}</p>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.pricing}</h2>
              <p className="mt-4 leading-7 text-slate-600">{report.pricingCommentary}</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.scoreTitle}</h2>
          <div className="mt-6">
            <ScoreGrid
              locale={resolvedLocale}
              scores={[
                { label: pageCopy.problem, score: report.problemUrgencyScore, tone: "positive" },
                { label: pageCopy.audience, score: report.audienceClarityScore, tone: "positive" },
                { label: pageCopy.competition, score: report.competitionPressure, tone: "warning" },
                { label: pageCopy.monetization, score: report.monetizationPotential, tone: "positive" },
                { label: pageCopy.mvp, score: report.mvpSimplicity },
                { label: pageCopy.gtm, score: report.goToMarketEase }
              ]}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.whyWorks}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.whatWeakens}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {weaknesses.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.scoreRationales}</h2>
            <div className="mt-5 space-y-5">
              {scoreRationales.map((item) => (
                <div key={item.label}>
                  <h3 className="text-lg font-semibold text-slate-950">{item.label}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.explanation}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.channels}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {launchChannels.map((channel) => (
                <li key={channel}>• {channel}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.experiments}</h2>
            <div className="mt-5 space-y-5">
              {validationExperiments.map((experiment) => (
                <section key={experiment.title} className="rounded-[1.5rem] border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-950">{experiment.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{experiment.detail}</p>
                  <p className="mt-3 text-sm font-medium text-slate-500">{experiment.expectedSignal}</p>
                </section>
              ))}
            </div>
          </article>
          <div className="space-y-6">
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.mvpNow}</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {mvpMustHave.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.mvpLater}</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {mvpAvoidNow.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.positioning}</h2>
            <p className="mt-4 leading-7 text-slate-600">{report.samplePositioningStatement}</p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.headline}</h2>
            <p className="mt-4 leading-7 text-slate-600">{report.sampleLandingPageHeadline}</p>
          </article>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.differentiation}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {report.differentiationSuggestions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.risks}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {report.risks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 surface-card p-8">
          <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.nextSteps}</h2>
          <ol className="mt-4 space-y-3 text-slate-700">
            {report.nextStepValidationPlan.map((step, index) => (
              <li key={step}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

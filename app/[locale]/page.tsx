import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { exampleReports } from "@/content/example-reports";
import { getHomeFaqs } from "@/content/faq";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const previewReport = exampleReports[0];

const homeCopy = {
  en: {
    eyebrow: "Founder-first validation workflow",
    title: "Validate your SaaS idea before you build.",
    description:
      "Score demand, competition, audience clarity, monetization potential, MVP complexity, and next-step validation actions in one focused founder report.",
    badges: [
      ["Demand and urgency", "Buyer-first"],
      ["Competition and wedge", "Niche-aware"],
      ["Next-step actions", "Build later"]
    ],
    previewEyebrow: "Example report preview",
    overallScore: "Overall score",
    nicheLabel: "Recommended niche angle",
    headlineLabel: "Sample headline",
    featureEyebrow: "What the tool scores",
    featureTitle: "A validation framework built for indie hackers and solo founders",
    featureDescription:
      "The report translates a rough startup concept into a structured decision: validate harder, narrow the angle, or build with confidence.",
    featureCards: [
      ["Demand", "Find out whether the pain is strong enough to support real buyer conversations."],
      ["Competition pressure", "See how crowded the category feels before you default to a generic value proposition."],
      ["Audience clarity", "Understand whether your first customer is defined tightly enough to reach and interview."],
      ["Monetization", "Pressure-test whether the idea connects to measurable value and believable pricing."],
      ["MVP simplicity", "Keep the first version narrow enough to build without accidental platform sprawl."],
      ["Next steps", "Get founder-ready actions like interviews, landing page tests, and concierge pilots."]
    ],
    howEyebrow: "How it works",
    howTitle: "Go from rough idea to concrete validation plan",
    howDescription:
      "The flow is simple on purpose. The product is meant to sharpen thinking and reduce wasted build cycles, not add process overhead.",
    howSteps: [
      ["Describe the idea", "Enter the SaaS concept, target customer, problem, pricing angle, and current alternatives."],
      ["Get a structured report", "Review your overall score, score breakdown, key risks, differentiation suggestions, and a recommended niche angle."],
      ["Run the next tests", "Use the report to guide interviews, landing page experiments, and high-signal validation actions before you code."]
    ],
    reportEyebrow: "See a report",
    reportTitle: "Preview the scoring logic before you enter your own idea",
    reportDescription:
      "Example reports are fully indexable and explain why certain concepts score higher than others.",
    reportBody:
      "The example library is designed for real search intent. Founders can compare how a micro SaaS idea, a vertical SaaS workflow, or an AI SaaS concept performs across demand, monetization, competition, and go-to-market ease.",
    browseExamples: "Browse Example Reports",
    tryTool: "Try the Tool",
    takeaway: "Founder takeaway",
    socialEyebrow: "Social proof placeholders",
    socialTitle: "Designed for a conversion-ready launch",
    socialDescription:
      "These blocks are ready for customer logos, testimonials, and founder outcomes once the first validation cohorts are live.",
    socialQuotes: [
      "Placeholder testimonial: Found a narrower niche in one session instead of spending six weeks building.",
      "Placeholder testimonial: Used the report to pitch the idea to a co-founder and align on what to validate first.",
      "Placeholder testimonial: Turned a vague AI idea into a concrete offer with a believable pricing angle."
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions from founders validating startup ideas",
    faqDescription:
      "These are the questions founders usually ask before they trust a validation framework enough to use it.",
    newsletterTitle: "Get validation templates and founder notes",
    newsletterButton: "Get updates",
    keepExploring: "Keep exploring",
    readGuide: "Read the guide to validating a SaaS idea",
    browseMicroIdeas: "Browse micro SaaS idea inspiration",
    comparePlans: "Compare free and paid plans",
    preview: {
      idea: previewReport.idea,
      summary: previewReport.summary,
      verdict: previewReport.verdict,
      niche: previewReport.recommendedNicheAngle,
      headline: previewReport.sampleLandingPageHeadline
    }
  },
  zh: {
    eyebrow: "面向创始人的验证工作流",
    title: "在真正开建之前，先验证你的 SaaS 想法。",
    description:
      "用一份聚焦创始人决策的报告，评估需求、竞争、受众清晰度、变现潜力、MVP 复杂度和下一步验证动作。",
    badges: [
      ["需求与紧迫度", "从买家出发"],
      ["竞争与切口", "聚焦细分"],
      ["下一步动作", "先验证再开建"]
    ],
    previewEyebrow: "示例报告预览",
    overallScore: "综合评分",
    nicheLabel: "推荐细分切口",
    headlineLabel: "示例标题",
    featureEyebrow: "这个工具会评估什么",
    featureTitle: "一套为独立开发者和单人创始人设计的验证框架",
    featureDescription:
      "它会把一个模糊的创业想法，转成更清晰的判断：该继续验证、该先收窄定位，还是已经值得开始做 MVP。",
    featureCards: [
      ["需求强度", "判断这个问题是不是足够痛，是否值得你去做真实买家访谈。"],
      ["竞争压力", "在进入市场前先看清这个赛道到底有多拥挤。"],
      ["受众清晰度", "确认你的第一批用户是否定义得足够具体，能否被真正触达。"],
      ["变现潜力", "检查这个想法是否和明确价值、可信定价挂钩。"],
      ["MVP 简洁度", "帮助你把第一版范围控制住，避免一上来就做成平台。"],
      ["下一步动作", "给出访谈、落地页测试、人工验证等真正可执行的下一步。"]
    ],
    howEyebrow: "它如何工作",
    howTitle: "从模糊想法走到清晰的验证计划",
    howDescription:
      "整个流程被刻意设计得很轻。它的目标不是增加流程负担，而是帮助你尽早发现方向对不对。",
    howSteps: [
      ["描述你的想法", "输入 SaaS 概念、目标客户、要解决的问题、定价思路和当前替代方案。"],
      ["获取结构化报告", "查看综合评分、各项维度得分、主要风险、差异化建议和推荐切口。"],
      ["执行下一轮验证", "根据报告去做访谈、落地页测试和高信号验证动作，而不是立刻开始写代码。"]
    ],
    reportEyebrow: "先看一份报告",
    reportTitle: "先理解评分逻辑，再评估你自己的想法",
    reportDescription:
      "示例报告不是几张卡片，而是可索引、可阅读的完整内容。",
    reportBody:
      "示例库是按真实搜索意图设计的。你可以对比 micro SaaS、垂直 SaaS 工作流和 AI SaaS 想法，在需求、变现、竞争和 go-to-market 难度上的差别。",
    browseExamples: "浏览示例报告",
    tryTool: "立即试用工具",
    takeaway: "创始人结论",
    socialEyebrow: "社证占位模块",
    socialTitle: "已经具备面向转化的落地页结构",
    socialDescription:
      "这些区域已经预留给真实用户 Logo、推荐语和创始人反馈，后续拿到案例后可以直接替换。",
    socialQuotes: [
      "占位推荐：一次分析就把切口收窄了，不用再花六周做错误方向。",
      "占位推荐：我把报告发给潜在合伙人，大家很快就对下一步验证达成一致。",
      "占位推荐：原本很泛的 AI 想法，被整理成了一个更像真生意的定位。"
    ],
    faqEyebrow: "常见问题",
    faqTitle: "创始人在验证创业想法时最常问的问题",
    faqDescription:
      "这些问题通常决定了用户是否愿意相信你的验证框架，并真正拿它来做决策。",
    newsletterTitle: "获取验证模板和创始人笔记",
    newsletterButton: "订阅更新",
    keepExploring: "继续深入",
    readGuide: "阅读《如何验证一个 SaaS 想法》",
    browseMicroIdeas: "浏览 micro SaaS 想法列表",
    comparePlans: "查看免费版与付费版差异",
    preview: {
      idea: "面向 Shopify 商家的 AI 新客引导助手",
      summary:
        "这个想法得分较高，因为受众足够具体，问题与收入增长相关，而且产品可以先从一个聚焦工作流切入，而不是一开始就做成整套平台。",
      verdict: "这是一个有潜力的细分工作流产品，具备明确的变现路径。",
      niche: "把它定位成精简 Shopify 商家的新客引导收入层，而不是泛化的客服自动化工具。",
      headline: "为精简 Shopify 团队打造的新客引导流程，把首次下单用户更高效地转成复购用户。"
    }
  }
} as const;

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.home.title,
    description: copy.pageMeta.home.description,
    pathname: "/",
    keywords: [
      "saas idea validator",
      "validate saas idea",
      "startup idea validator",
      "micro saas idea validation"
    ]
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = homeCopy[resolvedLocale];
  const faqs = getHomeFaqs(resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const microIdeasGuide = blogPosts.find((post) => post.slug === "micro-saas-ideas");

  return (
    <main>
      <SchemaScript schema={faqSchema(faqs)} />
      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{copy.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                {getUiCopy(resolvedLocale).cta.validate}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {getUiCopy(resolvedLocale).cta.example}
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.badges.map(([label, value]) => (
                <div key={label} className="surface-card p-5">
                  <dt className="text-sm font-medium text-slate-500">{label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-950 px-8 py-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">{copy.previewEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold">{copy.preview.idea}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{copy.preview.summary}</p>
            </div>
            <div className="p-8">
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-medium text-slate-500">{copy.overallScore}</p>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-950">{previewReport.overallScore}/100</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy.preview.verdict}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">{copy.nicheLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{copy.preview.niche}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">{copy.headlineLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{copy.preview.headline}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell">
          <SectionHeading eyebrow={copy.featureEyebrow} title={copy.featureTitle} description={copy.featureDescription} align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {copy.featureCards.map(([title, body]) => (
              <article key={title} className="surface-card p-6">
                <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="page-shell">
          <SectionHeading eyebrow={copy.howEyebrow} title={copy.howTitle} description={copy.howDescription} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {copy.howSteps.map(([title, body], index) => (
              <article key={title} className="surface-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {resolvedLocale === "zh" ? `第 ${index + 1} 步` : `Step ${index + 1}`}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={copy.reportEyebrow} title={copy.reportTitle} description={copy.reportDescription} />
            <p className="mt-6 article-copy">{copy.reportBody}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")}>{copy.browseExamples}</ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")} variant="secondary">{copy.tryTool}</ButtonLink>
            </div>
          </div>
          <div>
            <ScoreGrid
              scores={[
                { label: resolvedLocale === "zh" ? "综合评分" : "Overall score", score: previewReport.overallScore, tone: "positive" },
                { label: resolvedLocale === "zh" ? "问题紧迫度" : "Problem urgency", score: previewReport.problemUrgencyScore, tone: "positive" },
                { label: resolvedLocale === "zh" ? "受众清晰度" : "Audience clarity", score: previewReport.audienceClarityScore, tone: "positive" },
                { label: resolvedLocale === "zh" ? "竞争压力" : "Competition pressure", score: previewReport.competitionPressure, tone: "warning" },
                { label: resolvedLocale === "zh" ? "变现潜力" : "Monetization", score: previewReport.monetizationPotential, tone: "positive" },
                { label: resolvedLocale === "zh" ? "MVP 简洁度" : "MVP simplicity", score: previewReport.mvpSimplicity }
              ]}
            />
            <div className="mt-6 surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{copy.takeaway}</p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{copy.preview.summary}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="page-shell">
          <SectionHeading eyebrow={copy.socialEyebrow} title={copy.socialTitle} description={copy.socialDescription} align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {copy.socialQuotes.map((quote) => (
              <blockquote key={quote} className="surface-card p-8 text-lg leading-8 text-slate-700">{quote}</blockquote>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle} description={copy.faqDescription} />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
          <div className="space-y-6">
            <NewsletterForm source={`homepage-${resolvedLocale}`} title={copy.newsletterTitle} buttonLabel={copy.newsletterButton} />
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">{copy.keepExploring}</h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                <li>
                  <Link href={localizedPath(resolvedLocale, `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`)} className="text-accent hover:underline">
                    {copy.readGuide}
                  </Link>
                </li>
                <li>
                  <Link href={localizedPath(resolvedLocale, `/blog/${microIdeasGuide ? getBlogPostSlug(resolvedLocale, microIdeasGuide) : "micro-saas-ideas"}`)} className="text-accent hover:underline">
                    {copy.browseMicroIdeas}
                  </Link>
                </li>
                <li>
                  <Link href={localizedStaticPath(resolvedLocale, "pricing")} className="text-accent hover:underline">
                    {copy.comparePlans}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

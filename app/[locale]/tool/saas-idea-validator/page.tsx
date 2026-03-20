import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ToolIdeaForm } from "@/components/tool-idea-form";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { getToolFaqs } from "@/content/faq";
import { exampleReports } from "@/content/example-reports";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/schema";

type ToolPageProps = {
  params: Promise<{ locale: string }>;
};

const toolPageCopy = {
  en: {
    eyebrow: "Primary commercial page",
    title: "Validate your SaaS idea before you build",
    description:
      "Use this SaaS idea validation tool to score demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions before you commit to building.",
    intro: [
      "SaaS Idea Validator is built for founders who need a practical answer to a commercial question: is this SaaS idea strong enough to validate further, narrow into a better wedge, or pause before engineering starts?",
      "The tool scores one specific idea rather than generating generic suggestions. You enter the buyer, painful workflow, current alternative, pricing angle, founder advantage, and early distribution plan, then get a report you can use for interviews, message tests, pricing checks, and a tighter MVP."
    ],
    whatItDoesTitle: "What this SaaS idea validation tool does",
    whatItDoesBody:
      "The validator scores demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation readiness. It then turns that score into a founder-ready report with an executive summary, recommendation, score rationale, risks, differentiation suggestions, a recommended wedge, and validation experiments.",
    builtForTitle: "Who should use this SaaS idea validator",
    builtForBody:
      "It is built for indie hackers, solo founders, product-minded developers, and early-stage teams evaluating a SaaS idea, an AI workflow product, or a micro SaaS angle before they commit to a larger build.",
    inputsTitle: "What to enter for a stronger validation report",
    inputsBody:
      "The tool works best when the inputs are concrete: who the buyer is, why the problem matters now, what alternatives exist, what the pricing logic might be, how you can reach the first users, and what evidence you already have.",
    outputTitle: "What your SaaS idea validation report includes",
    outputBody:
      "The report includes an overall score, score breakdown, verdict, confidence level, next-step validation plan, risks, differentiation ideas, wedge recommendation, positioning draft, landing page headline, launch channels, and MVP boundaries.",
    useCasesEyebrow: "Sample use cases",
    useCasesTitle: "When founders use a SaaS idea validation tool",
    useCases: [
      {
        title: "Before building a first MVP",
        body:
          "Use it when you have a clear product idea but still need to know whether the pain, audience, and pricing story are strong enough to justify building."
      },
      {
        title: "When the idea still feels too broad",
        body:
          "If the concept sounds promising but the buyer and workflow are still fuzzy, the tool helps narrow the wedge before you waste effort on a generic product."
      },
      {
        title: "When comparing multiple startup angles",
        body:
          "Founders often use the validator to compare two or three related directions and see which one has the strongest buyer clarity, monetization path, or go-to-market edge."
      }
    ],
    methodologyEyebrow: "Methodology",
    methodologyTitle: "How founders should use a SaaS idea score",
    methodologyPoints: [
      "Treat the score as a decision aid, not a guarantee.",
      "Use the report to decide what to validate next with real buyers.",
      "If the output feels vague, the inputs are usually still too broad.",
      "A high score should lead to stronger proof, not to skipping validation."
    ],
    relatedTitle: "Use examples and guides to pressure-test the result",
    relatedLinks: {
      examples: "Review SaaS idea validation examples",
      guide: "Read the guide to validating a SaaS idea",
      pricing: "Learn how to validate SaaS pricing"
    },
    faqEyebrow: "Tool FAQ",
    faqTitle: "Questions about the SaaS idea validator tool",
    faqDescription:
      "These questions focus on how to use the tool well, what the report actually means, and where it fits into a real founder workflow.",
    finalTitle: "Run the validator, then compare your result with real examples",
    finalBody:
      "Start with your own validation report, then compare it with example reports and pricing guidance before you expand the scope of the product."
  },
  zh: {
    eyebrow: "核心商业页面",
    title: "用 SaaS Idea Validator 在开发前验证你的 SaaS 想法",
    description:
      "这个页面面向需要更清晰判断的创始人：这个创业想法究竟值得继续验证、需要收窄切口，还是应该在进入工程开发前先放慢节奏。",
    intro: [
      "SaaS Idea Validator 的目标不是一次生成一堆泛泛的点子，而是帮助你判断一个具体想法是否站得住。工具会要求你写清买家、痛苦工作流、当前替代方案、定价思路、创始人优势，以及拿到第一批用户的路径。",
      "输出也不是一个空洞分数，而是一份可以直接用于访谈、信息测试、定价验证和试点设计的结构化报告。"
    ],
    whatItDoesTitle: "这个工具会做什么",
    whatItDoesBody:
      "它会评估需求、竞争压力、受众清晰度、变现潜力、MVP 简洁度和下一步验证可执行性，再把这些维度整理成执行摘要、建议动作、评分依据、风险、差异化建议、推荐切口和验证实验。",
    builtForTitle: "它适合谁",
    builtForBody:
      "它适合独立开发者、单人创始人、产品型工程师和早期团队，在真正投入开发前评估 SaaS 想法、AI 工作流产品或 micro SaaS 切口。",
    inputsTitle: "哪些输入会让报告更有价值",
    inputsBody:
      "越具体越好：买家是谁、为什么这个问题现在必须解决、用户当前用什么替代、价格逻辑是什么、前 20 个用户怎么来、以及你已经掌握了哪些证据。",
    outputTitle: "报告会包含什么",
    outputBody:
      "报告会给出综合得分、维度评分、结论、把握度、下一步验证计划、风险、差异化建议、推荐切口、定位语句、落地页标题、获客路径和 MVP 边界。",
    useCasesEyebrow: "典型使用场景",
    useCasesTitle: "这些时刻最适合先用工具判断",
    useCases: [
      {
        title: "准备做第一版 MVP 之前",
        body:
          "当你已经有方向，但还不确定痛点、受众和价格故事是否足够强时，先用工具压测，而不是直接进入完整开发。"
      },
      {
        title: "想法看起来有潜力，但仍然偏宽",
        body:
          "如果你觉得方向不错，但买家和工作流还不够具体，这个工具能帮你先收窄切口，再去验证。"
      },
      {
        title: "你在比较多个创业方向",
        body:
          "很多创始人会把两三个相近方向都跑一遍，看看哪一个在受众清晰度、变现路径和获客可行性上更强。"
      }
    ],
    methodologyEyebrow: "方法说明",
    methodologyTitle: "应该如何使用这个结果",
    methodologyPoints: [
      "把分数当成辅助判断，不要当成成功保证。",
      "用报告决定下一步要和哪些真实买家验证什么。",
      "如果输出仍然模糊，通常说明输入还不够具体。",
      "高分应该推动更多证据，而不是跳过验证。"
    ],
    relatedTitle: "继续推进你的验证流程",
    relatedLinks: {
      examples: "查看 SaaS 想法验证示例",
      guide: "阅读 SaaS 想法验证指南",
      pricing: "学习如何验证 SaaS 定价"
    },
    faqEyebrow: "工具 FAQ",
    faqTitle: "关于 SaaS 想法验证工具的常见问题",
    faqDescription:
      "这些问题主要回答如何正确使用工具、如何理解报告，以及它在真实创始人流程中的位置。",
    finalTitle: "先验证你的想法，再和真实示例对照",
    finalBody:
      "先跑一份报告，再去看示例库，并执行最值得做的下一步验证动作，而不是直接扩张产品范围。"
  }
} as const;

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    absoluteTitle: copy.pageMeta.tool.title,
    title: copy.pageMeta.tool.title,
    description: copy.pageMeta.tool.description,
    pathname: "/tool/saas-idea-validator"
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const pageCopy = toolPageCopy[resolvedLocale];
  const faqs = getToolFaqs(resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const pricingGuide = blogPosts.find((post) => post.slug === "saas-pricing-validation");

  return (
    <main className="section-space pb-32 md:pb-20">
      <div className="page-shell">
        <SchemaScript
          schema={[
            softwareApplicationSchema({
              locale: resolvedLocale,
              description:
                resolvedLocale === "zh"
                  ? pageCopy.description
                  : "SaaS idea validation tool that scores demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions.",
              featureList: getUiCopy(resolvedLocale).schema.softwareFeatures,
              path: localizedStaticPath(resolvedLocale, "tool")
            }),
            breadcrumbSchema([
              { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
              {
                name:
                  resolvedLocale === "zh"
                    ? "SaaS Idea Validator 工具"
                    : "SaaS Idea Validator Tool",
                path: localizedStaticPath(resolvedLocale, "tool")
              }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            {
              label:
                resolvedLocale === "zh"
                  ? "SaaS Idea Validator 工具"
                  : "SaaS Idea Validator Tool",
              href: localizedStaticPath(resolvedLocale, "tool")
            }
          ]}
        />

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {pageCopy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{pageCopy.description}</p>
            <div className="mt-6 article-copy">
              {pageCopy.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#validator-form">
                {resolvedLocale === "zh" ? "开始验证这个想法" : "Generate my SaaS idea report"}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {resolvedLocale === "zh" ? "查看示例报告" : "See validation examples"}
              </ButtonLink>
            </div>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-600">
              <li>
                {resolvedLocale === "zh"
                  ? "输入买家、问题、替代方案、定价角度和首批用户获取路径。"
                  : "Enter the buyer, problem, alternatives, pricing angle, and path to the first users."}
              </li>
              <li>
                {resolvedLocale === "zh"
                  ? "拿到综合得分、关键风险、推荐切口和下一步验证计划。"
                  : "Get a SaaS idea score, key risks, a sharper wedge, and a next-step validation plan."}
              </li>
            </ul>
          </div>
          <div id="validator-form">
            <ToolIdeaForm locale={resolvedLocale} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.whatItDoesTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pageCopy.whatItDoesBody}</p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.builtForTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pageCopy.builtForBody}</p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.inputsTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pageCopy.inputsBody}</p>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.outputTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pageCopy.outputBody}</p>
          </article>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow={pageCopy.useCasesEyebrow}
            title={pageCopy.useCasesTitle}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pageCopy.useCases.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.88fr]">
          <div>
            <SectionHeading
              eyebrow={pageCopy.methodologyEyebrow}
              title={pageCopy.methodologyTitle}
            />
            <ul className="mt-8 space-y-4">
              {pageCopy.methodologyPoints.map((item) => (
                <li key={item} className="surface-card p-6 text-base leading-7 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.relatedTitle}</h2>
              <ul className="mt-5 space-y-4 text-base leading-7 text-slate-600">
                <li>
                  <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
                    {pageCopy.relatedLinks.examples}
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
                    {pageCopy.relatedLinks.guide}
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
                    {pageCopy.relatedLinks.pricing}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                {resolvedLocale === "zh" ? "示例对照" : "Example context"}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {resolvedLocale === "zh"
                  ? `当前示例库包含 ${exampleReports.length} 份结构化报告，可帮助你对照不同方向在需求、竞争和变现上的差异。`
                  : `The examples library currently includes ${exampleReports.length} structured reports you can use to compare demand, competition, monetization, and wedge strength across different SaaS ideas.`}
              </p>
              <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
                <li>
                  <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
                    {resolvedLocale === "zh"
                      ? "查看 SaaS 想法验证示例"
                      : "Browse SaaS idea validation examples"}
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
                    {resolvedLocale === "zh"
                      ? "阅读如何验证 SaaS 想法"
                      : "Read how to validate a SaaS idea"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow={pageCopy.faqEyebrow}
              title={pageCopy.faqTitle}
              description={pageCopy.faqDescription}
            />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.finalTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{pageCopy.finalBody}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#validator-form">
                {resolvedLocale === "zh" ? "开始验证我的想法" : "Create my SaaS idea report"}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {resolvedLocale === "zh" ? "查看示例报告" : "See SaaS idea validation examples"}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
      <MobileStickyCta locale={resolvedLocale} />
    </main>
  );
}

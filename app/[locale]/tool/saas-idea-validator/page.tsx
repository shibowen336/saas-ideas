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

const copy = {
  en: {
    eyebrow: "Primary commercial page",
    title: "Validate your SaaS idea before you build",
    description:
      "Use this SaaS idea validation tool to score demand, competition pressure, audience clarity, monetization, MVP simplicity, and the next validation actions to run before you build.",
    intro: [
      "SaaS Idea Validator is built for founders who need a practical answer to a commercial question: is this idea worth validating harder, narrowing into a sharper wedge, or pausing before engineering starts?",
      "You enter the buyer, painful workflow, current alternative, pricing angle, founder advantage, and early distribution plan. The output is a structured founder memo you can use for interviews, pricing tests, message tests, and a tighter MVP."
    ],
    heroPrimary: "Generate my SaaS idea report",
    heroSecondary: "See validation examples",
    bullets: [
      "Enter the buyer, problem, alternatives, pricing angle, and path to the first users.",
      "Get a score, key risks, wedge recommendation, and next-step validation plan."
    ],
    cards: [
      {
        title: "What this tool does",
        body:
          "It scores demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation readiness. Then it turns that score into a practical report you can actually use."
      },
      {
        title: "Who should use it",
        body:
          "It fits indie hackers, solo founders, product-minded developers, and early-stage teams evaluating a SaaS idea, an AI workflow product, or a micro SaaS wedge."
      },
      {
        title: "What to enter",
        body:
          "The best reports come from concrete inputs: who the buyer is, why the problem matters now, what alternatives exist, what the pricing logic might be, and how you can reach the first users."
      },
      {
        title: "What the report includes",
        body:
          "You get an overall score, score breakdown, verdict, confidence level, risks, wedge recommendation, positioning draft, landing page headline, launch path, and MVP boundary."
      }
    ],
    useCasesEyebrow: "Use cases",
    useCasesTitle: "When founders use the SaaS idea validator",
    useCases: [
      {
        title: "Before building a first MVP",
        body: "Pressure-test the pain, buyer, and pricing story before you commit to a wider roadmap."
      },
      {
        title: "When the idea still feels too broad",
        body: "Use the report to narrow the wedge before you build a generic product for a vague audience."
      },
      {
        title: "When comparing multiple startup angles",
        body: "Run two or three related ideas and compare buyer clarity, monetization, and go-to-market ease."
      }
    ],
    methodologyEyebrow: "Methodology",
    methodologyTitle: "How to use the score well",
    methodologyPoints: [
      "Treat the score as a decision aid, not a guarantee.",
      "Use the report to decide what to validate next with real buyers.",
      "If the output feels vague, the inputs are usually still too broad.",
      "A high score should lead to stronger proof, not to skipping validation."
    ],
    relatedTitle: "Use examples and guides to pressure-test the result",
    relatedBody:
      "The strongest workflow is to run the tool, compare your result with example reports, then use the validation and pricing guides to plan the next experiment.",
    relatedExamples: "Review SaaS idea validation examples",
    relatedGuide: "Read the SaaS idea validation guide",
    relatedPricing: "Learn how to validate SaaS pricing",
    contextTitle: "Example context",
    contextBodyPrefix: "The examples library currently includes",
    contextBodySuffix:
      "structured reports you can use to compare demand, competition, monetization, and wedge strength across different SaaS ideas.",
    contextExamples: "Browse SaaS idea validation examples",
    contextGuide: "Read how to validate a SaaS idea",
    faqEyebrow: "Tool FAQ",
    faqTitle: "Questions about the SaaS idea validator tool",
    faqDescription:
      "These questions explain how to use the tool well, what the report means, and where it fits inside a real founder workflow.",
    finalTitle: "Run the validator, then compare your result with real examples",
    finalBody:
      "Start with your own report, then compare it with example reports and pricing guidance before you expand the scope of the product.",
    finalPrimary: "Create my SaaS idea report",
    finalSecondary: "See SaaS idea validation examples",
    home: "Home",
    tool: "SaaS Idea Validator Tool"
  },
  zh: {
    eyebrow: "核心商业页面",
    title: "用 SaaS Idea Validator 在开发前验证你的 SaaS 想法",
    description:
      "用这个 SaaS 想法验证工具评估需求、竞争压力、受众清晰度、变现潜力、MVP 简洁度，以及下一步最值得执行的验证动作。",
    intro: [
      "SaaS Idea Validator 不会生成一堆泛泛的点子，而是帮助你判断一个具体想法是否站得住。你需要写清买家、痛苦工作流、当前替代方案、定价逻辑、创始人优势，以及拿到第一批用户的路径。",
      "输出也不是一个空洞分数，而是一份可以直接拿去做访谈、信息测试、定价验证和试点设计的结构化报告。"
    ],
    heroPrimary: "生成我的 SaaS 想法报告",
    heroSecondary: "查看验证示例",
    bullets: [
      "输入买家、问题、替代方案、定价逻辑，以及前 20 个用户的获取路径。",
      "得到综合得分、关键风险、推荐切口和下一步验证计划。"
    ],
    cards: [
      {
        title: "这个工具会做什么",
        body:
          "它会评估需求、竞争压力、受众清晰度、变现潜力、MVP 简洁度和下一步验证可执行性，再整理成可直接行动的报告。"
      },
      {
        title: "适合谁使用",
        body:
          "适合独立开发者、单人创始人、产品型工程师和早期团队，在真正投入开发前评估 SaaS 想法、AI 工作流产品或 micro SaaS 切口。"
      },
      {
        title: "输入什么更有价值",
        body:
          "越具体越好：买家是谁、为什么这个问题现在必须解决、用户用什么替代、价格逻辑是什么，以及你准备如何拿到第一批用户。"
      },
      {
        title: "报告会给你什么",
        body:
          "你会拿到综合得分、维度评分、结论、把握度、风险、推荐切口、定位语句、落地页标题、获客路径和 MVP 边界。"
      }
    ],
    useCasesEyebrow: "典型使用场景",
    useCasesTitle: "这些时候最适合先跑一遍验证工具",
    useCases: [
      {
        title: "准备做第一版 MVP 之前",
        body: "先验证痛点、买家和价格故事是否足够强，再决定要不要真正开始开发。"
      },
      {
        title: "想法有潜力但仍然太宽",
        body: "如果方向不错，但买家和工作流还不够具体，先收窄切口再去验证。"
      },
      {
        title: "同时比较多个方向",
        body: "把两三个相近方向都跑一遍，看看哪一个在受众清晰度、变现路径和获客可行性上更强。"
      }
    ],
    methodologyEyebrow: "方法说明",
    methodologyTitle: "如何正确使用这个分数",
    methodologyPoints: [
      "把分数当成辅助判断，不要当成成功保证。",
      "用报告决定下一步要和哪些真实买家验证什么。",
      "如果输出仍然模糊，通常说明输入还不够具体。",
      "高分应该推动更多证据，而不是跳过验证。"
    ],
    relatedTitle: "结合示例和指南继续压测你的判断",
    relatedBody: "先对照示例，再读验证指南和定价验证内容，会更容易判断这份报告里哪些结论值得继续追。",
    relatedExamples: "查看 SaaS 想法验证示例",
    relatedGuide: "阅读 SaaS 想法验证指南",
    relatedPricing: "学习如何验证 SaaS 定价",
    contextTitle: "示例对照",
    contextBodyPrefix: "当前示例库包含",
    contextBodySuffix: "份结构化报告，可帮助你对照不同方向在需求、竞争、变现和切口上的差异。",
    contextExamples: "浏览 SaaS 想法验证示例",
    contextGuide: "阅读如何验证 SaaS 想法",
    faqEyebrow: "工具 FAQ",
    faqTitle: "关于 SaaS 想法验证工具的常见问题",
    faqDescription: "这些问题主要解释如何正确使用工具、如何理解报告，以及它在真实创始人流程中的位置。",
    finalTitle: "先验证你的想法，再和真实示例对照",
    finalBody: "先跑一份报告，再去看示例库和定价验证内容，执行最值得做的下一步验证动作，而不是直接扩大产品范围。",
    finalPrimary: "生成我的 SaaS 想法报告",
    finalSecondary: "查看 SaaS 想法验证示例",
    home: "首页",
    tool: "SaaS Idea Validator 工具"
  }
} as const;

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const ui = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    absoluteTitle: ui.pageMeta.tool.title,
    title: ui.pageMeta.tool.title,
    description: ui.pageMeta.tool.description,
    pathname: "/tool/saas-idea-validator"
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = copy[resolvedLocale];
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
                  ? page.description
                  : "SaaS idea validation tool that scores demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions.",
              featureList: getUiCopy(resolvedLocale).schema.softwareFeatures,
              path: localizedStaticPath(resolvedLocale, "tool")
            }),
            breadcrumbSchema([
              { name: page.home, path: localizedStaticPath(resolvedLocale, "home") },
              { name: page.tool, path: localizedStaticPath(resolvedLocale, "tool") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: page.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: page.tool, href: localizedStaticPath(resolvedLocale, "tool") }
          ]}
        />

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
            <div className="mt-6 article-copy">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#validator-form">{page.heroPrimary}</ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {page.heroSecondary}
              </ButtonLink>
            </div>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-600">
              {page.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div id="validator-form">
            <ToolIdeaForm locale={resolvedLocale} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          {page.cards.map((item) => (
            <article key={item.title} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <SectionHeading eyebrow={page.useCasesEyebrow} title={page.useCasesTitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {page.useCases.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.88fr]">
          <div>
            <SectionHeading eyebrow={page.methodologyEyebrow} title={page.methodologyTitle} />
            <ul className="mt-8 space-y-4">
              {page.methodologyPoints.map((item) => (
                <li key={item} className="surface-card p-6 text-base leading-7 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{page.relatedTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{page.relatedBody}</p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")}>{page.relatedExamples}</ButtonLink>
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

            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{page.contextTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">
                {page.contextBodyPrefix} {exampleReports.length} {page.contextBodySuffix}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")}>{page.contextExamples}</ButtonLink>
                <ButtonLink
                  href={localizedPath(
                    resolvedLocale,
                    `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
                  )}
                  variant="secondary"
                >
                  {page.contextGuide}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow={page.faqEyebrow} title={page.faqTitle} description={page.faqDescription} />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-3xl font-semibold text-slate-950">{page.finalTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{page.finalBody}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#validator-form">{page.finalPrimary}</ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {page.finalSecondary}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
      <MobileStickyCta locale={resolvedLocale} />
    </main>
  );
}

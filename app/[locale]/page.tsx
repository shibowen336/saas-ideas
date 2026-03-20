import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { ScoreGrid } from "@/components/score-grid";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { exampleReports, getLocalizedExampleReport } from "@/content/example-reports";
import { getHomeFaqs } from "@/content/faq";
import {
  getProgrammaticPageSlug,
  programmaticPages
} from "@/content/programmatic-pages";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const previewReport = exampleReports[0];

const homePageCopy = {
  en: {
    title: "Validate your SaaS idea before you build",
    description:
      "SaaS Idea Validator helps founders validate a SaaS idea by scoring demand, competition pressure, audience clarity, monetization, MVP simplicity, and the next validation actions to run.",
    eyebrow: "SaaS idea validator for founders",
    heroStats: [
      ["Primary use case", "Validate a SaaS idea before writing code"],
      ["What gets scored", "Demand, competition, audience, monetization, MVP scope"],
      ["What you receive", "A structured report with risks, wedge, and next steps"]
    ],
    heroSupporting: "Designed for indie hackers, solo founders, product-minded developers, and early-stage teams that want sharper evidence before they build.",
    methodologyEyebrow: "What is SaaS idea validation?",
    methodologyTitle: "A practical way to decide whether a startup idea deserves deeper effort",
    methodologyDescription:
      "SaaS idea validation means pressure-testing whether a specific buyer has a painful enough problem, whether the idea is distinct enough to win attention, and whether the first version can be sold before it becomes a sprawling product.",
    methodologyCards: [
      {
        title: "Why founders should validate before building",
        body:
          "Validation reduces wasted product work. It helps you learn whether the audience is clear, the pain is urgent, and the offer is commercially believable before a roadmap turns into sunk cost."
      },
      {
        title: "What founders often get wrong",
        body:
          "The usual mistakes are broad audiences, weak pricing logic, vague pain statements, and MVP scope that grows faster than proof. Those mistakes make ideas feel exciting while still being commercially soft."
      },
      {
        title: "What good validation looks like",
        body:
          "Good validation combines buyer interviews, landing page message tests, pricing signals, and lightweight pilots. The goal is not abstract research. It is better evidence for the next decision."
      }
    ],
    scoringEyebrow: "How SaaS Idea Validator scores ideas",
    scoringTitle: "The scoring system is built to match real founder decisions",
    scoringDescription:
      "Each scoring dimension exists to answer a practical question: is the market pain strong enough, is the audience tight enough, is the competition manageable enough, and is the first commercial test realistic enough to run now?",
    scoringCards: [
      {
        title: "Demand",
        body:
          "Demand asks whether the workflow pain is repeated, visible, and costly enough to justify buying behavior. A founder-friendly idea is not just interesting. It solves a problem buyers already feel."
      },
      {
        title: "Competition pressure",
        body:
          "Competition pressure measures how difficult it will be to stand out against incumbent tools, agencies, spreadsheets, or strong existing habits. A crowded market can still work, but only with a sharper wedge."
      },
      {
        title: "Audience clarity",
        body:
          "Audience clarity checks whether you can describe the first buyer precisely enough to find them, interview them, and sell to them. Broad markets slow validation because the message gets blurry."
      },
      {
        title: "Monetization",
        body:
          "Monetization evaluates whether the idea connects to a believable value metric, pricing logic, and budget story. Early pricing validation matters because weak monetization often hides behind exciting product concepts."
      },
      {
        title: "MVP simplicity",
        body:
          "MVP simplicity asks whether the first version can stay narrow enough to prove one result without turning into a platform. Simpler MVPs are cheaper to validate and easier to explain."
      },
      {
        title: "Next-step validation actions",
        body:
          "The tool turns the score into action. It suggests what to test next, what kind of signal to look for, and what to avoid building too early."
      }
    ],
    howEyebrow: "How it works",
    howTitle: "From rough startup idea to usable validation report",
    howDescription:
      "The workflow is concrete on purpose. Founders describe the market angle, then receive a report they can use to plan interviews, refine positioning, and decide whether to keep pushing the idea.",
    howSteps: [
      {
        title: "Enter the inputs that shape the score",
        body:
          "Describe the SaaS idea, target customer, painful workflow, pricing angle, current alternatives, founder advantage, and how you plan to reach the first 20 users."
      },
      {
        title: "Review the validation report",
        body:
          "Get an overall score, score breakdown, executive summary, confidence level, key risks, differentiation suggestions, a recommended wedge, and sample positioning copy."
      },
      {
        title: "Run the next validation tests",
        body:
          "Use the report to prioritize customer interviews, landing page experiments, pricing tests, and lightweight pilots before committing engineering time."
      }
    ],
    examplesEyebrow: "Examples and report previews",
    examplesTitle: "Use indexable example reports to compare different startup angles",
    examplesDescription:
      "The examples library is not a gallery of empty cards. Each report explains why an idea scored the way it did, what makes the angle stronger or weaker, and what should be validated next.",
    categoryLinksTitle: "Explore example and content paths",
    methodologyTitle2: "Methodology and usage notes",
    methodologyDescription2:
      "SaaS Idea Validator is for founders who need a sharper next move. The score is based on the information you provide about pain, audience, competition, pricing, distribution, and founder context.",
    methodologyPoints: [
      "Use the report as a validation brief, not as permission to build blindly.",
      "Trust the output most when the buyer and workflow are described in concrete terms.",
      "A strong score should lead to more evidence, not more assumptions.",
      "A weak score often means the idea needs a narrower audience, a clearer problem, or a more believable pricing angle."
    ],
    resourcesEyebrow: "Explore SaaS idea validation resources",
    resourcesTitle: "Follow the strongest next path for your research or validation",
    resourcesDescription:
      "Use the homepage as a hub, then move into deeper guides, example reports, and niche pages that match what you are validating.",
    faqEyebrow: "Homepage FAQ",
    faqTitle: "Questions founders ask when validating a SaaS idea",
    faqDescription:
      "These answers are meant to help with search intent and real decisions, not to decorate the page with filler.",
    emailTitle: "Get one founder-focused validation email stream",
    emailDescription:
      "Receive practical notes on SaaS idea validation, report methodology, pricing tests, and launch decisions. The main action on this page is still to validate your idea.",
    emailButton: "Get validation notes",
    browseExamples: "Browse SaaS idea validation examples",
    seeTool: "Use the SaaS idea validator",
    resources: {
      guide: "How to validate a SaaS idea",
      micro: "Micro SaaS idea inspiration",
      aiExamples: "AI SaaS idea validation examples",
      startup: "Startup idea scoring examples",
      pricing: "SaaS pricing validation guide",
      checklist: "Founder validation checklist"
    }
  },
  zh: {
    title: "在正式开发前验证你的 SaaS 想法",
    description:
      "SaaS Idea Validator 帮助创始人在开发前评估需求、竞争压力、受众清晰度、变现潜力、MVP 简洁度，以及下一步最值得执行的验证动作。",
    eyebrow: "面向创始人的 SaaS 想法验证工具",
    heroStats: [
      ["主要用途", "在写代码前先验证 SaaS 想法"],
      ["核心评分维度", "需求、竞争、受众、变现、MVP 范围"],
      ["你会得到什么", "一份带风险、切口和下一步动作的结构化报告"]
    ],
    heroSupporting: "适合独立开发者、单人创始人、产品型工程师和早期团队，在真正投入开发前先建立更强证据。",
    methodologyEyebrow: "什么是 SaaS 想法验证？",
    methodologyTitle: "先判断这是不是值得继续投入的创业方向",
    methodologyDescription:
      "SaaS 想法验证的本质，是先检验一个具体买家是否真的有高频痛点，这个想法是否足够清晰和可区分，以及第一版产品是否有现实的商业测试路径。",
    methodologyCards: [
      {
        title: "为什么要先验证再开发",
        body:
          "验证能减少错误的产品投入。它帮助你更早看清受众是否明确、痛点是否紧迫、以及价值主张是否能支撑真实付费。"
      },
      {
        title: "创始人最常犯的错误",
        body:
          "最常见的问题是受众过宽、定价逻辑薄弱、痛点描述太泛，以及 MVP 一开始就做得过大。这些都会让想法看起来热闹，却不够商业化。"
      },
      {
        title: "什么样的验证更有效",
        body:
          "好的验证通常来自买家访谈、落地页信息测试、定价信号和轻量试点，而不是只看表面反馈或自我感觉。"
      }
    ],
    scoringEyebrow: "SaaS Idea Validator 如何评分",
    scoringTitle: "评分维度围绕创始人真正要做的判断展开",
    scoringDescription:
      "每一个维度都对应一个现实问题：需求够不够强、受众够不够清晰、竞争是否可进入、以及第一轮验证是否足够可执行。",
    scoringCards: [
      {
        title: "需求",
        body:
          "需求看的是问题是否高频、明显且足够有代价。真正值得做的 SaaS 想法，不只是“看起来有用”，而是用户已经在为它消耗时间、收入或精力。"
      },
      {
        title: "竞争压力",
        body:
          "竞争压力评估你要和哪些旧方案竞争，包括现有软件、人工流程、外包服务，甚至用户的习惯。赛道拥挤不代表不能做，但需要更尖锐的切口。"
      },
      {
        title: "受众清晰度",
        body:
          "受众清晰度判断你是否已经把第一批买家描述得足够具体，能找到、访谈并真正触达他们。受众过宽会直接拖慢验证效率。"
      },
      {
        title: "变现潜力",
        body:
          "变现维度关注这个想法是否能连接到清晰的价值指标和合理的定价逻辑。很多表面有吸引力的产品，真正的问题在于商业逻辑不够强。"
      },
      {
        title: "MVP 简洁度",
        body:
          "MVP 简洁度判断第一版是否能只证明一个核心结果，而不是一开始就做成平台。更小的 MVP 通常更容易验证，也更容易卖清楚。"
      },
      {
        title: "下一步验证动作",
        body:
          "工具不会只给出一个分数，还会告诉你最值得先做什么实验、该观察什么信号，以及哪些功能现在不应该先做。"
      }
    ],
    howEyebrow: "如何使用",
    howTitle: "从模糊想法走到可执行的验证报告",
    howDescription:
      "这个流程是故意做得很具体的。创始人先描述市场和买家，再拿到一份可以直接指导访谈、定位和试点的报告。",
    howSteps: [
      {
        title: "输入影响判断的关键信息",
        body:
          "填写 SaaS 想法、目标客户、问题描述、定价思路、当前替代方案、创始人优势，以及你打算如何拿到前 20 个用户。"
      },
      {
        title: "查看结构化验证报告",
        body:
          "你会拿到综合得分、维度评分、执行摘要、把握度、主要风险、差异化建议、推荐切口和示例定位文案。"
      },
      {
        title: "执行下一轮验证",
        body:
          "根据报告先做访谈、落地页测试、定价测试和轻量试点，而不是直接进入完整开发。"
      }
    ],
    examplesEyebrow: "示例与报告预览",
    examplesTitle: "通过可索引的示例报告比较不同创业方向",
    examplesDescription:
      "示例页不是简单卡片集合，而是对每个想法为什么得这个分、风险在哪里、下一步该验证什么的完整解释。",
    categoryLinksTitle: "继续探索这些内容路径",
    methodologyTitle2: "方法论与使用方式",
    methodologyDescription2:
      "SaaS Idea Validator 面向需要更清晰下一步判断的创始人。评分基于你提供的痛点、受众、竞争、定价、分发路径和创始人上下文。",
    methodologyPoints: [
      "把报告当成验证简报，而不是盲目开发的许可。",
      "当买家和工作流描述越具体时，输出越值得参考。",
      "高分应该推动你去收集更多证据，而不是增加更多假设。",
      "低分通常意味着受众需要更窄、问题需要更清晰，或定价逻辑还不够强。"
    ],
    resourcesEyebrow: "继续探索 SaaS 想法验证资源",
    resourcesTitle: "根据你的验证阶段，进入更具体的内容路径",
    resourcesDescription:
      "把首页作为主题入口，再进入更深的指南、示例报告和细分场景页面，继续推进你的判断。",
    faqEyebrow: "首页 FAQ",
    faqTitle: "创始人在验证 SaaS 想法时最常问的问题",
    faqDescription:
      "这些回答既服务真实搜索意图，也服务创始人的现实决策。",
    emailTitle: "只保留一个创始人向的邮件入口",
    emailDescription:
      "接收关于 SaaS 想法验证、评分方法、定价测试和发布判断的实用更新。这个页面的主动作仍然是先验证你的想法。",
    emailButton: "获取验证更新",
    browseExamples: "查看 SaaS 想法验证示例",
    seeTool: "使用 SaaS Idea Validator",
    resources: {
      guide: "如何验证 SaaS 想法",
      micro: "微型 SaaS 想法参考",
      aiExamples: "AI SaaS 想法验证示例",
      startup: "创业想法评分示例",
      pricing: "SaaS 定价验证指南",
      checklist: "创始人验证清单"
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
      "saas idea validation",
      "startup idea validator"
    ]
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = homePageCopy[resolvedLocale];
  const faqs = getHomeFaqs(resolvedLocale);
  const preview = getLocalizedExampleReport(previewReport, resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");
  const microIdeasGuide = blogPosts.find((post) => post.slug === "micro-saas-ideas");
  const pricingGuide = blogPosts.find((post) => post.slug === "saas-pricing-validation");
  const checklistGuide = blogPosts.find((post) => post.slug === "saas-idea-validation-checklist");
  const aiValidationPage = programmaticPages.find(
    (page) => page.slug === "how-to-validate-an-ai-startup-idea"
  );
  const recruiterIdeasPage = programmaticPages.find(
    (page) => page.slug === "micro-saas-ideas-for-recruiters"
  );

  const resourceCards = [
    {
      title: copy.resources.guide,
      href: localizedPath(
        resolvedLocale,
        `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
      ),
      body:
        resolvedLocale === "zh"
          ? "阅读一套更完整的验证流程，了解应该先访谈什么、测试什么、以及如何避免过早开发。"
          : "Read the full founder workflow for interviews, landing page tests, and pilot validation before you build."
    },
    {
      title: copy.resources.micro,
      href: localizedPath(
        resolvedLocale,
        `/blog/${microIdeasGuide ? getBlogPostSlug(resolvedLocale, microIdeasGuide) : "micro-saas-ideas"}`
      ),
      body:
        resolvedLocale === "zh"
          ? "从微型 SaaS 想法列表中找更容易验证的细分方向，再用工具判断哪个切口更值得推进。"
          : "Use the micro SaaS idea cluster to find narrower, easier-to-validate opportunities and compare angles."
    },
    {
      title: copy.resources.aiExamples,
      href: localizedPath(
        resolvedLocale,
        `/programmatic/${aiValidationPage ? getProgrammaticPageSlug(resolvedLocale, aiValidationPage) : "how-to-validate-an-ai-startup-idea"}`
      ),
      body:
        resolvedLocale === "zh"
          ? "进入 AI SaaS 验证路径，查看买家、信任、竞争和 MVP 风险该如何判断。"
          : "Explore AI startup idea validation with stronger guidance on buyer trust, positioning, and MVP risk."
    },
    {
      title: copy.resources.startup,
      href: localizedStaticPath(resolvedLocale, "examples"),
      body:
        resolvedLocale === "zh"
          ? "浏览结构化示例报告，比较 AI、垂直 SaaS、电商 SaaS 等不同方向的评分差异。"
          : "Browse structured startup idea scoring examples across AI SaaS, ecommerce SaaS, and workflow software."
    },
    {
      title: copy.resources.pricing,
      href: localizedPath(
        resolvedLocale,
        `/blog/${pricingGuide ? getBlogPostSlug(resolvedLocale, pricingGuide) : "saas-pricing-validation"}`
      ),
      body:
        resolvedLocale === "zh"
          ? "学习如何在产品还没完全做出来前，就先验证定价逻辑、价值指标和买家付费意愿。"
          : "Learn how to validate SaaS pricing, willingness to pay, and commercial framing before packaging is fixed."
    },
    {
      title: copy.resources.checklist,
      href: localizedPath(
        resolvedLocale,
        `/blog/${checklistGuide ? getBlogPostSlug(resolvedLocale, checklistGuide) : "saas-idea-validation-checklist"}`
      ),
      body:
        resolvedLocale === "zh"
          ? "用验证清单检查需求、受众、替代方案、定价和分发路径，快速发现最弱的一环。"
          : "Use the checklist to review pain, audience, alternatives, pricing, and distribution before you ship."
    }
  ];

  const categoryLinks = [
    {
      title:
        resolvedLocale === "zh"
          ? "电商 SaaS 验证示例"
          : "Ecommerce SaaS validation examples",
      href: localizedStaticPath(resolvedLocale, "examples")
    },
    {
      title:
        resolvedLocale === "zh"
          ? "招聘行业 micro SaaS 想法"
          : "Micro SaaS ideas for recruiters",
      href: localizedPath(
        resolvedLocale,
        `/programmatic/${recruiterIdeasPage ? getProgrammaticPageSlug(resolvedLocale, recruiterIdeasPage) : "micro-saas-ideas-for-recruiters"}`
      )
    },
    {
      title:
        resolvedLocale === "zh"
          ? "AI 创业想法验证"
          : "AI startup idea validation",
      href: localizedPath(
        resolvedLocale,
        `/programmatic/${aiValidationPage ? getProgrammaticPageSlug(resolvedLocale, aiValidationPage) : "how-to-validate-an-ai-startup-idea"}`
      )
    }
  ];

  return (
    <main>
      <SchemaScript schema={faqSchema(faqs)} />

      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{copy.description}</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">{copy.heroSupporting}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                {getUiCopy(resolvedLocale).cta.validate}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {getUiCopy(resolvedLocale).cta.example}
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.heroStats.map(([label, value]) => (
                <div key={label} className="surface-card p-5">
                  <dt className="text-sm font-medium text-slate-500">{label}</dt>
                  <dd className="mt-2 text-lg font-semibold leading-7 text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-950 px-8 py-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                {copy.examplesEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{preview.idea}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{preview.summary}</p>
            </div>
            <div className="p-8">
              <div className="rounded-[1.75rem] bg-sand p-6">
                <p className="text-sm font-medium text-slate-500">
                  {resolvedLocale === "zh" ? "综合得分" : "Overall score"}
                </p>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-950">
                  {preview.overallScore}/100
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{preview.verdict}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    {resolvedLocale === "zh" ? "推荐切口" : "Recommended wedge"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {preview.recommendedNicheAngle}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    {resolvedLocale === "zh" ? "示例落地页标题" : "Sample landing page headline"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {preview.sampleLandingPageHeadline}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-slate-950"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell">
          <SectionHeading
            eyebrow={copy.methodologyEyebrow}
            title={copy.methodologyTitle}
            description={copy.methodologyDescription}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {copy.methodologyCards.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow={copy.scoringEyebrow}
            title={copy.scoringTitle}
            description={copy.scoringDescription}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {copy.scoringCards.map((item) => (
              <article key={item.title} className="surface-card p-6">
                <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell">
          <SectionHeading
            eyebrow={copy.howEyebrow}
            title={copy.howTitle}
            description={copy.howDescription}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {copy.howSteps.map((step, index) => (
              <article key={step.title} className="surface-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {resolvedLocale === "zh" ? `第 ${index + 1} 步` : `Step ${index + 1}`}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">{step.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={copy.examplesEyebrow}
              title={copy.examplesTitle}
              description={copy.examplesDescription}
            />
            <p className="mt-6 article-copy">
                {resolvedLocale === "zh"
                  ? "如果你在比较 micro SaaS、垂直 SaaS、电商 SaaS 或 AI SaaS 的切入方式，先看示例报告会更容易理解什么样的方向更值得继续验证。"
                  : "If you are comparing a micro SaaS idea, a vertical SaaS workflow, an ecommerce SaaS product, or an AI startup angle, the examples page shows how different ideas move across demand, competition, and monetization."}
            </p>
            <h2 className="mt-8 text-2xl font-semibold text-slate-950">{copy.categoryLinksTitle}</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              {categoryLinks.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-accent hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")}>
                {copy.browseExamples}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")} variant="secondary">
                {copy.seeTool}
              </ButtonLink>
            </div>
          </div>
          <div>
            <ScoreGrid
              locale={resolvedLocale}
              scores={[
                { label: resolvedLocale === "zh" ? "需求" : "Demand", score: preview.problemUrgencyScore, tone: "positive" },
                {
                  label: resolvedLocale === "zh" ? "受众清晰度" : "Audience clarity",
                  score: preview.audienceClarityScore,
                  tone: "positive"
                },
                {
                  label: resolvedLocale === "zh" ? "竞争压力" : "Competition pressure",
                  score: preview.competitionPressure,
                  tone: "warning"
                },
                {
                  label: resolvedLocale === "zh" ? "变现潜力" : "Monetization",
                  score: preview.monetizationPotential,
                  tone: "positive"
                },
                {
                  label: resolvedLocale === "zh" ? "MVP 简洁度" : "MVP simplicity",
                  score: preview.mvpSimplicity
                },
                {
                  label: resolvedLocale === "zh" ? "下一步可执行性" : "Next-step readiness",
                  score: preview.goToMarketEase
                }
              ]}
            />
            <div className="mt-6 surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {resolvedLocale === "zh" ? "为什么这个示例有帮助" : "Why this preview matters"}
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{preview.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-white/80">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow={copy.methodologyTitle2}
              title={copy.methodologyTitle2}
              description={copy.methodologyDescription2}
            />
            <ul className="mt-8 space-y-4">
              {copy.methodologyPoints.map((item) => (
                <li key={item} className="surface-card p-6 text-base leading-7 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <NewsletterForm
              source={`homepage-${resolvedLocale}`}
              title={copy.emailTitle}
              buttonLabel={copy.emailButton}
              locale={resolvedLocale}
              description={copy.emailDescription}
            />
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">{copy.resourcesTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{copy.resourcesDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow={copy.resourcesEyebrow}
            title={copy.resourcesTitle}
            description={copy.resourcesDescription}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resourceCards.map((item) => (
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
        </div>
      </section>

      <section className="section-space border-t border-slate-200 bg-white/80">
        <div className="page-shell">
          <SectionHeading
            eyebrow={copy.faqEyebrow}
            title={copy.faqTitle}
            description={copy.faqDescription}
          />
          <div className="mt-10 max-w-4xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
    </main>
  );
}

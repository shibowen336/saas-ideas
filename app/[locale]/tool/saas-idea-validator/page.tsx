import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ToolIdeaForm } from "@/components/tool-idea-form";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { getToolFaqs } from "@/content/faq";
import { getUiCopy, isLocale, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/schema";

type ToolPageProps = {
  params: Promise<{ locale: string }>;
};

const toolPageCopy = {
  en: {
    eyebrow: "Main tool",
    title: "Validate your SaaS idea with a founder-focused scoring framework",
    description:
      "This tool helps builders decide whether an idea has enough demand, clarity, and differentiation to justify deeper validation or an MVP.",
    intro: [
      "SaaS Idea Validator is built for founders who want a practical answer, not a hype score. Enter your concept, target customer, problem, pricing angle, and current alternatives. The report highlights where the opportunity looks strong and where the story still feels thin.",
      "The goal is not to tell you whether an idea is magically good or bad. The goal is to help you spot what should happen next: interviews, pricing validation, a narrower niche, or a simple landing page test."
    ],
    cards: [
      ["What the tool does", "The report scores demand, audience clarity, competition pressure, monetization, MVP simplicity, and go-to-market ease. It also returns risks, differentiation suggestions, a recommended niche angle, a positioning statement, and a sample landing page headline."],
      ["Who it is for", "It is especially useful for indie hackers, solo founders, developers exploring micro SaaS ideas, and builders testing AI SaaS angles. If you are deciding whether an idea deserves a month of effort, this is the right stage to use it."],
      ["How to interpret the results", "Higher scores mean the story is easier to believe. Lower scores mean the idea still needs sharper customer definition, stronger proof of urgency, or a clearer path to monetization. Treat the result as a starting brief for validation, not a final verdict."],
      ["Common founder mistakes", "The usual mistakes are broad audience definitions, weak pricing logic, ignoring the real workaround, and overbuilding the MVP. Most low-signal ideas become stronger when the founder narrows the workflow and tests the promise manually first."]
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Questions about the SaaS idea validator",
    faqDescription:
      "Use the report to guide the next conversation and experiment, not as a shortcut around validation.",
    newsletterTitle: "Save your report and get follow-up validation prompts",
    newsletterButton: "Save report",
    keepValidating: "Keep validating",
    compareExamples: "Compare with example reports",
    readGuide: "Read the SaaS validation guide",
    upgrade: "Upgrade for saved reports and collaboration",
    examples: "See Example Reports",
    pricing: "Compare plans"
  },
  zh: {
    eyebrow: "核心工具",
    title: "用一套面向创始人的评分框架，验证你的 SaaS 想法",
    description:
      "这个工具帮助建设者判断：一个想法是否已经具备足够的需求、清晰度和差异化，值得继续深入验证，甚至开始做 MVP。",
    intro: [
      "SaaS Idea Validator 是为那些想要实用判断、而不是情绪化鼓励的创始人准备的。输入你的概念、目标客户、问题、定价思路和当前替代方案，报告会指出这个机会哪里站得住，哪里还太空。",
      "它的目标不是告诉你这个想法“绝对好”或“绝对差”，而是让你看清下一步应该做什么：去访谈、去验证定价、继续收窄定位，还是先做一个简单的落地页测试。"
    ],
    cards: [
      ["这个工具会输出什么", "报告会评估需求、受众清晰度、竞争压力、变现潜力、MVP 简洁度和 go-to-market 难度，同时给出风险、差异化建议、推荐细分切口、定位语句和示例 landing page 标题。"],
      ["它最适合谁", "它特别适合独立开发者、单人创始人、正在探索 micro SaaS 的开发者，以及想验证 AI SaaS 切口的建设者。如果你正在决定一个想法值不值得投入一个月以上的精力，现在就是最适合使用它的阶段。"],
      ["应该如何解读结果", "分数高，意味着这个故事更容易被买家相信。分数低，则说明你还需要更清晰的目标客户、更强的痛点证据，或者更可信的变现路径。请把它当成验证简报，而不是最终判决。"],
      ["创始人最常见的错误", "最常见的问题包括：目标用户太泛、定价逻辑太弱、忽略真正的替代方案，以及一上来就把 MVP 做得过重。大多数低信号想法，在收窄工作流并先手工验证承诺之后都会明显变强。"]
    ],
    faqEyebrow: "常见问题",
    faqTitle: "关于 SaaS Idea Validator 的常见问题",
    faqDescription: "请把报告用作下一轮对话和实验的依据，而不是绕过验证本身的捷径。",
    newsletterTitle: "保存报告，并获取后续验证提示",
    newsletterButton: "保存报告",
    keepValidating: "继续验证",
    compareExamples: "对照示例报告",
    readGuide: "阅读 SaaS 想法验证指南",
    upgrade: "升级以保存报告并支持协作",
    examples: "查看示例报告",
    pricing: "查看定价"
  }
} as const;

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.tool.title,
    description: copy.pageMeta.tool.description,
    pathname: "/tool/saas-idea-validator",
    keywords: [
      "saas idea validator",
      "validate saas idea",
      "startup idea validator",
      "saas idea generator and validator"
    ]
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);
  const pageCopy = toolPageCopy[resolvedLocale];
  const faqs = getToolFaqs(resolvedLocale);
  const validationGuide = blogPosts.find((post) => post.slug === "how-to-validate-a-saas-idea");

  return (
    <main className="section-space pb-32 md:pb-20">
      <div className="page-shell">
        <SchemaScript
          schema={[
            softwareApplicationSchema({
              locale: resolvedLocale,
              description: copy.pageMeta.tool.description,
              featureList: copy.schema.softwareFeatures,
              path: localizedStaticPath(resolvedLocale, "tool")
            }),
            breadcrumbSchema([
              { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: resolvedLocale === "zh" ? "工具" : "Tool", path: localizedStaticPath(resolvedLocale, "tool") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "工具" : "Tool", href: localizedStaticPath(resolvedLocale, "tool") }
          ]}
        />

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow={pageCopy.eyebrow} title={pageCopy.title} description={pageCopy.description} />
            <div className="mt-6 article-copy">
              {pageCopy.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {pageCopy.examples}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "pricing")} variant="ghost">
                {pageCopy.pricing}
              </ButtonLink>
            </div>
          </div>
          <div id="validator-form">
            <ToolIdeaForm locale={resolvedLocale} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          {pageCopy.cards.map(([title, body]) => (
            <article key={title} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading eyebrow={pageCopy.faqEyebrow} title={pageCopy.faqTitle} description={pageCopy.faqDescription} />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
          <div className="space-y-6">
            <NewsletterForm
              source={`tool-page-${resolvedLocale}`}
              title={pageCopy.newsletterTitle}
              buttonLabel={pageCopy.newsletterButton}
            />
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.keepValidating}</h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                <li>
                  <Link href={localizedStaticPath(resolvedLocale, "examples")} className="text-accent hover:underline">
                    {pageCopy.compareExamples}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizedPath(resolvedLocale, `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`)}
                    className="text-accent hover:underline"
                  >
                    {pageCopy.readGuide}
                  </Link>
                </li>
                <li>
                  <Link href={localizedStaticPath(resolvedLocale, "pricing")} className="text-accent hover:underline">
                    {pageCopy.upgrade}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <MobileStickyCta locale={resolvedLocale} />
    </main>
  );
}

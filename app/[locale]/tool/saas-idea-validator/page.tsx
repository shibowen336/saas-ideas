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
    title: "Validate your SaaS idea before you write code",
    description:
      "This version is built like a founder memo generator, not a toy scorecard. It weighs urgency, buyer clarity, competition pressure, monetization, MVP scope, and go-to-market reality.",
    intro: [
      "The tool is most useful when you are still deciding whether the idea deserves deeper effort. Strong inputs produce a stronger report: who the buyer is, what painful workflow breaks today, what they use now, how you plan to reach them, and why you have any right to win the first few users.",
      "Instead of handing back a vague score, the report now returns an executive summary, recommendation, confidence level, score rationale, wedge recommendation, first validation experiments, launch channels, and an MVP boundary."
    ],
    supportingCards: [
      [
        "What makes the report more useful",
        "The system forces a sharper thesis. It asks for founder advantage, distribution thinking, existing evidence, and current stage, so the output feels closer to an operator memo than a startup horoscope."
      ],
      [
        "When to trust the output",
        "Trust the report most when your answers are concrete. If the buyer is still broad, the problem is vague, or the distribution plan is generic, the report will reflect that uncertainty instead of hiding it."
      ],
      [
        "What a good result should trigger",
        "A strong report should not push you straight into engineering. It should push you into interviews, pilots, paid tests, and proof collection that make the product thesis harder to ignore."
      ]
    ],
    signalTitle: "What the upgraded tool now produces",
    signalItems: [
      "Executive summary with recommendation and confidence",
      "Score-by-score rationale instead of raw numbers only",
      "Sharper differentiation and niche-angle guidance",
      "Priority validation experiments with expected signals",
      "Launch channel recommendations and MVP do-not-build boundaries"
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Questions about the new validator workflow",
    faqDescription:
      "Treat this tool as a decision-quality upgrade for validation, not a shortcut around talking to buyers.",
    newsletterTitle: "Save your report and keep the validation loop moving",
    newsletterButton: "Save report",
    newsletterDescription:
      "Get founder-focused prompts for interviews, proof gathering, pricing tests, and early pilot execution.",
    keepValidating: "Keep validating",
    compareExamples: "Compare against example reports",
    readGuide: "Read the full SaaS validation guide",
    upgrade: "See pricing for saved reports and team workflows",
    examples: "See Example Reports",
    pricing: "Compare plans",
    home: "Home",
    tool: "Tool"
  },
  zh: {
    eyebrow: "核心工具",
    title: "在你写代码之前，先把 SaaS 想法验证清楚",
    description:
      "这版工具不再只是一个玩具打分器，而是更像创始人判断备忘录生成器。它会一起评估痛点紧迫度、买家清晰度、竞争压力、变现逻辑、MVP 范围和获客现实性。",
    intro: [
      "它最适合用在你还没决定这个想法值不值得深做的时候。输入越具体，报告就越有判断力。尤其要写清楚：买家是谁、今天卡在哪个痛苦工作流、现在用什么凑合、你准备怎么触达他们，以及你为什么有资格拿到第一批用户。",
      "报告也不再只是给你几个分数。现在会输出执行摘要、推荐动作、当前把握度、逐项评分依据、切口建议、首轮验证实验、优先获客路径和 MVP 边界。"
    ],
    supportingCards: [
      [
        "为什么现在的报告更有用",
        "它会逼你补齐创始人优势、分发思路、已有证据和当前阶段这些高信号输入，所以输出更像运营判断，而不是创业星座。"
      ],
      [
        "什么时候应该相信结果",
        "当你的回答足够具体时，报告最有参考价值。如果买家还很宽、问题还很泛、分发还只是空话，报告也会把这种不确定性直接暴露出来。"
      ],
      [
        "好结果真正应该触发什么",
        "一个强报告不应该把你直接推向开发，而应该把你推向访谈、试点、付费测试和证据收集，让产品 thesis 更难被忽视。"
      ]
    ],
    signalTitle: "升级后的工具现在会输出",
    signalItems: [
      "带推荐动作和把握度的执行摘要",
      "不是只有数字，而是逐项评分依据",
      "更尖锐的差异化和细分切口建议",
      "按优先级排序的验证实验及预期信号",
      "优先获客路径建议，以及 MVP 明确“不该做什么”"
    ],
    faqEyebrow: "常见问题",
    faqTitle: "关于新版验证工作流的问题",
    faqDescription: "把它当成提升判断质量的工具，而不是绕过真实买家对话的捷径。",
    newsletterTitle: "保存报告，让验证循环继续往前走",
    newsletterButton: "保存报告",
    newsletterDescription:
      "获取更贴近创始人实战的访谈提纲、证据收集模板、定价测试和试点动作提示。",
    keepValidating: "继续验证",
    compareExamples: "对照示例报告",
    readGuide: "阅读完整 SaaS 验证指南",
    upgrade: "查看支持保存报告与团队协作的定价",
    examples: "查看示例报告",
    pricing: "查看定价",
    home: "首页",
    tool: "工具"
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
              { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
              { name: pageCopy.tool, path: localizedStaticPath(resolvedLocale, "tool") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: pageCopy.tool, href: localizedStaticPath(resolvedLocale, "tool") }
          ]}
        />

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeading
              eyebrow={pageCopy.eyebrow}
              title={pageCopy.title}
              description={pageCopy.description}
            />
            <div className="mt-6 article-copy">
              {pageCopy.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.signalTitle}</h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                {pageCopy.signalItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
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

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {pageCopy.supportingCards.map(([title, body]) => (
            <article key={title} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr]">
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
          <div className="space-y-6">
            <NewsletterForm
              source={`tool-page-${resolvedLocale}`}
              title={pageCopy.newsletterTitle}
              buttonLabel={pageCopy.newsletterButton}
              locale={resolvedLocale}
              description={pageCopy.newsletterDescription}
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
                    href={localizedPath(
                      resolvedLocale,
                      `/blog/${validationGuide ? getBlogPostSlug(resolvedLocale, validationGuide) : "how-to-validate-a-saas-idea"}`
                    )}
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

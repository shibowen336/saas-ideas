import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { NewsletterForm } from "@/components/newsletter-form";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { getPricingFaqs } from "@/content/faq";
import { getUiCopy, isLocale, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type PricingPageProps = {
  params: Promise<{ locale: string }>;
};

const pricingPageCopy = {
  en: {
    eyebrow: "Pricing",
    title: "Simple pricing for founders validating before they build",
    description:
      "Start free, then upgrade when you want saved reports, repeatable workflows, and shared access for a small team.",
    faqEyebrow: "FAQ",
    faqTitle: "Pricing questions founders usually ask",
    faqDescription: "Clear expectations help keep the purchase decision simple.",
    newsletterTitle: "Get launch offers and pricing updates",
    newsletterButton: "Join the list",
    tiers: [
      {
        name: "Free",
        price: "$0",
        description: "For founders who need a fast first-pass validation report.",
        features: [
          "Core SaaS idea validation report",
          "Score breakdown across 6 dimensions",
          "Recommended niche angle and next-step plan",
          "Access to example reports and blog content"
        ],
        cta: "Start Free"
      },
      {
        name: "Pro",
        price: "$24/mo",
        description: "For solo founders actively validating multiple concepts.",
        features: [
          "Everything in Free",
          "Saved reports and idea history",
          "Deeper report notes and reusable validation checklists",
          "Priority access to new examples and launch templates"
        ],
        cta: "Choose Pro"
      },
      {
        name: "Studio",
        price: "$79/mo",
        description: "For agencies, venture studios, and small product teams reviewing multiple bets.",
        features: [
          "Everything in Pro",
          "Team seats and shared report access",
          "Founder workshop templates",
          "Priority support and roadmap feedback"
        ],
        cta: "Choose Studio"
      }
    ]
  },
  zh: {
    eyebrow: "定价",
    title: "为“先验证再开建”的创始人准备的简单定价",
    description:
      "先免费使用；当你需要保存报告、复用验证流程，或与团队共享时，再升级即可。",
    faqEyebrow: "常见问题",
    faqTitle: "创始人在看定价时最常问的问题",
    faqDescription: "把预期讲清楚，才能让购买决策更轻。",
    newsletterTitle: "获取上线优惠与定价更新",
    newsletterButton: "加入列表",
    tiers: [
      {
        name: "免费版",
        price: "$0",
        description: "适合只想快速做一次初步验证的创始人。",
        features: [
          "基础版 SaaS 想法验证报告",
          "6 个核心维度的评分拆解",
          "推荐细分切口与下一步验证计划",
          "可访问示例报告和博客内容"
        ],
        cta: "免费开始"
      },
      {
        name: "Pro",
        price: "$24/月",
        description: "适合正在积极验证多个方向的个人创始人。",
        features: [
          "包含免费版全部能力",
          "保存报告与想法历史记录",
          "更深入的报告说明与可复用验证清单",
          "优先获取新示例和上线模板"
        ],
        cta: "选择 Pro"
      },
      {
        name: "Studio",
        price: "$79/月",
        description: "适合代理机构、venture studio 和同时评估多个机会的小团队。",
        features: [
          "包含 Pro 全部能力",
          "团队席位与共享报告",
          "创始人工作坊模板",
          "优先支持与路线图反馈"
        ],
        cta: "选择 Studio"
      }
    ]
  }
} as const;

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.pricing.title,
    description: copy.pageMeta.pricing.description,
    pathname: "/pricing",
    keywords: ["saas idea validator pricing", "startup idea validator pricing", "saas idea validation tool pricing"]
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = pricingPageCopy[resolvedLocale];
  const faqs = getPricingFaqs(resolvedLocale);

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            breadcrumbSchema([
              { name: resolvedLocale === "zh" ? "首页" : "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: resolvedLocale === "zh" ? "定价" : "Pricing", path: localizedStaticPath(resolvedLocale, "pricing") }
            ]),
            faqSchema(faqs)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: resolvedLocale === "zh" ? "首页" : "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: resolvedLocale === "zh" ? "定价" : "Pricing", href: localizedStaticPath(resolvedLocale, "pricing") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {copy.tiers.map((tier) => (
            <article key={tier.name} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{tier.name}</h2>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{tier.price}</p>
              <p className="mt-4 leading-7 text-slate-600">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{tier.cta}</ButtonLink>
              </div>
            </article>
          ))}
        </section>
        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle} description={copy.faqDescription} />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
          <div>
            <NewsletterForm source={`pricing-${resolvedLocale}`} title={copy.newsletterTitle} buttonLabel={copy.newsletterButton} />
          </div>
        </section>
      </div>
    </main>
  );
}

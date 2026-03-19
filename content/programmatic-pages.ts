import type { Locale } from "@/lib/i18n";

export type ProgrammaticPage = {
  slug: string;
  slugByLocale?: Partial<Record<Locale, string>>;
  title: string;
  description: string;
  h1: string;
  translations?: Partial<
    Record<
      Locale,
      {
        title: string;
        description: string;
        h1: string;
        ctaTitle: string;
        ctaCopy: string;
      }
    >
  >;
  intro: string[];
  painPoints: string[];
  exampleIdeas: string[];
  validationFramework: string[];
  ctaTitle: string;
  ctaCopy: string;
};

export const programmaticPages: ProgrammaticPage[] = [
  {
    slug: "validate-healthcare-saas-idea",
    slugByLocale: {
      zh: "验证医疗saas想法"
    },
    title: "Validate a Healthcare SaaS Idea Before You Build",
    description:
      "Use a healthcare SaaS validation framework to assess demand, compliance friction, monetization, and founder fit before committing to a build.",
    translations: {
      zh: {
        title: "在开建前验证医疗 SaaS 想法",
        description: "用医疗 SaaS 验证框架评估需求、合规摩擦、变现潜力和创始人匹配度。",
        h1: "在开建前验证医疗 SaaS 想法",
        ctaTitle: "给你的医疗 SaaS 想法打分",
        ctaCopy: "先用 SaaS Idea Validator 压测需求、竞争和 MVP 复杂度，再决定是否进入合规投入更高的开发阶段。"
      }
    },
    h1: "Validate a Healthcare SaaS Idea Before You Build",
    intro: [
      "Healthcare SaaS ideas often look attractive because the pain is real and the budgets can be meaningful. They also fail faster when founders underestimate compliance, workflow change, and the time it takes to win trust.",
      "This page gives healthcare founders a practical way to validate an idea before building. Focus on the buyer, the workflow pain, and the narrow use case that can survive a long sales cycle."
    ],
    painPoints: [
      "Stakeholders are fragmented across operators, clinicians, administrators, and IT buyers.",
      "Compliance expectations can turn a simple-looking MVP into a slow enterprise project.",
      "Founders often target broad system-wide transformation before proving one urgent job."
    ],
    exampleIdeas: [
      "Prior authorization workflow tracker for specialty clinics",
      "Patient no-show reduction assistant for high-volume practices",
      "Credentialing status dashboard for multi-location provider groups"
    ],
    validationFramework: [
      "Start with one workflow owner and one measurable bottleneck.",
      "Map compliance constraints before you scope the MVP.",
      "Charge for a manual pilot if the pain touches revenue, staffing, or patient throughput.",
      "Treat trust and proof as first-class product requirements from day one."
    ],
    ctaTitle: "Score your healthcare SaaS idea",
    ctaCopy:
      "Use the main SaaS Idea Validator to pressure-test demand, competition, and MVP complexity before you spend on compliance-heavy product work."
  },
  {
    slug: "micro-saas-ideas-for-recruiters",
    slugByLocale: {
      zh: "招聘行业微型saas想法"
    },
    title: "Micro SaaS Ideas for Recruiters That Are Worth Validating",
    description:
      "Explore practical micro SaaS ideas for recruiters and learn how to validate buyer pain, workflow fit, and monetization before building.",
    translations: {
      zh: {
        title: "值得验证的招聘行业 Micro SaaS 想法",
        description: "探索适合招聘行业的 Micro SaaS 想法，并在开发前验证痛点、流程匹配和变现方式。",
        h1: "招聘行业的 Micro SaaS 想法",
        ctaTitle: "把招聘 SaaS 想法放进验证器",
        ctaCopy: "生成结构化报告，查看你的招聘 SaaS 概念在需求、风险和下一步验证动作上的表现。"
      }
    },
    h1: "Micro SaaS Ideas for Recruiters",
    intro: [
      "Recruiting is full of repetitive, high-friction workflows that look perfect for micro SaaS. The trap is building another generic productivity tool without proving that recruiters will change process or pay for the outcome.",
      "The strongest recruiter micro SaaS ideas sit close to placement speed, hiring manager confidence, or recruiter time leverage. That is where budgets and urgency live."
    ],
    painPoints: [
      "Candidate screening and summary creation eat a large share of recruiter time.",
      "Recruiters constantly translate raw applicant data into client-ready narratives.",
      "Tools that add steps without improving placements rarely survive."
    ],
    exampleIdeas: [
      "Candidate brief generator for agency recruiters",
      "Interview feedback consolidation tool for startup hiring teams",
      "Passive candidate pipeline tracker for independent recruiters"
    ],
    validationFramework: [
      "Pick one recruiter segment and one repeatable workflow.",
      "Validate whether the problem affects placements, client retention, or weekly time savings.",
      "Offer a manual done-for-you beta before building self-serve software.",
      "Use proof examples in outreach instead of abstract AI claims."
    ],
    ctaTitle: "Run the recruiter idea through the tool",
    ctaCopy:
      "Generate a structured report with scores, risks, and next-step validation actions tailored to your recruiter SaaS concept."
  },
  {
    slug: "industry-saas-ideas-for-accountants",
    slugByLocale: {
      zh: "会计行业saas想法"
    },
    title: "Industry SaaS Ideas for Accountants and Bookkeeping Firms",
    description:
      "Find accounting SaaS ideas and use a founder-friendly framework to validate workflow pain, differentiation, and pricing before you build.",
    translations: {
      zh: {
        title: "面向会计师与代账公司的行业 SaaS 想法",
        description: "寻找会计行业 SaaS 想法，并用创始人友好的框架验证流程痛点、差异化和定价。",
        h1: "会计行业 SaaS 想法",
        ctaTitle: "验证你的会计 SaaS 方向",
        ctaCopy: "用核心验证器先评估变现、竞争压力和受众清晰度，再决定是否进入垂直 SaaS 开发。"
      }
    },
    h1: "Industry SaaS Ideas for Accountants",
    intro: [
      "Accounting teams already live inside multiple tools, templates, and recurring client workflows. That makes the category attractive for vertical SaaS, but only if the product removes a painful operational bottleneck instead of adding one more dashboard.",
      "A good accounting SaaS idea usually reduces review time, improves client coordination, or removes manual cleanup work that scales poorly during close or tax season."
    ],
    painPoints: [
      "Seasonal workload spikes create demand for focused workflow tools.",
      "Accountants are skeptical of software that interrupts review processes.",
      "Generic automation claims feel weak unless tied to auditability or turnaround time."
    ],
    exampleIdeas: [
      "Client document chase system for bookkeeping firms",
      "Month-end close checklist tracker for fractional finance teams",
      "Categorization review queue for firms handling ecommerce bookkeeping"
    ],
    validationFramework: [
      "Identify a workflow that happens every week or every month.",
      "Interview firms about missed deadlines, rework, and client coordination pain.",
      "Price around throughput or review-time savings, not feature count.",
      "Keep the first MVP narrow enough to fit inside existing accounting workflows."
    ],
    ctaTitle: "Validate your accounting SaaS angle",
    ctaCopy:
      "Use the core validator to score monetization, competition pressure, and audience clarity before building a vertical SaaS product."
  },
  {
    slug: "how-to-validate-an-ai-startup-idea",
    slugByLocale: {
      zh: "如何验证ai创业想法"
    },
    title: "How to Validate an AI Startup Idea Without Getting Lost in the Hype",
    description:
      "Learn how to validate an AI startup idea with a practical framework centered on buyer pain, distribution, trust, and monetization.",
    translations: {
      zh: {
        title: "如何验证一个 AI 创业想法",
        description: "学习如何用一套围绕买家痛点、分发、信任和变现的实用框架来验证 AI 创业想法。",
        h1: "如何验证一个 AI 创业想法",
        ctaTitle: "压测你的 AI 创业想法",
        ctaCopy: "先生成需求、竞争、MVP 简洁度和下一步动作的报告，再决定是否去做 AI SaaS。"
      }
    },
    h1: "How to Validate an AI Startup Idea",
    intro: [
      "AI startup ideas can feel compelling because the feature velocity is high and the demos look impressive. Validation still comes down to old fundamentals: a painful problem, a clear buyer, a believable workflow change, and a business model that survives the cost structure.",
      "The best AI startup ideas are not just technically possible. They are easy to explain, easy to test with real users, and narrow enough to win distribution before the category gets louder."
    ],
    painPoints: [
      "Many AI ideas describe a capability, not a painful business problem.",
      "Founders underestimate trust, data quality, and change-management friction.",
      "Crowded AI positioning increases the burden of differentiation."
    ],
    exampleIdeas: [
      "Sales call follow-up assistant for founder-led B2B teams",
      "Proposal drafting copilot for boutique service agencies",
      "Internal knowledge retrieval tool for multi-brand ecommerce operators"
    ],
    validationFramework: [
      "State the workflow problem before you mention the model.",
      "Test whether buyers care enough to change process or budget.",
      "Use service-assisted pilots to learn where trust breaks down.",
      "Build proof assets and case studies before broad launch."
    ],
    ctaTitle: "Pressure-test your AI startup idea",
    ctaCopy:
      "Generate a report with demand, competition, MVP simplicity, and founder-oriented next steps before you build an AI SaaS product."
  }
];

export function getProgrammaticPageByLocaleSlug(locale: Locale, slug: string) {
  return programmaticPages.find((page) => (page.slugByLocale?.[locale] ?? page.slug) === slug);
}

export function getProgrammaticPageSlug(locale: Locale, page: ProgrammaticPage) {
  return page.slugByLocale?.[locale] ?? page.slug;
}

export function getLocalizedProgrammaticPage(page: ProgrammaticPage, locale: Locale) {
  const translation = page.translations?.[locale];

  return {
    ...page,
    slug: getProgrammaticPageSlug(locale, page),
    title: translation?.title ?? page.title,
    description: translation?.description ?? page.description,
    h1: translation?.h1 ?? page.h1,
    ctaTitle: translation?.ctaTitle ?? page.ctaTitle,
    ctaCopy: translation?.ctaCopy ?? page.ctaCopy
  };
}

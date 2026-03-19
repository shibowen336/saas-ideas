import type { Locale } from "@/lib/i18n";

type ProgrammaticPageTranslation = {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  painPoints: string[];
  exampleIdeas: string[];
  validationFramework: string[];
  ctaTitle: string;
  ctaCopy: string;
};

export type ProgrammaticPage = {
  slug: string;
  slugByLocale?: Partial<Record<Locale, string>>;
  title: string;
  description: string;
  h1: string;
  translations?: Partial<Record<Locale, ProgrammaticPageTranslation>>;
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
        description:
          "用医疗 SaaS 验证框架评估需求、合规摩擦、变现潜力和创始人匹配度，再决定是否投入开发。",
        h1: "在开建前验证医疗 SaaS 想法",
        intro: [
          "医疗 SaaS 想法看起来很诱人，因为痛点真实、预算也可能不低。但如果创始人低估了合规、工作流变更和信任建立的难度，这类方向往往也会更快暴露问题。",
          "这页内容给的是一套更实操的验证方式。先盯住买家、工作流痛点，以及一个足够窄、能穿过长销售周期的使用场景。"
        ],
        painPoints: [
          "利益相关方常常分散在运营、临床、管理层和 IT 采购之间。",
          "合规要求会把一个看起来简单的 MVP 迅速推成慢节奏的企业项目。",
          "很多创始人一上来就想做系统级改造，却还没有先证明某个紧迫任务真的值得做。"
        ],
        exampleIdeas: [
          "面向专科诊所的先授权工作流追踪器",
          "高接诊量门诊的患者爽约降低助手",
          "多院区服务提供者集团的资质认证状态看板"
        ],
        validationFramework: [
          "先锁定一个工作流负责人和一个可衡量的瓶颈。",
          "在定义 MVP 之前先梳理合规约束。",
          "如果痛点直接影响收入、 staffing 或患者流转，优先尝试收费的手动试点。",
          "从第一天起就把信任和证据当成产品要求，而不是上线后的补丁。"
        ],
        ctaTitle: "给你的医疗 SaaS 想法打分",
        ctaCopy:
          "先用 SaaS Idea Validator 压测需求、竞争和 MVP 复杂度，再决定是否进入合规投入更重的开发阶段。"
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
        description:
          "探索适合招聘行业的 Micro SaaS 想法，并在开建前验证买家痛点、工作流匹配度和变现方式。",
        h1: "招聘行业的 Micro SaaS 想法",
        intro: [
          "招聘工作里充满重复、摩擦高的流程，看起来很适合做成 Micro SaaS。真正的陷阱在于，你可能做出了另一个泛泛的效率工具，却没有先证明招聘方愿意改变流程或为结果买单。",
          "更强的招聘类 Micro SaaS 想法，通常靠近 placement 速度、用人经理信心，或者招聘顾问的时间杠杆。预算和紧迫性往往就藏在这些地方。"
        ],
        painPoints: [
          "候选人筛选和摘要整理会吃掉招聘顾问大量时间。",
          "招聘人员经常需要把零散申请数据整理成能给客户看的故事化材料。",
          "任何增加步骤、却不能提升成单或交付效率的工具，都很难长期留存。"
        ],
        exampleIdeas: [
          "猎头机构的候选人摘要生成器",
          "创业公司招聘团队的面试反馈整合工具",
          "独立招聘顾问的被动候选人管道追踪器"
        ],
        validationFramework: [
          "先选一个招聘细分人群和一个重复发生的工作流。",
          "验证这个问题是否影响成单率、客户续约，或者每周可节省的时间。",
          "先用手动代做 beta 交付结果，再决定要不要做成自助软件。",
          "在外联里展示真实样例，而不是抽象的 AI 口号。"
        ],
        ctaTitle: "把招聘 SaaS 想法放进验证器",
        ctaCopy:
          "生成结构化报告，看看你的招聘 SaaS 概念在需求、风险和下一步验证动作上表现如何。"
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
        description:
          "寻找会计行业 SaaS 想法，并用更适合创始人的框架验证工作流痛点、差异化和定价。",
        h1: "会计行业 SaaS 想法",
        intro: [
          "会计团队本来就在多个工具、模板和重复客户流程之间来回切换，所以这个领域看起来很适合做垂直 SaaS。但前提是，你的产品真的在消除某个痛苦瓶颈，而不是再多加一个需要学习的看板。",
          "一个好的会计 SaaS 想法，通常会减少复核时间、改善客户协作，或者替代那些在关账季和报税季特别容易放大的手工清理工作。"
        ],
        painPoints: [
          "季节性工作高峰会放大对聚焦型工作流工具的需求。",
          "会计团队对任何打断复核流程的软件都天然谨慎。",
          "如果不能直接关联可审计性或周转时间，泛泛的自动化承诺通常说服力很弱。"
        ],
        exampleIdeas: [
          "代账公司客户材料催收系统",
          "Fractional 财务团队的月末关账清单追踪器",
          "面向电商代账业务的分类复核队列"
        ],
        validationFramework: [
          "优先选择每周或每月都会发生的工作流。",
          "访谈事务所，了解他们在截止时间、返工和客户协作上的真实痛点。",
          "围绕吞吐量提升或复核时间节省来定价，而不是围绕功能数量。",
          "让第一版 MVP 足够窄，能自然嵌进现有会计工作流里。"
        ],
        ctaTitle: "验证你的会计 SaaS 方向",
        ctaCopy:
          "用核心验证器先评估变现、竞争压力和受众清晰度，再决定是否投入垂直 SaaS 开发。"
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
        title: "如何在不被热度带偏的情况下验证 AI 创业想法",
        description:
          "学习如何用一套围绕买家痛点、分发、信任和变现的实用框架来验证 AI 创业想法。",
        h1: "如何验证 AI 创业想法",
        intro: [
          "AI 创业想法之所以容易让人兴奋，是因为功能迭代快、demo 也容易做得很惊艳。但真正的验证仍然回到老问题：痛点够不够痛、买家是否清晰、流程改变是否可信，以及商业模型是否能撑住成本结构。",
          "最好的 AI 创业方向，不只是技术上做得出来。它还必须容易解释、容易和真实用户测试，并且足够窄，能在类目越来越拥挤之前先拿到分发。"
        ],
        painPoints: [
          "很多 AI 想法描述的是能力，而不是具体而痛苦的业务问题。",
          "创始人经常低估信任、数据质量和流程切换摩擦。",
          "拥挤的 AI 定位会显著提高差异化的要求。"
        ],
        exampleIdeas: [
          "创始人主导 B2B 销售团队的通话跟进助手",
          "精品服务代理商的提案起草 copilot",
          "多品牌电商运营团队的内部知识检索工具"
        ],
        validationFramework: [
          "在提到模型之前，先把工作流问题说清楚。",
          "测试买家是否真的愿意为流程改变或预算调整买单。",
          "通过服务辅助式试点观察信任在哪一步断掉。",
          "在大规模上线前先准备好证据资产和案例。"
        ],
        ctaTitle: "压测你的 AI 创业想法",
        ctaCopy:
          "先生成一份覆盖需求、竞争、MVP 简洁度和下一步动作的报告，再决定是否开做 AI SaaS。"
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
  let normalizedSlug = slug;

  try {
    normalizedSlug = decodeURIComponent(slug);
  } catch {
    normalizedSlug = slug;
  }

  return programmaticPages.find(
    (page) => (page.slugByLocale?.[locale] ?? page.slug) === normalizedSlug
  );
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
    intro: translation?.intro ?? page.intro,
    painPoints: translation?.painPoints ?? page.painPoints,
    exampleIdeas: translation?.exampleIdeas ?? page.exampleIdeas,
    validationFramework: translation?.validationFramework ?? page.validationFramework,
    ctaTitle: translation?.ctaTitle ?? page.ctaTitle,
    ctaCopy: translation?.ctaCopy ?? page.ctaCopy
  };
}

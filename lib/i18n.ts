import { absoluteUrl } from "@/lib/site";

export const locales = ["en", "zh"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

type StaticRouteKey =
  | "home"
  | "about"
  | "pricing"
  | "faq"
  | "examples"
  | "blog"
  | "tool"
  | "report"
  | "programmatic";

const staticRouteSegments: Record<StaticRouteKey, string> = {
  home: "",
  about: "about",
  pricing: "pricing",
  faq: "faq",
  examples: "examples",
  blog: "blog",
  tool: "tool/saas-idea-validator",
  report: "tool/saas-idea-validator/report",
  programmatic: "programmatic"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value?: string): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function getLocalePrefix(locale: Locale) {
  return `/${locale}`;
}

export function localizedPath(locale: Locale, path = "/") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${getLocalePrefix(locale)}${normalized}`;
}

export function localizedStaticPath(locale: Locale, routeKey: StaticRouteKey) {
  const segment = staticRouteSegments[routeKey];
  return segment ? localizedPath(locale, `/${segment}`) : localizedPath(locale, "/");
}

export function buildLanguageAlternates(
  pathByLocale: Record<Locale, string>,
  currentLocale: Locale
) {
  return {
    canonical: absoluteUrl(pathByLocale[currentLocale]),
    languages: {
      en: absoluteUrl(pathByLocale.en),
      "zh-CN": absoluteUrl(pathByLocale.zh),
      "x-default": absoluteUrl(pathByLocale.en)
    }
  };
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "zh" ? "zh_CN" : "en_US";
}

export const uiCopy = {
  en: {
    localeName: "English",
    switchLabel: "中文",
    nav: {
      home: "Home",
      tool: "Tool",
      examples: "Examples",
      blog: "Blog",
      pricing: "Pricing",
      faq: "FAQ"
    },
    cta: {
      validate: "Validate My Idea",
      example: "See Example Report"
    },
    footer: {
      eyebrow: "SaaS idea validation for founders",
      title: "Validate faster, narrow smarter, and build with evidence instead of guesswork.",
      description:
        "Get founder-focused reports covering demand, audience clarity, monetization, competition pressure, and practical next-step tests.",
      newsletterTitle: "Get validation frameworks and launch notes",
      newsletterButton: "Join free",
      product: "Product",
      content: "Content",
      exampleReports: "SaaS idea validation examples",
      aiStartupValidation: "How to validate an AI startup idea",
      recruiterIdeas: "Micro SaaS ideas for recruiters",
      about: "About",
      builtFor: "Built for indie hackers, solo founders, and product builders."
    },
    pageMeta: {
      home: {
        title: "Validate Your SaaS Idea Before You Build | SaaS Idea Validator",
        description:
          "Validate a SaaS idea before you build. SaaS Idea Validator scores demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions."
      },
      about: {
        title: "About SaaS Idea Validator",
        description:
          "Learn why SaaS Idea Validator exists and how it helps founders validate startup ideas before spending months on the wrong build."
      },
      pricing: {
        title: "Pricing",
        description:
          "Compare SaaS Idea Validator pricing for founders, solopreneurs, and teams. Free validation reports, saved reports, and collaboration plans."
      },
      faq: {
        title: "FAQ",
        description:
          "Answers to common questions about SaaS Idea Validator, idea scoring, report interpretation, pricing, and founder validation workflows."
      },
      examples: {
        title: "SaaS Idea Validation Examples and Startup Idea Scoring Reports",
        description:
          "Browse SaaS idea validation examples, startup idea scoring reports, and founder-focused breakdowns for AI SaaS, ecommerce SaaS, and vertical SaaS ideas."
      },
      blog: {
        title: "SaaS Idea Validation Blog and Founder Guides",
        description:
          "Practical founder guides on how to validate a SaaS idea, micro SaaS ideas, AI SaaS ideas, startup validation, and SaaS pricing validation."
      },
      tool: {
        title: "SaaS Idea Validation Tool | SaaS Idea Validator",
        description:
          "Use the SaaS Idea Validator tool to validate a SaaS idea with scoring for demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions."
      },
      report: {
        title: "SaaS Idea Validation Report",
        description:
          "Review a SaaS idea validation report with scores for demand, competition, audience clarity, monetization, MVP simplicity, and next-step actions."
      }
    },
    schema: {
      websiteDescription:
        "Validate a SaaS idea before you build. Score demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions.",
      softwareFeatures: [
        "SaaS idea scoring",
        "Demand and competition analysis",
        "Monetization and MVP assessment",
        "Founder-oriented validation checklist",
        "Differentiation and positioning suggestions"
      ]
    }
  },
  zh: {
    localeName: "简体中文",
    switchLabel: "EN",
    nav: {
      home: "首页",
      tool: "工具",
      examples: "示例",
      blog: "博客",
      pricing: "定价",
      faq: "常见问题"
    },
    cta: {
      validate: "验证我的想法",
      example: "查看示例报告"
    },
    footer: {
      eyebrow: "面向创始人的 SaaS 想法验证工具",
      title: "更快验证，更早收窄方向，用证据而不是猜测决定是否开建。",
      description:
        "获取聚焦创始人场景的验证报告，覆盖需求、受众清晰度、变现潜力、竞争压力和下一步验证动作。",
      newsletterTitle: "获取验证框架与产品更新",
      newsletterButton: "免费订阅",
      product: "产品",
      content: "内容",
      exampleReports: "示例报告",
      aiStartupValidation: "AI 创业想法验证",
      recruiterIdeas: "招聘行业微型 SaaS 想法",
      about: "关于我们",
      builtFor: "面向独立开发者、单人创始人和产品团队。"
    },
    pageMeta: {
      home: {
        title: "在开建前验证你的 SaaS 想法",
        description:
          "SaaS Idea Validator 帮助创始人在动手开发前评估需求、竞争、受众清晰度、变现潜力、MVP 复杂度和下一步验证动作。"
      },
      about: {
        title: "关于 SaaS Idea Validator",
        description:
          "了解 SaaS Idea Validator 为什么存在，以及它如何帮助创始人在投入数月开发前先验证创业想法。"
      },
      pricing: {
        title: "定价",
        description:
          "查看 SaaS Idea Validator 面向创始人、独立开发者与团队的定价方案，包含免费报告、保存报告与协作能力。"
      },
      faq: {
        title: "常见问题",
        description:
          "了解 SaaS Idea Validator 的评分方式、报告解读方式、定价与创始人验证工作流。"
      },
      examples: {
        title: "SaaS 想法验证报告示例",
        description:
          "查看更有真实感的 SaaS 想法验证报告示例，涵盖电商、代理商软件、AI SaaS 和细分定位。"
      },
      blog: {
        title: "博客",
        description:
          "面向创始人的 SaaS 想法验证内容，覆盖微型 SaaS、AI SaaS、验证框架与市场研究。"
      },
      tool: {
        title: "SaaS Idea Validator 工具",
        description:
          "使用 SaaS Idea Validator 工具评估需求、竞争、受众清晰度、变现潜力、MVP 简洁度与下一步动作。"
      },
      report: {
        title: "SaaS 想法验证报告",
        description:
          "查看包含需求、竞争、受众清晰度、变现潜力、MVP 简洁度和下一步动作的 SaaS 想法验证报告。"
      }
    },
    schema: {
      websiteDescription:
        "在开建前验证你的 SaaS 想法。评估需求、竞争、受众清晰度、变现潜力、MVP 复杂度和下一步验证动作。",
      softwareFeatures: [
        "SaaS 想法评分",
        "需求与竞争分析",
        "变现与 MVP 评估",
        "面向创始人的验证清单",
        "差异化与定位建议"
      ]
    }
  }
} as const;

export function getUiCopy(locale: Locale) {
  return uiCopy[locale];
}

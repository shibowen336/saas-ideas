import type { Locale } from "@/lib/i18n";
import { clamp } from "@/lib/utils";

export type ValidationScores = {
  overallScore: number;
  problemUrgencyScore: number;
  audienceClarityScore: number;
  competitionPressure: number;
  monetizationPotential: number;
  mvpSimplicity: number;
  goToMarketEase: number;
};

export type ValidationExperiment = {
  title: string;
  detail: string;
  expectedSignal: string;
};

export type ValidationReport = ValidationScores & {
  idea: string;
  targetCustomer: string;
  problem: string;
  pricingIdea: string;
  currentAlternatives: string;
  founderAdvantage?: string;
  distributionPlan?: string;
  evidence?: string;
  ideaStage?: string;
  verdict: string;
  recommendation?: string;
  confidenceLabel?: string;
  executiveSummary?: string[];
  strengths?: string[];
  weaknesses?: string[];
  scoreRationales?: Array<{
    label: string;
    explanation: string;
  }>;
  risks: string[];
  differentiationSuggestions: string[];
  recommendedNicheAngle: string;
  nextStepValidationPlan: string[];
  validationExperiments?: ValidationExperiment[];
  launchChannels?: string[];
  mvpMustHave?: string[];
  mvpAvoidNow?: string[];
  pricingCommentary?: string;
  samplePositioningStatement: string;
  sampleLandingPageHeadline: string;
};

type ValidationInput = {
  idea?: string;
  targetCustomer?: string;
  problem?: string;
  pricingIdea?: string;
  currentAlternatives?: string;
  founderAdvantage?: string;
  distributionPlan?: string;
  evidence?: string;
  ideaStage?: string;
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function hasContent(value: string) {
  return value.trim().length > 0;
}

function keywordBoost(value: string, matches: string[]) {
  const text = value.toLowerCase();
  return matches.reduce((score, token) => score + (text.includes(token) ? 6 : 0), 0);
}

function recommendationLabel(score: number, locale: Locale) {
  if (locale === "zh") {
    if (score >= 75) return "继续验证，并争取拿下 1 到 3 个付费试点";
    if (score >= 63) return "收窄切口，再做一轮高信号验证";
    return "暂缓开发，先重写受众、问题和分发假设";
  }

  if (score >= 75) return "Keep validating and push toward 1 to 3 paid pilots";
  if (score >= 63) return "Narrow the wedge and run another round of high-signal validation";
  return "Pause development and rewrite the audience, problem, and distribution thesis";
}

function confidenceLabel(
  locale: Locale,
  evidenceScore: number,
  founderAdvantageScore: number,
  distributionScore: number
) {
  const total = evidenceScore + founderAdvantageScore + distributionScore;

  if (locale === "zh") {
    if (total >= 26) return "较高把握";
    if (total >= 16) return "中等把握";
    return "低把握";
  }

  if (total >= 26) return "Higher confidence";
  if (total >= 16) return "Moderate confidence";
  return "Low confidence";
}

export function buildValidationReport(
  input: ValidationInput,
  locale: Locale = "en"
): ValidationReport {
  const defaults =
    locale === "zh"
      ? {
          idea: "面向 Shopify 店铺的 AI onboarding 助手",
          targetCustomer: "经营小型 Shopify 品牌的创始人",
          problem: "店铺创始人没有时间为新客户手动搭建 onboarding 邮件、产品教育和售后支持流程。",
          pricingIdea: "每月 49 美元，覆盖最多 1,000 次新客 onboarding 会话",
          currentAlternatives: "代理商、通用邮件自动化工具和人工售后流程",
          founderAdvantage: "你已经熟悉 Shopify 场景，并且能直接联系到第一批品牌卖家。",
          distributionPlan: "通过 Shopify 社群、生命周期营销顾问和电商品牌创始人外联获取前 20 个线索。",
          evidence: "已经和 3 位店铺创始人聊过，他们都承认售后 onboarding 做得很粗糙。",
          ideaStage: "idea"
        }
      : {
          idea: "AI onboarding assistant for Shopify stores",
          targetCustomer: "Founders running small Shopify brands",
          problem:
            "Store owners do not have time to manually create onboarding emails, product education, and support flows for new customers.",
          pricingIdea: "$49 per month for up to 1,000 new customer sessions",
          currentAlternatives:
            "Agencies, generic email automation tools, and manual support playbooks",
          founderAdvantage:
            "You already understand the Shopify ecosystem and can reach the first wave of brand operators directly.",
          distributionPlan:
            "Reach the first 20 prospects through Shopify communities, lifecycle consultants, and direct outreach to ecommerce founders.",
          evidence:
            "You have already spoken with 3 store owners who admit post-purchase onboarding is inconsistent and under-owned.",
          ideaStage: "idea"
        };

  const idea = input.idea?.trim() || defaults.idea;
  const targetCustomer = input.targetCustomer?.trim() || defaults.targetCustomer;
  const problem = input.problem?.trim() || defaults.problem;
  const pricingIdea = input.pricingIdea?.trim() || defaults.pricingIdea;
  const currentAlternatives = input.currentAlternatives?.trim() || defaults.currentAlternatives;
  const founderAdvantage = input.founderAdvantage?.trim() || defaults.founderAdvantage;
  const distributionPlan = input.distributionPlan?.trim() || defaults.distributionPlan;
  const evidence = input.evidence?.trim() || defaults.evidence;
  const ideaStage = input.ideaStage?.trim() || defaults.ideaStage;

  const urgencyBase =
    42 +
    Math.min(wordCount(problem) * 2, 22) +
    keywordBoost(problem, [
      "urgent",
      "lost",
      "manual",
      "revenue",
      "churn",
      "pain",
      "流失",
      "手动",
      "收入",
      "低效",
      "重复"
    ]);
  const audienceBase =
    38 +
    Math.min(wordCount(targetCustomer) * 3, 27) +
    keywordBoost(targetCustomer, [
      "founder",
      "agency",
      "shopify",
      "developer",
      "marketer",
      "创始人",
      "开发者",
      "电商",
      "顾问"
    ]);
  const monetizationBase =
    36 +
    Math.min(wordCount(pricingIdea) * 3, 21) +
    keywordBoost(pricingIdea, [
      "per month",
      "subscription",
      "annual",
      "$",
      "team",
      "每月",
      "订阅",
      "年付",
      "按量"
    ]);
  const mvpBase =
    62 -
    Math.min(wordCount(idea), 10) +
    keywordBoost(idea, [
      "dashboard",
      "plugin",
      "assistant",
      "analyzer",
      "generator",
      "workflow",
      "助手",
      "生成器",
      "流程"
    ]);
  const gtmBase =
    40 +
    Math.min(wordCount(distributionPlan) * 2, 16) +
    keywordBoost(distributionPlan, [
      "reddit",
      "slack",
      "newsletter",
      "community",
      "shopify",
      "outreach",
      "社群",
      "外联",
      "顾问",
      "内容"
    ]);
  const competitionBase =
    35 +
    Math.min(wordCount(currentAlternatives) * 2, 26) +
    keywordBoost(currentAlternatives, [
      "spreadsheet",
      "notion",
      "chatgpt",
      "hubspot",
      "airtable",
      "agency",
      "表格",
      "人工",
      "代理商"
    ]);

  const founderAdvantageScore = hasContent(founderAdvantage)
    ? clamp(6 + Math.min(wordCount(founderAdvantage), 18), 0, 12)
    : 0;
  const evidenceScore = hasContent(evidence) ? clamp(8 + Math.min(wordCount(evidence), 18), 0, 14) : 0;
  const distributionScore = hasContent(distributionPlan)
    ? clamp(6 + Math.min(wordCount(distributionPlan), 16), 0, 12)
    : 0;

  const problemUrgencyScore = clamp(urgencyBase + Math.floor(evidenceScore / 2), 35, 94);
  const audienceClarityScore = clamp(audienceBase + Math.floor(founderAdvantageScore / 2), 34, 96);
  const monetizationPotential = clamp(monetizationBase + Math.floor(evidenceScore / 3), 33, 93);
  const mvpSimplicity = clamp(mvpBase + Math.floor(founderAdvantageScore / 3), 28, 90);
  const goToMarketEase = clamp(gtmBase + distributionScore, 30, 92);
  const competitionPressure = clamp(competitionBase, 18, 91);

  const overallScore = Math.round(
    (problemUrgencyScore +
      audienceClarityScore +
      monetizationPotential +
      mvpSimplicity +
      goToMarketEase +
      (100 - competitionPressure)) /
      6
  );

  const isZh = locale === "zh";

  const verdict =
    overallScore >= 76
      ? isZh
        ? "这个方向具备继续深入验证的基础，但重点应该放在拿到付费试点，而不是先做完整产品。"
        : "This idea is strong enough to keep validating, but the next move should be paid pilots, not a full product build."
      : overallScore >= 63
        ? isZh
          ? "方向有潜力，但还没强到足以直接开建。你需要先把细分切口、买家和分发路径讲得更尖。"
          : "There is real potential here, but not enough to justify building immediately. The wedge, buyer, and distribution story still need sharpening."
        : isZh
          ? "目前更像一个宽泛概念，而不是 ready-to-build 的机会。先重写 thesis，再做验证。"
          : "Right now this looks more like a broad concept than a build-ready opportunity. Rewrite the thesis before you invest in product.";

  const strengths = isZh
    ? [
        problemUrgencyScore >= 70
          ? "痛点本身有真实紧迫性，适合拿去做访谈和付费试点。"
          : "问题存在，但还需要更多“为什么现在就要解决”的证据。",
        audienceClarityScore >= 68
          ? "目标买家足够清晰，已经接近可以写定向 landing page 的程度。"
          : "受众边界仍然偏宽，需要进一步缩小到一个可直接触达的工作角色。",
        goToMarketEase >= 65
          ? "分发路径已经比较具体，适合先走高触达验证。"
          : "分发计划还偏抽象，应该先明确前 20 个线索从哪里来。"
      ]
    : [
        problemUrgencyScore >= 70
          ? "The pain looks urgent enough to justify interviews and paid pilots."
          : "The problem exists, but the “why now” evidence still needs work.",
        audienceClarityScore >= 68
          ? "The buyer is specific enough to support focused positioning and landing-page copy."
          : "The audience boundary is still too wide and should be narrowed to one reachable role.",
        goToMarketEase >= 65
          ? "The distribution story is already concrete enough for high-touch validation."
          : "The distribution plan is still abstract and should spell out where the first 20 leads come from."
      ];

  const weaknesses = isZh
    ? [
        competitionPressure >= 62
          ? "替代方案太多，除非切口更窄，否则会显得像 another tool。"
          : "竞争不是最大问题，关键在于能否讲出一个更聚焦的切口。",
        monetizationPotential < 62
          ? "定价逻辑还不够扎实，需要更清晰地绑定 ROI、时间节省或收入恢复。"
          : "定价方向有基础，但仍然需要用试点验证真实付费意愿。",
        mvpSimplicity < 58
          ? "第一版产品边界不够克制，容易在交付前就把复杂度拉满。"
          : "第一版有机会保持足够轻，但要主动控制功能膨胀。"
      ]
    : [
        competitionPressure >= 62
          ? "There are too many substitutes unless the wedge gets narrower and more opinionated."
          : "Competition is manageable; the real issue is whether the wedge is sharp enough.",
        monetizationPotential < 62
          ? "Pricing still feels soft and needs a tighter link to ROI, time saved, or revenue recovered."
          : "Pricing has a credible direction, but willingness to pay still needs real pilot proof.",
        mvpSimplicity < 58
          ? "The first version risks getting too complex before the core thesis is proven."
          : "The MVP can stay relatively lean, but only if scope is actively constrained."
      ];

  const risks = isZh
    ? [
        competitionPressure > 65
          ? "市场话术已经很拥挤，如果不做更明确的切口，价值主张会迅速同质化。"
          : "竞争不算致命，但必须避免把定位讲成一个泛化的生产力工具。",
        audienceClarityScore < 60
          ? "目标用户仍然偏宽，会拖慢访谈、信息测试和冷启动分发。"
          : "受众已经有一定清晰度，可以开始做更聚焦的外联和验证内容。",
        hasContent(evidence)
          ? "你已经有初步证据，但还不够形成可公开复用的 proof asset。"
          : "目前缺少一手证据，报告里的很多结论还只是合理假设。"
      ]
    : [
        competitionPressure > 65
          ? "The market language is already crowded, so the proposition will commoditize quickly without a tighter wedge."
          : "Competition is not fatal, but the offer cannot sound like another generic productivity layer.",
        audienceClarityScore < 60
          ? "The target customer is still broad enough to slow down interviews, message tests, and early distribution."
          : "The audience is clear enough to support focused outreach and positioning experiments.",
        hasContent(evidence)
          ? "You have early evidence, but not enough proof assets yet to make the offer self-selling."
          : "There is still too little first-hand evidence, so several conclusions remain informed assumptions."
      ];

  const differentiationSuggestions = isZh
    ? [
        `把切口压缩成一个更具体的结果，而不是一个更大的产品类别。优先围绕“${targetCustomer}”来讲。`,
        `所有表达都应该回到这个具体问题：${problem}`,
        "如果你现在只能说“我们更智能/更自动化”，那还不够。你需要一句能把旧方案打掉的价值陈述。"
      ]
    : [
        `Compress the wedge around a sharper outcome, not a broader category. Start with "${targetCustomer}".`,
        `Tie every message back to this concrete problem: ${problem}`,
        "If the only difference is “smarter” or “more automated,” the positioning still is not sharp enough."
      ];

  const recommendedNicheAngle = isZh
    ? `优先把它定义成服务于“${targetCustomer}”的单一高价值工作流工具，而不是一开始就做成大而全平台。`
    : `Position it first as a single high-value workflow tool for "${targetCustomer}" instead of a broad platform.`;

  const nextStepValidationPlan = isZh
    ? [
        "先约 5 到 8 位理想买家，逐字验证问题陈述是否真能引发共鸣。",
        "做一个单页 landing page，只保留一个受众、一个问题和一个结果承诺。",
        "用手动或 concierge 方式交付一次结果，确认用户是否愿意为真实输出买单。",
        "把第一轮反馈整理成案例、截图或对话摘录，形成下一轮销售和验证资产。"
      ]
    : [
        "Interview 5 to 8 ideal buyers and test whether the problem statement creates immediate resonance.",
        "Build a one-page landing page with one audience, one problem, and one promised outcome.",
        "Deliver the promise manually once through a concierge workflow and test willingness to pay for the result.",
        "Turn the first feedback loop into proof assets: screenshots, quotes, or a short case study."
      ];

  const validationExperiments = isZh
    ? [
        {
          title: "问题访谈",
          detail: `和 ${targetCustomer} 逐个访谈，确认这个问题是不是高频、痛苦，而且今天已经在消耗时间或收入。`,
          expectedSignal: "对方会主动补充具体场景、旧方案和不满意之处。"
        },
        {
          title: "定位烟雾测试",
          detail: "用一个 landing page 和一段冷启动外联测试标题、结果承诺和 CTA 是否击中目标买家。",
          expectedSignal: "出现回复、预约、waitlist 或愿意看 demo 的信号。"
        },
        {
          title: "手动试点",
          detail: "在完全自动化前，先手动提供一次核心价值，确认结果是否值得付费。",
          expectedSignal: "用户愿意继续试用、付小额试点费，或至少投入真实时间配合。"
        }
      ]
    : [
        {
          title: "Problem interviews",
          detail: `Run direct interviews with ${targetCustomer} to verify that the problem is frequent, painful, and already costing time or revenue.`,
          expectedSignal: "Buyers describe the pain in their own words and volunteer current workarounds."
        },
        {
          title: "Positioning smoke test",
          detail: "Test the headline, promised outcome, and CTA with a landing page plus outbound or niche-community traffic.",
          expectedSignal: "Replies, demo requests, waitlist signups, or pilot interest from the intended segment."
        },
        {
          title: "Manual pilot",
          detail: "Deliver the core outcome manually before automation to see whether the result is genuinely worth paying for.",
          expectedSignal: "A user gives time, data, or money to keep the workflow moving."
        }
      ];

  const launchChannels = isZh
    ? [
        distributionPlan,
        "优先走高触达渠道，而不是一开始就押注广泛 SEO 或广告。",
        "如果你已经有行业关系，就先把它用在前 10 个对话上。"
      ]
    : [
        distributionPlan,
        "Favor high-touch channels before broad SEO or paid acquisition.",
        "If you already have niche relationships, use them for the first 10 conversations."
      ];

  const mvpMustHave = isZh
    ? [
        "一个足够窄、能直接解决核心问题的单一工作流。",
        "能证明结果的最小输出物，例如报告、提醒、摘要或自动执行动作。",
        "可用于试点反馈的基础追踪与人工干预能力。"
      ]
    : [
        "One narrow workflow that directly addresses the core pain.",
        "A minimal output that proves value: report, alert, summary, or workflow action.",
        "Basic instrumentation and manual override so pilots can teach you quickly."
      ];

  const mvpAvoidNow = isZh
    ? [
        "过早做成平台或一口气接太多集成。",
        "在没有证据前就做复杂权限、团队协作或 BI 视图。",
        "为了看起来完整而加一堆解释不清的 AI 功能。"
      ]
    : [
        "Turning the first version into a platform or a multi-integration suite.",
        "Complex permissions, collaboration, or analytics views before the core proof exists.",
        "Padding the MVP with AI features that make the offer harder to explain."
      ];

  const pricingCommentary = isZh
    ? `当前定价假设是“${pricingIdea}”。更专业的做法是把价格锚定在替代方案成本、时间节省或收入改善上，而不是锚定在你做了多少功能。`
    : `The current pricing angle is "${pricingIdea}". A stronger pricing thesis anchors price to the cost of alternatives, time saved, or revenue impact, not to how many features are included.`;

  const scoreRationales = [
    {
      label: isZh ? "问题紧迫度" : "Problem urgency",
      explanation:
        problemUrgencyScore >= 70
          ? isZh
            ? "这个问题已经接近“值得立即行动”的级别，适合先做需求确认和付费试点。"
            : "This pain is strong enough to justify immediate buyer validation and early paid pilot tests."
          : isZh
            ? "问题方向没错，但你还需要更多“为什么今天就要解决”的证据。"
            : "The direction is valid, but the case for “why now” still needs better evidence."
    },
    {
      label: isZh ? "受众清晰度" : "Audience clarity",
      explanation:
        audienceClarityScore >= 68
          ? isZh
            ? "受众已经足够清晰，可以开始做窄受众 landing page 和外联。"
            : "The buyer is clear enough for focused landing-page copy and outbound validation."
          : isZh
            ? "买家轮廓还不够尖，需要收窄到一个更具体的角色或场景。"
            : "The buyer shape is still too broad and should narrow to a more specific role or context."
    },
    {
      label: isZh ? "竞争压力" : "Competition pressure",
      explanation:
        competitionPressure >= 62
          ? isZh
            ? "竞争压力不低，因此定位必须明显窄于现有替代方案。"
            : "Competitive pressure is meaningful, so the wedge must be clearly narrower than existing substitutes."
          : isZh
            ? "竞争可控，但仍需要讲清楚为什么你比旧方案更值得切换。"
            : "Competition is manageable, but the switch-from-old-solution story still needs to be explicit."
    },
    {
      label: isZh ? "变现潜力" : "Monetization potential",
      explanation:
        monetizationPotential >= 68
          ? isZh
            ? "这个方向已经能看出围绕业务结果定价的可能性。"
            : "There is a credible path to pricing around measurable business value."
          : isZh
            ? "定价逻辑还偏弱，需要和 ROI 或时间节省更强绑定。"
            : "Pricing still feels soft and should be tied more directly to ROI or time saved."
    },
    {
      label: isZh ? "MVP 简洁度" : "MVP simplicity",
      explanation:
        mvpSimplicity >= 62
          ? isZh
            ? "第一版有机会保持克制，前提是你主动控制范围。"
            : "The first version can stay lean if you deliberately control scope."
          : isZh
            ? "第一版边界过宽，需要砍掉平台化想象。"
            : "The first version is still too broad and needs a tighter product boundary."
    },
    {
      label: isZh ? "获客可行性" : "Go-to-market ease",
      explanation:
        goToMarketEase >= 65
          ? isZh
            ? "你已经有比较清晰的获客路径，可以先走高触达验证。"
            : "The path to the first users is concrete enough to support high-touch validation."
          : isZh
            ? "分发还需要更具体，尤其是前 20 个线索从哪里来。"
            : "Distribution still needs more specificity, especially around where the first 20 leads come from."
    }
  ];

  return {
    idea,
    targetCustomer,
    problem,
    pricingIdea,
    currentAlternatives,
    founderAdvantage,
    distributionPlan,
    evidence,
    ideaStage,
    overallScore,
    problemUrgencyScore,
    audienceClarityScore,
    competitionPressure,
    monetizationPotential,
    mvpSimplicity,
    goToMarketEase,
    verdict,
    recommendation: recommendationLabel(overallScore, locale),
    confidenceLabel: confidenceLabel(locale, evidenceScore, founderAdvantageScore, distributionScore),
    executiveSummary: isZh
      ? [
          "这不是一个可以直接盲做的想法，但它已经足够明确，值得继续验证。",
          `最关键的下一步不是加功能，而是确认“${targetCustomer}”是否真的愿意为这个结果付费。`,
          "如果你能用更窄的切口拿下前 1 到 3 个试点，这个方向才真正开始成立。"
        ]
      : [
          "This is not a blind-build idea, but it is specific enough to keep validating.",
          `The next move is not more features. It is proving that ${targetCustomer.toLowerCase()} will pay for the outcome.`,
          "The opportunity becomes real only after a narrower wedge earns the first 1 to 3 pilots."
        ],
    strengths,
    weaknesses,
    scoreRationales,
    risks,
    differentiationSuggestions,
    recommendedNicheAngle,
    nextStepValidationPlan,
    validationExperiments,
    launchChannels,
    mvpMustHave,
    mvpAvoidNow,
    pricingCommentary,
    samplePositioningStatement: isZh
      ? `${idea} 帮助 ${targetCustomer} 更快解决“${problem}”，而不必继续依赖 ${currentAlternatives}。`
      : `${idea} helps ${targetCustomer.toLowerCase()} solve ${problem.toLowerCase()} without relying on ${currentAlternatives.toLowerCase()}.`,
    sampleLandingPageHeadline: isZh
      ? `在你花几个月去开发“${idea}”之前，先验证它是不是一门真生意。`
      : `Validate whether ${idea.toLowerCase()} is a real business before spending months building it.`
  };
}

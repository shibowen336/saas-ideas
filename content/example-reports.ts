import type { Locale } from "@/lib/i18n";
import type { ValidationReport } from "@/lib/report";

export type ExampleReport = ValidationReport & {
  slug: string;
  category: string;
  summary: string;
  longFormInsights: Array<{
    title: string;
    paragraphs: string[];
  }>;
  translations?: Partial<
    Record<
      Locale,
      {
        category: string;
        idea: string;
        targetCustomer: string;
        problem: string;
        pricingIdea: string;
        currentAlternatives: string;
        verdict: string;
        risks: string[];
        differentiationSuggestions: string[];
        recommendedNicheAngle: string;
        nextStepValidationPlan: string[];
        samplePositioningStatement: string;
        sampleLandingPageHeadline: string;
        summary: string;
        longFormInsights: Array<{
          title: string;
          paragraphs: string[];
        }>;
      }
    >
  >;
};

export const exampleReports: ExampleReport[] = [
  {
    slug: "shopify-onboarding-assistant",
    category: "Ecommerce SaaS",
    idea: "AI onboarding assistant for Shopify stores",
    targetCustomer: "Bootstrapped Shopify brands doing 50 to 500 orders per month",
    problem:
      "Founders lose repeat purchases because new customers do not get timely onboarding, education, or support after checkout.",
    pricingIdea: "$49 per month plus usage tiers for larger stores",
    currentAlternatives: "Klaviyo templates, agencies, support inboxes, and manual email sequences",
    overallScore: 78,
    problemUrgencyScore: 82,
    audienceClarityScore: 79,
    competitionPressure: 58,
    monetizationPotential: 76,
    mvpSimplicity: 72,
    goToMarketEase: 81,
    verdict: "Promising niche workflow product with a clear monetization path.",
    risks: [
      "Messaging can blur into generic AI customer support positioning if the onboarding wedge is not protected.",
      "Integration expectations may expand quickly beyond a focused first MVP.",
      "Founders may compare the tool against broader lifecycle suites instead of a single high-value job."
    ],
    differentiationSuggestions: [
      "Own post-purchase onboarding for stores with a small team instead of generic support automation.",
      "Show revenue recovery metrics tied to education flows and repeat purchase behavior.",
      "Launch with concierge onboarding audits and templates before deep product automation."
    ],
    recommendedNicheAngle:
      "Position it as the onboarding revenue layer for lean Shopify brands that need lifecycle automation without an agency retainer.",
    nextStepValidationPlan: [
      "Interview 10 store owners about repeat purchase drop-off and post-purchase support workload.",
      "Offer a manual onboarding sequence audit for three pilot stores.",
      "Test a landing page with a benchmark headline and a book-a-demo CTA.",
      "Measure if founders will share order volume and lifecycle metrics during discovery."
    ],
    samplePositioningStatement:
      "SaaS Idea Validator helps lean Shopify brands turn post-purchase onboarding into repeat revenue without hiring an agency.",
    sampleLandingPageHeadline:
      "Turn first orders into repeat customers with onboarding flows built for lean Shopify teams.",
    summary:
      "This idea scored well because the audience is narrow, the pain ties to revenue, and the product can start as a focused workflow tool instead of a full-suite platform.",
    longFormInsights: [
      {
        title: "Why the score is strong",
        paragraphs: [
          "The strongest part of this concept is the combination of a real business outcome and a reachable buyer. Shopify founders already understand post-purchase retention, which makes the problem easier to sell than a vague AI productivity pitch.",
          "The audience is specific enough to support direct outreach. You can find these founders through communities, Shopify agencies, lifecycle newsletters, and ecommerce podcasts without needing a broad brand campaign."
        ]
      },
      {
        title: "What could weaken it",
        paragraphs: [
          "The risk is expansion. If the first version tries to own support, email, SMS, reviews, and customer data all at once, the product becomes expensive to build and hard to explain.",
          "The wedge should remain narrow: onboarding and education after the first purchase. That creates cleaner proof, simpler case studies, and a more believable MVP."
        ]
      }
    ],
    translations: {
      zh: {
        category: "电商 SaaS",
        idea: "面向 Shopify 店铺的 AI onboarding 助手",
        targetCustomer: "每月 50 到 500 单、以自举方式经营的 Shopify 品牌",
        problem: "创始人会丢掉复购，因为新客户在下单后没有及时获得 onboarding、教育内容和售后支持。",
        pricingIdea: "每月 49 美元，高使用量店铺进入更高阶梯",
        currentAlternatives: "Klaviyo 模板、代理商、客服收件箱，以及人工邮件流程",
        verdict: "这是个很有潜力的细分工作流产品，变现路径也相对清晰。",
        risks: [
          "如果没有守住 onboarding 这个切口，信息表达很容易滑向泛化的 AI 客服定位。",
          "集成诉求可能很快膨胀，导致第一版 MVP 失焦。",
          "创始人可能会拿它去和更宽的生命周期套件比较，而不是拿它解决一个高价值单点任务。"
        ],
        differentiationSuggestions: [
          "优先占住小团队 Shopify 品牌的售后 onboarding，而不是泛泛的支持自动化。",
          "展示与教育流程和复购行为直接挂钩的收入回收指标。",
          "先用高触达 onboarding 审计和模板服务切入，再逐步深入自动化。"
        ],
        recommendedNicheAngle:
          "把它定位成精简 Shopify 品牌的 onboarding 收入层，让他们不必雇代理商也能做好生命周期自动化。",
        nextStepValidationPlan: [
          "访谈 10 位店铺创始人，了解复购流失和售后 onboarding 工作量。",
          "为 3 家试点店铺提供手动 onboarding 流程审计。",
          "测试一个带 benchmark headline 和预约演示 CTA 的落地页。",
          "观察创始人是否愿意在发现阶段分享订单量和生命周期指标。"
        ],
        samplePositioningStatement:
          "SaaS Idea Validator 帮助精简 Shopify 品牌把售后 onboarding 变成复购收入，而不需要额外雇佣代理商。",
        sampleLandingPageHeadline:
          "为精简 Shopify 团队打造的 onboarding 流程，把首单客户变成复购客户。",
        summary:
          "这个想法得分较高，因为受众足够窄、痛点直接连到收入，而且产品可以先从聚焦的工作流工具切入，而不是一开始就做成全家桶平台。",
        longFormInsights: [
          {
            title: "为什么它的分数不错",
            paragraphs: [
              "这个方向最强的地方，是把清晰的商业结果和一个能直接触达的买家群体绑在了一起。Shopify 创始人本来就理解售后留存，所以这类问题比泛化的 AI 效率工具更容易卖。",
              "受众也足够具体，适合直接外联。你可以通过社区、Shopify 代理商、生命周期营销通讯和电商播客找到他们，而不需要先砸一个大品牌。"
            ]
          },
          {
            title: "什么因素会削弱它",
            paragraphs: [
              "最大的风险是扩张失控。如果第一版就试图同时接管客服、邮件、短信、评论和客户数据，产品会变得既难做又难解释。",
              "更好的做法是始终守住首单之后的 onboarding 与教育这个楔子。这样更容易做出明确证据、案例和可信的 MVP。"
            ]
          }
        ]
      }
    }
  },
  {
    slug: "agency-roi-reporting",
    category: "Marketing SaaS",
    idea: "Client ROI reporting tool for performance marketing agencies",
    targetCustomer: "Small agencies managing paid media for B2B SaaS and local service clients",
    problem:
      "Agency founders spend too much time stitching data into monthly reports and still struggle to prove business impact to clients.",
    pricingIdea: "$149 per month for up to 15 client accounts",
    currentAlternatives: "Looker Studio, spreadsheets, manual slide decks, and full enterprise BI tools",
    overallScore: 74,
    problemUrgencyScore: 79,
    audienceClarityScore: 77,
    competitionPressure: 68,
    monetizationPotential: 81,
    mvpSimplicity: 61,
    goToMarketEase: 66,
    verdict: "Viable agency SaaS if the wedge stays outcome-focused instead of dashboard-heavy.",
    risks: [
      "Reporting software is crowded and buyers are skeptical of another dashboard.",
      "Integrations can consume roadmap time before the core narrative is proven.",
      "Agencies vary widely in what counts as ROI, so templates must be opinionated."
    ],
    differentiationSuggestions: [
      "Lead with client retention and renewal risk instead of generic reporting speed.",
      "Start with one agency segment and one reporting workflow.",
      "Package strategic commentary prompts with the reporting output."
    ],
    recommendedNicheAngle:
      "Own the monthly renewal narrative for boutique agencies that need to translate channel data into client value quickly.",
    nextStepValidationPlan: [
      "Run 8 interviews with agency owners who currently build reports manually.",
      "Prototype one opinionated ROI template for agencies serving SaaS clients.",
      "Charge for a done-for-you beta before building self-serve dashboards.",
      "Test willingness to pay against churn reduction, not report creation time alone."
    ],
    samplePositioningStatement:
      "The product helps boutique agencies turn scattered campaign data into client-ready ROI stories that improve retention.",
    sampleLandingPageHeadline:
      "Stop sending channel screenshots. Show clients the ROI story that keeps retainers alive.",
    summary:
      "The idea has clear revenue linkage and buyers who already pay for tooling, but success depends on resisting the urge to become a generic analytics platform.",
    longFormInsights: [
      {
        title: "Why this is attractive",
        paragraphs: [
          "Agencies feel the pain every month, and the cost is not only operational time. Weak reporting threatens renewals. That is a strong monetization anchor.",
          "The buyer is reachable through agency communities, founder circles, and niche podcasts. You can validate with direct conversations instead of broad inbound demand."
        ]
      },
      {
        title: "How to avoid a commodity product",
        paragraphs: [
          "Generic dashboards are a commodity. The product needs to package interpretation, renewal risk visibility, and client-ready narrative structure.",
          "If the beta starts as a high-touch service plus templates, the founder can learn what the report actually needs to say before building deep integrations."
        ]
      }
    ],
    translations: {
      zh: {
        category: "营销 SaaS",
        idea: "面向效果营销代理商的客户 ROI 报告工具",
        targetCustomer: "服务 B2B SaaS 和本地服务客户的小型付费广告代理商",
        problem: "代理商创始人要花很多时间拼月报数据，但仍然难以向客户证明业务影响。",
        pricingIdea: "每月 149 美元，最多覆盖 15 个客户账户",
        currentAlternatives: "Looker Studio、Excel、手工幻灯片和企业级 BI 工具",
        verdict: "如果切口能始终围绕结果而不是重报表面板，它就是个可行的代理商 SaaS。",
        risks: [
          "报表软件赛道很拥挤，买家也对“又一个 dashboard”天然怀疑。",
          "在核心叙事尚未成立前，集成工作可能会吞掉大量路线图时间。",
          "不同代理商对 ROI 的定义差异很大，所以模板必须带有明确主张。"
        ],
        differentiationSuggestions: [
          "优先强调客户留存和续约风险，而不是泛泛的报表提速。",
          "从一个代理商细分群体和一种报告工作流切入。",
          "把策略解读提示和报告输出打包在一起。"
        ],
        recommendedNicheAngle:
          "占住精品代理商每月续约叙事这个位置，帮他们更快把渠道数据翻译成客户能感知的价值。",
        nextStepValidationPlan: [
          "访谈 8 位目前还在手工做报表的代理商老板。",
          "为服务 SaaS 客户的代理商做一个有主张的 ROI 模板原型。",
          "先收费提供代做 beta，而不是一开始就做自助式仪表盘。",
          "测试付费意愿时，围绕降低流失而不是仅仅节省制表时间。"
        ],
        samplePositioningStatement:
          "这款产品帮助精品代理商把零散的广告数据整理成客户能看懂的 ROI 故事，从而提升续约率。",
        sampleLandingPageHeadline:
          "别再发一堆渠道截图了。给客户看能保住 retainer 的 ROI 故事。",
        summary:
          "这个方向和收入的联系很明确，买家也本来就在为工具付费。但它是否成功，取决于你能不能忍住不把它做成泛化分析平台。",
        longFormInsights: [
          {
            title: "为什么这个方向有吸引力",
            paragraphs: [
              "代理商每个月都会感受到这个痛点，而且成本不只是时间。报告做得差，会直接威胁续约，这给了产品很强的变现锚点。",
              "买家也比较容易触达。你可以通过代理商社区、创始人圈子和细分播客去做直接验证，而不是先依赖宽泛的 inbound。"
            ]
          },
          {
            title: "如何避免做成同质化产品",
            paragraphs: [
              "泛化 dashboard 已经很商品化了。你的产品必须同时交付解读能力、续约风险可见性，以及客户看得懂的叙事结构。",
              "如果 beta 先以高触达服务加模板的形式开始，创始人会更快学到一份报告真正需要说什么，再决定哪些集成值得做深。"
            ]
          }
        ]
      }
    }
  },
  {
    slug: "ai-recruiter-screening-copilot",
    category: "HR Tech",
    idea: "AI screening copilot for technical recruiters",
    targetCustomer: "Independent technical recruiters placing engineers into startups",
    problem:
      "Recruiters lose time screening applicants and writing candidate briefs for hiring managers while still needing a defensible quality bar.",
    pricingIdea: "$99 per recruiter per month",
    currentAlternatives: "Manual resume reviews, ATS workflows, and generic AI writing tools",
    overallScore: 69,
    problemUrgencyScore: 74,
    audienceClarityScore: 71,
    competitionPressure: 72,
    monetizationPotential: 70,
    mvpSimplicity: 63,
    goToMarketEase: 63,
    verdict: "Potentially solid, but the category needs sharper positioning and trust signals.",
    risks: [
      "AI hiring claims attract skepticism and higher trust requirements.",
      "Recruiters need proof that screening quality improves, not just speed.",
      "The product can drift into regulated or high-risk decisions if positioning is careless."
    ],
    differentiationSuggestions: [
      "Focus on candidate brief drafting and calibration support instead of automated hiring decisions.",
      "Target independent recruiters first, where workflow flexibility is higher.",
      "Show side-by-side examples of stronger hiring-manager briefs."
    ],
    recommendedNicheAngle:
      "Frame it as a recruiter copilot that improves candidate briefs and screening consistency rather than replacing recruiter judgment.",
    nextStepValidationPlan: [
      "Interview 6 recruiters about how they currently prepare candidate summaries.",
      "Offer a pilot where you manually draft higher-quality briefs using AI assistance.",
      "Collect before-and-after feedback from hiring managers.",
      "Avoid decision-automation language in positioning until trust is established."
    ],
    samplePositioningStatement:
      "This copilot helps independent technical recruiters create sharper candidate briefs without outsourcing judgment to a black-box model.",
    sampleLandingPageHeadline:
      "Write better candidate briefs in minutes and keep recruiter judgment in the loop.",
    summary:
      "The problem is real, but trust and crowded AI messaging lower the score. Tight positioning can still create a valuable niche product.",
    longFormInsights: [
      {
        title: "Why it still matters",
        paragraphs: [
          "Recruiters live on time leverage. If the product improves candidate presentation quality while reducing manual work, the offer can support premium pricing.",
          "The wedge is strongest when the product helps recruiters look better to hiring managers rather than pretending to automate judgment."
        ]
      },
      {
        title: "What the founder should validate first",
        paragraphs: [
          "The right first test is a service-led pilot, not a dashboard. You need proof that recruiters like the output and that hiring managers trust it.",
          "That feedback loop will tell you whether the product should live inside existing ATS workflows or remain a lighter external assistant."
        ]
      }
    ],
    translations: {
      zh: {
        category: "HR Tech",
        idea: "面向技术招聘顾问的 AI screening copilot",
        targetCustomer: "把工程师推荐给创业公司的独立技术招聘顾问",
        problem: "招聘顾问需要花大量时间筛简历、写候选人摘要，同时还必须保证筛选质量能自圆其说。",
        pricingIdea: "每位招聘顾问每月 99 美元",
        currentAlternatives: "人工筛简历、ATS 工作流和通用 AI 写作工具",
        verdict: "这个方向有潜力，但需要更尖锐的定位和更强的信任信号。",
        risks: [
          "AI 招聘相关表述天然会引发怀疑，也带来更高的信任门槛。",
          "招聘顾问需要看到筛选质量真的变好，而不只是速度变快。",
          "如果定位不够克制，产品可能会滑向更受监管或高风险的决策场景。"
        ],
        differentiationSuggestions: [
          "优先聚焦候选人摘要起草和筛选校准支持，而不是自动化招聘决策。",
          "先瞄准独立招聘顾问，他们的工作流灵活度更高。",
          "展示更强 hiring manager brief 的前后对比样例。"
        ],
        recommendedNicheAngle:
          "把它定义成提升候选人摘要质量和筛选一致性的招聘 copilot，而不是取代招聘顾问判断。",
        nextStepValidationPlan: [
          "访谈 6 位招聘顾问，了解他们现在如何准备候选人摘要。",
          "提供一个试点，用 AI 辅助人工产出更高质量的 brief。",
          "收集 hiring manager 的前后反馈。",
          "在建立信任前，定位里避免使用自动决策相关表述。"
        ],
        samplePositioningStatement:
          "这款 copilot 帮助独立技术招聘顾问写出更清晰的候选人摘要，同时不把判断权交给黑箱模型。",
        sampleLandingPageHeadline:
          "几分钟写出更好的候选人摘要，同时把招聘判断牢牢握在你手里。",
        summary:
          "问题是真实存在的，但信任门槛和拥挤的 AI 叙事压低了得分。只要定位更窄，仍然能做成有价值的细分产品。",
        longFormInsights: [
          {
            title: "为什么它仍然值得看",
            paragraphs: [
              "招聘顾问天然依赖时间杠杆。如果产品能一边提升候选人展示质量，一边减少手工工作，它就有机会支撑更高定价。",
              "这个方向最强的楔子，是帮助招聘顾问在 hiring manager 面前显得更专业，而不是假装替他们做判断。"
            ]
          },
          {
            title: "创始人最先该验证什么",
            paragraphs: [
              "第一轮测试最适合做服务化试点，而不是直接做 dashboard。你需要先证明招聘顾问喜欢输出结果、hiring manager 也信任它。",
              "这个反馈回路会告诉你，产品更应该嵌进现有 ATS，还是保持成一个更轻的外部助手。"
            ]
          }
        ]
      }
    }
  }
];

export function getLocalizedExampleReport(report: ExampleReport, locale: Locale) {
  const translation = report.translations?.[locale];

  return {
    ...report,
    category: translation?.category ?? report.category,
    idea: translation?.idea ?? report.idea,
    targetCustomer: translation?.targetCustomer ?? report.targetCustomer,
    problem: translation?.problem ?? report.problem,
    pricingIdea: translation?.pricingIdea ?? report.pricingIdea,
    currentAlternatives: translation?.currentAlternatives ?? report.currentAlternatives,
    verdict: translation?.verdict ?? report.verdict,
    risks: translation?.risks ?? report.risks,
    differentiationSuggestions: translation?.differentiationSuggestions ?? report.differentiationSuggestions,
    recommendedNicheAngle: translation?.recommendedNicheAngle ?? report.recommendedNicheAngle,
    nextStepValidationPlan: translation?.nextStepValidationPlan ?? report.nextStepValidationPlan,
    samplePositioningStatement:
      translation?.samplePositioningStatement ?? report.samplePositioningStatement,
    sampleLandingPageHeadline:
      translation?.sampleLandingPageHeadline ?? report.sampleLandingPageHeadline,
    summary: translation?.summary ?? report.summary,
    longFormInsights: translation?.longFormInsights ?? report.longFormInsights
  };
}

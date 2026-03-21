
import type { Locale } from "@/lib/i18n";
import type { ExternalResearchSummary } from "@/lib/report-research";
import { clamp } from "@/lib/utils";

export type ValidationScores = {
  overallScore: number;
  problemUrgencyScore: number;
  audienceClarityScore: number;
  competitionPressure: number;
  monetizationPotential: number;
  mvpSimplicity: number;
  goToMarketEase: number;
  inputCompletenessScore: number;
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
  scoreRationales?: Array<{ label: string; explanation: string }>;
  missingInputs: string[];
  methodologyNotes: string[];
  confidenceFactors: string[];
  uncertaintyNotes: string[];
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
  researchSummary?: ExternalResearchSummary;
  analysisMode?: "rules" | "rules+research" | "rules+research+ai";
};

export type ValidationInput = {
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

const K = {
  urgency: ["urgent", "manual", "revenue", "churn", "refund", "pain", "手动", "收入", "流失", "退款", "低效"],
  audience: ["founder", "owner", "operator", "agency", "shopify", "developer", "marketer", "创始人", "开发者", "电商", "顾问"],
  broadAudience: ["businesses", "companies", "teams", "everyone", "企业", "公司", "团队", "所有人"],
  pricing: ["per month", "subscription", "annual", "per seat", "per user", "$", "每月", "订阅", "年付", "按席位", "按用户", "按量"],
  roi: ["save", "faster", "reduce", "recover", "conversion", "retention", "time", "hours", "节省", "更快", "减少", "恢复", "转化", "留存", "时间"],
  distribution: ["outreach", "community", "newsletter", "seo", "reddit", "linkedin", "partner", "consultant", "content", "ads", "社群", "外联", "内容", "顾问", "合作", "广告"],
  founder: ["experience", "former", "network", "audience", "operator", "relationships", "经验", "做过", "人脉", "关系", "资源", "行业"],
  evidence: ["interview", "pilot", "paid", "preorder", "demo", "trial", "waitlist", "customer", "buyers", "访谈", "试点", "付费", "预售", "客户", "买家", "聊过"],
  complexity: ["platform", "suite", "marketplace", "all-in-one", "dashboard", "analytics", "crm", "erp", "api", "平台", "套件", "市场", "一体化", "分析", "接口"],
  simple: ["assistant", "checker", "audit", "report", "alert", "automation", "onboarding", "generator", "助手", "检查", "审计", "报告", "提醒", "自动化", "生成器"],
  competition: ["hubspot", "salesforce", "notion", "airtable", "chatgpt", "zapier", "agency", "consultant", "spreadsheet", "manual", "代理商", "顾问", "表格", "人工"]
} as const;

const norm = (value?: string) => value?.trim() ?? "";
const has = (value: string) => value.trim().length > 0;
const wc = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const lc = (value: string) => value.toLowerCase();
const hits = (value: string, list: readonly string[]) => list.reduce((n, token) => n + (lc(value).includes(token) ? 1 : 0), 0);
const hasNumber = (value: string) => /\d/.test(value);

function spec(value: string, max: number) {
  if (!has(value)) return 0;
  let score = Math.min(wc(value) * 1.4, max - 6);
  if (hasNumber(value)) score += 3;
  if (/[,:/$%()\-]/.test(value)) score += 2;
  if (value.length > 100) score += 1;
  return clamp(Math.round(score), 0, max);
}

function stageBonus(stage: string) {
  if (stage === "mvp") return 8;
  if (stage === "pilot") return 6;
  if (stage === "interviews") return 4;
  return 0;
}

function fieldName(key: keyof ValidationInput, locale: Locale) {
  const map = locale === "zh"
    ? { idea: "SaaS 想法", targetCustomer: "目标客户", problem: "问题描述", pricingIdea: "定价思路", currentAlternatives: "当前替代方案", founderAdvantage: "创始人优势", distributionPlan: "前 20 个用户来源", evidence: "已有证据", ideaStage: "当前阶段" }
    : { idea: "SaaS idea", targetCustomer: "Target customer", problem: "Problem statement", pricingIdea: "Pricing idea", currentAlternatives: "Current alternatives", founderAdvantage: "Founder advantage", distributionPlan: "Path to the first 20 users", evidence: "Existing evidence", ideaStage: "Current stage" };
  return map[key];
}

function confidenceLabel(locale: Locale, score: number) {
  if (locale === "zh") return score >= 72 ? "较高把握" : score >= 52 ? "中等把握" : "低把握";
  return score >= 72 ? "Higher confidence" : score >= 52 ? "Moderate confidence" : "Low confidence";
}

function recommendationLabel(score: number, completeness: number, locale: Locale) {
  if (locale === "zh") {
    if (score >= 74 && completeness >= 70) return "继续验证，并争取拿下 1 到 3 个付费试点";
    if (score >= 62) return "先收窄切口，再补一轮高信号验证";
    return "暂缓开发，先把受众、问题和分发假设写清楚";
  }
  if (score >= 74 && completeness >= 70) return "Keep validating and push toward 1 to 3 paid pilots";
  if (score >= 62) return "Narrow the wedge and run another round of high-signal validation";
  return "Pause development and rewrite the audience, problem, and distribution thesis";
}
export function buildValidationReport(input: ValidationInput, locale: Locale = "en"): ValidationReport {
  const isZh = locale === "zh";
  const idea = norm(input.idea) || (isZh ? "未命名 SaaS 想法" : "Untitled SaaS idea");
  const targetCustomer = norm(input.targetCustomer);
  const problem = norm(input.problem);
  const pricingIdea = norm(input.pricingIdea);
  const currentAlternatives = norm(input.currentAlternatives);
  const founderAdvantage = norm(input.founderAdvantage);
  const distributionPlan = norm(input.distributionPlan);
  const evidence = norm(input.evidence);
  const ideaStage = norm(input.ideaStage) || "idea";

  const weights: Array<[keyof ValidationInput, number]> = [["idea", 10], ["targetCustomer", 18], ["problem", 20], ["pricingIdea", 12], ["currentAlternatives", 10], ["founderAdvantage", 10], ["distributionPlan", 12], ["evidence", 8]];
  const inputCompletenessScore = weights.reduce((sum, [key, weight]) => sum + (has(norm(input[key])) ? weight : 0), 0);
  const missingInputs = weights.filter(([key]) => !has(norm(input[key]))).map(([key]) => fieldName(key, locale));

  const problemSpec = spec(problem, 24);
  const targetSpec = spec(targetCustomer, 26);
  const pricingSpec = spec(pricingIdea, 20);
  const distributionSpec = spec(distributionPlan, 20);
  const founderSpec = spec(founderAdvantage, 18);
  const evidenceSpec = spec(evidence, 22);

  const urgencySignal = hits(problem, K.urgency);
  const audienceSignal = hits(targetCustomer, K.audience);
  const broadAudienceSignal = hits(targetCustomer, K.broadAudience);
  const pricingSignal = hits(pricingIdea, K.pricing);
  const roiSignal = hits(`${problem} ${pricingIdea}`, K.roi);
  const distributionSignal = hits(distributionPlan, K.distribution);
  const founderSignal = hits(founderAdvantage, K.founder);
  const evidenceSignal = hits(evidence, K.evidence);
  const simplicitySignal = hits(idea, K.simple);
  const complexitySignal = hits(idea, K.complexity);
  const competitionSignal = hits(currentAlternatives, K.competition);
  const nicheBoost = targetSpec >= 18 ? 5 : targetSpec >= 12 ? 3 : 0;

  const evidenceStrength = has(evidence)
    ? clamp(24 + evidenceSpec + Math.min(evidenceSignal * 8, 24) + (hasNumber(evidence) ? 8 : 0) + stageBonus(ideaStage), 0, 92)
    : 0;
  const founderEdgeScore = has(founderAdvantage)
    ? clamp(18 + founderSpec + Math.min(founderSignal * 7, 21) + (hasNumber(founderAdvantage) ? 4 : 0), 0, 86)
    : 0;
  const distributionReadiness = has(distributionPlan)
    ? clamp(20 + distributionSpec + Math.min(distributionSignal * 6, 18) + (hasNumber(distributionPlan) ? 4 : 0) + stageBonus(ideaStage), 0, 88)
    : 0;

  const problemUrgencyScore = has(problem)
    ? clamp(38 + problemSpec + Math.min(urgencySignal * 5, 20) + Math.min(Math.round(evidenceStrength * 0.12), 10), 28, 92)
    : 34;
  const audienceClarityScore = has(targetCustomer)
    ? clamp(34 + targetSpec + Math.min(audienceSignal * 4, 16) + Math.min(Math.round(founderEdgeScore * 0.1), 8) - Math.min(broadAudienceSignal * 6, 16), 24, 94)
    : 32;
  const monetizationPotential = has(pricingIdea)
    ? clamp(32 + pricingSpec + Math.min(pricingSignal * 5, 20) + Math.min(roiSignal * 4, 12) + Math.min(Math.round(evidenceStrength * 0.08), 8), 24, 92)
    : clamp(34 + Math.min(roiSignal * 3, 10), 24, 48);
  const mvpSimplicity = has(idea)
    ? clamp(60 + Math.min(simplicitySignal * 5, 16) - (Math.min(complexitySignal * 6, 24) + Math.max(wc(idea) - 16, 0)) + Math.min(Math.round(founderEdgeScore * 0.06), 5), 24, 90)
    : 38;
  const goToMarketEase = has(distributionPlan)
    ? clamp(34 + distributionSpec + Math.min(distributionSignal * 5, 16) + Math.min(Math.round(founderEdgeScore * 0.08), 8) + stageBonus(ideaStage), 24, 90)
    : clamp(32 + Math.min(Math.round(founderEdgeScore * 0.08), 6), 24, 46);
  const competitionPressure = has(currentAlternatives)
    ? clamp(44 + Math.min(competitionSignal * 6, 24) + Math.min(wc(currentAlternatives), 8) - nicheBoost, 22, 90)
    : 54;

  const rawScore = (problemUrgencyScore + audienceClarityScore + monetizationPotential + mvpSimplicity + goToMarketEase + (100 - competitionPressure)) / 6;
  const overallScore = clamp(Math.round(rawScore * (0.82 + inputCompletenessScore / 100 / 5.6)), 24, 92);
  const confidenceScore = clamp(Math.round(inputCompletenessScore * 0.42 + evidenceStrength * 0.26 + founderEdgeScore * 0.14 + distributionReadiness * 0.18), 18, 94);

  const confidenceFactors = [
    has(evidence) ? (isZh ? "你提供了真实证据输入，这会提高结论的可信度。" : "You provided first-hand evidence, which makes the report less assumption-heavy.") : null,
    has(distributionPlan) ? (isZh ? "你写清了前 20 个用户的获取路径，这让 GTM 判断更可信。" : "You described how the first 20 users could arrive, which makes the GTM assessment more credible.") : null,
    has(founderAdvantage) ? (isZh ? "你解释了创始人优势，因此报告能更具体地评估 early advantage。" : "You explained founder advantage, so the report can assess early edge more concretely.") : null
  ].filter((item): item is string => Boolean(item));

  const methodologyNotes = isZh
    ? ["这份报告优先使用你提供的买家、问题、定价、替代方案、分发和证据信息做第一轮判断。", "缺失字段不会再被默认样例自动补齐，而是直接降低得分可信度和建议强度。", "它更适合做创始人判断和验证优先级排序，不应该被当成真实市场需求证明。"]
    : ["This report uses the buyer, problem, pricing, alternatives, distribution, and evidence you entered as the basis for a first-pass assessment.", "Missing fields are no longer padded with sample data; they directly reduce confidence and make the score more conservative.", "Use the output as a founder decision aid and validation planner, not as proof of market demand."];

  const uncertaintyNotes = [
    !has(problem) ? (isZh ? "你没有写清问题痛点、频率或代价，所以问题紧迫度判断偏保守。" : "The problem statement is thin or missing, so the urgency score is intentionally conservative.") : null,
    !has(targetCustomer) ? (isZh ? "目标客户缺失时，受众清晰度和定位建议会明显变弱。" : "Without a specific target customer, audience clarity and positioning guidance stay weak.") : null,
    !has(pricingIdea) ? (isZh ? "没有定价假设时，变现潜力只能按中低置信度估算。" : "Without a pricing thesis, monetization potential is only a low-confidence estimate.") : null,
    !has(currentAlternatives) ? (isZh ? "没有列出替代方案时，竞争压力只能按通用替代品保守推测。" : "Without explicit alternatives, competition pressure is inferred from generic substitutes only.") : null,
    !has(distributionPlan) ? (isZh ? "没有首批获客路径时，GTM 判断基本只是理论推演。" : "Without a concrete path to the first users, go-to-market ease remains mostly theoretical.") : null,
    !has(evidence) ? (isZh ? "目前缺少访谈、试点或付费信号，所以这份报告仍然有较强假设成分。" : "There is still little interview, pilot, or payment evidence, so the report remains assumption-heavy.") : null
  ].filter((item): item is string => Boolean(item));
  const topDimension = [
    { key: "problem", score: problemUrgencyScore },
    { key: "audience", score: audienceClarityScore },
    { key: "monetization", score: monetizationPotential },
    { key: "mvp", score: mvpSimplicity },
    { key: "gtm", score: goToMarketEase }
  ].sort((a, b) => b.score - a.score)[0]?.key;

  const executiveSummary = isZh
    ? [
        inputCompletenessScore >= 75 ? `这份报告已经建立在较完整的输入上，综合得分为 ${overallScore}/100。` : `当前输入完整度为 ${inputCompletenessScore}/100，所以综合得分 ${overallScore}/100 应该按保守参考理解。`,
        topDimension === "problem" ? "目前最强的部分是问题定义，说明你已经接近可以做高质量买家访谈。" : topDimension === "audience" ? "目前最强的部分是受众清晰度，说明定位已经接近可以写定向 landing page。" : topDimension === "gtm" ? "目前最强的部分是获客路径，这让早期验证和高触达销售更可执行。" : "报告显示这个方向至少有一个核心维度已经具备继续验证的基础。",
        uncertaintyNotes.length > 0 ? "真正需要优先补的不是更多功能，而是缺失信息带来的判断盲区。" : "下一步重点不是扩大产品范围，而是尽快把最强假设变成真实证据。"
      ]
    : [
        inputCompletenessScore >= 75 ? `This report is based on relatively complete input, with an overall score of ${overallScore}/100.` : `Input coverage is only ${inputCompletenessScore}/100, so the ${overallScore}/100 score should be treated as conservative guidance rather than proof.`,
        topDimension === "problem" ? "The strongest signal right now is the problem definition, which means buyer interviews can be productive quickly." : topDimension === "audience" ? "Audience clarity is the strongest part of the thesis, so focused positioning and outbound tests are feasible." : topDimension === "gtm" ? "The clearest signal is the path to early users, which makes high-touch validation more realistic." : "At least one core dimension is strong enough to justify another round of validation.",
        uncertaintyNotes.length > 0 ? "The biggest gap is not more product thinking. It is reducing the blind spots created by missing inputs." : "The next move is not expanding scope. It is turning the strongest assumptions into proof."
      ];

  const verdict = overallScore >= 76 && confidenceScore >= 68
    ? (isZh ? "这个方向已经足够清晰，可以继续验证，并争取通过 1 到 3 个付费试点证明它。" : "This direction is clear enough to keep validating and should now move toward 1 to 3 paid pilots.")
    : overallScore >= 64
      ? (isZh ? "这个方向有潜力，但还不足以直接开建。先补证据、收窄切口，再决定是否投入开发。" : "There is real potential here, but not enough to justify building immediately. Tighten the wedge and add proof first.")
      : (isZh ? "目前更像一个待验证的概念，而不是 ready-to-build 的机会。先重写 thesis，再做验证。" : "Right now this looks more like an idea worth reworking, not a build-ready opportunity. Rewrite the thesis first.");

  const strengths = [
    problemUrgencyScore >= 68 ? (isZh ? "问题陈述已经比较具体，适合拿去做高质量访谈。" : "The problem statement is specific enough to support high-quality buyer interviews.") : null,
    audienceClarityScore >= 68 ? (isZh ? "目标买家足够明确，已经接近可直接写定向落地页。" : "The buyer is specific enough to support focused positioning and landing-page copy.") : null,
    goToMarketEase >= 66 ? (isZh ? "前 20 个用户的获取思路已经比较具体，适合先走高触达验证。" : "The path to the first 20 users is concrete enough for high-touch validation.") : null,
    monetizationPotential >= 66 ? (isZh ? "定价思路已经有一定业务逻辑，不完全是拍脑袋定价。" : "The pricing thesis already has some business logic behind it, not just arbitrary packaging.") : null,
    mvpSimplicity >= 64 ? (isZh ? "第一版范围有机会保持克制，不必一开始就做成平台。" : "The first version can stay focused instead of turning into a full platform too early.") : null
  ].filter((item): item is string => Boolean(item));

  const weaknesses = [
    problemUrgencyScore < 60 ? (isZh ? "问题紧迫度还不够硬，需要把频率、代价和为什么现在解决写得更实。" : "Urgency still feels soft and needs a clearer frequency, cost, and why-now argument.") : null,
    audienceClarityScore < 60 ? (isZh ? "受众边界仍然偏宽，定位会因此变得模糊。" : "The audience is still too broad, which will blur positioning and outreach.") : null,
    monetizationPotential < 60 ? (isZh ? "定价逻辑偏弱，暂时还看不出明确的 ROI 锚点。" : "Pricing logic is still soft and lacks a clear ROI anchor.") : null,
    goToMarketEase < 60 ? (isZh ? "缺少首批获客路径时，验证成本会被明显抬高。" : "Without a concrete acquisition path, validation becomes slower and more expensive.") : null,
    inputCompletenessScore < 70 ? (isZh ? "输入信息不够完整，报告里仍然有较多合理推测。" : "Input coverage is still thin, so too much of the report remains informed inference.") : null
  ].filter((item): item is string => Boolean(item));

  const scoreRationales = [
    { label: isZh ? "问题紧迫度" : "Problem urgency", explanation: !has(problem) ? (isZh ? "你没有给出足够具体的问题描述，所以这里按保守逻辑评分。补充频率、损失和现有 workaround 后，这项判断才会更可靠。" : "The problem statement is missing or vague, so this score is conservative. Add frequency, cost, and the current workaround to make it more reliable.") : urgencySignal > 0 || evidenceStrength >= 40 ? (isZh ? "问题描述里已经出现了明显的痛点信号，再加上一定证据输入，所以这项得分相对更有依据。" : "The problem description contains clear pain signals and some supporting evidence, so this score has a stronger basis.") : (isZh ? "你定义了问题，但为什么现在就值得解决还不够强。" : "The problem is defined, but the case for why it deserves attention right now is still moderate.") },
    { label: isZh ? "受众清晰度" : "Audience clarity", explanation: !has(targetCustomer) ? (isZh ? "没有明确目标买家时，受众清晰度只能按低把握处理。" : "Without a specific target customer, audience clarity stays low-confidence by default.") : broadAudienceSignal > 0 ? (isZh ? "你写了受众，但边界仍然偏宽，需要再缩到一个更具体的角色或场景。" : "You named an audience, but it is still broad and should narrow to one role or use case.") : (isZh ? "受众描述已经比较具体，足够支持定位和外联测试。" : "The audience definition is specific enough to support positioning and outreach tests.") },
    { label: isZh ? "竞争压力" : "Competition pressure", explanation: !has(currentAlternatives) ? (isZh ? "你没有列出主要替代方案，所以这里只能按常见通用替代品做保守推测。" : "You did not list current alternatives, so competition pressure is inferred conservatively from common substitutes.") : competitionSignal >= 3 ? (isZh ? "你面向的是一个已有明显替代品的场景，因此定位必须更窄、更有取舍。" : "This sits in a space with clear substitutes, so the wedge must be narrower and more opinionated.") : (isZh ? "替代方案存在，但暂时还没有显示出压倒性的拥挤度。" : "Alternatives exist, but the space does not yet look overwhelmingly crowded.") },
    { label: isZh ? "变现潜力" : "Monetization potential", explanation: !has(pricingIdea) ? (isZh ? "没有定价假设时，这项只能按中低置信度估算。" : "Without a pricing hypothesis, this is only a medium-to-low confidence estimate.") : pricingSignal > 0 && roiSignal > 0 ? (isZh ? "你已经把价格和交付价值联系起来了，因此这项判断更可信。" : "You already connected price to a delivery model or ROI signal, which makes this dimension more credible.") : (isZh ? "你有价格想法，但还需要更明确地锚定到时间节省、收入改善或替代方案成本。" : "There is a pricing idea, but it still needs a tighter link to time saved, revenue impact, or the cost of alternatives.") },
    { label: isZh ? "MVP 简洁度" : "MVP simplicity", explanation: complexitySignal >= 2 ? (isZh ? "当前想法带有平台化或大范围集成倾向，第一版容易做重。" : "The current idea leans toward platform scope or broad integrations, which makes v1 heavier.") : simplicitySignal > 0 ? (isZh ? "这个想法更像单一工作流或单一输出物，第一版有机会保持足够轻。" : "This reads more like a single workflow or output, so the first version can stay relatively lean.") : (isZh ? "MVP 范围目前还不够明确，需要主动切掉非必要能力。" : "The MVP boundary is still not explicit enough and needs deliberate scope control.") },
    { label: isZh ? "获客可行性" : "Go-to-market ease", explanation: !has(distributionPlan) ? (isZh ? "没有前 20 个用户的路径时，这项只能低把握处理。" : "Without a path to the first 20 users, this dimension stays low-confidence.") : distributionSignal >= 2 ? (isZh ? "你给出了比较具体的获客渠道，因此验证动作更容易落地。" : "You listed concrete channels, which makes early validation more executable.") : (isZh ? "你有分发方向，但还需要把渠道、触达方式和预期动作写得更具体。" : "There is a distribution direction, but the channel, motion, and first actions still need more detail.") }
  ];
  const risks = [
    competitionPressure > 65 ? (isZh ? "如果切口不够窄，价值主张会很快落入 another tool 的范式。" : "Without a narrower wedge, the offer risks sounding like another generic tool.") : null,
    !has(evidence) ? (isZh ? "缺少访谈、试点或付费信号时，这份报告的大部分结论都只是结构化假设。" : "Without interviews, pilots, or payment signals, much of the report remains structured hypothesis.") : null,
    audienceClarityScore < 60 ? (isZh ? "受众过宽会拖慢定位、外联和后续内容验证。" : "A broad audience will slow down positioning, outreach, and content validation.") : null,
    goToMarketEase < 58 ? (isZh ? "没有明确获客入口时，产品做出来也可能没有足够快的学习循环。" : "Without a concrete acquisition entry point, even a shipped MVP may fail to generate learning fast enough.") : null
  ].filter((item): item is string => Boolean(item));

  const differentiationSuggestions = isZh
    ? [`把切口收窄成“${targetCustomer || "单一高价值买家"}”最愿意立即付费解决的一个结果。`, has(currentAlternatives) ? `你的定位必须明确解释，为什么它比“${currentAlternatives}”更适合这个场景。` : "补上当前替代方案后，再写一句能把旧方案打掉的价值主张。", "避免只说更智能或更自动化，要说清楚你拿掉了哪一步成本、时间或风险。"]
    : [`Narrow the wedge to one outcome that ${targetCustomer || "one high-value buyer segment"} will pay to solve now.`, has(currentAlternatives) ? `Your positioning should explain why this beats "${currentAlternatives}" for the specific use case.` : "Add the current substitutes first, then write a value proposition that clearly displaces them.", "Do not stop at smarter or more automated. State which cost, delay, or risk disappears."];

  const recommendedNicheAngle = isZh
    ? `先把它定义成服务于“${targetCustomer || "一个具体买家群体"}”的单一高价值工作流，而不是一开始就做成大而全平台。`
    : `Position it first as a single high-value workflow for "${targetCustomer || "one specific buyer segment"}" instead of a broad platform.`;

  const nextStepValidationPlan = [
    !has(targetCustomer) ? (isZh ? "先写出一个最具体的目标买家，不要再用泛化受众。" : "Define one concrete target buyer before doing anything else.") : null,
    !has(problem) ? (isZh ? "把问题改写成谁在什么场景下，因为哪种低效而损失了什么。" : "Rewrite the problem as who is blocked, in what workflow, and what cost it creates.") : null,
    !has(evidence) ? (isZh ? "约 5 到 8 位理想买家做问题访谈，先拿一手证据。" : "Run 5 to 8 buyer interviews to gather first-hand evidence.") : null,
    !has(pricingIdea) ? (isZh ? "准备一个简单的价格假设，并在访谈里测试付费意愿。" : "Create a simple pricing hypothesis and test willingness to pay in interviews.") : null,
    !has(distributionPlan) ? (isZh ? "明确前 20 个用户从哪里来，优先写具体渠道和触达动作。" : "Spell out where the first 20 users will come from, with concrete channels and actions.") : null,
    has(problem) && has(targetCustomer) && has(evidence) ? (isZh ? "用一个单页 landing page 验证定位、结果承诺和 CTA。" : "Use a one-page landing page to test the positioning, promised outcome, and CTA.") : null,
    has(problem) && has(targetCustomer) && has(evidence) && has(pricingIdea) ? (isZh ? "在完整开发前，先用手动或 concierge 方式交付一次核心结果，测试小额付费试点。" : "Deliver the core outcome manually before building the full product and test a small paid pilot.") : null
  ].filter((item): item is string => Boolean(item)).slice(0, 4);

  const validationExperiments = isZh
    ? [
        { title: "问题访谈", detail: `和 ${targetCustomer || "理想买家"} 逐个访谈，确认问题是不是高频、痛苦，而且今天已经在消耗时间、收入或注意力。`, expectedSignal: "对方会主动补充旧方案、失败经验和为什么现在要解决。" },
        { title: "定位烟雾测试", detail: "用一个 landing page 或一段定向外联测试标题、价值承诺和 CTA 是否击中目标买家。", expectedSignal: "出现回复、预约、waitlist 或愿意继续了解的行为。" },
        { title: "手动试点", detail: "在完全自动化前，先手动交付一次核心结果，验证它是否值得付费。", expectedSignal: "用户愿意提供真实时间、数据或一笔试点费用。" }
      ]
    : [
        { title: "Problem interviews", detail: `Interview ${targetCustomer || "ideal buyers"} directly to confirm that the pain is frequent, costly, and already felt today.`, expectedSignal: "Buyers volunteer the current workaround, failure points, and why the issue matters now." },
        { title: "Positioning smoke test", detail: "Test the headline, promise, and CTA with a landing page or tightly targeted outreach.", expectedSignal: "Replies, demo requests, waitlist joins, or requests to learn more." },
        { title: "Manual pilot", detail: "Deliver the core outcome manually before full automation to test whether it is worth paying for.", expectedSignal: "A buyer gives time, data, or pilot budget to keep moving." }
      ];

  const launchChannels = [
    has(distributionPlan) ? distributionPlan : (isZh ? "先明确一个最容易触达理想买家的渠道，不要同时铺太多面。" : "Start with one channel where the ideal buyer is easiest to reach instead of spreading effort too early."),
    has(founderAdvantage) ? (isZh ? "优先把现有关系、行业背景和创始人资源用在前 10 次对话上。" : "Use existing relationships, domain background, and founder access for the first 10 conversations.") : (isZh ? "如果还没有创始人优势，先找一个你最容易建立信任的细分群体。" : "If founder advantage is weak, choose one segment where trust is easiest to earn.")
  ];

  const mvpMustHave = isZh ? ["一个足够窄、能直接解决核心问题的单一工作流。", "能清楚证明结果的最小输出物，比如报告、提醒、摘要或自动执行动作。", "支持试点学习的基础追踪和人工干预能力。"] : ["One narrow workflow that directly addresses the core pain.", "A minimal output that proves value: report, alert, summary, or workflow action.", "Basic instrumentation and manual override so pilots can teach you quickly."];
  const mvpAvoidNow = isZh ? ["过早平台化或一次做太多集成。", "在没有证据前就做复杂权限、协作或 BI 视图。", "为了显得完整而加入一堆解释不清的 AI 功能。"] : ["Turning the first version into a platform or a multi-integration suite.", "Complex permissions, collaboration, or analytics views before the core proof exists.", "Padding the MVP with AI features that make the offer harder to explain."];
  const pricingCommentary = has(pricingIdea) ? (isZh ? `当前定价假设是“${pricingIdea}”。更稳妥的做法是把价格锚定在替代方案成本、时间节省或收入改善上，而不是锚定在功能数量上。` : `The current pricing thesis is "${pricingIdea}". A stronger version anchors price to the cost of alternatives, time saved, or revenue impact rather than feature count.`) : (isZh ? "你还没有给出定价假设，所以变现判断暂时只能停留在方向层面。" : "You have not provided a pricing hypothesis yet, so monetization can only be assessed at a directional level.");
  const samplePositioningStatement = isZh ? `${idea} 帮助 ${targetCustomer || "这类买家"} 更快解决“${problem || "一个明确而高频的问题"}”，而不必继续依赖 ${currentAlternatives || "低效的旧方案"}。` : `${idea} helps ${targetCustomer || "this buyer segment"} solve ${problem || "a costly workflow problem"} without relying on ${currentAlternatives || "inefficient legacy workarounds"}.`;
  const sampleLandingPageHeadline = isZh ? `在你花几个月开发“${idea}”之前，先验证 ${targetCustomer || "目标买家"} 是否真的愿意为这个结果付费。` : `Validate whether ${targetCustomer || "your target buyers"} will pay for ${idea.toLowerCase()} before spending months building it.`;

  return {
    idea, targetCustomer, problem, pricingIdea, currentAlternatives, founderAdvantage, distributionPlan, evidence, ideaStage,
    overallScore, problemUrgencyScore, audienceClarityScore, competitionPressure, monetizationPotential, mvpSimplicity, goToMarketEase, inputCompletenessScore,
    verdict,
    recommendation: recommendationLabel(overallScore, inputCompletenessScore, locale),
    confidenceLabel: confidenceLabel(locale, confidenceScore),
    executiveSummary,
    strengths,
    weaknesses,
    scoreRationales,
    missingInputs,
    methodologyNotes,
    confidenceFactors: confidenceFactors.length > 0 ? confidenceFactors : [isZh ? "当前把握度更多来自结构化假设，而不是一手证据。" : "Current confidence is driven more by structured assumptions than by first-hand proof."],
    uncertaintyNotes: uncertaintyNotes.length > 0 ? uncertaintyNotes : [isZh ? "当前输入已经相对完整，但仍然需要通过访谈、试点和付费信号来验证。" : "The input is relatively complete, but the thesis still needs interviews, pilots, and payment signals."],
    risks,
    differentiationSuggestions,
    recommendedNicheAngle,
    nextStepValidationPlan,
    validationExperiments,
    launchChannels,
    mvpMustHave,
    mvpAvoidNow,
    pricingCommentary,
    samplePositioningStatement,
    sampleLandingPageHeadline,
    analysisMode: "rules"
  };
}

function recomputeOverallScore(report: ValidationReport) {
  return clamp(
    Math.round(
      (report.problemUrgencyScore +
        report.audienceClarityScore +
        report.monetizationPotential +
        report.mvpSimplicity +
        report.goToMarketEase +
        (100 - report.competitionPressure)) /
        6
    ),
    24,
    92
  );
}

function applyResearchAdjustments(report: ValidationReport, research: ExternalResearchSummary): ValidationReport {
  const communityLift = Math.round((research.communitySignalScore - 50) / 10);
  const competitionLift = Math.round((research.competitionSignalScore - 50) / 8);
  const pricingLift = Math.round((research.pricingSignalScore - 50) / 10);

  const adjusted: ValidationReport = {
    ...report,
    problemUrgencyScore: clamp(report.problemUrgencyScore + Math.max(communityLift, -3), 24, 94),
    monetizationPotential: clamp(report.monetizationPotential + Math.max(pricingLift, -2), 24, 93),
    goToMarketEase: clamp(report.goToMarketEase + Math.max(Math.round(communityLift / 2), -2), 24, 92),
    competitionPressure: clamp(report.competitionPressure + Math.max(competitionLift, -2), 18, 92),
    researchSummary: research,
    analysisMode: "rules+research"
  };

  adjusted.overallScore = recomputeOverallScore(adjusted);
  adjusted.methodologyNotes = [
    ...adjusted.methodologyNotes,
    report.idea.trim().length > 0
      ? report.idea.match(/[\u4e00-\u9fff]/)
        ? "额外加入了来自 Hacker News、Reddit 和 GitHub 的公开讨论信号，用来降低报告只围绕表单自说自话的问题。"
        : "Public web signals from Hacker News, Reddit, and GitHub were added to make the report less self-referential."
      : ""
  ].filter(Boolean);
  adjusted.confidenceFactors = [...adjusted.confidenceFactors, ...research.highlights.slice(0, 2)];
  adjusted.uncertaintyNotes = [...adjusted.uncertaintyNotes, ...research.notes];

  return adjusted;
}

export async function buildValidationReportWithResearch(
  input: ValidationInput,
  locale: Locale = "en"
): Promise<ValidationReport> {
  let report = buildValidationReport(input, locale);

  try {
    const { collectExternalResearch } = await import("@/lib/report-research");
    const research = await collectExternalResearch(input, locale);

    if (research) {
      report = applyResearchAdjustments(report, research);

      const { refineValidationReportWithAI } = await import("@/lib/report-ai");
      const refinement = await refineValidationReportWithAI({ report, research, locale });

      if (refinement) {
        report = {
          ...report,
          executiveSummary: refinement.executiveSummary,
          strengths: refinement.strengths,
          weaknesses: refinement.weaknesses,
          risks: refinement.risks,
          differentiationSuggestions: refinement.differentiationSuggestions,
          recommendedNicheAngle: refinement.recommendedNicheAngle,
          nextStepValidationPlan: refinement.nextStepValidationPlan,
          pricingCommentary: refinement.pricingCommentary,
          samplePositioningStatement: refinement.samplePositioningStatement,
          sampleLandingPageHeadline: refinement.sampleLandingPageHeadline,
          confidenceFactors: refinement.confidenceFactors,
          uncertaintyNotes: refinement.uncertaintyNotes,
          analysisMode: "rules+research+ai"
        };
      }
    }
  } catch {
    return report;
  }

  return report;
}

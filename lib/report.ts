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

export type ValidationReport = ValidationScores & {
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
};

type ValidationInput = {
  idea?: string;
  targetCustomer?: string;
  problem?: string;
  pricingIdea?: string;
  currentAlternatives?: string;
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function keywordBoost(value: string, matches: string[]) {
  const text = value.toLowerCase();
  return matches.reduce((score, token) => score + (text.includes(token) ? 6 : 0), 0);
}

export function buildValidationReport(input: ValidationInput): ValidationReport {
  const idea = input.idea?.trim() || "AI onboarding assistant for Shopify stores";
  const targetCustomer = input.targetCustomer?.trim() || "Founders running small Shopify brands";
  const problem =
    input.problem?.trim() ||
    "Store owners do not have time to manually create onboarding emails, product education, and support flows for new customers.";
  const pricingIdea =
    input.pricingIdea?.trim() || "$49 per month for up to 1,000 new customer sessions";
  const currentAlternatives =
    input.currentAlternatives?.trim() || "Agencies, generic email automation tools, and manual support playbooks";

  const urgencyBase = 42 + Math.min(wordCount(problem) * 2, 22) + keywordBoost(problem, ["urgent", "lost", "manual", "revenue", "churn"]);
  const audienceBase =
    38 +
    Math.min(wordCount(targetCustomer) * 3, 27) +
    keywordBoost(targetCustomer, ["founder", "agency", "shopify", "developer", "marketer"]);
  const monetizationBase =
    36 +
    Math.min(wordCount(pricingIdea) * 3, 21) +
    keywordBoost(pricingIdea, ["per month", "subscription", "annual", "$", "team"]);
  const mvpBase =
    62 -
    Math.min(wordCount(idea), 10) +
    keywordBoost(idea, ["dashboard", "plugin", "assistant", "analyzer", "generator"]);
  const gtmBase =
    40 +
    Math.min(wordCount(targetCustomer) * 2, 16) +
    keywordBoost(targetCustomer, ["reddit", "slack", "newsletter", "community", "shopify"]);
  const competitionBase =
    35 +
    Math.min(wordCount(currentAlternatives) * 2, 26) +
    keywordBoost(currentAlternatives, ["spreadsheet", "notion", "chatgpt", "hubspot", "airtable"]);

  const problemUrgencyScore = clamp(urgencyBase, 35, 94);
  const audienceClarityScore = clamp(audienceBase, 34, 96);
  const monetizationPotential = clamp(monetizationBase, 33, 93);
  const mvpSimplicity = clamp(mvpBase, 28, 90);
  const goToMarketEase = clamp(gtmBase, 30, 92);
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

  const risks = [
    competitionPressure > 65
      ? "Crowded market language may make the value proposition feel interchangeable."
      : "The category is still early enough to win with sharper positioning.",
    audienceClarityScore < 60
      ? "Target customer is still too broad to run efficient interviews or paid acquisition tests."
      : "Audience definition is specific enough to support niche positioning and direct outreach.",
    monetizationPotential < 58
      ? "Pricing logic needs stronger linkage to revenue, time savings, or cost reduction."
      : "There is a clear path to pricing around a measurable business outcome."
  ];

  const differentiationSuggestions = [
    `Anchor the product around a narrow wedge: ${targetCustomer.toLowerCase()}.`,
    `Replace generic feature language with a concrete result tied to ${problem.toLowerCase()}.`,
    "Add a short proof loop: interview insight, landing page smoke test, and one manual concierge pilot."
  ];

  const recommendedNicheAngle = `Position the tool as the fastest way for ${targetCustomer.toLowerCase()} to validate whether "${idea}" is worth building before writing any code.`;

  const nextStepValidationPlan = [
    "Interview 5 ideal buyers using the exact problem statement and ask how they solve it today.",
    "Ship a one-page landing page with a waitlist CTA and one outcome-focused promise.",
    "Run a manual concierge test for one customer before automating the workflow.",
    "Price the offer against the cost of current alternatives, not the effort required to build the product."
  ];

  return {
    idea,
    targetCustomer,
    problem,
    pricingIdea,
    currentAlternatives,
    overallScore,
    problemUrgencyScore,
    audienceClarityScore,
    competitionPressure,
    monetizationPotential,
    mvpSimplicity,
    goToMarketEase,
    verdict:
      overallScore >= 72
        ? "Promising idea. Validate demand now and avoid overbuilding the first version."
        : "Worth refining. Tighten the audience and differentiation before committing to a full build.",
    risks,
    differentiationSuggestions,
    recommendedNicheAngle,
    nextStepValidationPlan,
    samplePositioningStatement: `${idea} helps ${targetCustomer.toLowerCase()} solve ${problem.toLowerCase()} without relying on ${currentAlternatives.toLowerCase()}.`,
    sampleLandingPageHeadline: `Validate if ${idea.toLowerCase()} is a real business before you spend months building it.`
  };
}

import type { Locale } from "@/lib/i18n";
import type { ValidationReport } from "@/lib/report";

export function buildReportEmailData({
  locale,
  report,
  reportUrl
}: {
  locale: Locale;
  report: ValidationReport;
  reportUrl: string;
}) {
  const isZh = locale === "zh";
  const executiveSummary = (report.executiveSummary ?? []).map((item) => `• ${item}`).join("\n");
  const nextSteps = report.nextStepValidationPlan.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const scoreLines = [
    `${isZh ? "问题紧迫度" : "Problem urgency"}: ${report.problemUrgencyScore}/100`,
    `${isZh ? "受众清晰度" : "Audience clarity"}: ${report.audienceClarityScore}/100`,
    `${isZh ? "竞争压力" : "Competition pressure"}: ${report.competitionPressure}/100`,
    `${isZh ? "变现潜力" : "Monetization potential"}: ${report.monetizationPotential}/100`,
    `${isZh ? "MVP 简洁度" : "MVP simplicity"}: ${report.mvpSimplicity}/100`,
    `${isZh ? "获客可行性" : "Go-to-market ease"}: ${report.goToMarketEase}/100`
  ].join("\n");
  const risks = report.risks.map((item) => `• ${item}`).join("\n");
  const wedge = report.recommendedNicheAngle;
  const recommendation = report.recommendation ?? "";
  const confidenceLabel = report.confidenceLabel ?? "";
  const positioning = report.samplePositioningStatement;
  const headline = report.sampleLandingPageHeadline;

  return {
    locale,
    reportTitle: isZh ? "你的 SaaS 想法验证报告" : "Your SaaS idea validation report",
    idea: report.idea,
    targetCustomer: report.targetCustomer,
    overallScore: String(report.overallScore),
    verdict: report.verdict,
    recommendation,
    confidenceLabel,
    executiveSummary,
    scoreLines,
    wedge,
    nextSteps,
    risks,
    positioning,
    headline,
    reportUrl
  };
}

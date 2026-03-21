import OpenAI from "openai";

import type { Locale } from "@/lib/i18n";
import type { ValidationReport } from "@/lib/report";
import type { ExternalResearchSummary } from "@/lib/report-research";

export type ReportAIRefinement = {
  executiveSummary: string[];
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  differentiationSuggestions: string[];
  recommendedNicheAngle: string;
  nextStepValidationPlan: string[];
  pricingCommentary: string;
  samplePositioningStatement: string;
  sampleLandingPageHeadline: string;
  confidenceFactors: string[];
  uncertaintyNotes: string[];
};

const refinementSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    executiveSummary: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 4
    },
    strengths: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5
    },
    weaknesses: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5
    },
    risks: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5
    },
    differentiationSuggestions: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5
    },
    recommendedNicheAngle: { type: "string" },
    nextStepValidationPlan: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5
    },
    pricingCommentary: { type: "string" },
    samplePositioningStatement: { type: "string" },
    sampleLandingPageHeadline: { type: "string" },
    confidenceFactors: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 4
    },
    uncertaintyNotes: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 5
    }
  },
  required: [
    "executiveSummary",
    "strengths",
    "weaknesses",
    "risks",
    "differentiationSuggestions",
    "recommendedNicheAngle",
    "nextStepValidationPlan",
    "pricingCommentary",
    "samplePositioningStatement",
    "sampleLandingPageHeadline",
    "confidenceFactors",
    "uncertaintyNotes"
  ]
} as const;

function buildInstructions(locale: Locale) {
  return locale === "zh"
    ? "你是一个谨慎的 SaaS 创业验证分析师。只根据给定输入、基础评分和外部研究摘要生成更具体的解释。不要夸大，不要假装知道不存在的数据。语气要像经验丰富的创始人顾问，简洁、具体、可执行。"
    : "You are a cautious SaaS validation analyst. Use only the supplied inputs, base scoring, and external research summary to produce sharper explanations. Do not overclaim. Do not invent evidence. Write like a practical founder advisor: concrete, concise, and execution-oriented.";
}

function buildPrompt(report: ValidationReport, research: ExternalResearchSummary, locale: Locale) {
  return JSON.stringify(
    {
      locale,
      report,
      research,
      task:
        locale === "zh"
          ? "基于这些输入、规则评分和外部研究结果，重写解释层。保留谨慎语气。不要改动数值分数。"
          : "Using these inputs, rule-based scores, and external research signals, rewrite the explanatory layers. Keep the tone cautious. Do not change numeric scores."
    },
    null,
    2
  );
}

export async function refineValidationReportWithAI({
  report,
  research,
  locale
}: {
  report: ValidationReport;
  research: ExternalResearchSummary;
  locale: Locale;
}): Promise<ReportAIRefinement | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: process.env.OPENAI_REPORT_MODEL?.trim() || "gpt-5",
      store: false,
      input: [
        {
          role: "system",
          content: buildInstructions(locale)
        },
        {
          role: "user",
          content: buildPrompt(report, research, locale)
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "validation_report_refinement",
          strict: true,
          schema: refinementSchema
        }
      }
    });

    const output = response.output_text?.trim();

    if (!output) {
      return null;
    }

    return JSON.parse(output) as ReportAIRefinement;
  } catch {
    return null;
  }
}

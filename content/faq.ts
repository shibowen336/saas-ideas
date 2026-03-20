import type { Locale } from "@/lib/i18n";

export type FaqEntry = {
  question: string;
  answer: string;
};

export const homeFaqs: FaqEntry[] = [
  {
    question: "How do I validate a SaaS idea before building?",
    answer:
      "Start by naming one buyer, one painful workflow, one current alternative, and one believable outcome. Then test the idea with interviews, a focused landing page, and a lightweight pilot before you build depth."
  },
  {
    question: "What makes a SaaS idea worth validating?",
    answer:
      "An idea is worth validating when the pain is repeated, the buyer is easy to identify, the workaround is weak or expensive, and there is a believable path to pricing and distribution."
  },
  {
    question: "Does a high score mean I should build immediately?",
    answer:
      "No. A high score means the idea deserves stronger proof, not blind execution. The next move is usually buyer interviews, message testing, and a narrow pilot, not a bigger roadmap."
  },
  {
    question: "How is SaaS Idea Validator different from a SaaS idea generator?",
    answer:
      "A generator helps you come up with ideas. SaaS Idea Validator helps you pressure-test one specific idea by scoring demand, competition, audience clarity, monetization, MVP simplicity, and next-step validation actions."
  },
  {
    question: "Can I validate an AI SaaS idea before coding?",
    answer:
      "Yes. AI ideas still need a clear buyer, a painful workflow, trust, and pricing that works. The validator helps you see whether the concept is a real product angle or just a broad AI feature idea."
  },
  {
    question: "What should I do after getting my SaaS idea score?",
    answer:
      "Use the score as a next-step brief. Run buyer interviews, test the positioning on a landing page, pressure-test pricing, and try a narrow pilot before you expand the product scope."
  }
];

export const homeFaqsZh: FaqEntry[] = [
  {
    question: "SaaS Idea Validator 会评估哪些维度？",
    answer:
      "工具会评估需求强度、竞争压力、受众清晰度、变现潜力、MVP 简洁度和 go-to-market 难度，帮助创始人决定这个想法应该继续验证、收窄定位，还是暂时放下。"
  },
  {
    question: "SaaS Idea Validator 适合哪些人？",
    answer:
      "它主要面向独立开发者、单人创始人、正在寻找 micro SaaS 方向的开发者，以及在真正投入开发前想先验证 AI SaaS 想法的建设者。"
  },
  {
    question: "如果我还没有完整商业计划，也能使用吗？",
    answer:
      "可以。最适合使用它的时机，往往就是想法还很粗糙、修改成本还很低的时候。只要你能写出想法、目标用户和问题描述，就足够生成有方向感的报告。"
  },
  {
    question: "高分是不是就代表我应该立刻开始做产品？",
    answer:
      "不是。高分只说明这个想法更值得继续验证，比如去做访谈、落地页测试和小规模需求测试。它是一个筛选器，不是保证成功的承诺。"
  }
];

export const toolFaqs: FaqEntry[] = [
  {
    question: "What inputs does the SaaS idea validator need?",
    answer:
      "The strongest reports come from clear inputs: the idea, target customer, problem, current alternatives, pricing idea, founder advantage, existing evidence, and how you expect to reach the first 20 users."
  },
  {
    question: "What does the report include?",
    answer:
      "The report includes an overall score, score breakdown, executive summary, recommendation, confidence level, risks, differentiation suggestions, a recommended wedge, validation experiments, launch channels, MVP boundaries, and messaging drafts."
  },
  {
    question: "How should I interpret a low audience clarity score?",
    answer:
      "It usually means the buyer is still too broad. Narrow the customer until you can describe where they hang out, what triggers the pain, and what they already use instead."
  },
  {
    question: "Can the tool help with AI SaaS ideas?",
    answer:
      "Yes. AI ideas often look exciting on the surface but still need clear buyers, painful use cases, and believable monetization. The report makes those gaps explicit."
  },
  {
    question: "Does the validator replace customer interviews?",
    answer:
      "No. The tool is a decision aid, not a substitute for talking to buyers. Use the output to decide which interviews, message tests, and pilots to run next."
  }
];

export const toolFaqsZh: FaqEntry[] = [
  {
    question: "如果 audience clarity 分数很低，应该怎么理解？",
    answer:
      "这通常意味着你的目标用户定义得太宽。你需要继续收窄，直到你能明确说出这群人在哪里出现、什么场景会触发痛点，以及他们现在在用什么替代方案。"
  },
  {
    question: "为什么竞争压力这么重要？",
    answer:
      "竞争压力能帮助创始人判断自己要多努力才能脱颖而出。市场拥挤不代表不能做，但你必须有更清晰的细分切口、更强的证据，或者更快的分发路径。"
  },
  {
    question: "拿到报告之后，我应该先做什么？",
    answer:
      "把报告当成下一步验证简报。先去做用户访谈、测试落地页标题，或者先手工交付一个最小版本的承诺，而不是立刻开始堆产品。"
  },
  {
    question: "这个工具也适合验证 AI SaaS 想法吗？",
    answer:
      "适合。很多 AI 想法表面上看起来很吸引人，但依然需要清晰的买家、足够疼的场景和可信的变现逻辑。这个报告会把这些缺口直接暴露出来。"
  }
];

export const pricingFaqs: FaqEntry[] = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Founders can run a core SaaS idea validation report for free. Paid plans unlock saved reports, team collaboration, richer examples, and reusable validation workflows."
  },
  {
    question: "Do you offer founder or agency seats?",
    answer:
      "The Pro plan is designed for individual founders and the Studio plan is designed for agencies, venture studios, and product teams reviewing multiple opportunities."
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes. Monthly plans are flexible and can be canceled at any time without locking you into an annual contract."
  }
];

export const pricingFaqsZh: FaqEntry[] = [
  {
    question: "有免费版吗？",
    answer:
      "有。创始人可以免费生成基础版 SaaS 想法验证报告。付费方案会解锁保存报告、团队协作、更丰富的示例内容和可复用验证工作流。"
  },
  {
    question: "有适合创始人或代理机构的席位吗？",
    answer:
      "有。Pro 方案适合个人创始人，Studio 方案适合代理机构、venture studio 和需要同时评估多个机会的小团队。"
  },
  {
    question: "可以随时取消吗？",
    answer:
      "可以。月付方案比较灵活，你可以随时取消，不需要被年付合同锁住。"
  }
];

export const globalFaqs: FaqEntry[] = [...homeFaqs, ...toolFaqs];
export const globalFaqsZh: FaqEntry[] = [...homeFaqsZh, ...toolFaqsZh];

export function getHomeFaqs(locale: Locale) {
  return locale === "zh" ? homeFaqsZh : homeFaqs;
}

export function getToolFaqs(locale: Locale) {
  return locale === "zh" ? toolFaqsZh : toolFaqs;
}

export function getPricingFaqs(locale: Locale) {
  return locale === "zh" ? pricingFaqsZh : pricingFaqs;
}

export function getGlobalFaqs(locale: Locale) {
  return locale === "zh" ? globalFaqsZh : globalFaqs;
}

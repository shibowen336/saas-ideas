import type { Locale } from "@/lib/i18n";

export type FaqEntry = {
  question: string;
  answer: string;
};

export const homeFaqs: FaqEntry[] = [
  {
    question: "What does SaaS Idea Validator score?",
    answer:
      "The tool scores demand, competition pressure, audience clarity, monetization potential, MVP simplicity, and go-to-market ease so founders can decide whether to validate, narrow, or pause an idea."
  },
  {
    question: "Who is SaaS Idea Validator for?",
    answer:
      "It is built for indie hackers, solo founders, developers exploring micro SaaS, and builders evaluating AI SaaS ideas before committing months of build time."
  },
  {
    question: "Can I use it before I have a full business plan?",
    answer:
      "Yes. The best time to use the validator is when the idea is still rough and cheap to change. A short description, target customer, and problem statement are enough to generate direction."
  },
  {
    question: "Does a high score mean I should build immediately?",
    answer:
      "No. A high score means the idea is promising enough to validate with interviews, a landing page, and small demand tests. It is a filter, not a guarantee."
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
    question: "How should I interpret a low audience clarity score?",
    answer:
      "A low audience clarity score usually means the idea is targeting a broad market. Narrow the customer segment until you can list where they hang out, what triggers the pain, and what alternatives they already use."
  },
  {
    question: "Why does competition pressure matter?",
    answer:
      "Competition pressure helps founders judge how hard it will be to stand out. A crowded market is still viable, but you will need a sharper niche angle, stronger proof, or a faster distribution path."
  },
  {
    question: "What should I do after getting my report?",
    answer:
      "Use the report as a next-step brief. Run founder interviews, test a landing page headline, and try a manual version of the promise before building product depth."
  },
  {
    question: "Can the tool help with AI SaaS ideas?",
    answer:
      "Yes. AI ideas often look exciting on the surface but still need clear buyers, painful use cases, and believable monetization. The report makes those gaps explicit."
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

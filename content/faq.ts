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

export const globalFaqs: FaqEntry[] = [...homeFaqs, ...toolFaqs];

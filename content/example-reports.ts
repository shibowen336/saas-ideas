import type { ValidationReport } from "@/lib/report";

export type ExampleReport = ValidationReport & {
  slug: string;
  category: string;
  summary: string;
  longFormInsights: Array<{
    title: string;
    paragraphs: string[];
  }>;
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
    ]
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
    ]
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
    ]
  }
];

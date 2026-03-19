export const siteConfig = {
  name: "SaaS Idea Validator",
  shortName: "Idea Validator",
  description:
    "Validate your SaaS idea before you build. Score demand, competition, audience clarity, monetization potential, MVP complexity, and next-step validation actions.",
  url: "https://www.saasideavalidator.com",
  ogImage: "/og-default.svg",
  email: "hello@saasideavalidator.com",
  links: {
    x: "https://x.com/saasideas",
    linkedin: "https://www.linkedin.com/company/saas-idea-validator"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/tool/saas-idea-validator", label: "Tool" },
    { href: "/examples", label: "Examples" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" }
  ]
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

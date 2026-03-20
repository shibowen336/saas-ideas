export const siteConfig = {
  name: "SaaS Idea Validator",
  shortName: "Idea Validator",
  description:
    "SaaS Idea Validator helps founders validate SaaS ideas by scoring demand, competition pressure, audience clarity, monetization, MVP simplicity, and next-step validation actions.",
  url: "https://www.saasideas.app",
  ogImage: "/og-default.png",
  email: "hello@saasideas.app",
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

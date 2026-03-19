import { type Locale, localizedPath } from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type BlogSchemaInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
};

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/brand-mark.svg"),
    sameAs: [siteConfig.links.x, siteConfig.links.linkedin],
    inLanguage: locale === "zh" ? "zh-CN" : "en"
  };
}

export function websiteSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}${localizedPath(locale, "/blog")}?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

type SoftwareApplicationInput = {
  locale: Locale;
  description: string;
  featureList: readonly string[];
  path: string;
};

export function softwareApplicationSchema({
  locale,
  description,
  featureList,
  path
}: SoftwareApplicationInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    name: siteConfig.name,
    description,
    url: absoluteUrl(path),
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList
  };
}

export function blogPostingSchema({
  locale,
  title,
  description,
  path,
  publishedTime,
  modifiedTime
}: BlogSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand-mark.svg")
      }
    },
    image: absoluteUrl(siteConfig.ogImage)
  };
}

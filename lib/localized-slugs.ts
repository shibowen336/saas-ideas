import type { Locale } from "@/lib/i18n";

type LocaleSlugPair = Record<Locale, string>;

const blogSlugPairs: LocaleSlugPair[] = [
  { en: "how-to-validate-a-saas-idea", zh: "如何验证saas想法" },
  { en: "saas-idea-validation-checklist", zh: "saas想法验证清单" },
  { en: "micro-saas-ideas", zh: "适合独立创始人的25个微型saas想法" },
  { en: "ai-saas-ideas", zh: "值得探索的ai-saas想法" },
  { en: "startup-idea-validator-vs-market-research", zh: "创业想法验证器与传统市场研究" }
];

const programmaticSlugPairs: LocaleSlugPair[] = [
  { en: "validate-healthcare-saas-idea", zh: "验证医疗saas想法" },
  { en: "micro-saas-ideas-for-recruiters", zh: "招聘行业微型saas想法" },
  { en: "industry-saas-ideas-for-accountants", zh: "会计行业saas想法" },
  { en: "how-to-validate-an-ai-startup-idea", zh: "如何验证ai创业想法" }
];

function buildLookup(pairs: LocaleSlugPair[]) {
  return pairs.reduce<Record<string, LocaleSlugPair>>((accumulator, pair) => {
    accumulator[pair.en] = pair;
    accumulator[pair.zh] = pair;
    return accumulator;
  }, {});
}

const blogSlugLookup = buildLookup(blogSlugPairs);
const programmaticSlugLookup = buildLookup(programmaticSlugPairs);

export function getLocalizedBlogSlug(slug: string, targetLocale: Locale) {
  return blogSlugLookup[slug]?.[targetLocale] ?? slug;
}

export function getLocalizedProgrammaticSlug(slug: string, targetLocale: Locale) {
  return programmaticSlugLookup[slug]?.[targetLocale] ?? slug;
}

import type { Locale } from "@/lib/i18n";

type ResearchInput = {
  idea?: string;
  targetCustomer?: string;
  problem?: string;
  pricingIdea?: string;
  currentAlternatives?: string;
};

export type ExternalResearchSource = {
  source: "Hacker News" | "Reddit" | "GitHub";
  title: string;
  url: string;
  snippet: string;
};

export type ExternalResearchSummary = {
  provider: "public-web";
  query: string;
  generatedAt: string;
  communitySignalScore: number;
  competitionSignalScore: number;
  pricingSignalScore: number;
  highlights: string[];
  notes: string[];
  sources: ExternalResearchSource[];
};

const USER_AGENT = "SaaSIdeaValidator/1.0 (+https://www.saasideas.app)";
const pricingTokens = ["price", "pricing", "paid", "subscription", "revenue", "roi", "付费", "定价", "收入"];
const competitionTokens = ["tool", "software", "platform", "alternative", "competitor", "agency", "工具", "平台", "替代"];

function normalize(value?: string) {
  return value?.trim() ?? "";
}

function compactSnippet(value: string, max = 180) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1)}…` : normalized;
}

function countMatches(text: string, tokens: string[]) {
  const lower = text.toLowerCase();
  return tokens.reduce((count, token) => count + (lower.includes(token) ? 1 : 0), 0);
}

function buildQuery(input: ResearchInput) {
  const parts = [
    normalize(input.idea),
    normalize(input.targetCustomer),
    normalize(input.problem).split(/[.。]/)[0]
  ].filter(Boolean);

  return parts.join(" ").slice(0, 180);
}

function buildQueries(input: ResearchInput) {
  const queries = [
    buildQuery(input),
    normalize(input.idea),
    [normalize(input.targetCustomer), normalize(input.problem).split(/[.。]/)[0]].filter(Boolean).join(" ").slice(0, 120),
    normalize(input.currentAlternatives).split(/[,，]/)[0]
  ].filter(Boolean);

  return [...new Set(queries)];
}

async function safeJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
        ...(init?.headers ?? {})
      },
      next: { revalidate: 60 * 60 * 6 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchHnSources(query: string) {
  const data = await safeJson<{
    hits?: Array<{ title?: string; story_title?: string; url?: string; story_url?: string; _highlightResult?: { title?: { value?: string } } }>;
  }>(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=3`);

  return (data?.hits ?? [])
    .map((item) => {
      const title = item.title || item.story_title || "";
      const url = item.url || item.story_url || "";
      if (!title || !url) return null;

      return {
        source: "Hacker News" as const,
        title,
        url,
        snippet: compactSnippet(item._highlightResult?.title?.value || title)
      };
    })
    .filter(Boolean) as ExternalResearchSource[];
}

async function fetchRedditSources(query: string) {
  const data = await safeJson<{
    data?: {
      children?: Array<{
        data?: { title?: string; permalink?: string; selftext?: string };
      }>;
    };
  }>(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=3&sort=relevance&t=year`);

  return (data?.data?.children ?? [])
    .map((item) => {
      const title = item.data?.title || "";
      const permalink = item.data?.permalink || "";
      if (!title || !permalink) return null;

      return {
        source: "Reddit" as const,
        title,
        url: `https://www.reddit.com${permalink}`,
        snippet: compactSnippet(item.data?.selftext || title)
      };
    })
    .filter(Boolean) as ExternalResearchSource[];
}

async function fetchGithubSources(query: string) {
  const data = await safeJson<{
    items?: Array<{ full_name?: string; html_url?: string; description?: string }>;
  }>(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=3`);

  return (data?.items ?? [])
    .map((item) => {
      const title = item.full_name || "";
      const url = item.html_url || "";
      if (!title || !url) return null;

      return {
        source: "GitHub" as const,
        title,
        url,
        snippet: compactSnippet(item.description || title)
      };
    })
    .filter(Boolean) as ExternalResearchSource[];
}

export async function collectExternalResearch(
  input: ResearchInput,
  locale: Locale
): Promise<ExternalResearchSummary | null> {
  const queries = buildQueries(input);

  if (queries.length === 0) {
    return null;
  }

  const sourceMap = new Map<string, ExternalResearchSource>();
  let query = queries[0];

  for (const candidate of queries) {
    const [hnSources, redditSources, githubSources] = await Promise.all([
      fetchHnSources(candidate),
      fetchRedditSources(candidate),
      fetchGithubSources(candidate)
    ]);

    const combined = [...hnSources, ...redditSources, ...githubSources];

    if (combined.length > 0) {
      query = candidate;
    }

    for (const item of combined) {
      sourceMap.set(`${item.source}:${item.url}`, item);
      if (sourceMap.size >= 8) break;
    }

    if (sourceMap.size >= 5) {
      break;
    }
  }

  const sources = [...sourceMap.values()].slice(0, 8);

  if (sources.length === 0) {
    return null;
  }

  const combinedText = sources
    .map((item) => `${item.title} ${item.snippet}`)
    .join(" ");

  const communitySignalScore = Math.min(35 + sources.length * 7 + countMatches(combinedText, ["pain", "manual", "workflow", "problem", "痛点", "手动", "流程"]), 88);
  const competitionSignalScore = Math.min(36 + sources.length * 5 + countMatches(combinedText, competitionTokens) * 4, 90);
  const pricingSignalScore = Math.min(32 + countMatches(combinedText, pricingTokens) * 8 + (normalize(input.pricingIdea) ? 8 : 0), 84);

  const highlights =
    locale === "zh"
      ? [
          communitySignalScore >= 58
            ? "公开讨论里能看到和这个问题相关的真实工作流或痛点信号。"
            : "公开讨论信号有限，这说明需求热度还不能仅靠外部噪音判断。",
          competitionSignalScore >= 62
            ? "外部信号显示替代方案不少，定位需要更窄。"
            : "外部结果里虽然有替代方案，但还没有显示出极端拥挤。",
          pricingSignalScore >= 56
            ? "公开内容里能找到一些与付费、ROI 或商业价值相关的线索。"
            : "外部线索里对定价和付费意愿的直接信号还比较弱。"
        ]
      : [
          communitySignalScore >= 58
            ? "Public discussions show real workflow or pain-point signals around this topic."
            : "Public discussion signals are limited, so demand still cannot be inferred from external noise alone.",
          competitionSignalScore >= 62
            ? "External signals suggest meaningful substitutes, so positioning needs to stay narrow."
            : "There are substitutes in the external results, but the market does not look overwhelmingly crowded yet.",
          pricingSignalScore >= 56
            ? "Some public signals reference pricing, ROI, or business value."
            : "Direct pricing and willingness-to-pay signals remain weak in the public results."
        ];

  const notes =
    locale === "zh"
      ? [
          "外部研究目前基于公开网页信号，不等于正式市场研究。",
          "这些来源更适合辅助判断热度、拥挤度和讨论方向，不适合作为需求证明。"
        ]
      : [
          "External research currently uses public web signals rather than formal market research datasets.",
          "These sources are best used to gauge discussion volume, crowdedness, and framing direction, not to prove demand."
        ];

  return {
    provider: "public-web",
    query,
    generatedAt: new Date().toISOString(),
    communitySignalScore,
    competitionSignalScore,
    pricingSignalScore,
    highlights,
    notes,
    sources
  };
}

import type { Locale } from "@/lib/i18n";
import { formatScore } from "@/lib/utils";

type ScoreGridProps = {
  locale?: Locale;
  scores: Array<{
    label: string;
    score: number;
    tone?: "neutral" | "positive" | "warning";
  }>;
};

export function ScoreGrid({ scores, locale = "en" }: ScoreGridProps) {
  const toneLabels =
    locale === "zh"
      ? { warning: "关注", positive: "较强", neutral: "信号" }
      : { warning: "Watch", positive: "Strong", neutral: "Signal" };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {scores.map((item) => (
        <article
          key={item.label}
          className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              {formatScore(item.score)}
            </p>
            <span
              className={
                item.tone === "warning"
                  ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700"
                  : item.tone === "positive"
                    ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700"
                    : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
              }
            >
              {item.tone === "warning"
                ? toneLabels.warning
                : item.tone === "positive"
                  ? toneLabels.positive
                  : toneLabels.neutral}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

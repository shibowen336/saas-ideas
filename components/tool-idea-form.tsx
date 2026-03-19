import { type Locale, localizedStaticPath } from "@/lib/i18n";

type ToolIdeaFormProps = {
  locale?: Locale;
  compact?: boolean;
};

export function ToolIdeaForm({ locale = "en", compact = false }: ToolIdeaFormProps) {
  const isZh = locale === "zh";

  return (
    <form
      action={localizedStaticPath(locale, "report")}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-glow sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-slate-900">
            {isZh ? "SaaS 想法" : "SaaS idea"}
          </label>
          <textarea
            id="idea"
            name="idea"
            required
            rows={compact ? 3 : 4}
            placeholder={
              isZh ? "例如：面向 Shopify 商家的 AI 新客引导助手" : "Example: AI onboarding assistant for Shopify stores"
            }
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="targetCustomer"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              {isZh ? "目标客户" : "Target customer"}
            </label>
            <input
              id="targetCustomer"
              name="targetCustomer"
              placeholder={isZh ? "独立开发者、Shopify 商家、招聘顾问……" : "Indie hackers, Shopify brands, recruiters..."}
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="pricingIdea" className="mb-2 block text-sm font-semibold text-slate-900">
              {isZh ? "定价思路" : "Pricing idea"}
            </label>
            <input
              id="pricingIdea"
              name="pricingIdea"
              placeholder={isZh ? "例如：$29/月、年付、按用量收费……" : "$29/month, annual, usage-based..."}
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label htmlFor="problem" className="mb-2 block text-sm font-semibold text-slate-900">
            {isZh ? "要解决的问题" : "Problem being solved"}
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={3}
            placeholder={
              isZh ? "描述痛点、流程卡点，以及它为什么值得被解决。" : "Describe the pain, the workflow bottleneck, and why it matters."
            }
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
        <div>
          <label
            htmlFor="currentAlternatives"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            {isZh ? "当前替代方案" : "Current alternatives"}
          </label>
          <input
            id="currentAlternatives"
            name="currentAlternatives"
            placeholder={
              isZh ? "表格、代理服务、手工流程、现有工具……" : "Spreadsheets, agencies, manual workflows, incumbent tools..."
            }
            className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
        >
          {isZh ? "生成验证报告" : "Generate Validation Report"}
        </button>
        <p className="text-sm leading-6 text-slate-500">
          {isZh
            ? "报告包含评分、风险提示、差异化建议、细分切口建议和下一步验证动作。"
            : "Reports include scores, risks, differentiation ideas, niche angle suggestions, and next-step tests."}
        </p>
      </div>
    </form>
  );
}

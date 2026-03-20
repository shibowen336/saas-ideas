import { type Locale, localizedStaticPath } from "@/lib/i18n";

type ToolIdeaFormProps = {
  locale?: Locale;
  compact?: boolean;
};

export function ToolIdeaForm({ locale = "en", compact = false }: ToolIdeaFormProps) {
  const copy =
    locale === "zh"
      ? {
          title: "生成一份更像创始人判断备忘录的验证报告",
          description:
            "输入越具体，报告越专业。尤其要说明买家是谁、痛点为什么紧迫、你凭什么拿到第一批用户，以及前 20 个用户准备怎么来。",
          idea: "SaaS 想法",
          ideaPlaceholder: "例如：面向 Shopify 品牌的售后 onboarding 自动化助手",
          targetCustomer: "目标客户",
          targetCustomerPlaceholder: "例如：年营收 50 万到 500 万美元的 DTC Shopify 品牌创始人",
          problem: "要解决的问题",
          problemPlaceholder: "写清楚工作流卡点、损失、频率，以及为什么这件事值得优先解决。",
          alternatives: "当前替代方案",
          alternativesPlaceholder: "表格、人工流程、代理商、Notion、现有 SaaS 工具等",
          pricing: "定价思路",
          pricingPlaceholder: "例如：$49/月，按账户数、订单量或使用量升级",
          distribution: "前 20 个用户怎么来",
          distributionPlaceholder: "例如：通过 Shopify 顾问社群、Founder 外联和电商播客赞助获取线索",
          advantage: "你的创始人优势",
          advantagePlaceholder: "例如：我做过 Shopify 增长，认识一批品牌操盘手，也理解他们现有流程",
          evidence: "已有证据或信号",
          evidencePlaceholder: "例如：已访谈 4 个目标用户，其中 3 个明确提到售后 onboarding 做得很差",
          stage: "当前阶段",
          stageOptions: [
            { value: "idea", label: "只有想法" },
            { value: "interviews", label: "已做一些访谈" },
            { value: "pilot", label: "准备跑试点" },
            { value: "mvp", label: "已经有初版" }
          ],
          submit: "生成专业验证报告",
          footnote:
            "报告会输出执行摘要、推荐动作、把握度、逐项评分依据、差异化建议、验证实验、获客路径和 MVP 边界。"
        }
      : {
          title: "Generate your SaaS idea validation report",
          description:
            "The more specific the input, the stronger the report. Be especially clear about the buyer, the urgency of the pain, why you can win early users, and how you will reach the first 20 customers.",
          idea: "SaaS idea",
          ideaPlaceholder: "Example: Post-purchase onboarding automation for Shopify brands",
          targetCustomer: "Target customer",
          targetCustomerPlaceholder: "Example: DTC Shopify founders doing $500k to $5M in annual revenue",
          problem: "Problem being solved",
          problemPlaceholder: "Describe the workflow bottleneck, the cost of the pain, and why it deserves priority now.",
          alternatives: "Current alternatives",
          alternativesPlaceholder: "Spreadsheets, manual workflows, agencies, Notion, incumbent SaaS tools...",
          pricing: "Pricing idea",
          pricingPlaceholder: "Example: $49/month with usage or account-based expansion",
          distribution: "How you expect to reach the first 20 users",
          distributionPlaceholder: "Example: Shopify consultant communities, founder outreach, and ecommerce newsletters",
          advantage: "Your founder advantage",
          advantagePlaceholder: "Example: I know this market, have relevant experience, and can access the first buyers directly",
          evidence: "Evidence you already have",
          evidencePlaceholder: "Example: I have spoken with 4 buyers and 3 described the same pain in their own words",
          stage: "Current stage",
          stageOptions: [
            { value: "idea", label: "Just an idea" },
            { value: "interviews", label: "Some interviews done" },
            { value: "pilot", label: "Preparing a pilot" },
            { value: "mvp", label: "Already have an MVP" }
          ],
          submit: "Generate SaaS Idea Report",
          footnote:
            "Your report includes an executive summary, score rationale, wedge recommendation, validation experiments, launch channels, and MVP boundaries."
        };

  return (
    <form
      action={localizedStaticPath(locale, "report")}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-glow sm:p-8"
    >
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-semibold text-slate-950">{copy.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy.description}</p>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-slate-900">
            {copy.idea}
          </label>
          <textarea
            id="idea"
            name="idea"
            required
            rows={compact ? 3 : 4}
            placeholder={copy.ideaPlaceholder}
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="targetCustomer" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.targetCustomer}
            </label>
            <input
              id="targetCustomer"
              name="targetCustomer"
              placeholder={copy.targetCustomerPlaceholder}
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="pricingIdea" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.pricing}
            </label>
            <input
              id="pricingIdea"
              name="pricingIdea"
              placeholder={copy.pricingPlaceholder}
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="problem" className="mb-2 block text-sm font-semibold text-slate-900">
            {copy.problem}
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={3}
            placeholder={copy.problemPlaceholder}
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="currentAlternatives" className="mb-2 block text-sm font-semibold text-slate-900">
            {copy.alternatives}
          </label>
          <input
            id="currentAlternatives"
            name="currentAlternatives"
            placeholder={copy.alternativesPlaceholder}
            className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="distributionPlan" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.distribution}
            </label>
            <textarea
              id="distributionPlan"
              name="distributionPlan"
              rows={3}
              placeholder={copy.distributionPlaceholder}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="founderAdvantage" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.advantage}
            </label>
            <textarea
              id="founderAdvantage"
              name="founderAdvantage"
              rows={3}
              placeholder={copy.advantagePlaceholder}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
          <div>
            <label htmlFor="evidence" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.evidence}
            </label>
            <textarea
              id="evidence"
              name="evidence"
              rows={3}
              placeholder={copy.evidencePlaceholder}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="ideaStage" className="mb-2 block text-sm font-semibold text-slate-900">
              {copy.stage}
            </label>
            <select
              id="ideaStage"
              name="ideaStage"
              defaultValue="idea"
              className="min-h-12 w-full rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            >
              {copy.stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
        >
          {copy.submit}
        </button>
        <p className="text-sm leading-6 text-slate-500">{copy.footnote}</p>
      </div>
    </form>
  );
}

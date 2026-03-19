type ToolIdeaFormProps = {
  compact?: boolean;
};

export function ToolIdeaForm({ compact = false }: ToolIdeaFormProps) {
  return (
    <form
      action="/tool/saas-idea-validator/report"
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-glow sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-slate-900">
            SaaS idea
          </label>
          <textarea
            id="idea"
            name="idea"
            required
            rows={compact ? 3 : 4}
            placeholder="Example: AI onboarding assistant for Shopify stores"
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="targetCustomer"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Target customer
            </label>
            <input
              id="targetCustomer"
              name="targetCustomer"
              placeholder="Indie hackers, Shopify brands, recruiters..."
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="pricingIdea" className="mb-2 block text-sm font-semibold text-slate-900">
              Pricing idea
            </label>
            <input
              id="pricingIdea"
              name="pricingIdea"
              placeholder="$29/month, annual, usage-based..."
              className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label htmlFor="problem" className="mb-2 block text-sm font-semibold text-slate-900">
            Problem being solved
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={3}
            placeholder="Describe the pain, the workflow bottleneck, and why it matters."
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
        <div>
          <label
            htmlFor="currentAlternatives"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Current alternatives
          </label>
          <input
            id="currentAlternatives"
            name="currentAlternatives"
            placeholder="Spreadsheets, agencies, manual workflows, incumbent tools..."
            className="min-h-12 w-full rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
        >
          Generate Validation Report
        </button>
        <p className="text-sm leading-6 text-slate-500">
          Reports include scores, risks, differentiation ideas, niche angle suggestions, and next-step tests.
        </p>
      </div>
    </form>
  );
}

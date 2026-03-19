import type { FaqEntry } from "@/content/faq";

type FaqListProps = {
  items: FaqEntry[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-slate-950">
            {item.question}
          </summary>
          <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

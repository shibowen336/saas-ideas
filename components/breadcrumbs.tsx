import Link from "next/link";

type BreadcrumbsProps = {
  items: Array<{
    label: string;
    href: string;
  }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            <Link href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

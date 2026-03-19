import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-base font-bold text-white">
            SV
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/tool/saas-idea-validator" className="hidden sm:inline-flex">
          Validate My Idea
        </ButtonLink>
      </div>
    </header>
  );
}

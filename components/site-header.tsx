import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { type Locale, getUiCopy, localizedStaticPath } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getUiCopy(locale);
  const alternateLocale = locale === "en" ? "zh" : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={localizedStaticPath(locale, "home")}
          className="flex items-center gap-3 text-sm font-semibold text-slate-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-base font-bold text-white">
            SV
          </span>
          <span className="hidden sm:inline">SaaS Idea Validator</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {[
            { href: localizedStaticPath(locale, "home"), label: copy.nav.home },
            { href: localizedStaticPath(locale, "tool"), label: copy.nav.tool },
            { href: localizedStaticPath(locale, "examples"), label: copy.nav.examples },
            { href: localizedStaticPath(locale, "blog"), label: copy.nav.blog },
            { href: localizedStaticPath(locale, "pricing"), label: copy.nav.pricing },
            { href: localizedStaticPath(locale, "faq"), label: copy.nav.faq }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={localizedStaticPath(alternateLocale, "home")}
            className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950 sm:inline-flex"
          >
            {copy.switchLabel}
          </Link>
          <ButtonLink href={localizedStaticPath(locale, "tool")} className="hidden sm:inline-flex">
            {copy.cta.validate}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

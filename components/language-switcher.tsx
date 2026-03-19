"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  getLocalizedBlogSlug,
  getLocalizedProgrammaticSlug
} from "@/lib/localized-slugs";
import { type Locale, getUiCopy, localizedPath, localizedStaticPath } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

function getAlternateHref(pathname: string, locale: Locale) {
  const alternateLocale: Locale = locale === "en" ? "zh" : "en";
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return localizedStaticPath(alternateLocale, "home");
  }

  const [, ...rest] = segments;

  if (rest.length === 0) {
    return localizedStaticPath(alternateLocale, "home");
  }

  if (rest[0] === "blog" && rest[1]) {
    return localizedPath(alternateLocale, `/blog/${getLocalizedBlogSlug(rest[1], alternateLocale)}`);
  }

  if (rest[0] === "programmatic" && rest[1]) {
    return localizedPath(
      alternateLocale,
      `/programmatic/${getLocalizedProgrammaticSlug(rest[1], alternateLocale)}`
    );
  }

  return localizedPath(alternateLocale, `/${rest.join("/")}`);
}

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = getUiCopy(locale);
  const href = getAlternateHref(pathname, locale);
  const query = searchParams.toString();

  return (
    <Link
      href={query ? `${href}?${query}` : href}
      className={className}
      aria-label={locale === "en" ? "切换到简体中文" : "Switch to English"}
    >
      {copy.switchLabel}
    </Link>
  );
}

import Link from "next/link";

import { getProgrammaticPageSlug, programmaticPages } from "@/content/programmatic-pages";
import { type Locale, getUiCopy, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = getUiCopy(locale);
  const aiStartupPage = programmaticPages.find((page) => page.slug === "how-to-validate-an-ai-startup-idea");
  const recruiterIdeasPage = programmaticPages.find((page) => page.slug === "micro-saas-ideas-for-recruiters");

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {copy.footer.eyebrow}
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white">
            {copy.footer.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            {copy.footer.description}
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {copy.footer.product}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href={localizedStaticPath(locale, "tool")} className="hover:text-white">
                  SaaS Idea Validator
                </Link>
              </li>
              <li>
                <Link href={localizedStaticPath(locale, "examples")} className="hover:text-white">
                  {copy.footer.exampleReports}
                </Link>
              </li>
              <li>
                <Link href={localizedStaticPath(locale, "faq")} className="hover:text-white">
                  {copy.nav.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {copy.footer.content}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href={localizedStaticPath(locale, "blog")} className="hover:text-white">
                  {copy.nav.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(
                    locale,
                    `/programmatic/${aiStartupPage ? getProgrammaticPageSlug(locale, aiStartupPage) : "how-to-validate-an-ai-startup-idea"}`
                  )}
                  className="hover:text-white"
                >
                  {copy.footer.aiStartupValidation}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(
                    locale,
                    `/programmatic/${recruiterIdeasPage ? getProgrammaticPageSlug(locale, recruiterIdeasPage) : "micro-saas-ideas-for-recruiters"}`
                  )}
                  className="hover:text-white"
                >
                  {copy.footer.recruiterIdeas}
                </Link>
              </li>
              <li>
                <Link href={localizedStaticPath(locale, "about")} className="hover:text-white">
                  {copy.footer.about}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            &copy; 2026 {siteConfig.name}. {copy.footer.builtFor}
          </p>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

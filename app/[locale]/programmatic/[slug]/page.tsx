import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ButtonLink } from "@/components/ui/button-link";
import {
  getLocalizedProgrammaticPage,
  getProgrammaticPageByLocaleSlug,
  getProgrammaticPageSlug,
  programmaticPages
} from "@/content/programmatic-pages";
import { isLocale, locales, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type ProgrammaticPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    programmaticPages.map((page) => ({ locale, slug: getProgrammaticPageSlug(locale, page) }))
  );
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = getProgrammaticPageByLocaleSlug(resolvedLocale, slug);

  if (!page) {
    return createLocalizedMetadata({
      locale: resolvedLocale,
      title: "Page not found",
      description: "The requested page could not be found.",
      pathname: `/programmatic/${slug}`,
      noIndex: true
    });
  }

  const localizedPage = getLocalizedProgrammaticPage(page, resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: localizedPage.title,
    description: localizedPage.description,
    pathnames: {
      en: localizedPath("en", `/programmatic/${getProgrammaticPageSlug("en", page)}`),
      zh: localizedPath("zh", `/programmatic/${getProgrammaticPageSlug("zh", page)}`)
    },
    keywords: [page.title.toLowerCase(), "validate saas idea", "startup idea validation"]
  });
}

export default async function ProgrammaticPage({ params }: ProgrammaticPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const page = getProgrammaticPageByLocaleSlug(resolvedLocale, slug);

  if (!page) {
    notFound();
  }

  const localizedPage = getLocalizedProgrammaticPage(page, resolvedLocale);
  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          eyebrow: "程序化 SEO 页面",
          useTool: "使用验证器",
          examples: "查看示例",
          painPoints: "关键痛点",
          ideaExamples: "示例想法",
          framework: "验证框架"
        }
      : {
          home: "Home",
          eyebrow: "Programmatic SEO page",
          useTool: "Use the validator",
          examples: "See examples",
          painPoints: "Key pain points",
          ideaExamples: "Example ideas",
          framework: "Validation framework"
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            {
              name: localizedPage.h1,
              path: localizedPath(resolvedLocale, `/programmatic/${localizedPage.slug}`)
            }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            {
              label: localizedPage.h1,
              href: localizedPath(resolvedLocale, `/programmatic/${localizedPage.slug}`)
            }
          ]}
        />
        <article className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-slate-950">
              {localizedPage.h1}
            </h1>
            <div className="article-copy mt-6">
              {localizedPage.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{localizedPage.ctaTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{localizedPage.ctaCopy}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>
                {pageCopy.useTool}
              </ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                {pageCopy.examples}
              </ButtonLink>
            </div>
          </div>
        </article>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.painPoints}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {localizedPage.painPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.ideaExamples}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {localizedPage.exampleIdeas.map((idea) => (
                <li key={idea}>• {idea}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{pageCopy.framework}</h2>
            <ol className="mt-4 space-y-3 text-slate-700">
              {localizedPage.validationFramework.map((step, index) => (
                <li key={step}>
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </main>
  );
}

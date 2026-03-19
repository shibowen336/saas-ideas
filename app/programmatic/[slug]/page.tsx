import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { ButtonLink } from "@/components/ui/button-link";
import { programmaticPages } from "@/content/programmatic-pages";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type ProgrammaticPageProps = {
  params: Promise<{ slug: string }>;
};

function getProgrammaticPage(slug: string) {
  return programmaticPages.find((page) => page.slug === slug);
}

export async function generateStaticParams() {
  return programmaticPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);

  if (!page) {
    return createMetadata({
      title: "Page not found",
      description: "The requested page could not be found.",
      path: `/programmatic/${slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/programmatic/${page.slug}`,
    keywords: [page.title.toLowerCase(), "validate saas idea", "startup idea validation"]
  });
}

export default async function ProgrammaticPage({ params }: ProgrammaticPageProps) {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.h1, path: `/programmatic/${page.slug}` }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: page.h1, href: `/programmatic/${page.slug}` }
          ]}
        />
        <article className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Programmatic SEO page
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-slate-950">
              {page.h1}
            </h1>
            <div className="article-copy mt-6">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">{page.ctaTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{page.ctaCopy}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tool/saas-idea-validator">Use the validator</ButtonLink>
              <ButtonLink href="/examples" variant="secondary">
                See examples
              </ButtonLink>
            </div>
          </div>
        </article>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Key pain points</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {page.painPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Example ideas</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {page.exampleIdeas.map((idea) => (
                <li key={idea}>• {idea}</li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Validation framework</h2>
            <ol className="mt-4 space-y-3 text-slate-700">
              {page.validationFramework.map((step, index) => (
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

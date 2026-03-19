import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { ButtonLink } from "@/components/ui/button-link";
import {
  blogPosts,
  getBlogPostByLocaleSlug,
  getBlogPostSlug,
  getLocalizedBlogPost
} from "@/content/blog-posts";
import { isLocale, locales, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: getBlogPostSlug(locale, post) }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const post = getBlogPostByLocaleSlug(resolvedLocale, slug);

  if (!post) {
    return createLocalizedMetadata({
      locale: resolvedLocale,
      title: "Article not found",
      description: "The requested article could not be found.",
      pathname: `/blog/${slug}`,
      noIndex: true
    });
  }

  const localizedPost = getLocalizedBlogPost(post, resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: localizedPost.title,
    description: localizedPost.description,
    pathnames: {
      en: localizedPath("en", `/blog/${getBlogPostSlug("en", post)}`),
      zh: localizedPath("zh", `/blog/${getBlogPostSlug("zh", post)}`)
    },
    keywords: localizedPost.keywords,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const post = getBlogPostByLocaleSlug(resolvedLocale, slug);

  if (!post) {
    notFound();
  }

  const localizedPost = getLocalizedBlogPost(post, resolvedLocale);

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            blogPostingSchema({
              locale: resolvedLocale,
              title: localizedPost.title,
              description: localizedPost.description,
              path: localizedPath(resolvedLocale, `/blog/${localizedPost.slug}`),
              publishedTime: localizedPost.publishedTime
            }),
            breadcrumbSchema([
              { name: "Home", path: localizedStaticPath(resolvedLocale, "home") },
              { name: "Blog", path: localizedStaticPath(resolvedLocale, "blog") },
              {
                name: localizedPost.title,
                path: localizedPath(resolvedLocale, `/blog/${localizedPost.slug}`)
              }
            ]),
            faqSchema(localizedPost.faq)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: "Blog", href: localizedStaticPath(resolvedLocale, "blog") },
            {
              label: localizedPost.title,
              href: localizedPath(resolvedLocale, `/blog/${localizedPost.slug}`)
            }
          ]}
        />

        <article className="mt-8">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {localizedPost.category}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-slate-950">
              {localizedPost.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              {localizedPost.date} · {localizedPost.readingTime}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {localizedPost.description}
            </p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="space-y-6">
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-slate-950">Article outline</h2>
                <ol className="mt-4 space-y-3 text-slate-700">
                  {localizedPost.outline.map((item, index) => (
                    <li key={item}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-slate-950">{localizedPost.ctaTitle}</h2>
                <p className="mt-4 leading-7 text-slate-600">{localizedPost.ctaCopy}</p>
                <div className="mt-6">
                  <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>Use the tool</ButtonLink>
                </div>
              </div>
            </aside>

            <div className="space-y-10">
              <section className="surface-card p-8">
                {localizedPost.intro.map((paragraph) => (
                  <p key={paragraph} className="article-copy">
                    {paragraph}
                  </p>
                ))}
              </section>
              {localizedPost.sections.map((section) => (
                <section key={section.title} className="surface-card p-8">
                  <h2 className="text-3xl font-semibold text-slate-950">{section.title}</h2>
                  <div className="article-copy mt-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">Article FAQ</h2>
            <div className="mt-8">
              <FaqList items={localizedPost.faq} />
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-3xl font-semibold text-slate-950">Next step</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{localizedPost.ctaCopy}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>Validate My Idea</ButtonLink>
              <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
                See Example Reports
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

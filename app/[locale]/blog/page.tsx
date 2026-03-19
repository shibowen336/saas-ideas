import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPostSlug, getLocalizedBlogPost } from "@/content/blog-posts";
import { isLocale, localizedPath, localizedStaticPath, getUiCopy } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type BlogIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.blog.title,
    description: copy.pageMeta.blog.description,
    pathname: "/blog",
    keywords: ["saas idea blog", "how to validate a saas idea", "micro saas ideas", "ai saas ideas"]
  });
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: localizedStaticPath(resolvedLocale, "home") },
            { name: "Blog", path: localizedStaticPath(resolvedLocale, "blog") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: localizedStaticPath(resolvedLocale, "home") },
            { label: "Blog", href: localizedStaticPath(resolvedLocale, "blog") }
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow="Blog"
            title="Founder-focused content for validating and narrowing SaaS ideas"
            description="Practical guides, examples, and idea lists built around real search intent instead of thin SEO filler."
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => {
            const localizedPost = getLocalizedBlogPost(post, resolvedLocale);
            const localizedSlug = getBlogPostSlug(resolvedLocale, post);

            return (
              <article key={post.slug} className="surface-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {localizedPost.category}
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                  <Link
                    href={localizedPath(resolvedLocale, `/blog/${localizedSlug}`)}
                    className="hover:text-accent"
                  >
                    {localizedPost.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  {localizedPost.date} · {localizedPost.readingTime}
                </p>
                <p className="mt-4 leading-7 text-slate-600">{localizedPost.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {localizedPost.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <ButtonLink href={localizedPath(resolvedLocale, `/blog/${localizedSlug}`)} variant="secondary">
                    Read article
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">Explore related validation paths</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href={localizedStaticPath(resolvedLocale, "tool")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Use the tool</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate a structured report for your own idea.
              </p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "examples")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Study examples</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review realistic reports before you evaluate your own.
              </p>
            </Link>
            <Link
              href={localizedStaticPath(resolvedLocale, "pricing")}
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Compare plans</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                See which plan fits your stage and workflow.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

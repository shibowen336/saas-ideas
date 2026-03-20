import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts } from "@/content/blog-posts";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Founder-focused blog content on SaaS idea validation, micro SaaS ideas, AI SaaS ideas, startup validation frameworks, and market research.",
  path: "/blog",
  keywords: ["saas idea blog", "how to validate a saas idea", "micro saas ideas", "ai saas ideas"]
});

export default function BlogIndexPage() {
  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" }
          ])}
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
        <div className="mt-8 max-w-3xl">
          <SectionHeading
            eyebrow="Blog"
            title="Founder-focused content for validating and narrowing SaaS ideas"
            description="Practical guides, examples, and idea lists built around real search intent instead of thin SEO filler."
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="surface-card p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {post.category}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                {post.date} · {post.readingTime}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href={`/blog/${post.slug}`} variant="secondary">
                  Read article
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">Explore related validation paths</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/tool/saas-idea-validator"
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Use the tool</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate a structured report for your own idea.
              </p>
            </Link>
            <Link
              href="/examples"
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Study examples</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review realistic reports before you evaluate your own.
              </p>
            </Link>
            <Link
              href="/blog/saas-pricing-validation"
              className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-slate-950">Learn SaaS pricing validation</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pressure-test willingness to pay before you commit to packaging.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

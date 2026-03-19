import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { SchemaScript } from "@/components/schema-script";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, getBlogPost } from "@/content/blog-posts";
import { createMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={[
            blogPostingSchema({
              title: post.title,
              description: post.description,
              slug: post.slug,
              publishedTime: post.publishedTime
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` }
            ]),
            faqSchema(post.faq)
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` }
          ]}
        />
        <article className="mt-8">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {post.category}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-slate-950">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              {post.date} · {post.readingTime}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.description}</p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="space-y-6">
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-slate-950">Article outline</h2>
                <ol className="mt-4 space-y-3 text-slate-700">
                  {post.outline.map((item, index) => (
                    <li key={item}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-slate-950">{post.ctaTitle}</h2>
                <p className="mt-4 leading-7 text-slate-600">{post.ctaCopy}</p>
                <div className="mt-6">
                  <ButtonLink href="/tool/saas-idea-validator">Use the tool</ButtonLink>
                </div>
              </div>
            </aside>

            <div className="space-y-10">
              <section className="surface-card p-8">
                {post.intro.map((paragraph) => (
                  <p key={paragraph} className="article-copy">
                    {paragraph}
                  </p>
                ))}
              </section>
              {post.sections.map((section) => (
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
              <FaqList items={post.faq} />
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-3xl font-semibold text-slate-950">Next step</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{post.ctaCopy}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tool/saas-idea-validator">Validate My Idea</ButtonLink>
              <ButtonLink href="/examples" variant="secondary">
                See Example Reports
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

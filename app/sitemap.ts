import type { MetadataRoute } from "next";

import { blogPosts, getBlogPostSlug } from "@/content/blog-posts";
import { programmaticPages, getProgrammaticPageSlug } from "@/content/programmatic-pages";
import { locales, localizedPath, localizedStaticPath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.flatMap((locale) =>
      [
        localizedStaticPath(locale, "home"),
        localizedStaticPath(locale, "tool"),
        localizedStaticPath(locale, "report"),
        localizedStaticPath(locale, "examples"),
        localizedStaticPath(locale, "faq"),
        localizedStaticPath(locale, "about"),
        localizedStaticPath(locale, "blog")
      ].map((route) => {
        const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
          route.endsWith(`/${locale}`) ? "weekly" : "monthly";

        return {
          url: absoluteUrl(route),
          changeFrequency,
          priority: route.endsWith(`/${locale}`) ? 1 : 0.8
        };
      })
    ),
    ...locales.flatMap((locale) =>
      blogPosts.map((post) => ({
        url: absoluteUrl(localizedPath(locale, `/blog/${getBlogPostSlug(locale, post)}`)),
        lastModified: post.publishedTime,
        changeFrequency: "monthly" as const,
        priority: 0.75
      }))
    ),
    ...locales.flatMap((locale) =>
      programmaticPages.map((page) => ({
        url: absoluteUrl(localizedPath(locale, `/programmatic/${getProgrammaticPageSlug(locale, page)}`)),
        changeFrequency: "monthly" as const,
        priority: 0.7
      }))
    )
  ];
}

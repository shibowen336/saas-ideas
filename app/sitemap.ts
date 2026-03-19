import type { MetadataRoute } from "next";

import { blogPosts } from "@/content/blog-posts";
import { programmaticPages } from "@/content/programmatic-pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/tool/saas-idea-validator",
    "/tool/saas-idea-validator/report",
    "/examples",
    "/pricing",
    "/faq",
    "/about",
    "/blog"
  ];

  return [
    ...staticRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "/" ? "weekly" : "monthly";

      return {
        url: absoluteUrl(route),
        changeFrequency,
        priority: route === "/" ? 1 : 0.8
      };
    }),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.publishedTime,
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...programmaticPages.map((page) => ({
      url: absoluteUrl(`/programmatic/${page.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}

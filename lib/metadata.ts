import type { Metadata } from "next";

import {
  type Locale,
  buildLanguageAlternates,
  getOpenGraphLocale,
  localizedPath
} from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/site";

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false
}: CreateMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)]
    },
    robots: noIndex
      ? {
          index: false,
          follow: true
        }
      : undefined
  };
}

type CreateLocalizedMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  pathname?: string;
  pathnames?: Record<Locale, string>;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createLocalizedMetadata({
  locale,
  title,
  description,
  pathname,
  pathnames,
  keywords = [],
  type = "website",
  noIndex = false
}: CreateLocalizedMetadataInput): Metadata {
  const pathByLocale =
    pathnames ??
    {
      en: localizedPath("en", pathname ?? "/"),
      zh: localizedPath("zh", pathname ?? "/")
    };
  const canonical = absoluteUrl(pathByLocale[locale]);

  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: buildLanguageAlternates(pathByLocale, locale),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)]
    },
    robots: noIndex
      ? {
          index: false,
          follow: true
        }
      : undefined
  };
}

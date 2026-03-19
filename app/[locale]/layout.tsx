import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/schema-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getUiCopy, isLocale } from "@/lib/i18n";
import { organizationSchema, websiteSchema } from "@/lib/schema";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getUiCopy(locale);

  return (
    <>
      <SchemaScript
        schema={[
          organizationSchema(locale),
          websiteSchema(locale, copy.schema.websiteDescription)
        ]}
      />
      <div lang={locale === "zh" ? "zh-CN" : "en"}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-hero-radial" />
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}

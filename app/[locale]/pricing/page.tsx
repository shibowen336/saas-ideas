import { redirect } from "next/navigation";

import { isLocale, localizedStaticPath } from "@/lib/i18n";

type PricingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";

  redirect(localizedStaticPath(resolvedLocale, "tool"));
}

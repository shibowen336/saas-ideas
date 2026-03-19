import { ButtonLink } from "@/components/ui/button-link";
import { type Locale, localizedStaticPath } from "@/lib/i18n";

type MobileStickyCtaProps = {
  locale?: Locale;
};

export function MobileStickyCta({ locale = "en" }: MobileStickyCtaProps) {
  const validateLabel = locale === "zh" ? "验证我的想法" : "Validate My Idea";
  const exampleLabel = locale === "zh" ? "示例报告" : "Example Report";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <ButtonLink href="#validator-form" className="flex-1 text-center">
          {validateLabel}
        </ButtonLink>
        <ButtonLink
          href={localizedStaticPath(locale, "examples")}
          variant="secondary"
          className="flex-1 text-center"
        >
          {exampleLabel}
        </ButtonLink>
      </div>
    </div>
  );
}

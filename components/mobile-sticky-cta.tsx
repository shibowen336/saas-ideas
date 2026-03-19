import { ButtonLink } from "@/components/ui/button-link";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <ButtonLink href="#validator-form" className="flex-1 text-center">
          Validate My Idea
        </ButtonLink>
        <ButtonLink href="/examples" variant="secondary" className="flex-1 text-center">
          Example Report
        </ButtonLink>
      </div>
    </div>
  );
}

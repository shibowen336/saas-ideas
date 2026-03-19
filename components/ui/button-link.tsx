import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-ink text-white shadow-glow hover:-translate-y-0.5 hover:bg-slate-900",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-ink hover:border-slate-400 hover:bg-slate-50",
        variant === "ghost" && "text-ink underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
    </Link>
  );
}

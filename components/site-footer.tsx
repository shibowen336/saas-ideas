import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            SaaS idea validation for founders
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white">
            Validate faster, narrow smarter, and build with evidence instead of guesswork.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Get founder-focused reports covering demand, audience clarity, monetization,
            competition pressure, and practical next-step tests.
          </p>
          <div className="mt-8 max-w-md">
            <NewsletterForm
              source="footer"
              title="Get validation frameworks and launch notes"
              buttonLabel="Join free"
            />
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Product
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/tool/saas-idea-validator" className="hover:text-white">
                  SaaS Idea Validator
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-white">
                  Example reports
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Content
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/programmatic/how-to-validate-an-ai-startup-idea" className="hover:text-white">
                  AI startup validation
                </Link>
              </li>
              <li>
                <Link href="/programmatic/micro-saas-ideas-for-recruiters" className="hover:text-white">
                  Recruiter micro SaaS ideas
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>&copy; 2026 {siteConfig.name}. Built for indie hackers, solo founders, and product builders.</p>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

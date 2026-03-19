import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getUiCopy, isLocale, localizedStaticPath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getUiCopy(resolvedLocale);

  return createLocalizedMetadata({
    locale: resolvedLocale,
    title: copy.pageMeta.about.title,
    description: copy.pageMeta.about.description,
    pathname: "/about",
    keywords: ["about saas idea validator", "startup idea validation tool", "founder validation framework"]
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const pageCopy =
    resolvedLocale === "zh"
      ? {
          home: "首页",
          about: "关于",
          eyebrow: "关于",
          title: "一款帮助创始人停止盲目开建的验证工具",
          description:
            "SaaS Idea Validator 之所以存在，原因只有一个：大多数创业想法不是死在“做不出来”，而是死在创始人还没压测市场就先开始做。",
          introOne:
            "这个产品是为独立开发者、单人创始人和小型产品团队设计的。他们需要一种更快的方法，判断一个想法是否值得继续投入。它不是输出模糊灵感，而是逼你把需求、竞争、定位、变现和下一步验证动作想清楚。",
          introTwo:
            "我们的理念很简单：第一版必须诚实、具体，并且和真实搜索意图相关。好的 SaaS 生意通常起步于一个痛苦的细分工作流、一个可触达的买家，以及一个愿意先手动验证再自动化的创始人。",
          principles: [
            ["务实胜过 hype", "每一份报告都应该帮助创始人决定下一步测什么，而不是把想法包装得更好看。"],
            ["具体胜过宽泛", "最强的想法往往不是越做越大，而是随着受众和问题收窄而变得更强。"],
            ["先验证，再追速度", "只有当你正朝真实需求推进时，快速上线才真的有意义。"]
          ],
          nextTitle: "创始人接下来该做什么",
          nextCopy:
            "如果你已经有想法，直接去用验证器。如果你还在探索阶段，先看示例报告和博客指南，再把你最强的方向放进这套框架里。",
          validate: "验证我的想法",
          examples: "查看示例报告"
        }
      : {
          home: "Home",
          about: "About",
          eyebrow: "About",
          title: "A validation tool built to stop founders from building blind",
          description:
            "SaaS Idea Validator exists for one reason: most startup ideas do not fail because founders cannot build. They fail because founders build before they pressure-test the market.",
          introOne:
            "The product is designed for indie hackers, solo founders, and small product teams that need a faster way to evaluate whether an idea deserves more attention. Instead of producing vague inspiration, it forces clearer thinking around demand, competition, positioning, monetization, and the right next validation steps.",
          introTwo:
            "The philosophy is simple: keep the first version honest, specific, and tied to real search intent. Great SaaS businesses usually start from a painful niche workflow, a reachable buyer, and a founder willing to validate manually before automating.",
          principles: [
            ["Practical over hype", "Every report is meant to help a founder decide what to test next, not flatter the idea."],
            ["Specific beats broad", "The strongest ideas usually become stronger when the audience and problem get narrower."],
            ["Validation before velocity", "Shipping fast is useful only when you are shipping toward real demand."]
          ],
          nextTitle: "What founders should do next",
          nextCopy:
            "If you have an idea already, use the validator. If you are still exploring, browse the example reports and blog guides first, then run your strongest concept through the framework.",
          validate: "Validate My Idea",
          examples: "See Example Reports"
        };

  return (
    <main className="section-space">
      <div className="page-shell">
        <SchemaScript
          schema={breadcrumbSchema([
            { name: pageCopy.home, path: localizedStaticPath(resolvedLocale, "home") },
            { name: pageCopy.about, path: localizedStaticPath(resolvedLocale, "about") }
          ])}
        />
        <Breadcrumbs
          items={[
            { label: pageCopy.home, href: localizedStaticPath(resolvedLocale, "home") },
            { label: pageCopy.about, href: localizedStaticPath(resolvedLocale, "about") }
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow={pageCopy.eyebrow}
              title={pageCopy.title}
              description={pageCopy.description}
            />
          </div>
          <div className="article-copy">
            <p>{pageCopy.introOne}</p>
            <p>{pageCopy.introTwo}</p>
          </div>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {pageCopy.principles.map(([title, copy]) => (
            <article key={title} className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-950">{pageCopy.nextTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{pageCopy.nextCopy}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={localizedStaticPath(resolvedLocale, "tool")}>{pageCopy.validate}</ButtonLink>
            <ButtonLink href={localizedStaticPath(resolvedLocale, "examples")} variant="secondary">
              {pageCopy.examples}
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}

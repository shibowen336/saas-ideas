"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  title?: string;
  buttonLabel?: string;
  source: string;
  className?: string;
  locale?: Locale;
  description?: string;
};

type WaitlistResponse = {
  code?: string;
  message?: string;
};

export function NewsletterForm({
  title,
  buttonLabel = "Get updates",
  source,
  className,
  locale = "en",
  description
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const copy =
    locale === "zh"
      ? {
          emailLabel: "邮箱地址",
          saving: "保存中...",
          description: "只发送与 SaaS 想法验证、定位和发布策略相关的创始人更新。",
          success: "已保存，我们会把后续验证更新发给你。",
          invalidEmail: "请输入有效的邮箱地址。",
          genericError: "暂时无法保存邮箱，请稍后再试。",
          providerMissing: "邮箱服务尚未配置完成，请稍后再试。"
        }
      : {
          emailLabel: "Email address",
          saving: "Saving...",
          description: "Founders-only updates on SaaS idea validation, positioning, and launch strategy.",
          success: "Saved. You will get founder-focused updates and product launch notes.",
          invalidEmail: "Enter a valid email address.",
          genericError: "Unable to save your email.",
          providerMissing: "Email capture is not configured yet. Please try again shortly."
        };

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setMessage("");

    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, locale })
      });

      const raw = await response.text();
      let payload: WaitlistResponse = {};

      if (raw) {
        try {
          payload = JSON.parse(raw) as WaitlistResponse;
        } catch {
          payload = {};
        }
      }

      if (!response.ok) {
        if (payload.code === "invalid_email") {
          throw new Error(copy.invalidEmail);
        }

        if (payload.code === "provider_not_configured") {
          throw new Error(copy.providerMissing);
        }

        throw new Error(payload.message || copy.genericError);
      }

      setStatus("success");
      setMessage(copy.success);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message || copy.genericError : copy.genericError);
    }
  }

  return (
    <div className={cn("rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {title ? <h3 className="text-lg font-semibold text-slate-950">{title}</h3> : null}
      <form action={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${source}`}>
          {copy.emailLabel}
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="min-h-12 flex-1 rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "saving" ? copy.saving : buttonLabel}
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-500">{description ?? copy.description}</p>
      {message ? (
        <p className={cn("mt-3 text-sm", status === "success" ? "text-accent" : "text-red-600")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

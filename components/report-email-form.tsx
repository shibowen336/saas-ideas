"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n";
import type { ValidationReport } from "@/lib/report";
import { cn } from "@/lib/utils";

type ReportEmailFormProps = {
  source: string;
  locale: Locale;
  report: ValidationReport;
  reportUrl: string;
  title?: string;
  buttonLabel?: string;
  description?: string;
  className?: string;
};

type ReportEmailResponse = {
  code?: string;
  message?: string;
};

export function ReportEmailForm({
  source,
  locale,
  report,
  reportUrl,
  title,
  buttonLabel,
  description,
  className
}: ReportEmailFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const copy =
    locale === "zh"
      ? {
          title: title ?? "把这份报告发送到邮箱",
          buttonLabel: buttonLabel ?? "发送报告",
          description:
            description ?? "我们会把当前这份验证报告直接发送到你的邮箱，方便你稍后查看或转发。",
          emailLabel: "邮箱地址",
          sending: "发送中...",
          success: "报告已发送到你的邮箱。",
          invalidEmail: "请输入有效的邮箱地址。",
          providerMissing: "报告邮件模板尚未配置完成，请稍后再试。",
          genericError: "暂时无法发送报告邮件，请稍后再试。"
        }
      : {
          title: title ?? "Send this report to your email",
          buttonLabel: buttonLabel ?? "Email report",
          description:
            description ??
            "We will send the current validation report to your inbox so you can review or forward it later.",
          emailLabel: "Email address",
          sending: "Sending...",
          success: "The report has been sent to your email.",
          invalidEmail: "Enter a valid email address.",
          providerMissing: "The report email template is not configured yet.",
          genericError: "Unable to send the report email right now."
        };

  async function handleSubmit(formData: FormData) {
    setStatus("sending");
    setMessage("");

    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/report-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, locale, report, reportUrl })
      });

      const raw = await response.text();
      let payload: ReportEmailResponse = {};

      if (raw) {
        try {
          payload = JSON.parse(raw) as ReportEmailResponse;
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
      <h3 className="text-lg font-semibold text-slate-950">{copy.title}</h3>
      <form action={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`report-email-${source}`}>
          {copy.emailLabel}
        </label>
        <input
          id={`report-email-${source}`}
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="min-h-12 flex-1 rounded-full border border-slate-300 px-4 text-sm text-slate-950 outline-none transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? copy.sending : copy.buttonLabel}
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-500">{copy.description}</p>
      {message ? (
        <p className={cn("mt-3 text-sm", status === "success" ? "text-accent" : "text-red-600")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

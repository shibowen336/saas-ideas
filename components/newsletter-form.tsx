"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  title?: string;
  buttonLabel?: string;
  source: string;
  className?: string;
};

export function NewsletterForm({
  title,
  buttonLabel = "Get updates",
  source,
  className
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setMessage("");

    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to save your email.");
      }

      setStatus("success");
      setMessage(payload.message || "You are on the list.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to save your email.");
    }
  }

  return (
    <div className={cn("rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {title ? <h3 className="text-lg font-semibold text-slate-950">{title}</h3> : null}
      <form action={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email address
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
          {status === "saving" ? "Saving..." : buttonLabel}
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-500">
        Founders-only updates on SaaS idea validation, positioning, and launch strategy.
      </p>
      {message ? (
        <p className={cn("mt-3 text-sm", status === "success" ? "text-accent" : "text-red-600")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

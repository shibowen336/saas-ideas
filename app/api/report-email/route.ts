import type { Locale } from "@/lib/i18n";
import type { ValidationReport } from "@/lib/report";
import { sendLoopsTransactionalEmail, isValidEmail } from "@/lib/loops";

export const runtime = "nodejs";

type ReportEmailRequest = {
  email?: string;
  source?: string;
  locale?: Locale;
  report?: ValidationReport;
  reportUrl?: string;
};

function getCopy(locale: Locale) {
  if (locale === "zh") {
    return {
      invalidEmail: "请输入有效的邮箱地址。",
      missingTemplate: "报告邮件模板尚未配置完成，请稍后再试。",
      missingPayload: "报告数据不完整，暂时无法发送邮件。",
      sent: "报告已发送到你的邮箱。",
      genericError: "暂时无法发送报告邮件，请稍后再试。"
    };
  }

  return {
    invalidEmail: "Enter a valid email address.",
    missingTemplate: "The report email template is not configured yet.",
    missingPayload: "The report data is incomplete and cannot be emailed yet.",
    sent: "The report has been sent to your email.",
    genericError: "Unable to send the report email right now."
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ReportEmailRequest;
    const locale = payload.locale === "zh" ? "zh" : "en";
    const copy = getCopy(locale);
    const email = payload.email?.trim().toLowerCase() || "";
    const source = payload.source?.trim() || "report-email";
    const report = payload.report;
    const reportUrl = payload.reportUrl?.trim() || "";
    const transactionalId = process.env.LOOPS_REPORT_TRANSACTIONAL_ID?.trim();

    if (!isValidEmail(email)) {
      return Response.json({ code: "invalid_email", message: copy.invalidEmail }, { status: 400 });
    }

    if (!report || !report.idea || !reportUrl) {
      return Response.json({ code: "missing_payload", message: copy.missingPayload }, { status: 400 });
    }

    if (!transactionalId) {
      return Response.json(
        { code: "provider_not_configured", message: copy.missingTemplate },
        { status: 500 }
      );
    }

    const { buildReportEmailData } = await import("@/lib/report-email");
    const dataVariables = buildReportEmailData({ locale, report, reportUrl });

    await sendLoopsTransactionalEmail({ transactionalId, email, dataVariables });

    return Response.json({ code: "sent", message: copy.sent });
  } catch {
    return Response.json(
      {
        code: "unknown_error",
        message: getCopy("en").genericError
      },
      { status: 500 }
    );
  }
}

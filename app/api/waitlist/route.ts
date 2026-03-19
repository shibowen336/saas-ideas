import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

export const runtime = "nodejs";

const signupFile = path.join(process.cwd(), "data", "signups.json");
const tempSignupFile = path.join(os.tmpdir(), "saas-idea-validator-signups.json");
const loopsEndpoint = "https://app.loops.so/api/v1/contacts/update";

type SignupEntry = {
  email: string;
  source: string;
  createdAt: string;
};

type WaitlistRequest = {
  email?: string;
  source?: string;
  locale?: "en" | "zh";
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCopy(locale: "en" | "zh") {
  if (locale === "zh") {
    return {
      invalidEmail: "请输入有效的邮箱地址。",
      saved: "已保存，我们会把后续验证更新发给你。",
      providerMissing: "邮箱服务尚未配置完成，请稍后再试。",
      genericError: "暂时无法保存邮箱，请稍后再试。"
    };
  }

  return {
    invalidEmail: "Enter a valid email address.",
    saved: "Saved. You will get founder-focused updates and product launch notes.",
    providerMissing: "Email capture is not configured yet. Please try again shortly.",
    genericError: "Unable to save your email right now. Please try again in a moment."
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistRequest;
    const locale = payload.locale === "zh" ? "zh" : "en";
    const copy = getCopy(locale);
    const email = payload.email?.trim().toLowerCase() || "";
    const source = payload.source?.trim() || "unknown";

    if (!isValidEmail(email)) {
      return Response.json({ code: "invalid_email", message: copy.invalidEmail }, { status: 400 });
    }

    const loopsApiKey = process.env.LOOPS_API_KEY?.trim();
    if (loopsApiKey) {
      await upsertLoopsContact({ email, source, loopsApiKey });

      return Response.json({
        code: "saved",
        message: copy.saved
      });
    }

    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { code: "provider_not_configured", message: copy.providerMissing },
        { status: 500 }
      );
    }

    const existing = await readEntries();
    const nextEntries = existing.some((entry) => entry.email === email)
      ? existing
      : [...existing, { email, source, createdAt: new Date().toISOString() }];

    await writeEntries(nextEntries);

    return Response.json({
      code: "saved",
      message: copy.saved
    });
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

async function upsertLoopsContact({
  email,
  source,
  loopsApiKey
}: {
  email: string;
  source: string;
  loopsApiKey: string;
}) {
  const userGroup = process.env.LOOPS_WAITLIST_USER_GROUP?.trim() || "Website leads";
  const mailingListId = process.env.LOOPS_WAITLIST_LIST_ID?.trim();
  const sourcePrefix = process.env.LOOPS_SOURCE_PREFIX?.trim();
  const formattedSource = sourcePrefix ? `${sourcePrefix}:${source}` : source;

  const body: Record<string, unknown> = {
    email,
    source: formattedSource,
    userGroup
  };

  if (mailingListId) {
    body.mailingLists = { [mailingListId]: true };
  }

  const response = await fetch(loopsEndpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${loopsApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-store"
  });

  const raw = await response.text();
  let payload: { success?: boolean; message?: string } = {};

  if (raw) {
    try {
      payload = JSON.parse(raw) as { success?: boolean; message?: string };
    } catch {
      payload = {};
    }
  }

  if (!response.ok || payload.success !== true) {
    throw new Error(payload.message || "Loops API request failed.");
  }
}

async function readEntries() {
  const candidates = [signupFile, tempSignupFile];

  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file, "utf8");
      return JSON.parse(raw) as SignupEntry[];
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        continue;
      }
    }
  }

  return [];
}

async function writeEntries(entries: SignupEntry[]) {
  try {
    await fs.mkdir(path.dirname(signupFile), { recursive: true });
    await fs.writeFile(signupFile, JSON.stringify(entries, null, 2));
  } catch {
    await fs.writeFile(tempSignupFile, JSON.stringify(entries, null, 2));
  }
}

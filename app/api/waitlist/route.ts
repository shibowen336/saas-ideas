import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const signupFile = path.join(process.cwd(), "data", "signups.json");

type SignupEntry = {
  email: string;
  source: string;
  createdAt: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { email?: string; source?: string };
  const email = payload.email?.trim().toLowerCase() || "";
  const source = payload.source?.trim() || "unknown";

  if (!isValidEmail(email)) {
    return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const raw = await fs.readFile(signupFile, "utf8");
  const existing = JSON.parse(raw) as SignupEntry[];

  const nextEntries = existing.some((entry) => entry.email === email)
    ? existing
    : [...existing, { email, source, createdAt: new Date().toISOString() }];

  await fs.writeFile(signupFile, JSON.stringify(nextEntries, null, 2));

  return Response.json({
    message: "Saved. You will get founder-focused updates and product launch notes."
  });
}

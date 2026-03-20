const loopsTransactionalEndpoint = "https://app.loops.so/api/v1/transactional";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendLoopsTransactionalEmail({
  transactionalId,
  email,
  dataVariables
}: {
  transactionalId: string;
  email: string;
  dataVariables: Record<string, unknown>;
}) {
  const loopsApiKey = process.env.LOOPS_API_KEY?.trim();
  if (!loopsApiKey) {
    throw new Error("Missing LOOPS_API_KEY.");
  }

  await loopsRequest({
    endpoint: loopsTransactionalEndpoint,
    method: "POST",
    loopsApiKey,
    body: {
      transactionalId,
      email,
      addToAudience: true,
      dataVariables
    }
  });
}

async function loopsRequest({
  endpoint,
  method,
  loopsApiKey,
  body
}: {
  endpoint: string;
  method: "POST" | "PUT";
  loopsApiKey: string;
  body: Record<string, unknown>;
}) {
  const response = await fetch(endpoint, {
    method,
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

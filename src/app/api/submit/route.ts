import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { FORM_NAME, ratingOptions } from "@/config/content";
import { buildWhatsAppText, formatLocalDateTime } from "@/lib/whatsapp";
import { appendSubmission } from "@/lib/store";
import type { RatingValue } from "@/lib/types";

export const runtime = "nodejs";

const VALID_RATINGS: RatingValue[] = ["positive", "neutral", "negative"];

function sanitizeText(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function sendWebhook(payload: Record<string, unknown>): Promise<{ sent: boolean; status?: number }> {
  const url = process.env.WEBHOOK_URL;
  if (!url) return { sent: false };

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.WEBHOOK_SECRET) {
      headers["x-vale-webhook-secret"] = process.env.WEBHOOK_SECRET;
    }
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    return { sent: true, status: res.status };
  } catch (err) {
    console.error("[submit] webhook delivery failed:", err);
    return { sent: false };
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const rating = VALID_RATINGS.includes(data.rating as RatingValue) ? (data.rating as RatingValue) : null;
  const foundEverything = sanitizeText(data.foundEverything);
  const feedback = sanitizeText(data.feedback);
  const completed = Boolean(data.completed);

  if (!rating && !foundEverything && !feedback) {
    return NextResponse.json({ ok: false, error: "empty_submission" }, { status: 400 });
  }

  const submittedAt = new Date();
  const id = randomUUID();
  const option = ratingOptions.find((o) => o.value === rating) ?? null;

  const record = {
    id,
    form: FORM_NAME,
    submittedAt: submittedAt.toISOString(),
    submittedAtLocal: formatLocalDateTime(submittedAt),
    rating: rating
      ? { value: rating, emoji: option?.emoji, label: option?.label }
      : null,
    foundEverything: foundEverything || null,
    feedback: feedback || null,
    completed,
  };

  await appendSubmission(record);

  const whatsappText = buildWhatsAppText({ rating, foundEverything, feedback, completed, submittedAt });

  const webhookResult = await sendWebhook({
    event: "nps.response.created",
    ...record,
    whatsappText,
  });

  return NextResponse.json({ ok: true, id, webhookSent: webhookResult.sent });
}

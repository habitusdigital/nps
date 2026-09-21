import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { FORM_NAME, ratingOptions } from "@/config/content";
import {
  buildQuestionAnswerList,
  buildWhatsAppText,
  formatLocalDateTime,
  npsCategory,
} from "@/lib/whatsapp";
import { appendSubmission } from "@/lib/store";
import type { RatingValue } from "@/lib/types";

export const runtime = "nodejs";

const VALID_RATINGS: RatingValue[] = ["positive", "neutral", "negative"];

function sanitizeText(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function sanitizeRating(value: unknown): RatingValue | null {
  return VALID_RATINGS.includes(value as RatingValue) ? (value as RatingValue) : null;
}

function describeRating(value: RatingValue | null) {
  const option = ratingOptions.find((o) => o.value === value);
  return value && option ? { value, emoji: option.emoji, label: option.label } : null;
}

function sanitizeNpsScore(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  if (value < 0 || value > 10) return null;
  return value;
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
  const rating = sanitizeRating(data.rating);
  const organizationRating = sanitizeRating(data.organizationRating);
  const foundEverything = sanitizeText(data.foundEverything);
  const feedback = sanitizeText(data.feedback);
  const npsScore = sanitizeNpsScore(data.npsScore);
  const completed = Boolean(data.completed);

  if (!rating && !organizationRating && !foundEverything && !feedback && npsScore === null) {
    return NextResponse.json({ ok: false, error: "empty_submission" }, { status: 400 });
  }

  const submittedAt = new Date();
  const id = randomUUID();
  const questions = buildQuestionAnswerList({
    rating,
    organizationRating,
    foundEverything,
    feedback,
    npsScore,
  });

  const record = {
    id,
    form: FORM_NAME,
    submittedAt: submittedAt.toISOString(),
    submittedAtLocal: formatLocalDateTime(submittedAt),
    questions,
    rating: describeRating(rating),
    organization: describeRating(organizationRating),
    foundEverything: foundEverything || null,
    feedback: feedback || null,
    nps: npsScore !== null ? { score: npsScore, category: npsCategory(npsScore) } : null,
    completed,
  };

  await appendSubmission(record);

  const whatsappText = buildWhatsAppText({ questions, completed, submittedAt });

  const webhookResult = await sendWebhook({
    event: "nps.response.created",
    ...record,
    whatsappText,
  });

  return NextResponse.json({ ok: true, id, webhookSent: webhookResult.sent });
}

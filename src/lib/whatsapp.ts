import { ratingOptions } from "@/config/content";
import type { RatingValue } from "@/lib/types";

export function formatLocalDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function npsCategory(score: number | null): "Detrator" | "Neutro" | "Promotor" | null {
  if (score === null) return null;
  if (score <= 6) return "Detrator";
  if (score <= 8) return "Neutro";
  return "Promotor";
}

export function buildWhatsAppText(params: {
  rating: RatingValue | null;
  foundEverything: string;
  feedback: string;
  npsScore: number | null;
  completed: boolean;
  submittedAt: Date;
}): string {
  const { rating, foundEverything, feedback, npsScore, completed, submittedAt } = params;
  const option = ratingOptions.find((o) => o.value === rating);
  const ratingLine = option ? `${option.emoji} ${option.label}` : "Não respondida";
  const category = npsCategory(npsScore);

  const lines = [
    "*Nova avaliação — Vale Café*",
    "",
    `🕒 ${formatLocalDateTime(submittedAt)}`,
    `📊 Avaliação: ${ratingLine}`,
  ];

  if (npsScore !== null) {
    lines.push(`🎯 Nota NPS: ${npsScore}/10 (${category})`);
  }

  if (foundEverything.trim()) {
    lines.push("", `🛒 Encontrou tudo o que procurava?\n${foundEverything.trim()}`);
  }

  if (feedback.trim()) {
    lines.push("", `💬 Elogio/crítica:\n${feedback.trim()}`);
  }

  if (!completed) {
    lines.push("", "_(respondido parcialmente — cliente saiu antes de finalizar)_");
  }

  return lines.join("\n");
}

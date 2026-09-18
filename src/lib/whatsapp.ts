import { npsContent, ratingContent, ratingOptions, textQuestions } from "@/config/content";
import type { RatingValue } from "@/lib/types";

function flatten(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").trim();
}

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

function formatDayAndTime(date: Date): string {
  const day = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `${day} às ${time}`;
}

export function npsCategory(score: number | null): "Detrator" | "Neutro" | "Promotor" | null {
  if (score === null) return null;
  if (score <= 6) return "Detrator";
  if (score <= 8) return "Neutro";
  return "Promotor";
}

export function buildQuestionAnswerList(params: {
  rating: RatingValue | null;
  foundEverything: string;
  feedback: string;
  npsScore: number | null;
}): Array<{ question: string; answer: string }> {
  const { rating, foundEverything, feedback, npsScore } = params;
  const option = ratingOptions.find((o) => o.value === rating);
  const list: Array<{ question: string; answer: string }> = [];

  if (option) {
    list.push({ question: flatten(ratingContent.question), answer: `${option.emoji} ${option.label}` });
  }
  if (foundEverything.trim()) {
    list.push({ question: textQuestions[0].question, answer: foundEverything.trim() });
  }
  if (feedback.trim()) {
    list.push({ question: textQuestions[1].question, answer: feedback.trim() });
  }
  if (npsScore !== null) {
    list.push({
      question: flatten(npsContent.question),
      answer: `${npsScore} (${npsCategory(npsScore)})`,
    });
  }

  return list;
}

export function buildWhatsAppText(params: {
  questions: Array<{ question: string; answer: string }>;
  completed: boolean;
  submittedAt: Date;
}): string {
  const { questions, completed, submittedAt } = params;

  const lines = ["*Nova avaliação — Vale Café*", `📅 ${formatDayAndTime(submittedAt)}`];

  for (const { question, answer } of questions) {
    lines.push("", `❓ *${question}*`, answer);
  }

  if (!completed) {
    lines.push("", "_(respondido parcialmente — cliente saiu antes de finalizar)_");
  }

  return lines.join("\n");
}

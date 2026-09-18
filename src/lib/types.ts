export type RatingValue = "positive" | "neutral" | "negative";

export type SurveyPayload = {
  rating: RatingValue | null;
  foundEverything: string;
  feedback: string;
  completed: boolean;
  startedAt: string;
};

export type SubmitResponse = {
  ok: boolean;
  id?: string;
  error?: string;
};

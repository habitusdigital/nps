export const FORM_NAME = "Vale Café — Pesquisa de Avaliação";

export const idleContent = {
  eyebrow: "Pesquisa de Avaliação",
  title: "Seja bem-vindo ao\nespaço Vale Café",
  subtitle: "Enquanto você toma uma deliciosa bebida, que tal deixar uma avaliação?",
  highlight: "Sua opinião Vale muito!",
  cta: "Toque para começar",
};

export type RatingOption = {
  value: "positive" | "neutral" | "negative";
  emoji: string;
  label: string;
  color: string; // tailwind class stem
};

export const ratingOptions: RatingOption[] = [
  { value: "positive", emoji: "😄", label: "Gostei muito", color: "sage" },
  { value: "neutral", emoji: "😐", label: "Normal", color: "amber" },
  { value: "negative", emoji: "😞", label: "Não gostei", color: "terracotta" },
];

export const ratingContent = {
  question: "Como foi sua experiência\nno Vale Café hoje?",
  hint: "Toque no rosto que mais combina com você",
};

export const textQuestions = [
  {
    id: "found_everything" as const,
    question: "Encontrou tudo o que procurava ou sentiu falta de algum item?",
    placeholder: "Conte pra gente (opcional)...",
    skipLabel: "Pular",
    nextLabel: "Continuar",
  },
  {
    id: "feedback" as const,
    question: "Tem algum elogio de algo que gostou ou alguma crítica de onde podemos melhorar?",
    placeholder: "Sua opinião vale muito (opcional)...",
    skipLabel: "Pular",
    nextLabel: "Enviar",
  },
];

export const thanksContent = {
  title: "Obrigado pela sua avaliação!",
  subtitle: "Sua opinião ajuda a gente a melhorar todos os dias.",
  returning: "Voltando ao início...",
};

export const INACTIVITY_TIMEOUT_MS = 45_000;
export const THANKS_AUTO_RETURN_MS = 6_000;

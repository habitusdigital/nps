export const COMPANY_NAME = "Vale Distribuidora";

export const FORM_NAME = `${COMPANY_NAME} — Pesquisa de Avaliação`;

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
  question: "Como foi sua experiência\naqui na Vale?",
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
    nextLabel: "Continuar",
  },
];

export const npsContent = {
  question: "De 0 a 10, o quanto você indicaria\na Vale para um amigo ou familiar?",
  hint: "Toque na nota que representa sua opinião",
  lowLabel: "Nada provável",
  highLabel: "Muito provável",
};

export const thanksContent = {
  title: "Obrigado pela sua avaliação!",
  subtitle: "Sua opinião ajuda a gente a melhorar todos os dias.",
  returning: "Voltando ao início...",
};

export const INACTIVITY_TIMEOUT_MS = 45_000;
export const THANKS_AUTO_RETURN_MS = 6_000;

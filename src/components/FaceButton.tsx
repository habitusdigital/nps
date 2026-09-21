"use client";

import { motion } from "framer-motion";
import type { RatingOption } from "@/config/content";

const COLOR_MAP: Record<string, { border: string; bg: string; text: string }> = {
  sage: {
    border: "border-vale-sage",
    bg: "bg-vale-sage/20",
    text: "text-vale-sageDark",
  },
  amber: {
    border: "border-vale-amber",
    bg: "bg-vale-amber/20",
    text: "text-vale-amber",
  },
  terracotta: {
    border: "border-vale-terracotta",
    bg: "bg-vale-terracotta/20",
    text: "text-vale-terracotta",
  },
};

export function FaceButton({
  option,
  selected,
  onSelect,
}: {
  option: RatingOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const colors = COLOR_MAP[option.color];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.94 }}
      animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`f-face-card group relative flex flex-1 flex-col items-center justify-center rounded-[2rem] border-2 bg-white/70 px-4 shadow-sm backdrop-blur-sm transition-colors max-sm:flex-row max-sm:justify-start max-sm:gap-4 max-sm:pl-10 ${
        selected ? `${colors.border} ${colors.bg}` : "border-vale-charcoal/10 hover:border-vale-charcoal/20"
      }`}
    >
      <span className="f-face-emoji" role="img" aria-label={option.label}>
        {option.emoji}
      </span>
      <span
        className={`f-face-label font-display font-medium ${selected ? colors.text : "text-vale-charcoal"}`}
      >
        {option.label}
      </span>
    </motion.button>
  );
}

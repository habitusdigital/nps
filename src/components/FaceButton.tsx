"use client";

import { motion } from "framer-motion";
import type { RatingOption } from "@/config/content";

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  sage: {
    border: "border-vale-sage",
    bg: "bg-vale-sage/20",
    text: "text-vale-sageDark",
    ring: "ring-vale-sage",
  },
  amber: {
    border: "border-vale-amber",
    bg: "bg-vale-amber/20",
    text: "text-vale-amber",
    ring: "ring-vale-amber",
  },
  terracotta: {
    border: "border-vale-terracotta",
    bg: "bg-vale-terracotta/20",
    text: "text-vale-terracotta",
    ring: "ring-vale-terracotta",
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
      className={`group relative flex flex-1 flex-col items-center justify-center gap-3 rounded-[2rem] border-2 bg-white/70 px-4 py-8 shadow-sm backdrop-blur-sm transition-colors sm:py-10 md:gap-4 md:py-12 ${
        selected ? `${colors.border} ${colors.bg}` : "border-vale-charcoal/10 hover:border-vale-charcoal/20"
      }`}
    >
      <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl" role="img" aria-label={option.label}>
        {option.emoji}
      </span>
      <span
        className={`font-display text-lg font-medium sm:text-xl md:text-2xl ${
          selected ? colors.text : "text-vale-charcoal"
        }`}
      >
        {option.label}
      </span>
    </motion.button>
  );
}

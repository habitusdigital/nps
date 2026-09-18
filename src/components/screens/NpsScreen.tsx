"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { npsContent } from "@/config/content";

const SCORES = Array.from({ length: 11 }, (_, i) => i);

function colorsFor(score: number) {
  if (score <= 6) {
    return {
      border: "border-vale-terracotta",
      bg: "bg-vale-terracotta/20",
      text: "text-vale-terracotta",
    };
  }
  if (score <= 8) {
    return {
      border: "border-vale-amber",
      bg: "bg-vale-amber/20",
      text: "text-vale-amber",
    };
  }
  return {
    border: "border-vale-sage",
    bg: "bg-vale-sage/20",
    text: "text-vale-sageDark",
  };
}

export function NpsScreen({
  initialValue,
  onSelect,
  onBack,
  onInteract,
}: {
  initialValue: number | null;
  onSelect: (score: number) => void;
  onBack: () => void;
  onInteract: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSelect(score: number) {
    onInteract();
    setSelected(score);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSelect(score), 520);
  }

  function handleBack() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onBack();
  }

  return (
    <ScreenTransition>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-vale-cream px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12">
        <BackgroundDecor variant="light" />

        <ScreenHeader step={3} onBack={handleBack} />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 py-6 text-center sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h2 className="whitespace-pre-line font-display text-3xl font-medium leading-tight text-vale-charcoal sm:text-5xl md:text-6xl">
              {npsContent.question}
            </h2>
            <p className="text-sm text-vale-charcoal/60 sm:text-base md:text-lg">{npsContent.hint}</p>
          </div>

          <div className="flex w-full max-w-3xl flex-col items-center gap-3 md:max-w-4xl md:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-3.5">
              {SCORES.map((score) => {
                const colors = colorsFor(score);
                const isSelected = selected === score;
                return (
                  <motion.button
                    key={score}
                    type="button"
                    onClick={() => handleSelect(score)}
                    whileTap={{ scale: 0.9 }}
                    animate={isSelected ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 bg-white/70 font-display text-base font-medium backdrop-blur-sm transition-colors sm:h-12 sm:w-12 sm:text-lg md:h-14 md:w-14 md:text-xl ${
                      isSelected
                        ? `${colors.border} ${colors.bg} ${colors.text}`
                        : "border-vale-charcoal/10 text-vale-charcoal hover:border-vale-charcoal/20"
                    }`}
                  >
                    {score}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex w-full justify-between px-1 text-xs text-vale-charcoal/50 sm:text-sm md:text-base">
              <span>{npsContent.lowLabel}</span>
              <span>{npsContent.highLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
}

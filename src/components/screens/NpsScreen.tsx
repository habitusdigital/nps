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
      <div className="f-screen-pad relative flex h-full w-full flex-col overflow-hidden bg-vale-cream px-6 sm:px-12 md:px-16">
        <BackgroundDecor variant="light" />

        <ScreenHeader step={4} onBack={handleBack} />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto text-center">
          <div className="min-h-2 grow-[2]" />
          <div className="f-block-gap flex flex-col items-center">
            <div className="f-title-gap flex flex-col items-center">
              <h2 className="f-title whitespace-pre-line font-display font-medium text-vale-charcoal">
                {npsContent.question}
              </h2>
              <p className="f-hint text-vale-charcoal/60">{npsContent.hint}</p>
            </div>

            <div className="f-nps-gap flex w-fit max-w-3xl flex-col md:max-w-4xl">
              <div className="f-nps-gap flex flex-wrap items-center justify-center">
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
                      className={`f-nps-btn flex items-center justify-center rounded-2xl border-2 bg-white/70 font-display font-medium backdrop-blur-sm transition-colors ${
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

              <div className="f-hint flex w-full justify-between px-1 text-vale-charcoal/50">
                <span>{npsContent.lowLabel}</span>
                <span>{npsContent.highLabel}</span>
              </div>
            </div>
          </div>
          <div className="min-h-2 grow-[3.5]" />
        </div>
      </div>
    </ScreenTransition>
  );
}

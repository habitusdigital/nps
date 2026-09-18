"use client";

import { useEffect, useRef, useState } from "react";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { FaceButton } from "@/components/FaceButton";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ratingContent, ratingOptions } from "@/config/content";
import type { RatingValue } from "@/lib/types";

export function RatingScreen({
  initialValue,
  onSelect,
  onBack,
  onInteract,
}: {
  initialValue: RatingValue | null;
  onSelect: (value: RatingValue) => void;
  onBack: () => void;
  onInteract: () => void;
}) {
  const [selected, setSelected] = useState<RatingValue | null>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSelect(value: RatingValue) {
    onInteract();
    setSelected(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSelect(value), 520);
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

        <ScreenHeader step={0} onBack={handleBack} />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 py-6 text-center sm:gap-14 md:gap-16">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h2 className="whitespace-pre-line font-display text-3xl font-medium leading-tight text-vale-charcoal sm:text-5xl md:text-6xl">
              {ratingContent.question}
            </h2>
            <p className="text-sm text-vale-charcoal/60 sm:text-base md:text-lg">{ratingContent.hint}</p>
          </div>

          <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6 md:max-w-4xl md:gap-8">
            {ratingOptions.map((option) => (
              <FaceButton
                key={option.value}
                option={option}
                selected={selected === option.value}
                onSelect={() => handleSelect(option.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
}

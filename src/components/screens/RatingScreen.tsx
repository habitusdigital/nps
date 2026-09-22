"use client";

import { useEffect, useRef, useState } from "react";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { FaceButton } from "@/components/FaceButton";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ratingOptions, type FaceQuestionContent } from "@/config/content";
import type { RatingValue } from "@/lib/types";

export function RatingScreen({
  step,
  content,
  initialValue,
  onSelect,
  onBack,
  onInteract,
}: {
  step: number;
  content: FaceQuestionContent;
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
      <div className="f-screen-pad relative flex h-full w-full flex-col overflow-hidden bg-vale-cream px-6 sm:px-12 md:px-16">
        <BackgroundDecor variant="light" />

        <ScreenHeader step={step} onBack={handleBack} />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto text-center">
          <div className="min-h-2 grow-[2]" />
          <div className="f-block-gap flex flex-col items-center">
            <div className="f-title-gap flex flex-col items-center">
              <h2 className="f-title whitespace-pre-line font-display font-medium text-vale-charcoal">
                {content.question}
              </h2>
              <p className="f-hint text-vale-charcoal/60">{content.hint}</p>
            </div>

            <div className="f-row-gap flex w-full max-w-3xl flex-col sm:flex-row md:max-w-4xl">
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
          <div className="min-h-2 grow-[3]" />
        </div>
      </div>
    </ScreenTransition>
  );
}

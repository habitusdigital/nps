"use client";

import { useState } from "react";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";

export function TextQuestionScreen({
  step,
  question,
  placeholder,
  skipLabel,
  nextLabel,
  initialValue,
  onSubmit,
  onBack,
  onInteract,
}: {
  step: number;
  question: string;
  placeholder: string;
  skipLabel: string;
  nextLabel: string;
  initialValue: string;
  onSubmit: (value: string) => void;
  onBack: () => void;
  onInteract: () => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <ScreenTransition>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-vale-cream px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12">
        <BackgroundDecor variant="light" />

        <ScreenHeader step={step} onBack={onBack} />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 py-6 sm:gap-10 md:gap-12">
          <h2 className="max-w-2xl text-center font-display text-2xl font-medium leading-snug text-vale-charcoal sm:text-4xl md:max-w-3xl md:text-5xl">
            {question}
          </h2>

          <textarea
            autoFocus
            value={value}
            onChange={(e) => {
              onInteract();
              setValue(e.target.value);
            }}
            onFocus={onInteract}
            placeholder={placeholder}
            rows={4}
            className="w-full max-w-2xl resize-none rounded-3xl border-2 border-vale-charcoal/10 bg-white/80 p-5 text-lg text-vale-charcoal shadow-sm outline-none backdrop-blur-sm transition-colors focus:border-vale-sage sm:p-6 sm:text-xl md:max-w-3xl md:p-7 md:text-2xl"
          />

          <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row md:max-w-3xl md:gap-4">
            <button
              type="button"
              onClick={() => {
                onInteract();
                onSubmit("");
              }}
              className="flex-1 rounded-full border-2 border-vale-charcoal/15 px-6 py-4 font-display text-base font-medium text-vale-charcoal/70 transition-colors hover:bg-vale-charcoal/5 sm:text-lg md:py-5 md:text-xl"
            >
              {skipLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                onInteract();
                onSubmit(value);
              }}
              className="flex-[2] rounded-full bg-vale-charcoal px-6 py-4 font-display text-base font-medium text-white shadow-md transition-transform active:scale-[0.98] sm:text-lg md:py-5 md:text-xl"
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
}

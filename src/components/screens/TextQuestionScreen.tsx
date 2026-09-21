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
      <div className="f-screen-pad relative flex h-full w-full flex-col overflow-hidden bg-vale-cream px-6 sm:px-12 md:px-16">
        <BackgroundDecor variant="light" />

        <ScreenHeader step={step} onBack={onBack} />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="min-h-2 grow-[2]" />
          <div className="f-block-gap flex flex-col items-center">
            <h2 className="f-title-text max-w-2xl text-center font-display font-medium text-vale-charcoal md:max-w-3xl">
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
              rows={3}
              className="f-textarea w-full max-w-2xl resize-none rounded-3xl border-2 border-vale-charcoal/10 bg-white/80 text-vale-charcoal shadow-sm outline-none backdrop-blur-sm transition-colors focus:border-vale-sage md:max-w-3xl"
            />

            <div className="f-row-gap flex w-full max-w-2xl flex-col sm:flex-row md:max-w-3xl">
              <button
                type="button"
                onClick={() => {
                  onInteract();
                  onSubmit("");
                }}
                className="f-action-btn flex-1 rounded-full border-2 border-vale-charcoal/15 px-6 font-display font-medium text-vale-charcoal/70 transition-colors hover:bg-vale-charcoal/5"
              >
                {skipLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onInteract();
                  onSubmit(value);
                }}
                className="f-action-btn flex-[2] rounded-full bg-vale-charcoal px-6 font-display font-medium text-white shadow-md transition-transform active:scale-[0.98]"
              >
                {nextLabel}
              </button>
            </div>
          </div>
          <div className="min-h-2 grow-[3.5]" />
        </div>
      </div>
    </ScreenTransition>
  );
}

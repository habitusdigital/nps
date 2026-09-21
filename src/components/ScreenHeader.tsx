"use client";

import Image from "next/image";
import { ProgressDots } from "@/components/ProgressDots";

export function ScreenHeader({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex w-9 justify-start sm:w-10 md:w-12">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-vale-charcoal/15 bg-white/60 text-lg text-vale-charcoal/70 backdrop-blur-sm transition-colors hover:bg-white sm:h-10 sm:w-10 sm:text-xl md:h-12 md:w-12"
          >
            ‹
          </button>
        )}
      </div>

      <ProgressDots total={5} current={step} />

      <Image
        src="/brand/dark/vale-icon-badge.png"
        alt="Vale"
        width={525}
        height={479}
        className="h-9 w-auto rounded-lg sm:h-10 md:h-12"
      />
    </div>
  );
}

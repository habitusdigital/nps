"use client";

import Image from "next/image";
import { ProgressDots } from "@/components/ProgressDots";

export function ScreenHeader({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="f-header-btn flex justify-start">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="f-header-btn flex items-center justify-center rounded-full border border-vale-charcoal/15 bg-white/60 text-xl text-vale-charcoal/70 backdrop-blur-sm transition-colors hover:bg-white"
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
        className="f-header-icon rounded-lg"
      />
    </div>
  );
}

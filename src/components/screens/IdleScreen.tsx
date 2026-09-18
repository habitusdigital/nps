"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { ScreenTransition } from "@/components/ScreenTransition";
import { idleContent } from "@/config/content";

export function IdleScreen({ onStart }: { onStart: () => void }) {
  return (
    <ScreenTransition>
      <button
        type="button"
        onClick={onStart}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-vale-charcoalDeep via-vale-charcoalDark to-vale-charcoal px-6 py-8 text-center sm:px-10 md:px-16"
      >
        <BackgroundDecor variant="dark" />

        <div className="relative z-10 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-8 py-4 sm:gap-10 md:gap-12 lg:gap-14">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Image
              src="/brand/white/vale-horizontal.png"
              alt="Vale"
              width={591}
              height={163}
              priority
              className="h-12 w-auto drop-shadow-[0_2px_24px_rgba(155,176,147,0.25)] sm:h-16 md:h-20 lg:h-24"
            />
            <span className="font-display text-sm uppercase tracking-[0.5em] text-vale-sageLight sm:text-lg md:text-xl">
              Café
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <span className="font-display text-xs uppercase tracking-[0.4em] text-vale-sageLight/80 sm:text-sm md:text-base">
              {idleContent.eyebrow}
            </span>
            <h1 className="whitespace-pre-line font-display text-3xl font-medium leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {idleContent.title}
            </h1>
            <p className="max-w-md text-base text-white/70 sm:max-w-xl sm:text-xl md:text-2xl">
              {idleContent.subtitle}
            </p>
            <p className="font-display text-2xl italic text-vale-sage sm:text-3xl md:text-4xl">
              {idleContent.highlight}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-2xl text-white sm:h-16 sm:w-16 md:h-20 md:w-20 md:text-3xl"
            >
              👆
            </motion.div>
            <span className="animate-pulse-soft rounded-full bg-white/10 px-7 py-3.5 font-display text-base font-medium tracking-wide text-white sm:px-8 sm:py-4 sm:text-lg md:text-xl">
              {idleContent.cta}
            </span>
          </div>
        </div>
      </button>
    </ScreenTransition>
  );
}

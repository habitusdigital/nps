"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { ScreenTransition } from "@/components/ScreenTransition";
import { idleContent, ratingOptions } from "@/config/content";

export function IdleScreen({ onStart }: { onStart: () => void }) {
  return (
    <ScreenTransition>
      <button
        type="button"
        onClick={onStart}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-vale-charcoalDeep via-vale-charcoalDark to-vale-charcoal text-center"
      >
        <BackgroundDecor variant="dark" />

        <div className="relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center gap-6 overflow-y-auto px-6 py-6 sm:gap-8 sm:px-10 sm:py-8 md:gap-9 md:px-16 lg:gap-10">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Image
              src="/brand/white/vale-horizontal.png"
              alt="Vale"
              width={591}
              height={163}
              priority
              className="h-11 w-auto drop-shadow-[0_2px_24px_rgba(155,176,147,0.25)] sm:h-14 md:h-16 lg:h-20"
            />
            <span className="font-display text-sm uppercase tracking-[0.5em] text-vale-sageLight sm:text-lg md:text-xl">
              Café
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
            <span className="font-display text-xs uppercase tracking-[0.4em] text-vale-sageLight/80 sm:text-sm md:text-base">
              {idleContent.eyebrow}
            </span>
            <h1 className="whitespace-pre-line font-display text-3xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {idleContent.title}
            </h1>
            <p className="max-w-md text-base text-white/70 sm:max-w-xl sm:text-xl md:text-2xl">
              {idleContent.subtitle}
            </p>
            <p className="font-display text-2xl italic text-vale-sage sm:text-3xl md:text-4xl">
              {idleContent.highlight}
            </p>
          </div>

          <div className="flex items-center gap-5 sm:gap-7 md:gap-9">
            {ratingOptions.map((option, i) => (
              <motion.span
                key={option.value}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                className="text-4xl sm:text-5xl md:text-6xl"
                role="img"
                aria-label={option.label}
              >
                {option.emoji}
              </motion.span>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 sm:gap-4 sm:px-8 sm:py-4"
          >
            <span className="text-xl sm:text-2xl md:text-3xl">👆</span>
            <span className="font-display text-base font-medium tracking-wide text-white sm:text-lg md:text-xl">
              {idleContent.cta}
            </span>
          </motion.div>
        </div>
      </button>
    </ScreenTransition>
  );
}

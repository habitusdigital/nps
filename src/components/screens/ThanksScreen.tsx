"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { ScreenTransition } from "@/components/ScreenTransition";
import { thanksContent } from "@/config/content";

export function ThanksScreen({
  onDismiss,
  autoReturnMs,
}: {
  onDismiss: () => void;
  autoReturnMs: number;
}) {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(autoReturnMs / 1000));

  useEffect(() => {
    setSecondsLeft(Math.ceil(autoReturnMs / 1000));
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoReturnMs]);

  return (
    <ScreenTransition>
      <button
        type="button"
        onClick={onDismiss}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-vale-charcoalDeep via-vale-charcoalDark to-vale-charcoal px-6 text-center sm:px-12"
      >
        <BackgroundDecor variant="dark" />

        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-vale-sage/20 text-5xl sm:h-28 sm:w-28 sm:text-6xl md:h-32 md:w-32 md:text-7xl"
          >
            💚
          </motion.div>

          <h2 className="font-display text-3xl font-medium text-white sm:text-5xl md:text-6xl">
            {thanksContent.title}
          </h2>
          <p className="max-w-md text-base text-white/70 sm:text-xl md:text-2xl">
            {thanksContent.subtitle}
          </p>

          <Image
            src="/brand/white/vale-horizontal.png"
            alt="Vale"
            width={591}
            height={163}
            className="mt-4 h-8 w-auto opacity-80 sm:h-10 md:h-11"
          />

          <div className="mt-2 flex flex-col items-center gap-2">
            <motion.div
              key={secondsLeft}
              initial={{ scale: 1.3, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-vale-sage/50 font-display text-sm text-vale-sageLight sm:h-10 sm:w-10 sm:text-base"
            >
              {secondsLeft}
            </motion.div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 sm:text-sm">
              {thanksContent.returning}
            </span>
          </div>
        </div>
      </button>
    </ScreenTransition>
  );
}

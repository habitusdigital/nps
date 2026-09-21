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

        <div className="f-stack-gap relative z-10 flex max-h-full flex-col items-center overflow-y-auto py-2">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="f-thanks-circle flex items-center justify-center rounded-full bg-vale-sage/20"
          >
            💚
          </motion.div>

          <h2 className="f-title font-display font-medium text-white">{thanksContent.title}</h2>
          <p className="f-body max-w-md text-white/70 md:max-w-lg">{thanksContent.subtitle}</p>

          <Image
            src="/brand/white/vale-horizontal.png"
            alt="Vale"
            width={591}
            height={163}
            className="f-thanks-logo opacity-80"
          />

          <div className="f-copy-gap flex flex-col items-center">
            <motion.div
              key={secondsLeft}
              initial={{ scale: 1.3, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="f-thanks-count flex items-center justify-center rounded-full border border-vale-sage/50 font-display text-vale-sageLight"
            >
              {secondsLeft}
            </motion.div>
            <span className="f-thanks-small uppercase tracking-[0.3em] text-white/40">
              {thanksContent.returning}
            </span>
          </div>
        </div>
      </button>
    </ScreenTransition>
  );
}

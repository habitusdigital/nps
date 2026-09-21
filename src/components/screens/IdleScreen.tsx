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
        className="relative flex h-full w-full flex-col items-center overflow-hidden bg-gradient-to-b from-vale-charcoalDeep via-vale-charcoalDark to-vale-charcoal text-center"
      >
        <BackgroundDecor variant="dark" />

        <div className="relative z-10 min-h-2 grow-[2]" />
        <div className="f-stack-gap relative z-10 flex min-h-0 w-full max-w-4xl shrink flex-col items-center overflow-y-auto px-6 py-2 sm:px-10 md:px-16">
          <div className="f-lockup-gap flex items-center">
            <Image
              src="/brand/white/vale-horizontal.png"
              alt="Vale"
              width={591}
              height={163}
              priority
              className="f-idle-logo drop-shadow-[0_2px_24px_rgba(155,176,147,0.25)]"
            />
            <span aria-hidden className="f-lockup-divider w-px bg-vale-sageLight/50" />
            <span className="f-idle-cafe font-display uppercase text-vale-sageLight">Café</span>
          </div>

          <div className="f-copy-gap flex flex-col items-center">
            <h1 className="f-idle-title whitespace-pre-line font-display font-medium text-white">
              {idleContent.title}
            </h1>
            <p className="f-body max-w-md text-white/70 sm:max-w-xl md:max-w-2xl">{idleContent.subtitle}</p>
            <p className="f-idle-highlight font-display italic text-vale-sage">{idleContent.highlight}</p>
          </div>

          <div className="f-idle-faces-row flex items-center">
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
                className="f-idle-faces"
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
            className="f-cta-pill flex items-center rounded-full bg-white/10"
          >
            <span className="f-cta-icon">👆</span>
            <span className="f-cta font-display font-medium tracking-wide text-white">{idleContent.cta}</span>
          </motion.div>
        </div>
        <div className="relative z-10 min-h-2 grow-[3.5]" />
      </button>
    </ScreenTransition>
  );
}

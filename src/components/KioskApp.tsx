"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { IdleScreen } from "@/components/screens/IdleScreen";
import { NpsScreen } from "@/components/screens/NpsScreen";
import { RatingScreen } from "@/components/screens/RatingScreen";
import { TextQuestionScreen } from "@/components/screens/TextQuestionScreen";
import { ThanksScreen } from "@/components/screens/ThanksScreen";
import {
  INACTIVITY_TIMEOUT_MS,
  THANKS_AUTO_RETURN_MS,
  experienceContent,
  organizationContent,
  textQuestions,
} from "@/config/content";
import type { RatingValue } from "@/lib/types";

type Step = "idle" | "rating" | "organization" | "found_everything" | "feedback" | "nps" | "thanks";

const EMPTY_ANSWERS = { foundEverything: "", feedback: "" };

export function KioskApp() {
  const [step, setStep] = useState<Step>("idle");
  const [rating, setRating] = useState<RatingValue | null>(null);
  const [organizationRating, setOrganizationRating] = useState<RatingValue | null>(null);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ratingRef = useRef<RatingValue | null>(null);
  const organizationRef = useRef<RatingValue | null>(null);
  const answersRef = useRef(EMPTY_ANSWERS);
  const npsScoreRef = useRef<number | null>(null);

  ratingRef.current = rating;
  organizationRef.current = organizationRating;
  answersRef.current = answers;
  npsScoreRef.current = npsScore;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetToIdle = useCallback(() => {
    clearTimer();
    setStep("idle");
    setRating(null);
    setOrganizationRating(null);
    setAnswers(EMPTY_ANSWERS);
    setNpsScore(null);
  }, [clearTimer]);

  const submit = useCallback(async (completed: boolean) => {
    const payload = {
      rating: ratingRef.current,
      organizationRating: organizationRef.current,
      foundEverything: answersRef.current.foundEverything,
      feedback: answersRef.current.feedback,
      npsScore: npsScoreRef.current,
      completed,
    };
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[kiosk] submit failed:", err);
    }
  }, []);

  const scheduleInactivityReturn = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (ratingRef.current) {
        void submit(false);
      }
      resetToIdle();
    }, INACTIVITY_TIMEOUT_MS);
  }, [clearTimer, resetToIdle, submit]);

  useEffect(() => {
    if (step === "idle") {
      clearTimer();
      return;
    }
    if (step === "thanks") {
      clearTimer();
      timerRef.current = setTimeout(resetToIdle, THANKS_AUTO_RETURN_MS);
      return () => clearTimer();
    }
    scheduleInactivityReturn();
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function handleStart() {
    setStep("rating");
  }

  function handleRating(value: RatingValue) {
    setRating(value);
    setStep("organization");
  }

  function handleOrganization(value: RatingValue) {
    setOrganizationRating(value);
    setStep("found_everything");
  }

  function handleFoundEverything(value: string) {
    setAnswers((prev) => ({ ...prev, foundEverything: value }));
    setStep("feedback");
  }

  function handleFeedback(value: string) {
    setAnswers((prev) => ({ ...prev, feedback: value }));
    setStep("nps");
  }

  async function handleNps(score: number) {
    setNpsScore(score);
    npsScoreRef.current = score;
    clearTimer();
    setStep("thanks");
    await submit(true);
  }

  function handleBackToRating() {
    setStep("rating");
  }

  function handleBackToOrganization() {
    setStep("organization");
  }

  function handleBackToFoundEverything() {
    setStep("found_everything");
  }

  function handleBackToFeedback() {
    setStep("feedback");
  }

  return (
    <main className="kiosk-height relative w-full overflow-hidden bg-vale-cream">
      <AnimatePresence mode="wait">
        {step === "idle" && <IdleScreen key="idle" onStart={handleStart} />}

        {step === "rating" && (
          <RatingScreen
            key="rating"
            step={0}
            content={experienceContent}
            initialValue={rating}
            onSelect={handleRating}
            onBack={resetToIdle}
            onInteract={scheduleInactivityReturn}
          />
        )}

        {step === "organization" && (
          <RatingScreen
            key="organization"
            step={1}
            content={organizationContent}
            initialValue={organizationRating}
            onSelect={handleOrganization}
            onBack={handleBackToRating}
            onInteract={scheduleInactivityReturn}
          />
        )}

        {step === "found_everything" && (
          <TextQuestionScreen
            key="found_everything"
            step={2}
            question={textQuestions[0].question}
            placeholder={textQuestions[0].placeholder}
            skipLabel={textQuestions[0].skipLabel}
            nextLabel={textQuestions[0].nextLabel}
            initialValue={answers.foundEverything}
            onSubmit={handleFoundEverything}
            onBack={handleBackToOrganization}
            onInteract={scheduleInactivityReturn}
          />
        )}

        {step === "feedback" && (
          <TextQuestionScreen
            key="feedback"
            step={3}
            question={textQuestions[1].question}
            placeholder={textQuestions[1].placeholder}
            skipLabel={textQuestions[1].skipLabel}
            nextLabel={textQuestions[1].nextLabel}
            initialValue={answers.feedback}
            onSubmit={handleFeedback}
            onBack={handleBackToFoundEverything}
            onInteract={scheduleInactivityReturn}
          />
        )}

        {step === "nps" && (
          <NpsScreen
            key="nps"
            initialValue={npsScore}
            onSelect={handleNps}
            onBack={handleBackToFeedback}
            onInteract={scheduleInactivityReturn}
          />
        )}

        {step === "thanks" && (
          <ThanksScreen key="thanks" onDismiss={resetToIdle} autoReturnMs={THANKS_AUTO_RETURN_MS} />
        )}
      </AnimatePresence>
    </main>
  );
}

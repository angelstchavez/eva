"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  PartyPopper,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type QuizQuestion = {
  question: string;
  options: { label: string; text: string }[];
  answer: string;
};

type QuizStationProps = {
  questions: QuizQuestion[];
};

// Same cycling accent palette used across the module cards, so a question's
// number badge is recognizable by color as well as digit — helps kids track
// "which one am I on" at a glance.
const ACCENTS = [
  { bg: "bg-gold/20", text: "text-gold", ring: "ring-gold/40" },
  { bg: "bg-sky/20", text: "text-sky", ring: "ring-sky/40" },
  { bg: "bg-rose-300/20", text: "text-rose-200", ring: "ring-rose-300/40" },
  {
    bg: "bg-emerald-300/20",
    text: "text-emerald-200",
    ring: "ring-emerald-300/40",
  },
];

export function QuizStation({ questions }: QuizStationProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  function select(qIndex: number, label: string) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: label }));
  }

  function reset() {
    setAnswers({});
    setChecked(false);
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const score = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
        0,
      ),
    [answers, questions],
  );

  const isPerfect = checked && score === questions.length;
  const isGood = checked && !isPerfect && score >= questions.length / 2;

  return (
    <div className="space-y-6">
      {/* Live progress — tells a kid exactly how far along they are instead
          of leaving the "check answers" button mysteriously disabled. */}
      {!checked && (
        <div className="flex items-center gap-3 rounded-full border border-gold/15 bg-white/5 px-4 py-2.5">
          <div className="flex-1">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-night-deep/60">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={false}
                animate={{
                  width: `${(answeredCount / Math.max(questions.length, 1)) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <span className="shrink-0 font-sans text-sm font-bold text-gold">
            {answeredCount}/{questions.length}
          </span>
        </div>
      )}

      {questions.map((q, qIndex) => {
        const accent = ACCENTS[qIndex % ACCENTS.length];
        const isAnswered = answers[qIndex] !== undefined;

        return (
          <div
            key={q.question}
            className={cn(
              "rounded-2xl border-2 bg-white/5 p-4 transition-colors sm:p-5",
              !checked && isAnswered ? "border-gold/25" : "border-gold/15",
            )}
          >
            <p className="flex items-start gap-3 font-sans text-lg font-bold text-cream sm:text-xl">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-extrabold ring-2",
                  accent.bg,
                  accent.text,
                  accent.ring,
                )}
              >
                {qIndex + 1}
              </span>
              <span className="pt-1">{q.question}</span>
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt) => {
                const selected = answers[qIndex] === opt.label;
                const isCorrect = opt.label === q.answer;
                const showResult = checked && selected;

                return (
                  <motion.button
                    key={opt.label}
                    type="button"
                    onClick={() => select(qIndex, opt.label)}
                    whileHover={!checked ? { scale: 1.02 } : undefined}
                    whileTap={!checked ? { scale: 0.97 } : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors sm:py-4",
                      !checked && selected && "border-gold/60 bg-gold/15",
                      !checked &&
                        !selected &&
                        "border-gold/15 bg-night-deep/40 hover:border-gold/35 hover:bg-white/5",
                      checked &&
                        isCorrect &&
                        "border-emerald-400/60 bg-emerald-400/10",
                      checked &&
                        showResult &&
                        !isCorrect &&
                        "border-rose/60 bg-rose/10",
                      checked &&
                        !showResult &&
                        !isCorrect &&
                        "border-gold/10 opacity-50",
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 font-sans text-base font-bold text-gold">
                      {opt.label}
                    </span>
                    <span className="font-serif text-base text-cream">
                      {opt.text}
                    </span>
                    {checked && isCorrect && (
                      <CheckCircle2
                        className="ml-auto h-6 w-6 shrink-0 text-emerald-400"
                        aria-hidden
                      />
                    )}
                    {showResult && !isCorrect && (
                      <XCircle
                        className="ml-auto h-6 w-6 shrink-0 text-rose"
                        aria-hidden
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      {!checked ? (
        <div className="flex flex-col items-center gap-2">
          <Button
            type="button"
            onClick={() => setChecked(true)}
            disabled={!allAnswered}
            className="w-full rounded-full bg-gold py-6 text-base font-bold text-night hover:bg-gold-soft sm:w-auto sm:px-10"
          >
            <Sparkles className="mr-2 h-5 w-5" aria-hidden />
            Ver mis respuestas
          </Button>
          {!allAnswered && (
            <p className="font-serif text-sm text-sky/60">
              Responde {questions.length - answeredCount} pregunta
              {questions.length - answeredCount === 1 ? "" : "s"} más para
              continuar
            </p>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={cn(
            "rounded-2xl border-2 p-6 text-center",
            isPerfect
              ? "border-gold/40 bg-gold/10"
              : "border-gold/25 bg-white/5",
          )}
          aria-live="polite"
        >
          {isPerfect && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20"
            >
              <PartyPopper className="h-7 w-7 text-gold" aria-hidden />
            </motion.div>
          )}

          {/* A row of stars gives an instant, readable-without-words sense
              of the score alongside the numeric one. */}
          <div className="flex items-center justify-center gap-1.5">
            {questions.map((_, i) => (
              <Sparkles
                key={i}
                className={cn(
                  "h-6 w-6",
                  i < score ? "fill-gold text-gold" : "text-sky/25",
                )}
                aria-hidden
              />
            ))}
          </div>

          <p className="mt-3 font-sans text-2xl font-bold text-cream sm:text-3xl">
            {score} de {questions.length} correctas
          </p>
          <p className="mt-2 font-serif text-base text-sky/80">
            {isPerfect
              ? "¡Excelente! Tu brújula lectora brilla como una estrella."
              : isGood
                ? "¡Muy bien! Sigue explorando los planetas."
                : "No te preocupes, repasa el material y vuelve a intentarlo."}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={reset}
            className="mt-5 rounded-full border-gold/30 px-8 py-5 text-gold hover:bg-gold/10"
          >
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
            Intentar de nuevo
          </Button>
        </motion.div>
      )}
    </div>
  );
}

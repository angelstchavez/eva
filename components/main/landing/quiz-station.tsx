"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";

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

export function QuizStation({ questions }: QuizStationProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  function select(qIndex: number, label: string) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: label }));
  }

  const score = questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => (
        <div
          key={q.question}
          className="rounded-2xl border border-gold/15 bg-white/5 p-4 sm:p-5"
        >
          <p className="font-sans text-base font-bold text-cream">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-sm text-gold">
              {qIndex + 1}
            </span>
            {q.question}
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
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
                  whileTap={!checked ? { scale: 0.98 } : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    !checked &&
                      selected &&
                      "border-gold/50 bg-gold/15",
                    !checked &&
                      !selected &&
                      "border-gold/15 bg-night-deep/40 hover:border-gold/30 hover:bg-white/5",
                    checked &&
                      isCorrect &&
                      "border-emerald-400/50 bg-emerald-400/10",
                    checked &&
                      showResult &&
                      !isCorrect &&
                      "border-rose/50 bg-rose/10",
                    checked &&
                      !showResult &&
                      !isCorrect &&
                      "border-gold/10 opacity-60",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 font-sans text-sm font-bold text-gold">
                    {opt.label}
                  </span>
                  <span className="font-serif text-sm text-cream">{opt.text}</span>
                  {checked && isCorrect && (
                    <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-400" />
                  )}
                  {showResult && !isCorrect && (
                    <XCircle className="ml-auto h-5 w-5 shrink-0 text-rose" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {!checked ? (
        <Button
          type="button"
          onClick={() => setChecked(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full rounded-full bg-gold py-6 font-bold text-night hover:bg-gold-soft sm:w-auto sm:px-10"
        >
          Ver mis respuestas ✨
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gold/30 bg-gold/10 p-5 text-center"
        >
          <p className="font-sans text-2xl font-bold text-cream">
            {score} de {questions.length} correctas
          </p>
          <p className="mt-2 font-serif text-sm text-sky/80">
            {score === questions.length
              ? "¡Excelente! Tu brújula lectora brilla como una estrella."
              : score >= questions.length / 2
                ? "¡Muy bien! Sigue explorando los planetas."
                : "No te preocupes, repasa el material y vuelve a intentarlo."}
          </p>
        </motion.div>
      )}
    </div>
  );
}

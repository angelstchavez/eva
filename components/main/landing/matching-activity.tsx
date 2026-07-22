"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, PartyPopper, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

type MatchingPair = {
  id: number;
  term: string;
  definition: string;
};

type MatchingActivityProps = {
  pairs: MatchingPair[];
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MatchingActivity({ pairs }: MatchingActivityProps) {
  const definitions = useMemo(
    () => shuffle(pairs.map((p) => ({ id: p.id, text: p.definition }))),
    [pairs],
  );

  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);

  function handleTermClick(id: number) {
    if (matched.has(id)) return;
    setSelectedTerm(id);
    setWrong(null);
  }

  function handleDefClick(defId: number) {
    if (selectedTerm === null) return;
    if (matched.has(selectedTerm)) return;

    if (selectedTerm === defId) {
      setMatched((prev) => new Set([...prev, selectedTerm]));
      setSelectedTerm(null);
    } else {
      setWrong(defId);
      setTimeout(() => setWrong(null), 600);
    }
  }

  function reset() {
    setSelectedTerm(null);
    setMatched(new Set());
    setWrong(null);
  }

  const allMatched = pairs.length > 0 && matched.size === pairs.length;
  const selectedTermText = pairs.find((p) => p.id === selectedTerm)?.term;
  const letters = "ABCDEFGHIJ";

  return (
    <div className="space-y-5">
      {/* Live progress, same pattern as the quiz, so a kid always sees how
          far along they are instead of only finding out at the very end. */}
      <div className="flex items-center gap-3 rounded-full border border-gold/15 bg-white/5 px-4 py-2.5">
        <div className="flex-1">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-night-deep/60">
            <motion.div
              className="h-full rounded-full bg-gold"
              initial={false}
              animate={{
                width: `${(matched.size / Math.max(pairs.length, 1)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <span className="shrink-0 font-sans text-sm font-bold text-gold">
          {matched.size}/{pairs.length}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2.5">
          <p className="text-sm font-bold uppercase tracking-wider text-gold">
            Palabras
          </p>
          {pairs.map((pair, i) => {
            const isMatched = matched.has(pair.id);
            const isSelected = selectedTerm === pair.id && !isMatched;
            return (
              <motion.button
                key={pair.id}
                type="button"
                onClick={() => handleTermClick(pair.id)}
                whileTap={{ scale: 0.98 }}
                animate={isSelected ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={
                  isSelected
                    ? { duration: 1.2, repeat: Number.POSITIVE_INFINITY }
                    : undefined
                }
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors sm:py-4",
                  isMatched &&
                    "border-emerald-400/40 bg-emerald-400/10 opacity-70",
                  isSelected && "border-gold/60 bg-gold/15",
                  !isMatched &&
                    !isSelected &&
                    "border-gold/15 bg-white/5 hover:border-gold/35",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 font-sans text-sm font-bold text-gold">
                  {letters[i % letters.length]}
                </span>
                <span className="font-sans text-base font-bold text-cream sm:text-lg">
                  {pair.term}
                </span>
                {isMatched && (
                  <Check
                    className="ml-auto h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          <p className="text-sm font-bold uppercase tracking-wider text-gold">
            Definiciones
          </p>

          {/* Reminds a kid what they picked — the columns stack on mobile,
              so by the time they scroll down to the definitions list they
              may have already forgotten which word they tapped. */}
          <div className="min-h-9">
            <AnimatePresence mode="wait">
              {selectedTermText ? (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-full bg-gold/10 px-3 py-1.5 font-serif text-sm text-gold"
                >
                  Buscas la definición de:{" "}
                  <span className="font-bold">{selectedTermText}</span>
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif text-sm text-sky/50"
                >
                  Elige primero una palabra
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {definitions.map((def) => {
            const isMatched = matched.has(def.id);
            const isWrong = wrong === def.id;
            return (
              <motion.button
                key={def.id}
                type="button"
                onClick={() => handleDefClick(def.id)}
                whileTap={{ scale: 0.98 }}
                animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors sm:py-4",
                  isMatched &&
                    "border-emerald-400/40 bg-emerald-400/10 opacity-70",
                  isWrong && "border-rose/60 bg-rose/10",
                  !isMatched &&
                    !isWrong &&
                    "border-gold/15 bg-white/5 hover:border-gold/35",
                )}
              >
                <span className="font-serif text-base text-sky/90 sm:text-lg">
                  {def.text}
                </span>
                {isMatched && (
                  <Check
                    className="ml-auto h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {allMatched && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease }}
            className="flex flex-col items-center gap-2 rounded-2xl border-2 border-gold/30 bg-gold/10 p-5 text-center"
          >
            <PartyPopper className="h-6 w-6 text-gold" aria-hidden />
            <p className="font-sans text-lg font-bold text-gold">
              ¡Perfecto! Todas las flores conectadas 🌸
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          className="rounded-full border-gold/30 px-6 py-4 text-gold hover:bg-gold/10"
        >
          <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden />
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

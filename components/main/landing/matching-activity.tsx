"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const allMatched = matched.size === pairs.length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">
            Palabras
          </p>
          {pairs.map((pair) => (
            <motion.button
              key={pair.id}
              type="button"
              onClick={() => handleTermClick(pair.id)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-left transition-colors",
                matched.has(pair.id) &&
                  "border-emerald-400/40 bg-emerald-400/10 opacity-70",
                selectedTerm === pair.id &&
                  !matched.has(pair.id) &&
                  "border-gold/50 bg-gold/15",
                !matched.has(pair.id) &&
                  selectedTerm !== pair.id &&
                  "border-gold/15 bg-white/5 hover:border-gold/30",
              )}
            >
              <span className="font-sans font-bold text-cream">{pair.term}</span>
              {matched.has(pair.id) && (
                <Check className="ml-auto h-4 w-4 text-emerald-400" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">
            Definiciones
          </p>
          {definitions.map((def) => {
            const isMatched = matched.has(def.id);
            return (
              <motion.button
                key={def.id}
                type="button"
                onClick={() => handleDefClick(def.id)}
                whileTap={{ scale: 0.98 }}
                animate={wrong === def.id ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-left transition-colors",
                  isMatched &&
                    "border-emerald-400/40 bg-emerald-400/10 opacity-70",
                  !isMatched &&
                    "border-gold/15 bg-white/5 hover:border-gold/30",
                )}
              >
                <span className="font-serif text-sm text-sky/90">{def.text}</span>
                {isMatched && (
                  <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-400" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {allMatched ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-sans text-lg font-bold text-gold"
        >
          ¡Perfecto! Todas las flores conectadas 🌸
        </motion.p>
      ) : (
        <p className="text-center font-serif text-sm text-sky/70">
          Elige una palabra y luego su definición
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={reset}
          className="rounded-full border-gold/30 text-gold hover:bg-gold/10"
        >
          <RotateCcw className="mr-1 h-4 w-4" aria-hidden />
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

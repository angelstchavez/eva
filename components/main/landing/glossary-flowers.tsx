"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

type GlossaryFlowerProps = {
  items: { emoji: string; term: string; definition: string }[];
};

export function GlossaryFlowers({ items }: GlossaryFlowerProps) {
  // "revealed" toggles the definition open/closed. "watered" only ever
  // grows, so a flower stays credited as "bloomed" even if a kid closes it
  // again to compare with another one.
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [watered, setWatered] = useState<Set<string>>(new Set());

  const allWatered = useMemo(
    () => items.length > 0 && watered.size >= items.length,
    [items.length, watered],
  );

  function toggle(term: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
    setWatered((prev) => new Set(prev).add(term));
  }

  function startOver() {
    setRevealed(new Set());
    setWatered(new Set());
  }

  return (
    <div className="space-y-4">
      {/* Progress pill, same family pattern as the other stations: a strip
          of the same emoji that lights up as each flower gets watered. */}
      <div className="flex justify-end">
        <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-white/5 px-3 py-1.5">
          {items.map((item) => (
            <span
              key={item.term}
              className={cn(
                "text-sm transition-opacity",
                watered.has(item.term) ? "opacity-100" : "opacity-25",
              )}
              aria-hidden
            >
              🌸
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const isOpen = revealed.has(item.term);
          const isWatered = watered.has(item.term);

          return (
            <motion.button
              key={item.term}
              type="button"
              onClick={() => toggle(item.term)}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-colors sm:p-5",
                isOpen
                  ? "border-gold/40 bg-gold/10"
                  : "border-gold/15 bg-white/5 hover:border-gold/35",
              )}
            >
              {/* A little droplet pops in the corner the moment a flower
                  gets watered for the first time — quick, physical feedback
                  that ties the tap to the "regar" metaphor. */}
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    key="drop"
                    initial={{ opacity: 0, y: -6, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="absolute right-3 top-3 text-lg"
                    aria-hidden
                  >
                    💧
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="flex items-start gap-3">
                <motion.span
                  className="shrink-0 text-3xl sm:text-4xl"
                  role="img"
                  aria-hidden
                  animate={
                    isWatered
                      ? { scale: [1, 1.35, 1.15], rotate: [0, -8, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.5, ease }}
                >
                  {item.emoji}
                </motion.span>

                <div className="min-w-0 flex-1">
                  <p className="font-sans text-base font-bold text-cream sm:text-lg">
                    {item.term}
                  </p>
                  {isOpen ? (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 font-serif text-sm leading-relaxed text-sky/85 sm:text-base"
                    >
                      {item.definition}
                    </motion.p>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-gold">
                      Toca la flor para regarla 🌱
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {allWatered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex flex-col items-center gap-3 rounded-2xl border-2 border-gold/30 bg-gold/10 p-5 text-center"
          >
            <p className="font-sans text-lg font-bold text-gold">
              ¡Regaste todas las flores del jardín! 🌷
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={startOver}
              className="rounded-full border-gold/30 px-6 py-4 text-gold hover:bg-gold/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
              Volver a empezar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

type ExplorationCardsProps = {
  items: { emoji: string; title: string; text: string }[];
};

const ACCENTS = [
  { bg: "bg-gold/25", text: "text-gold", ring: "ring-gold/40" },
  { bg: "bg-sky/25", text: "text-sky", ring: "ring-sky/40" },
  { bg: "bg-rose-300/25", text: "text-rose-200", ring: "ring-rose-300/40" },
  {
    bg: "bg-emerald-300/25",
    text: "text-emerald-200",
    ring: "ring-emerald-300/40",
  },
];

// Componente de card memoizado para evitar re-renders innecesarios
const ExplorationCard = memo(
  ({
    item,
    index,
    isOpen,
    isSeen,
    accent,
    onToggle,
  }: {
    item: { emoji: string; title: string; text: string };
    index: number;
    isOpen: boolean;
    isSeen: boolean;
    accent: (typeof ACCENTS)[0];
    onToggle: (index: number) => void;
  }) => {
    const handleClick = useCallback(() => onToggle(index), [index, onToggle]);

    return (
      <motion.button
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "relative flex min-h-40 flex-col items-center rounded-2xl border-2 p-5 text-center transition-colors sm:p-6",
          isOpen
            ? "border-gold/50 bg-gold/15"
            : "border-gold/20 bg-white/5 hover:border-gold/35 hover:bg-white/10",
        )}
      >
        {isSeen && !isOpen && (
          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/25 text-emerald-200">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}

        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ring-2",
            accent.bg,
            accent.text,
            accent.ring,
          )}
          aria-hidden
        >
          {index + 1}
        </span>

        <span className="mt-3 text-5xl" role="img" aria-hidden>
          {item.emoji}
        </span>
        <span className="mt-3 font-sans text-lg font-bold text-cream">
          {item.title}
        </span>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease }}
              className="mt-3 font-serif text-base leading-relaxed text-sky/85"
            >
              {item.text}
            </motion.p>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="mt-2 font-sans text-sm font-bold text-gold">
            Toca para descubrir
          </span>
        )}
      </motion.button>
    );
  },
);

ExplorationCard.displayName = "ExplorationCard";

export function ExplorationCards({ items }: ExplorationCardsProps) {
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const allSeen = useMemo(
    () => items.length > 0 && seen.size >= items.length,
    [items.length, seen],
  );

  // Memoizar callbacks para evitar recreaciones
  const toggle = useCallback((i: number) => {
    setActive((prev) => (prev === i ? null : i));
    setSeen((prev) => new Set(prev).add(i));
  }, []);

  const startOver = useCallback(() => {
    setActive(null);
    setSeen(new Set());
  }, []);

  // Memoizar dots para evitar recreación en cada render
  const progressDots = useMemo(
    () => (
      <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-white/5 px-3 py-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              seen.has(i) ? "bg-gold" : "bg-sky/25",
            )}
            aria-hidden
          />
        ))}
      </div>
    ),
    [items, seen],
  );

  // Memoizar cards para evitar re-renders innecesarios
  const cards = useMemo(
    () =>
      items.map((item, i) => {
        const isOpen = active === i;
        const isSeen = seen.has(i);
        const accent = ACCENTS[i % ACCENTS.length];

        return (
          <ExplorationCard
            key={item.title}
            item={item}
            index={i}
            isOpen={isOpen}
            isSeen={isSeen}
            accent={accent}
            onToggle={toggle}
          />
        );
      }),
    [items, active, seen, toggle],
  );

  return (
    <div className="space-y-4">
      {items.length > 1 && (
        <div className="flex justify-end">{progressDots}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">{cards}</div>

      <AnimatePresence mode="wait">
        {allSeen && items.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3 rounded-2xl border-2 border-gold/30 bg-gold/10 p-5 text-center"
          >
            <p className="font-sans text-lg font-bold text-gold">
              ¡Descubriste todo! ✨
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

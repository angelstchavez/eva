"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

type ExplorationCardsProps = {
  items: { emoji: string; title: string; text: string }[];
};

export function ExplorationCards({ items }: ExplorationCardsProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item, i) => (
        <motion.button
          key={item.title}
          type="button"
          onClick={() => setActive(active === i ? null : i)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "flex flex-col items-center rounded-2xl border p-5 text-center transition-colors",
            active === i
              ? "border-gold/50 bg-gold/15"
              : "border-gold/20 bg-white/5 hover:border-gold/35 hover:bg-white/10",
          )}
        >
          <span className="text-4xl" role="img" aria-hidden>
            {item.emoji}
          </span>
          <span className="mt-3 font-sans text-base font-bold text-cream">
            {item.title}
          </span>
          <AnimatePresence>
            {active === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 font-serif text-sm leading-relaxed text-sky/80"
              >
                {item.text}
              </motion.p>
            )}
          </AnimatePresence>
          {active !== i && (
            <span className="mt-2 text-xs font-bold text-gold">
              Toca para descubrir
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

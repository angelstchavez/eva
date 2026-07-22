"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type GlossaryFlowerProps = {
  items: { emoji: string; term: string; definition: string }[];
};

export function GlossaryFlowers({ items }: GlossaryFlowerProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  function toggle(term: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const isOpen = revealed.has(item.term);
        return (
          <motion.button
            key={item.term}
            type="button"
            onClick={() => toggle(item.term)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors",
              isOpen
                ? "border-gold/40 bg-gold/10"
                : "border-gold/15 bg-white/5 hover:border-gold/30",
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" role="img" aria-hidden>
                {item.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans font-bold text-cream">{item.term}</p>
                {isOpen ? (
                  <p className="mt-1 font-serif text-sm leading-relaxed text-sky/80">
                    {item.definition}
                  </p>
                ) : (
                  <p className="mt-1 text-xs font-bold text-gold">
                    Toca la flor para regarla 🌱
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

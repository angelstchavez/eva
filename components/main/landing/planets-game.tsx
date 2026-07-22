"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type PlanetItem = {
  number: number;
  character: string;
  defect: string;
};

type PlanetsGameProps = {
  items: PlanetItem[];
  hint?: string;
};

const PLANET_COLORS = [
  "from-amber-400/30 to-orange-500/20",
  "from-rose/30 to-pink-500/20",
  "from-blue/30 to-indigo-500/20",
  "from-emerald-400/30 to-teal-500/20",
  "from-gold/30 to-yellow-500/20",
  "from-purple-400/30 to-violet-500/20",
];

export function PlanetsGame({ items, hint }: PlanetsGameProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  function toggle(num: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {hint && (
        <p className="font-serif text-sm text-sky/70">{hint}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((planet, i) => {
          const isOpen = revealed.has(planet.number);
          return (
            <motion.button
              key={planet.number}
              type="button"
              onClick={() => toggle(planet.number)}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-5 text-left transition-colors",
                isOpen
                  ? "border-gold/40 bg-white/10"
                  : "border-gold/20 bg-white/5 hover:border-gold/35",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-50",
                  PLANET_COLORS[i % PLANET_COLORS.length],
                )}
              />

              <div className="relative">
                <span className="text-3xl" role="img" aria-hidden>
                  🪐
                </span>
                <p className="mt-2 font-sans text-lg font-bold text-cream">
                  Planeta {planet.number}
                </p>

                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 space-y-2"
                  >
                    <p className="font-sans font-bold text-gold">
                      {planet.character}
                    </p>
                    <p className="font-serif text-sm leading-relaxed text-sky/80">
                      {planet.defect}
                    </p>
                  </motion.div>
                ) : (
                  <p className="mt-2 text-xs font-bold text-gold">
                    ¿Quién vive aquí? Toca para descubrir
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {revealed.size === items.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-sans font-bold text-gold"
        >
          ¡Has visitado los seis planetas! 🚀
        </motion.p>
      )}
    </div>
  );
}

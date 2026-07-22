"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

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

// A different emoji per card so kids can tell planets apart at a glance,
// before they've even read a number — same wayfinding idea as the color
// cycle, doubled up.
const PLANET_EMOJIS = ["🪐", "🌍", "🌕", "⭐", "☄️", "🌌"];

export function PlanetsGame({ items, hint }: PlanetsGameProps) {
  // "revealed" drives the flip animation and can toggle back and forth.
  // "visited" only ever grows, so a kid keeps credit for a planet even
  // after flipping it back to admire the front again.
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const allVisited = useMemo(
    () => items.length > 0 && visited.size >= items.length,
    [items.length, visited],
  );

  function toggle(num: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
    setVisited((prev) => new Set(prev).add(num));
  }

  function playAgain() {
    setRevealed(new Set());
    setVisited(new Set());
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {hint ? (
          <p className="font-serif text-base text-sky/80">{hint}</p>
        ) : (
          <span />
        )}

        {/* Same "counter pill" pattern used elsewhere in the app, so
            progress always looks and feels the same to a kid. */}
        <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-white/5 px-3 py-1.5">
          {items.map((planet) => (
            <span
              key={planet.number}
              className={cn(
                "text-base transition-opacity",
                visited.has(planet.number) ? "opacity-100" : "opacity-25",
              )}
              aria-hidden
            >
              🪐
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((planet, i) => {
          const isOpen = revealed.has(planet.number);
          const isVisited = visited.has(planet.number);
          const emoji = PLANET_EMOJIS[i % PLANET_EMOJIS.length];

          return (
            <motion.button
              key={planet.number}
              type="button"
              onClick={() => toggle(planet.number)}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{ perspective: 1200 }}
              className="relative min-h-56 overflow-hidden rounded-2xl border-2 border-gold/20 text-left transition-colors hover:border-gold/40"
            >
              {/* Static color wash — stays put while the card flips on top
                  of it, so the planet's color identity never disappears. */}
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-50",
                  PLANET_COLORS[i % PLANET_COLORS.length],
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors",
                  isOpen ? "bg-white/10" : "bg-white/5",
                )}
              />

              {!isOpen && (
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gold/25 font-sans text-base font-extrabold text-gold"
                  aria-hidden
                >
                  ?
                </motion.span>
              )}

              {isVisited && (
                <span className="absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/25 text-xs text-emerald-200">
                  ✓
                </span>
              )}

              {/* 3D flip: front and back are stacked, back pre-rotated 180°,
                  and the shared wrapper rotates on tap — a physical "turn
                  the card over" gesture kids already know from card games. */}
              <motion.div
                className="relative h-full w-full transform-3d"
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="absolute inset-0 flex flex-col p-5 backface-hidden">
                  <span className="text-4xl" role="img" aria-hidden>
                    {emoji}
                  </span>
                  <p className="mt-2 font-sans text-lg font-bold text-cream">
                    Planeta {planet.number}
                  </p>
                  <p className="mt-auto text-sm font-bold text-gold">
                    Toca para descubrir
                  </p>
                </div>

                <div className="absolute inset-0 flex flex-col justify-center p-5 backface-hidden transform-[rotateY(180deg)]">
                  <p className="font-sans text-lg font-bold text-gold">
                    {planet.character}
                  </p>
                  <p className="mt-2 font-serif text-base leading-relaxed text-sky/85">
                    {planet.defect}
                  </p>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {allVisited && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex flex-col items-center gap-3 rounded-2xl border-2 border-gold/30 bg-gold/10 p-5 text-center"
          >
            <p className="font-sans text-lg font-bold text-gold">
              ¡Has visitado los {items.length} planetas! 🚀
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={playAgain}
              className="rounded-full border-gold/30 px-6 py-4 text-gold hover:bg-gold/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
              Jugar de nuevo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

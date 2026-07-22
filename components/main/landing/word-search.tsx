"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 14;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
] as const;

function generateGrid(words: string[]): { grid: string[][]; placed: string[] } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ""),
  );
  const placed: string[] = [];
  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    let success = false;
    for (let attempt = 0; attempt < 80 && !success; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const endRow = row + dir[0] * (word.length - 1);
      const endCol = col + dir[1] * (word.length - 1);

      if (
        endRow < 0 ||
        endRow >= GRID_SIZE ||
        endCol < 0 ||
        endCol >= GRID_SIZE
      ) {
        continue;
      }

      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        const cell = grid[r][c];
        if (cell && cell !== word[i]) {
          fits = false;
          break;
        }
      }

      if (!fits) continue;

      for (let i = 0; i < word.length; i++) {
        grid[row + dir[0] * i][col + dir[1] * i] = word[i];
      }
      placed.push(word);
      success = true;
    }
  }

  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placed };
}

type WordSearchProps = {
  words: string[];
};

export function WordSearch({ words }: WordSearchProps) {
  const normalized = useMemo(
    () => words.map((w) => w.toUpperCase().replace(/\s/g, "")),
    [words],
  );

  const [puzzle, setPuzzle] = useState<{
    grid: string[][];
    placed: string[];
  } | null>(null);

  useEffect(() => {
    setPuzzle(generateGrid(normalized));
  }, [normalized]);

  const [selected, setSelected] = useState<[number, number][]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);

  if (!puzzle) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-gold/20 bg-night-deep/60">
        <p className="animate-pulse font-serif text-sm text-gold">
          Preparando la sopa de letras estelar...
        </p>
      </div>
    );
  }

  const { grid, placed } = puzzle;

  function cellKey(r: number, c: number) {
    return `${r},${c}`;
  }

  function handleStart(r: number, c: number) {
    setIsSelecting(true);
    setSelected([[r, c]]);
  }

  function handleEnter(r: number, c: number) {
    if (!isSelecting) return;
    const start = selected[0];
    if (!start) return;

    const dr = r - start[0];
    const dc = c - start[1];
    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    if (Math.abs(dr) !== Math.abs(dc) && dr !== 0 && dc !== 0) return;

    const path: [number, number][] = [];
    for (let i = 0; i < len; i++) {
      path.push([start[0] + stepR * i, start[1] + stepC * i]);
    }
    setSelected(path);
  }

  function handleEnd() {
    if (selected.length > 0) {
      const word = selected.map(([r, c]) => grid[r][c]).join("");
      const reversed = word.split("").reverse().join("");
      const match = placed.find((w) => w === word || w === reversed);
      if (match && !found.has(match)) {
        setFound((prev) => new Set([...prev, match]));
      }
    }
    setIsSelecting(false);
    setSelected([]);
  }

  function reset() {
    setFound(new Set());
    setSelected([]);
  }

  const selectedSet = new Set(selected.map(([r, c]) => cellKey(r, c)));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {placed.map((word) => (
          <span
            key={word}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
              found.has(word)
                ? "bg-gold/25 text-gold line-through decoration-gold/50"
                : "border border-gold/20 bg-white/5 text-sky/80",
            )}
          >
            {found.has(word) && (
              <Check className="mr-1 inline h-3 w-3" aria-hidden />
            )}
            {word}
          </span>
        ))}
      </div>

      <div
        className="mx-auto max-w-md select-none overflow-x-auto rounded-2xl border border-gold/20 bg-night-deep/60 p-3"
        onMouseLeave={handleEnd}
        onTouchEnd={handleEnd}
      >
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => (
              <motion.button
                key={cellKey(r, c)}
                type="button"
                onMouseDown={() => handleStart(r, c)}
                onMouseEnter={() => handleEnter(r, c)}
                onMouseUp={handleEnd}
                onTouchStart={() => handleStart(r, c)}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(
                    touch.clientX,
                    touch.clientY,
                  );
                  const data = el?.getAttribute("data-cell");
                  if (data) {
                    const [tr, tc] = data.split(",").map(Number);
                    handleEnter(tr, tc);
                  }
                }}
                data-cell={`${r},${c}`}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md font-sans text-xs font-bold sm:text-sm",
                  selectedSet.has(cellKey(r, c))
                    ? "bg-gold text-night"
                    : "bg-white/5 text-cream hover:bg-gold/20",
                )}
              >
                {letter}
              </motion.button>
            )),
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-serif text-sm text-sky/70">
          {found.size} de {placed.length} palabras encontradas ✨
        </p>
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

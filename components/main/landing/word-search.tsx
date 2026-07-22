/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, RotateCcw, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MIN_GRID_SIZE = 10;
const MAX_GRID_SIZE = 18;
const MAX_GENERATION_ATTEMPTS = 60;
const MAX_GRID_GROWTH_TRIES = 8;

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

type Cell = [number, number];

type Puzzle = {
  gridSize: number;
  grid: string[][];
  placed: string[];
  placements: Record<string, Cell[]>;
};

function cellKey(r: number, c: number) {
  return `${r},${c}`;
}

/**
 * Attempts to place every word into a square grid of the given size using
 * random start points / directions. Returns null if any word could not be
 * placed, so the caller can retry with a larger grid instead of silently
 * dropping words.
 */
function tryGenerateGrid(words: string[], gridSize: number): Puzzle | null {
  const grid: string[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => ""),
  );
  const placed: string[] = [];
  const placements: Record<string, Cell[]> = {};
  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    let success = false;
    for (
      let attempt = 0;
      attempt < MAX_GENERATION_ATTEMPTS && !success;
      attempt++
    ) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const endRow = row + dir[0] * (word.length - 1);
      const endCol = col + dir[1] * (word.length - 1);

      if (
        endRow < 0 ||
        endRow >= gridSize ||
        endCol < 0 ||
        endCol >= gridSize
      ) {
        continue;
      }

      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        const existing = grid[r][c];
        if (existing && existing !== word[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;

      const positions: Cell[] = [];
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        grid[r][c] = word[i];
        positions.push([r, c]);
      }
      placements[word] = positions;
      placed.push(word);
      success = true;
    }
    if (!success) return null;
  }

  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { gridSize, grid, placed, placements };
}

function generatePuzzle(words: string[]): Puzzle {
  const longest = words.reduce((max, w) => Math.max(max, w.length), 0);
  let gridSize = Math.min(Math.max(MIN_GRID_SIZE, longest + 2), MAX_GRID_SIZE);

  for (let grow = 0; grow < MAX_GRID_GROWTH_TRIES; grow++) {
    const result = tryGenerateGrid(words, gridSize);
    if (result) return result;
    gridSize = Math.min(gridSize + 1, MAX_GRID_SIZE);
  }

  // Last resort: place as many as possible at the max grid size, dropping
  // only words that truly cannot fit, rather than crashing or hanging.
  const grid: string[][] = Array.from({ length: MAX_GRID_SIZE }, () =>
    Array.from({ length: MAX_GRID_SIZE }, () => ""),
  );
  const placed: string[] = [];
  const placements: Record<string, Cell[]> = {};
  for (const word of [...words].sort((a, b) => b.length - a.length)) {
    if (word.length > MAX_GRID_SIZE) continue;
    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * MAX_GRID_SIZE);
      const col = Math.floor(Math.random() * MAX_GRID_SIZE);
      const endRow = row + dir[0] * (word.length - 1);
      const endCol = col + dir[1] * (word.length - 1);
      if (
        endRow < 0 ||
        endRow >= MAX_GRID_SIZE ||
        endCol < 0 ||
        endCol >= MAX_GRID_SIZE
      )
        continue;
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        const existing = grid[r][c];
        if (existing && existing !== word[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;
      const positions: Cell[] = [];
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        grid[r][c] = word[i];
        positions.push([r, c]);
      }
      placements[word] = positions;
      placed.push(word);
      break;
    }
  }
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let r = 0; r < MAX_GRID_SIZE; r++) {
    for (let c = 0; c < MAX_GRID_SIZE; c++) {
      if (!grid[r][c])
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
    }
  }
  return { gridSize: MAX_GRID_SIZE, grid, placed, placements };
}

function letterFontSize(gridSize: number) {
  // Bigger grids need proportionally smaller glyphs; clamp keeps it fluid
  // between a sane floor and ceiling at any viewport width.
  const min = Math.max(0.5, 0.62 - (gridSize - MIN_GRID_SIZE) * 0.012);
  const max = Math.max(0.85, 1.05 - (gridSize - MIN_GRID_SIZE) * 0.02);
  return `clamp(${min.toFixed(2)}rem, ${(2.6 * (12 / gridSize)).toFixed(2)}vw, ${max.toFixed(2)}rem)`;
}

type WordSearchProps = {
  words: string[];
};

export function WordSearch({ words }: WordSearchProps) {
  const normalized = useMemo(() => {
    const cleaned = words
      .map((w) => w.toUpperCase().replace(/[^A-ZÑ]/g, ""))
      .filter(Boolean);
    return Array.from(new Set(cleaned));
  }, [words]);

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    setPuzzle(generatePuzzle(normalized));
    setFound(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized, round]);

  const [selected, setSelected] = useState<Cell[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const isSelecting = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!puzzle) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-gold/20 bg-night-deep/60">
        <p className="animate-pulse font-serif text-sm text-gold">
          Preparando la sopa de letras estelar...
        </p>
      </div>
    );
  }

  const { grid, placed, placements, gridSize } = puzzle;
  const allFound = found.size > 0 && found.size === placed.length;

  function cellFromPoint(x: number, y: number): Cell | null {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const target = el?.closest<HTMLElement>("[data-row]");
    if (!target) return null;
    const r = Number(target.dataset.row);
    const c = Number(target.dataset.col);
    if (Number.isNaN(r) || Number.isNaN(c)) return null;
    return [r, c];
  }

  function extendSelectionTo([r, c]: Cell) {
    const start = selected[0];
    if (!start) return;
    const dr = r - start[0];
    const dc = c - start[1];
    const isStraight = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
    if (!isStraight) return;

    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
    const path: Cell[] = [];
    for (let i = 0; i < len; i++) {
      path.push([start[0] + stepR * i, start[1] + stepC * i]);
    }
    setSelected(path);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    // Capture on the container (not the individual letter) so drag events
    // keep reporting to us even as the finger/cursor moves across cells.
    gridRef.current?.setPointerCapture(e.pointerId);
    isSelecting.current = true;
    setSelected([cell]);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isSelecting.current) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    extendSelectionTo(cell);
  }

  function commitSelection() {
    if (selected.length > 0) {
      const word = selected.map(([r, c]) => grid[r][c]).join("");
      const reversed = word.split("").reverse().join("");
      const match = placed.find((w) => w === word || w === reversed);
      if (match && !found.has(match)) {
        setFound((prev) => new Set([...prev, match]));
      }
    }
    isSelecting.current = false;
    setSelected([]);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (gridRef.current?.hasPointerCapture(e.pointerId)) {
      gridRef.current.releasePointerCapture(e.pointerId);
    }
    commitSelection();
  }

  function handlePointerCancel() {
    isSelecting.current = false;
    setSelected([]);
  }

  function reset() {
    setFound(new Set());
    setSelected([]);
  }

  function reshuffle() {
    setRound((n) => n + 1);
  }

  const selectedSet = new Set(selected.map(([r, c]) => cellKey(r, c)));
  const foundCells = new Set(
    Array.from(found).flatMap((word) =>
      (placements[word] ?? []).map(([r, c]) => cellKey(r, c)),
    ),
  );

  function lineFor(cells: Cell[]) {
    if (cells.length < 2) return null;
    const [r1, c1] = cells[0];
    const [r2, c2] = cells[cells.length - 1];
    return {
      x1: c1 + 0.5,
      y1: r1 + 0.5,
      x2: c2 + 0.5,
      y2: r2 + 0.5,
    };
  }

  const currentLine = lineFor(selected);

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

      <p className="text-center font-serif text-sm text-sky/70">
        Arrastra sobre las letras. Las palabras pueden ir en horizontal,
        vertical o diagonal.
      </p>

      <div
        ref={gridRef}
        className="relative mx-auto w-full max-w-120 touch-none select-none rounded-2xl border border-gold/20 bg-night-deep/60 p-2.5 sm:p-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={(e) => {
          if (
            isSelecting.current &&
            !gridRef.current?.hasPointerCapture(e.pointerId)
          ) {
            commitSelection();
          }
        }}
      >
        <svg
          className="pointer-events-none absolute inset-2.5 z-10 sm:inset-4"
          viewBox={`0 0 ${gridSize} ${gridSize}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {Array.from(found).map((word) => {
            const line = lineFor(placements[word] ?? []);
            if (!line) return null;
            return (
              <line
                key={word}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="var(--gold, #d4af37)"
                strokeOpacity={0.55}
                strokeWidth={0.45}
                strokeLinecap="round"
              />
            );
          })}
          {currentLine && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.12 }}
              x1={currentLine.x1}
              y1={currentLine.y1}
              x2={currentLine.x2}
              y2={currentLine.y2}
              stroke="var(--gold, #d4af37)"
              strokeWidth={0.55}
              strokeLinecap="round"
            />
          )}
        </svg>

        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = cellKey(r, c);
              const isSelected = selectedSet.has(key);
              const isFound = foundCells.has(key);
              return (
                <div
                  key={key}
                  data-row={r}
                  data-col={c}
                  aria-hidden
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-md font-sans font-bold transition-colors duration-100",
                    isSelected
                      ? "bg-gold text-night shadow-sm shadow-gold/30"
                      : isFound
                        ? "bg-gold/15 text-gold"
                        : "bg-white/5 text-cream",
                  )}
                  style={{ fontSize: letterFontSize(gridSize) }}
                >
                  {letter}
                </div>
              );
            }),
          )}
        </div>

        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-night-deep/90 text-center"
            >
              <Sparkles className="h-7 w-7 text-gold" aria-hidden />
              <p className="font-serif text-lg font-bold text-gold">
                ¡Encontraste todas las palabras!
              </p>
              <Button
                type="button"
                size="sm"
                onClick={reshuffle}
                className="mt-1 rounded-full bg-gold text-night hover:bg-gold/90"
              >
                <RotateCcw className="mr-1 h-4 w-4" aria-hidden />
                Nueva sopa de letras
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-serif text-sm text-sky/70" aria-live="polite">
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

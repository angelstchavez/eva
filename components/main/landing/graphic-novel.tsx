"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Slide = {
  image: string;
  alt: string;
  chapter: string;
  heading: string;
  text: string;
};

type GraphicNovelProps = {
  slides: Slide[];
  title?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function GraphicNovel({ slides, title }: GraphicNovelProps) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  // Direction drives the slide-in/out animation (1 = forward, -1 = back).
  const [direction, setDirection] = useState(1);

  // Mirror the current index in a ref so navigation callbacks can compute the
  // direction without needing `index` in their dependency array (which would
  // otherwise recreate the keyboard listener on every slide change).
  const indexRef = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(total - 1, next));
      const current = indexRef.current;
      if (target === current) return;
      setDirection(target > current ? 1 : -1);
      indexRef.current = target;
      setIndex(target);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // Keyboard navigation, scoped to when the reader is focused/visible.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    }
    const node = rootRef.current;
    if (!node) return;
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  // Preload the neighbouring images so forward/back transitions never flash
  // a blank frame — a cheap trick that makes the presentation feel instant.
  useEffect(() => {
    const neighbours = [slides[index + 1], slides[index - 1]].filter(Boolean);
    neighbours.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [index, slides]);

  const slide = slides[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const progress = useMemo(
    () => ((index + 1) / total) * 100,
    [index, total],
  );

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
    }),
  };

  return (
    <div className="space-y-4">
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-sans text-sm font-bold text-gold">
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
            {title}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Novela interactiva
          </span>
        </div>
      ) : null}

      <div
        ref={rootRef}
        tabIndex={-1}
        role="region"
        aria-roledescription="presentación"
        aria-label={title ?? "Novela gráfica interactiva"}
        className="overflow-hidden rounded-3xl border-2 border-gold/25 bg-night-deep/70 shadow-2xl shadow-night-deep/40 outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        {/* Stage */}
        <div className="relative">
          <div className="grid md:grid-cols-2">
            {/* Illustration */}
            <div className="relative aspect-4/3 overflow-hidden bg-night md:aspect-auto md:min-h-104">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Soft gradient so the number badge & mobile text stay legible */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-night-deep/80 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-night-deep/40"
              />

              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-night-deep/80 px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                {slide.chapter}
              </span>
            </div>

            {/* Text */}
            <div className="relative flex min-h-56 flex-col justify-center p-6 sm:p-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease }}
                >
                  <h3 className="text-balance font-sans text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
                    {slide.heading}
                  </h3>
                  <p className="mt-3 text-pretty font-serif text-base leading-relaxed text-sky/85 sm:text-lg">
                    {slide.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Swipe surface (mobile-friendly) */}
          <motion.div
            className="absolute inset-0 touch-pan-y md:hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goNext();
              else if (info.offset.x > 60) goPrev();
            }}
          />

          {/* Arrows */}
          <button
            type="button"
            onClick={goPrev}
            disabled={isFirst}
            aria-label="Escena anterior"
            className={cn(
              "absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors sm:left-3",
              isFirst
                ? "cursor-not-allowed border-gold/10 bg-night/40 text-sky/25"
                : "border-gold/30 bg-night-deep/70 text-gold backdrop-blur-sm hover:bg-gold/25 active:scale-95",
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            aria-label="Escena siguiente"
            className={cn(
              "absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors sm:right-3",
              isLast
                ? "cursor-not-allowed border-gold/10 bg-night/40 text-sky/25"
                : "border-gold/30 bg-night-deep/70 text-gold backdrop-blur-sm hover:bg-gold/25 active:scale-95",
            )}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* Controls */}
        <div className="border-t border-gold/15 bg-night-deep/95 px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center gap-3">
            <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-gold/15">
              <motion.div
                className="h-full rounded-full bg-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease }}
              />
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="tablist"
              aria-label="Ir a una escena"
            >
              {slides.map((s, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={s.image}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Escena ${i + 1}: ${s.heading}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      isActive
                        ? "w-7 bg-gold"
                        : "w-2.5 bg-gold/25 hover:bg-gold/50",
                    )}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <p className="font-serif text-sm text-sky/80">
                Escena <span className="font-bold text-gold">{index + 1}</span>{" "}
                de <span className="font-bold text-gold">{total}</span>
              </p>

              {isLast ? (
                <button
                  type="button"
                  onClick={() => goTo(0)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-sans text-xs font-bold text-gold transition-colors hover:bg-gold/20 active:scale-95"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  Volver al inicio
                </button>
              ) : null}
            </div>

            <p className="font-serif text-xs text-sky/50">
              Usa las flechas, desliza o las teclas ← → del teclado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Gamepad2,
  HelpCircle,
  PartyPopper,
  PlayCircle,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { getModuleStations } from "@/lib/module-content";
import { ModuleId, getModule } from "@/lib/modules-config";
import { cn } from "@/lib/utils";
import SiteFooter from "./site-footer";
import { SiteHeader } from "./site-header";
import { Starfield } from "./starfield";
import { StationContent } from "./station-content";

const ease = [0.22, 1, 0.36, 1] as const;

type ModuleCard = {
  title: string;
  type: string;
  desc: string;
};

// A friendly icon per station "type" so kids can recognize what kind of
// activity is inside a card before they even open it, without relying on
// reading the label.
const TYPE_ICON: Record<string, typeof Star> = {
  video: PlayCircle,
  watch: PlayCircle,
  read: BookOpen,
  story: BookOpen,
  lectura: BookOpen,
  game: Gamepad2,
  juego: Gamepad2,
  quiz: HelpCircle,
  pregunta: HelpCircle,
  audio: Volume2,
  escucha: Volume2,
};

function getTypeIcon(type: string) {
  return TYPE_ICON[type.toLowerCase()] ?? Star;
}

// A cycling set of warm, high-contrast accent colors so each station number
// is visually distinct at a glance — a common wayfinding trick in kids'
// products (think numbered levels in an app) that avoids relying purely on
// reading comprehension.
const ACCENTS = [
  { ring: "ring-gold/40", bg: "bg-gold/20", text: "text-gold" },
  { ring: "ring-sky/40", bg: "bg-sky/20", text: "text-sky" },
  { ring: "ring-rose-300/40", bg: "bg-rose-300/20", text: "text-rose-200" },
  {
    ring: "ring-emerald-300/40",
    bg: "bg-emerald-300/20",
    text: "text-emerald-200",
  },
];

export function ModulePage({ id }: { id: ModuleId }) {
  const t = useTranslations("LandingPage");
  const locale = useLocale();
  const [openStation, setOpenStation] = useState<number | null>(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const { config, prev, next } = getModule(id);

  const content = {
    module: t(`modules.${id}.module`),
    planet: t(`modules.${id}.planet`),
    title: t(`modules.${id}.title`),
    narration: t(`modules.${id}.narration`),
    scene: t(`modules.${id}.scene`),
  };

  const cards = t.raw(`modules.${id}.cards`) as ModuleCard[];
  const stations = getModuleStations(id, locale);

  const allVisited = useMemo(
    () => cards.length > 0 && visited.size >= cards.length,
    [cards.length, visited],
  );

  function toggleStation(index: number) {
    setOpenStation((prev) => (prev === index ? null : index));
    setVisited((prev) => new Set(prev).add(index));
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <Starfield />
      <SiteHeader />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#modules"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-5 py-2.5 font-serif text-base text-sky/80 transition-colors hover:border-gold/40 hover:text-cream active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            {t("module.backToMap")}
          </Link>

          {/* Planet hero */}
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-4 w-4" aria-hidden />
                {content.module}
              </span>

              <h1 className="mt-4 text-balance font-sans text-4xl font-extrabold leading-tight text-cream sm:text-5xl md:text-6xl">
                {content.planet}
              </h1>

              <p className="mt-2 text-pretty font-sans text-xl font-semibold text-gold-soft">
                {content.title}
              </p>

              <p className="mt-4 text-pretty font-serif text-lg leading-relaxed text-sky/80">
                {content.scene}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80"
            >
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />

              <motion.img
                src={config.img}
                alt={content.planet}
                className="relative h-full w-full object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)]"
                animate={{
                  y: [0, -16, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Fox narration — styled like a comic speech bubble so kids read
              it as "someone is talking to me", not as body copy. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
            className="relative mt-10 flex items-start gap-4 rounded-[2rem] border-2 border-gold/20 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
          >
            <span
              aria-hidden
              className="absolute -left-3 top-8 h-5 w-5 rotate-45 border-b-2 border-l-2 border-gold/20 bg-night sm:-left-3"
            />

            <motion.span
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/20 ring-4 ring-gold/30"
            >
              <img
                src="/images/fox.png"
                alt=""
                className="h-12 w-12 object-contain"
              />
            </motion.span>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                <Volume2 className="h-3.5 w-3.5" aria-hidden />
                {t("module.narratorLabel")}
              </span>

              <p className="mt-2 text-pretty font-serif text-xl italic leading-relaxed text-cream">
                {content.narration}
              </p>
            </div>
          </motion.div>

          {/* Stations */}
          <div className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-sans text-2xl font-bold text-cream sm:text-3xl">
                <Compass className="h-6 w-6 text-gold" aria-hidden />
                {t("module.cardsTitle")}
              </h2>

              {/* Simple visual counter — a filled star per station explored,
                  so progress is legible without reading numbers. */}
              <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-white/5 px-3 py-1.5">
                {cards.map((card, i) => (
                  <Star
                    key={card.title}
                    className={cn(
                      "h-4 w-4 transition-colors",
                      visited.has(i) ? "fill-gold text-gold" : "text-sky/30",
                    )}
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            <AnimatePresence>
              {allVisited && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="mt-4 flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-gold/30 bg-gold/10 px-5 py-4"
                >
                  <PartyPopper
                    className="h-6 w-6 shrink-0 text-gold"
                    aria-hidden
                  />
                  <p className="font-serif text-lg font-bold text-gold">
                    {t("module.allExplored")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 space-y-4">
              {cards.map((card, i) => {
                const station = stations[i];
                const isOpen = openStation === i;
                const stationNumber = i + 1;
                const TypeIcon = getTypeIcon(card.type);
                const accent = ACCENTS[i % ACCENTS.length];

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease }}
                    className={cn(
                      "overflow-hidden rounded-3xl border-2 backdrop-blur-sm transition-colors",
                      isOpen
                        ? "border-gold/40 bg-white/10"
                        : "border-gold/15 bg-white/5",
                    )}
                  >
                    <motion.button
                      type="button"
                      onClick={() => toggleStation(i)}
                      aria-expanded={isOpen}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                    >
                      <span
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-sans text-base font-extrabold ring-2",
                          accent.bg,
                          accent.text,
                          accent.ring,
                        )}
                      >
                        {visited.has(i) && !isOpen ? (
                          <Star className="h-5 w-5 fill-current" aria-hidden />
                        ) : (
                          stationNumber
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                          <TypeIcon className="h-3.5 w-3.5" aria-hidden />
                          {t(`types.${card.type}`)}
                        </span>

                        <h3 className="mt-2 font-sans text-xl font-bold text-cream sm:text-2xl">
                          {card.title}
                        </h3>

                        {!isOpen && (
                          <p className="mt-1 font-serif text-base text-sky/80">
                            {card.desc}
                          </p>
                        )}
                      </div>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease }}
                        className={cn(
                          "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                          isOpen ? "bg-gold/25" : "bg-white/5",
                        )}
                      >
                        <ChevronDown
                          className="h-5 w-5 text-gold"
                          aria-hidden
                        />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isOpen && station && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t-2 border-gold/10 px-5 pb-6 pt-4 sm:px-6 sm:pb-8">
                            <StationContent blocks={station.blocks} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Prev / next — big, thumb-friendly pills */}
          <nav className="mt-14 flex flex-col gap-4 border-t border-gold/15 pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={prev.route}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/20 bg-white/5 px-6 py-3.5 font-serif text-base text-sky/80 transition-colors hover:border-gold/40 hover:text-cream active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
                {t("module.prev")}
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={next.route}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-colors hover:bg-gold-soft active:scale-95"
              >
                {t("module.next")}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            )}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/* eslint-disable @next/next/no-assign-module-variable */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Rocket, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { MODULES } from "@/lib/modules-config";
import { cn } from "@/lib/utils";
import SiteFooter from "./site-footer";
import { SiteHeader } from "./site-header";
import { Starfield } from "./starfield";

const ease = [0.22, 1, 0.36, 1] as const;

// Same cycling accent palette used on module pages and the quiz, so a
// planet's mission number is recognizable by color across the whole app,
// not just its position in the grid.
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

export function UniverseMap() {
  const t = useTranslations("LandingPage");

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <Starfield />
      <SiteHeader />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-5 py-2.5 font-serif text-base text-sky/80 transition-colors hover:border-gold/40 hover:text-cream active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            {t("nav.backHome")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto mt-8 max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              <Sparkles className="h-4 w-4" aria-hidden />
              {t("map.badge")}
            </span>
            <h1 className="mt-4 text-balance font-sans text-4xl font-extrabold text-cream sm:text-5xl md:text-6xl">
              {t("map.title")}
            </h1>
            <p className="mt-4 text-pretty font-serif text-xl italic leading-relaxed text-sky/80">
              {t("map.subtitle")}
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => {
              const module = t(`modules.${m.id}.module`);
              const planet = t(`modules.${m.id}.planet`);
              const title = t(`modules.${m.id}.title`);
              const accent = ACCENTS[i % ACCENTS.length];

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                >
                  <Link
                    href={m.route}
                    className="group relative flex h-full flex-col items-center rounded-3xl border-2 border-gold/15 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10"
                  >
                    {/* Mission number — gives every planet a clear place in
                        a sequence, like numbered levels in a game, so a kid
                        always knows "where am I in the journey". */}
                    <span
                      className={cn(
                        "absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ring-2",
                        accent.bg,
                        accent.text,
                        accent.ring,
                      )}
                    >
                      {i + 1}
                    </span>

                    <motion.img
                      src={m.img}
                      alt={planet}
                      className="mt-4 h-32 w-32 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-36 sm:w-36"
                      animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                      transition={{
                        duration: 6 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      {module}
                    </span>
                    <h2 className="mt-1 font-sans text-2xl font-bold text-cream">
                      {planet}
                    </h2>
                    <p className="mt-1 flex-1 font-serif text-base text-sky/80">
                      {title}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-base font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-colors group-hover:bg-gold-soft">
                      <Rocket className="h-4 w-4" aria-hidden />
                      {t("map.land")}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

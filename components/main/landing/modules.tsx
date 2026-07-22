/* eslint-disable @next/next/no-assign-module-variable */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { MODULES } from "@/lib/modules-config";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Same cycling accent palette used everywhere else in the app (map, module
// page, quiz, planets game), so a planet's mission number reads as part of
// one consistent visual system no matter which screen a kid is on.
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

export function Modules() {
  const t = useTranslations("LandingPage");

  return (
    <section id="modules" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            {t("modulesSection.badge")}
          </span>

          <h2 className="mt-4 text-balance font-sans text-3xl font-bold text-cream sm:text-4xl md:text-5xl">
            {t("modulesSection.title")}
          </h2>

          <p className="mt-4 text-pretty font-serif text-xl italic leading-relaxed text-sky/80">
            {t("modulesSection.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease,
                }}
              >
                <Link
                  href={m.route}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border-2 border-gold/15 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10"
                >
                  <div className="absolute inset-x-0 -top-16 mx-auto h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/25" />

                  {/* Mission number, same wayfinding device used on the full
                      map — lets a kid sense "this is a sequence" even from
                      this shorter homepage preview. */}
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
                    className="relative mt-2 h-32 w-32 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] sm:h-36 sm:w-36"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 4, 0],
                    }}
                    transition={{
                      duration: 6 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    {module}
                  </span>

                  <h3 className="relative mt-1 font-sans text-2xl font-bold text-cream">
                    {planet}
                  </h3>

                  <p className="relative mt-1 flex-1 font-serif text-base text-sky/80">
                    {title}
                  </p>

                  {/* Always visible now — on a touch screen ":hover" never
                      fires, so a "reveal on hover" call-to-action was simply
                      invisible for anyone on a phone or tablet. */}
                  <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-4 py-2 text-sm font-bold text-gold transition-colors group-hover:bg-gold group-hover:text-night">
                    {t("modulesSection.explore")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

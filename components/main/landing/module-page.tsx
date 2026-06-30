/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Compass, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { ModuleId, getModule } from "@/lib/modules-config";
import SiteFooter from "./site-footer";
import { SiteHeader } from "./site-header";
import { Starfield } from "./starfield";

const ease = [0.22, 1, 0.36, 1] as const;

type ModuleCard = {
  title: string;
  type: string;
  desc: string;
};

export function ModulePage({ id }: { id: ModuleId }) {
  const t = useTranslations("LandingPage");

  const { config, prev, next } = getModule(id);

  const content = {
    module: t(`modules.${id}.module`),
    planet: t(`modules.${id}.planet`),
    title: t(`modules.${id}.title`),
    narration: t(`modules.${id}.narration`),
    scene: t(`modules.${id}.scene`),
  };

  const cards = t.raw(`modules.${id}.cards`) as ModuleCard[];

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <Starfield />
      <SiteHeader />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#modules"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-4 py-2 font-serif text-sm text-sky/80 transition-colors hover:border-gold/40 hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("module.backToMap")}
          </Link>

          {/* Planet hero */}
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {content.module}
              </span>

              <h1 className="mt-4 text-balance font-sans text-4xl font-extrabold leading-tight text-cream sm:text-5xl">
                {content.planet}
              </h1>

              <p className="mt-2 text-pretty font-sans text-lg font-semibold text-gold-soft">
                {content.title}
              </p>

              <p className="mt-4 text-pretty font-serif leading-relaxed text-sky/70">
                {content.scene}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72"
            >
              <div className="absolute inset-0 rounded-full bg-gold/15 blur-3xl" />

              <motion.img
                src={config.img}
                alt={content.planet}
                className="relative h-full w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                animate={{
                  y: [0, -14, 0],
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

          {/* Fox narration */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 flex items-start gap-4 rounded-3xl border border-gold/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/20 ring-1 ring-gold/30">
              <img
                src="/images/fox.png"
                alt=""
                className="h-11 w-11 object-contain"
              />
            </span>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                {t("module.narratorLabel")}
              </span>

              <p className="mt-1 text-pretty font-serif text-lg italic leading-relaxed text-cream">
                {content.narration}
              </p>
            </div>
          </motion.div>

          {/* Stations / cards */}
          <div className="mt-14">
            <h2 className="flex items-center gap-2 font-sans text-2xl font-bold text-cream">
              <Compass className="h-5 w-5 text-gold" aria-hidden />
              {t("module.cardsTitle")}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {cards.map((card, i) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease,
                  }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col rounded-3xl border border-gold/15 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10"
                >
                  <span className="self-start rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                    {t(`types.${card.type}`)}
                  </span>

                  <h3 className="mt-3 font-sans text-xl font-bold text-cream">
                    {card.title}
                  </h3>

                  <p className="mt-1 flex-1 font-serif text-sm leading-relaxed text-sky/70">
                    {card.desc}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-gold transition-transform group-hover:translate-x-1">
                    {t("module.start")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Prev / next */}
          <nav className="mt-14 flex flex-col gap-4 border-t border-gold/15 pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={prev.route}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-5 py-2.5 font-serif text-sm text-sky/80 transition-colors hover:border-gold/40 hover:text-cream"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t("module.prev")}
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={next.route}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-colors hover:bg-gold-soft"
              >
                {t("module.next")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

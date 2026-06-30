"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("LandingPage");

  return (
    <section
      id="hero"
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:gap-8 lg:pt-32"
    >
      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease }}
        className="w-full max-w-xl text-center lg:text-left"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft"
        >
          <Sparkles className="h-4 w-4" />
          {t("hero.badge")}
        </motion.span>

        <h1 className="mt-5 text-balance font-sans text-4xl font-extrabold leading-[1.05] text-cream sm:text-5xl md:text-6xl">
          {t("hero.title")}

          <motion.span
            className="mt-3 block h-1.5 w-28 rounded-full bg-linear-to-r from-gold to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease }}
          />
        </h1>

        <p className="mt-4 text-pretty font-serif text-xl italic leading-relaxed text-gold-soft">
          {t("hero.subtitle")}
        </p>

        <p className="mx-auto mt-4 max-w-md text-pretty font-serif text-lg leading-relaxed text-sky/90 lg:mx-0">
          {t("hero.lead")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
        >
          <Button
            size="lg"
            onClick={() => scrollTo("modules")}
            className="group w-full rounded-full bg-gold px-8 py-6 text-base font-bold text-night shadow-lg shadow-gold/30 transition-all hover:bg-gold-soft hover:shadow-xl hover:shadow-gold/40 sm:w-auto"
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Link href="/mapa" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-sky/30 bg-transparent px-8 py-6 text-base font-semibold text-cream transition-all hover:bg-white/10 hover:text-cream sm:w-auto"
            >
              {t("hero.ctaSecondary")}
              <Star className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Visual con planeta en órbita */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="relative flex w-full max-w-md items-center justify-center"
      >
        <div className="relative aspect-square w-full max-w-sm">
          <div className="absolute inset-[8%] rounded-full bg-linear-to-br from-gold/20 to-transparent blur-2xl" />

          <div className="absolute inset-0 rounded-full border border-gold/15" />
          <div className="absolute inset-[14%] rounded-full border border-sky/10" />

          <motion.img
            src="/images/hero-little-prince.png"
            alt={t("hero.title")}
            className="absolute inset-[10%] h-[80%] w-[80%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <motion.img
              src="/images/orbit-planet.png"
              alt=""
              aria-hidden="true"
              className="absolute -top-6 left-1/2 h-20 w-20 -translate-x-1/2 object-contain drop-shadow-lg sm:h-24 sm:w-24"
              animate={{ rotate: -360 }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>

          <motion.span
            className="absolute -right-2 top-1/4 text-gold"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Star className="h-5 w-5 fill-gold" />
          </motion.span>

          <motion.span
            className="absolute bottom-6 -left-2 text-gold-soft"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          >
            <Sparkles className="h-6 w-6" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

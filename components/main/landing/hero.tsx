/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

// CSS animations - TODAS las animaciones se mantienen
const ANIMATION_STYLES = `
  @keyframes hero-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes hero-orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hero-orbit-counter {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes hero-twinkle-a {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  @keyframes hero-twinkle-b {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .hero-float {
    animation: hero-float 6s ease-in-out infinite;
    will-change: transform;
  }
  .hero-orbit-ring {
    animation: hero-orbit 18s linear infinite;
    will-change: transform;
  }
  .hero-orbit-planet {
    animation: hero-orbit-counter 18s linear infinite;
    will-change: transform;
  }
  .hero-twinkle-a {
    animation: hero-twinkle-a 3s ease-in-out infinite;
    will-change: transform, opacity;
  }
  .hero-twinkle-b {
    animation: hero-twinkle-b 4s ease-in-out infinite 1s;
    will-change: transform, opacity;
  }
`;

// Scroll optimizado con requestAnimationFrame
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
};

export function Hero() {
  const t = useTranslations("LandingPage");

  const handleScrollToModules = useCallback(() => scrollTo("modules"), []);
  const animationStyles = useMemo(() => <style>{ANIMATION_STYLES}</style>, []);

  return (
    <section
      id="hero"
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:gap-6 lg:pt-32"
    >
      {animationStyles}

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-xl text-center lg:w-[44%] lg:max-w-none lg:text-left"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t("hero.badge")}
        </motion.span>

        <h1 className="mt-4 text-balance font-sans text-3xl font-extrabold leading-[1.05] text-cream sm:text-4xl md:text-5xl">
          {t("hero.title")}

          <motion.span
            className="mt-2 block h-1 w-20 rounded-full bg-linear-to-r from-gold to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease }}
          />
        </h1>

        <p className="mt-3 text-pretty font-serif text-lg italic leading-relaxed text-gold-soft sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <p className="mx-auto mt-3 max-w-md text-pretty font-serif text-base leading-relaxed text-sky/90 lg:mx-0 sm:text-lg">
          {t("hero.lead")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
        >
          <Button
            size="lg"
            onClick={handleScrollToModules}
            className="group w-full rounded-full bg-gold px-6 py-5 text-sm font-bold text-night shadow-lg shadow-gold/30 transition-all hover:bg-gold-soft hover:shadow-xl hover:shadow-gold/40 sm:w-auto sm:text-base"
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Button>

          <Link href="/mapa" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-sky/30 bg-transparent px-6 py-5 text-sm font-semibold text-cream transition-all hover:bg-white/10 hover:text-cream sm:w-auto sm:text-base"
            >
              {t("hero.ctaSecondary")}
              <Star className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Visual - EL PLANETA SIGUE ROTANDO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="relative flex w-full items-center justify-center lg:w-[56%]"
      >
        <div className="relative aspect-square w-full max-w-sm sm:max-w-md lg:max-w-2xl">
          {/* Fondo con blur */}
          <div className="absolute inset-[8%] rounded-full bg-linear-to-br from-gold/20 to-transparent blur-2xl" />

          {/* Círculos decorativos */}
          <div className="absolute inset-0 rounded-full border border-gold/10" />
          <div className="absolute inset-[14%] rounded-full border border-sky/8" />

          {/* Imagen principal con float */}
          <img
            src="/images/hero-little-prince.png"
            alt={t("hero.title")}
            loading="eager"
            className="hero-float absolute inset-[10%] h-[80%] w-[80%] object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
          />

          {/* ANILLO QUE ROTA - SE MANTIENE */}
          <div className="hero-orbit-ring absolute inset-0">
            {/* Planeta que gira en sentido contrario - SE MANTIENE */}
            <img
              src="/images/orbit-planet.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="hero-orbit-planet absolute -top-5 left-1/2 h-16 w-16 -translate-x-1/2 object-contain drop-shadow-md sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
          </div>

          {/* Estrellas con twinkle - SE MANTIENEN */}
          <span className="hero-twinkle-a absolute -right-1 top-1/4 text-gold sm:-right-2">
            <Star className="h-4 w-4 fill-gold sm:h-5 sm:w-5" />
          </span>
          <span className="hero-twinkle-b absolute bottom-4 -left-1 text-gold-soft sm:bottom-6 sm:-left-2">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export function FoxQuote() {
  const t = useTranslations("LandingPage");

  return (
    <section id="fox" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-gold/25 bg-linear-to-br from-blue-deep/60 to-night/60 px-6 py-14 text-center backdrop-blur-sm sm:px-12"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue/20 blur-3xl" />

        <motion.img
          src="/images/fox.png"
          alt={t("foxSection.title")}
          className="relative mx-auto h-32 w-32 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-40 sm:w-40"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative mt-4 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            >
              <Star className="h-5 w-5 fill-gold text-gold" />
            </motion.span>
          ))}
        </div>

        <span className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {t("foxSection.badge")}
        </span>

        <h2 className="mt-4 text-3xl font-bold text-cream">
          {t("foxSection.title")}
        </h2>

        <p className="relative mx-auto mt-4 max-w-xl text-balance font-serif text-xl italic leading-relaxed text-cream sm:text-2xl">
          “{t("foxSection.quote")}”
        </p>

        <p className="relative mx-auto mt-4 max-w-lg text-pretty font-serif leading-relaxed text-sky/70">
          {t("foxSection.body")}
        </p>

        <div className="relative mx-auto my-8 h-px w-24 bg-linear-to-r from-transparent via-gold to-transparent" />

        <Button
          asChild
          size="lg"
          className="group relative rounded-full bg-gold px-10 py-6 text-base font-bold text-night shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft hover:shadow-xl"
        >
          <Link href="/mapa">
            {t("hero.ctaPrimary")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}

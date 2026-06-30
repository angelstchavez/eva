/* eslint-disable @next/next/no-assign-module-variable */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { MODULES } from "@/lib/modules-config";

const ease = [0.22, 1, 0.36, 1] as const;

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
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {t("modulesSection.badge")}
          </span>

          <h2 className="mt-4 text-balance font-sans text-3xl font-bold text-cream sm:text-4xl md:text-5xl">
            {t("modulesSection.title")}
          </h2>

          <p className="mt-4 text-pretty font-serif text-lg italic leading-relaxed text-sky/70">
            {t("modulesSection.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => {
            const module = t(`modules.${m.id}.module`);
            const planet = t(`modules.${m.id}.planet`);
            const title = t(`modules.${m.id}.title`);

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease,
                }}
              >
                <Link
                  href={m.route}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-gold/15 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gold/40 hover:bg-white/10"
                >
                  <div className="absolute inset-x-0 -top-16 mx-auto h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/25" />

                  <motion.img
                    src={m.img}
                    alt={planet}
                    className="relative h-28 w-28 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] sm:h-32 sm:w-32"
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

                  <span className="relative mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    {module}
                  </span>

                  <h3 className="relative mt-1 font-sans text-xl font-bold text-cream">
                    {planet}
                  </h3>

                  <p className="relative mt-1 flex-1 font-serif text-sm text-sky/70">
                    {title}
                  </p>

                  <span className="relative mt-4 inline-block text-sm font-bold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {t("modulesSection.explore")} →
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { MODULES } from "@/lib/modules-config";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

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

// Componente de módulo memoizado para evitar re-renders
const ModuleCard = motion(
  ({
    module,
    index,
    accent,
    t,
  }: {
    module: (typeof MODULES)[0];
    index: number;
    accent: (typeof ACCENTS)[0];
    t: any;
  }) => {
    const moduleLabel = t(`modules.${module.id}.module`);
    const planet = t(`modules.${module.id}.planet`);
    const title = t(`modules.${module.id}.title`);

    return (
      <Link
        href={module.route}
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border-2 border-gold/15 bg-white/5 p-5 text-center backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10 sm:p-6"
      >
        {/* Efecto de brillo optimizado con GPU */}
        <div className="absolute inset-x-0 -top-16 mx-auto h-28 w-28 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/20 sm:h-32 sm:w-32" />

        {/* Número de misión */}
        <span
          className={cn(
            "absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ring-2 sm:left-4 sm:top-4 sm:h-9 sm:w-9 sm:text-sm",
            accent.bg,
            accent.text,
            accent.ring,
          )}
        >
          {index + 1}
        </span>

        {/* Imagen del planeta - animación optimizada */}
        <motion.img
          src={module.img}
          alt={planet}
          className="relative mt-2 h-28 w-28 object-contain drop-shadow-[0_6px_15px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32 md:h-36 md:w-36"
          animate={{
            y: [0, -6, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          loading="lazy"
          decoding="async"
        />

        <span className="relative mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:mt-4 sm:text-xs">
          {moduleLabel}
        </span>

        <h3 className="relative mt-1 font-sans text-xl font-bold text-cream sm:text-2xl">
          {planet}
        </h3>

        <p className="relative mt-1 flex-1 font-serif text-sm text-sky/80 sm:text-base">
          {title}
        </p>

        {/* Botón de explorar siempre visible */}
        <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold transition-colors group-hover:bg-gold group-hover:text-night sm:mt-4 sm:px-4 sm:py-2 sm:text-sm">
          {t("modulesSection.explore")}
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
        </span>
      </Link>
    );
  },
);

ModuleCard.displayName = "ModuleCard";

export function Modules() {
  const t = useTranslations("LandingPage");

  // Memoizar la sección de título para evitar re-renders
  const headerSection = useMemo(
    () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease }}
        className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:px-4 sm:py-1.5 sm:text-sm">
          {t("modulesSection.badge")}
        </span>

        <h2 className="mt-3 text-balance font-sans text-2xl font-bold text-cream sm:text-3xl md:text-4xl lg:text-5xl">
          {t("modulesSection.title")}
        </h2>

        <p className="mt-3 text-pretty font-serif text-lg italic leading-relaxed text-sky/80 sm:mt-4 sm:text-xl">
          {t("modulesSection.subtitle")}
        </p>
      </motion.div>
    ),
    [t],
  );

  // Memoizar los módulos para evitar recreación
  const modulesList = useMemo(
    () =>
      MODULES.map((module, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <ModuleCard
            key={module.id}
            module={module}
            index={i}
            accent={accent}
            t={t}
          />
        );
      }),
    [t],
  );

  return (
    <section
      id="modules"
      className="relative z-10 px-4 py-16 sm:px-6 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {headerSection}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {modulesList}
        </div>
      </div>
    </section>
  );
}

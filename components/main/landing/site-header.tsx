/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const t = useTranslations("LandingPage");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: "/#modules", label: t("nav.journey") },
    { href: "/#fox", label: t("nav.fox") },
    { href: "/mapa", label: t("nav.map") },
  ];

  function toggleLanguage() {
    router.replace(pathname, {
      locale: locale === "es" ? "en" : "es",
    });
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-night/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={t("nav.home")}
        >
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gold/20 ring-1 ring-gold/30">
            <img
              src="/images/fox.png"
              alt=""
              className="h-9 w-9 object-contain"
            />
          </span>

          <span className="text-left leading-tight">
            <span className="block font-sans text-base font-extrabold tracking-wide text-cream">
              EVA
            </span>

            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-sky/70">
              {t("hero.subtitle")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 font-serif text-sm text-sky/80 transition-colors hover:bg-white/5 hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Change language"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-sky/90 transition-colors hover:border-gold/50 hover:text-cream"
          >
            <Languages className="h-4 w-4" />
            {locale.toUpperCase()}
          </button>

          <Link href="/mapa">
            <Button
              size="sm"
              className="rounded-full bg-gold px-4 font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft hover:text-night"
            >
              {t("nav.depart")}
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

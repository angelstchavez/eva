/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Languages, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const t = useTranslations("LandingPage");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

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
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/20 ring-1 ring-gold/30">
            <img
              src="/images/fox.png"
              alt=""
              className="h-9 w-9 object-contain"
            />
          </span>

          <span className="text-left leading-tight">
            <span className="block font-sans text-base font-extrabold tracking-wide text-cream">
              EVA Entre Mundos
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
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
            aria-label={t("nav.changeLanguage")}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-sky/90 transition-colors hover:border-gold/50 hover:text-cream"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
          </button>

          <Link href="/mapa" className="hidden sm:block">
            <Button
              size="sm"
              className="rounded-full bg-gold px-4 font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft hover:text-night"
            >
              {t("nav.depart")}
            </Button>
          </Link>

          {/* Botón hamburguesa — solo móvil/tablet */}
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-white/5 text-sky/90 transition-colors hover:border-gold/50 hover:text-cream md:hidden"
          >
            {menuOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>

      {/* Panel de navegación móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav-panel"
            aria-label={t("nav.mobileNavLabel")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gold/15 bg-night/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-serif text-base text-sky/85 transition-colors hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/mapa"
                onClick={() => setMenuOpen(false)}
                className="mt-2 sm:hidden"
              >
                <Button className="w-full rounded-full bg-gold font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft hover:text-night">
                  {t("nav.depart")}
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

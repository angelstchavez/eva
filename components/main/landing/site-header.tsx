/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
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
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    {
      href: "/#modules",
      label: t("nav.journey"),
    },
    {
      href: "/#fox",
      label: t("nav.fox"),
    },
    {
      href: "/mapa",
      label: t("nav.map"),
    },
  ];

  const toggleLanguage = () => {
    router.replace(pathname, {
      locale: locale === "es" ? "en" : "es",
    });
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-night/70 backdrop-blur-xl"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            aria-label={t("nav.home")}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-gold/10 transition-all duration-300 group-hover:scale-105 group-hover:border-gold/40 group-hover:bg-gold/20">
              <Image
                src="/images/fox.png"
                alt="EVA"
                width={34}
                height={34}
                priority
              />
            </div>

            <div className="leading-tight">
              <h1 className="font-sans text-base font-semibold uppercase tracking-[0.22em] text-cream">
                EVA
              </h1>

              <p className="font-serif text-xs text-sky/60">
                {t("hero.subtitle")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2.5 font-serif text-sm text-sky/80 transition-all duration-200 hover:bg-white/5 hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label={t("nav.changeLanguage")}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky/80 transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-cream"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:block">{locale}</span>
            </button>

            <Link href="/mapa" className="hidden sm:block">
              <Button className="h-10 rounded-full bg-gold px-6 font-semibold uppercase tracking-[0.18em] text-night shadow-lg shadow-gold/20 transition-all hover:scale-[1.02] hover:bg-gold-soft">
                {t("nav.depart")}
              </Button>
            </Link>

            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-white/5 text-sky/80 transition-all hover:border-gold/40 hover:bg-white/10 hover:text-cream md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-0 right-0 top-20 z-40 overflow-hidden border-b border-gold/15 bg-night/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 sm:px-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-serif text-base text-sky/80 transition-all hover:bg-white/5 hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/mapa"
                onClick={() => setMenuOpen(false)}
                className="mt-2 sm:hidden"
              >
                <Button className="w-full rounded-full bg-gold py-6 font-semibold uppercase tracking-[0.18em] text-night shadow-lg shadow-gold/20">
                  {t("nav.depart")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

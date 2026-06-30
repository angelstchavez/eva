/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("LandingPage");

  return (
    <footer className="relative z-10 border-t border-gold/15 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gold/20 ring-1 ring-gold/30">
            <img
              src="/images/fox.png"
              alt=""
              className="h-8 w-8 object-contain"
            />
          </span>

          <span className="font-sans text-sm font-bold text-cream/70">
            EVA <span className="text-gold">·</span> {t("hero.subtitle")}
          </span>
        </div>

        <p className="max-w-sm font-serif text-xs leading-relaxed text-sky/50">
          {t("footer.tagline")} {t("footer.audience")}
        </p>

        <div className="flex items-center gap-4 text-xs text-sky/40">
          <span>© {new Date().getFullYear()}</span>
          <span className="h-4 w-px bg-white/10" />
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}

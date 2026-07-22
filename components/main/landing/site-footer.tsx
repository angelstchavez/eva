import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("LandingPage");

  return (
    <footer className="relative z-10 border-t border-gold/15 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/10 shadow-lg shadow-gold/10">
            <Image
              src="/images/fox.png"
              alt="EVA Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="font-sans text-base font-bold tracking-wide text-cream">
              EVA <span className="text-gold">·</span>{" "}
              <span className="text-cream/80">{t("hero.subtitle")}</span>
            </h3>

            <p className="mt-1 max-w-sm font-serif text-sm leading-relaxed text-sky/60">
              {t("footer.tagline")}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 text-center text-xs text-sky/50 sm:flex-row sm:gap-4">
          <span>© {new Date().getFullYear()}</span>

          <span className="hidden h-4 w-px bg-white/10 sm:block" />

          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}

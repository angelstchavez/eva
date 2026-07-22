import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("LandingPage");

  return (
    <footer className="border-t border-gold/15 bg-night/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
            <Image src="/images/fox.png" alt="EVA" width={30} height={30} />
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-cream">
              EVA
            </h3>

            <p className="text-xs text-sky/60">{t("hero.subtitle")}</p>
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-sky/50">
          © {new Date().getFullYear()} EVA · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

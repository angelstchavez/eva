import { FoxQuote } from "@/components/main/landing/fox-quote";
import { Hero } from "@/components/main/landing/hero";
import { Modules } from "@/components/main/landing/modules";
import SiteFooter from "@/components/main/landing/site-footer";
import { SiteHeader } from "@/components/main/landing/site-header";
import { Starfield } from "@/components/main/landing/starfield";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background font-serif text-foreground">
      <Starfield />
      <SiteHeader />
      <Hero />
      <Modules />
      <FoxQuote />
      <SiteFooter />
    </main>
  );
}

"use client";

import { cn } from "@/lib/utils";

type ClassificationItem = {
  title: string;
  genre: string;
};

const GENRE_STYLES: Record<string, string> = {
  Narrativo: "border-blue/40 bg-blue/15 text-sky",
  Lírico: "border-rose/40 bg-rose/15 text-rose",
  Dramático: "border-gold/40 bg-gold/15 text-gold-soft",
};

type ClassificationCardsProps = {
  items: ClassificationItem[];
};

export function ClassificationCards({ items }: ClassificationCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center justify-between gap-3 rounded-2xl border border-gold/15 bg-white/5 p-4"
        >
          <p className="font-serif text-sm text-cream">{item.title}</p>
          <span
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
              GENRE_STYLES[item.genre] ?? "border-gold/30 bg-gold/10 text-gold",
            )}
          >
            {item.genre === "Narrativo" && "🗺️ "}
            {item.genre === "Lírico" && "🎵 "}
            {item.genre === "Dramático" && "🎭 "}
            {item.genre}
          </span>
        </div>
      ))}
    </div>
  );
}

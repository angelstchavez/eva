"use client";

import type { ContentBlock } from "@/lib/module-content";
import { Lightbulb, Quote as QuoteIcon, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ClassificationCards } from "./classification-cards";
import { ComicPanels } from "./comic-panels";
import { ExplorationCards } from "./exploration-cards";
import { GlossaryFlowers } from "./glossary-flowers";
import { MatchingActivity } from "./matching-activity";
import { PlanetsGame } from "./planets-game";
import { QuizStation } from "./quiz-station";
import { WordSearch } from "./word-search";

// Same cycling accent palette used across the app (map, module page, quiz,
// planets game) so numbered items everywhere — including plain reflection
// questions here — read as part of one consistent visual system.
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

export function StationContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      // Emphasized ideas get boxed as a callout instead of just colored
      // text — a "spot the important idea" pattern kids' materials use
      // constantly, and much easier to notice than a color change alone.
      if (block.emphasis) {
        return (
          <div className="flex items-start gap-3 rounded-2xl border-2 border-gold/30 bg-gold/10 p-4 sm:p-5">
            <Lightbulb
              className="mt-0.5 h-6 w-6 shrink-0 text-gold"
              aria-hidden
            />
            <p className="font-sans text-lg font-bold leading-snug text-gold sm:text-xl">
              {block.text}
            </p>
          </div>
        );
      }
      return (
        <p className="font-serif text-base leading-relaxed text-sky/85 sm:text-lg">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="relative overflow-hidden rounded-2xl border-l-4 border-gold/50 bg-gold/5 px-5 py-4 pl-14 font-serif text-lg italic text-cream sm:text-xl">
          <QuoteIcon
            className="absolute left-3 top-3 h-7 w-7 -scale-x-100 text-gold/30"
            aria-hidden
          />
          {block.text}
        </blockquote>
      );

    case "heading":
      if (block.level === 3) {
        return (
          <h3 className="flex items-center gap-3 font-sans text-xl font-bold text-cream sm:text-2xl">
            <span
              className="h-6 w-1.5 shrink-0 rounded-full bg-gold"
              aria-hidden
            />
            {block.text}
          </h3>
        );
      }
      return (
        <h4 className="flex items-center gap-2 font-sans text-base font-bold text-gold sm:text-lg">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
          {block.text}
        </h4>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="space-y-3">
            {block.items.map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 font-sans text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <span className="pt-0.5 font-serif text-base leading-relaxed text-sky/85 sm:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <span className="font-serif text-base leading-relaxed text-sky/85 sm:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "questions":
      return (
        <div className="space-y-5">
          <p className="font-serif text-sm italic text-sky/60">
            No hay respuestas incorrectas, escribe lo que pienses ✨
          </p>
          {block.questions.map((q, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div key={q} className="space-y-2">
                <label
                  htmlFor={`question-${i}`}
                  className="flex gap-3 font-serif text-base leading-relaxed text-cream sm:text-lg"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold ring-2",
                      accent.bg,
                      accent.text,
                      accent.ring,
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{q}</span>
                </label>
                <Textarea
                  id={`question-${i}`}
                  placeholder={
                    block.placeholder ?? "Escribe tu respuesta aquí..."
                  }
                  rows={3}
                  className="rounded-xl border-2 border-gold/20 bg-night-deep/50 font-serif text-base text-cream placeholder:text-sky/40 focus-visible:border-gold/50 focus-visible:ring-gold/30"
                />
              </div>
            );
          })}
        </div>
      );

    case "table":
      return (
        <div className="space-y-1.5">
          <div className="overflow-x-auto rounded-2xl border-2 border-gold/15">
            {block.caption && (
              <p className="border-b border-gold/15 bg-gold/5 px-4 py-2.5 font-sans text-sm font-bold text-gold">
                {block.caption}
              </p>
            )}
            <table className="w-full min-w-120 text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gold/15 bg-white/5">
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-sans font-bold text-gold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      "border-b border-gold/10 last:border-0",
                      ri % 2 === 1 && "bg-white/3",
                    )}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 font-serif leading-relaxed text-sky/85"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-serif text-xs text-sky/50 sm:hidden">
            Desliza hacia los lados para ver toda la tabla →
          </p>
        </div>
      );

    case "panels":
      return <ComicPanels panels={block.panels} footer={block.footer} />;

    case "exploration":
      return <ExplorationCards items={block.items} />;

    case "glossary":
      return <GlossaryFlowers items={block.items} />;

    case "matching":
      return <MatchingActivity pairs={block.pairs} />;

    case "quiz":
      return <QuizStation questions={block.questions} />;

    case "wordsearch":
      return <WordSearch words={block.words} />;

    case "planets":
      return <PlanetsGame items={block.items} hint={block.hint} />;

    case "classification":
      return <ClassificationCards items={block.items} />;

    case "rubric":
      return (
        <div className="space-y-1.5">
          <div className="overflow-x-auto rounded-2xl border-2 border-gold/15">
            <table className="w-full min-w-120 text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gold/15 bg-white/5">
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-sans font-bold text-gold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      "border-b border-gold/10 last:border-0",
                      ri % 2 === 1 && "bg-white/3",
                    )}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 font-serif text-sky/85">
                        {cell || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-serif text-xs text-sky/50 sm:hidden">
            Desliza hacia los lados para ver toda la tabla →
          </p>
        </div>
      );

    case "gallery":
      return (
        <div className="rounded-2xl border-2 border-dashed border-gold/30 bg-white/5 p-8 text-center sm:p-10">
          <span className="text-6xl" role="img" aria-hidden>
            🖼️
          </span>
          <p className="mt-4 font-serif text-base leading-relaxed text-sky/80 sm:text-lg">
            {block.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-bold text-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Próximamente: sube tu planeta aquí
          </span>
        </div>
      );

    default:
      return null;
  }
}

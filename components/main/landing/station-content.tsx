"use client";

import type { ContentBlock } from "@/lib/module-content";

import { Textarea } from "@/components/ui/textarea";
import { ClassificationCards } from "./classification-cards";
import { ComicPanels } from "./comic-panels";
import { ExplorationCards } from "./exploration-cards";
import { GlossaryFlowers } from "./glossary-flowers";
import { MatchingActivity } from "./matching-activity";
import { PlanetsGame } from "./planets-game";
import { QuizStation } from "./quiz-station";
import { WordSearch } from "./word-search";

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
      return (
        <p
          className={
            block.emphasis
              ? "font-sans text-lg font-bold text-gold"
              : "font-serif leading-relaxed text-sky/80"
          }
        >
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="rounded-2xl border-l-4 border-gold/50 bg-gold/5 px-5 py-4 font-serif text-lg italic text-cream">
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );

    case "heading":
      if (block.level === 3) {
        return (
          <h3 className="font-sans text-xl font-bold text-cream">{block.text}</h3>
        );
      }
      return (
        <h4 className="font-sans text-base font-bold text-gold">{block.text}</h4>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="list-decimal space-y-2 pl-6 font-serif text-sm leading-relaxed text-sky/80">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc space-y-2 pl-6 font-serif text-sm leading-relaxed text-sky/80">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "questions":
      return (
        <div className="space-y-4">
          {block.questions.map((q, i) => (
            <div key={q} className="space-y-2">
              <label
                htmlFor={`question-${i}`}
                className="flex gap-3 font-serif text-sm leading-relaxed text-cream"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 font-sans text-xs font-bold text-gold">
                  {i + 1}
                </span>
                {q}
              </label>
              <Textarea
                id={`question-${i}`}
                placeholder={block.placeholder ?? "Escribe tu respuesta aquí..."}
                rows={3}
                className="rounded-xl border-gold/20 bg-night-deep/50 font-serif text-cream placeholder:text-sky/40 focus-visible:border-gold/50 focus-visible:ring-gold/30"
              />
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-gold/15">
          {block.caption && (
            <p className="border-b border-gold/15 bg-gold/5 px-4 py-2 font-sans text-sm font-bold text-gold">
              {block.caption}
            </p>
          )}
          <table className="w-full min-w-120 text-left text-sm">
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
                  className="border-b border-gold/10 last:border-0"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 font-serif leading-relaxed text-sky/80"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "panels":
      return (
        <ComicPanels panels={block.panels} footer={block.footer} />
      );

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
        <div className="overflow-x-auto rounded-2xl border border-gold/15">
          <table className="w-full min-w-120 text-left text-sm">
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
                  className="border-b border-gold/10 last:border-0"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 font-serif text-sky/80"
                    >
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "gallery":
      return (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-white/5 p-8 text-center">
          <span className="text-5xl" role="img" aria-hidden>
            🖼️
          </span>
          <p className="mt-4 font-serif leading-relaxed text-sky/70">
            {block.description}
          </p>
          <p className="mt-4 text-sm font-bold text-gold">
            Próximamente: sube tu planeta aquí
          </p>
        </div>
      );

    default:
      return null;
  }
}

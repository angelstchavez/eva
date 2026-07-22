import type { ModuleId } from "@/lib/modules-config";

export type StationType =
  | "material"
  | "task"
  | "activity"
  | "exploration"
  | "reflection"
  | "game"
  | "quiz"
  | "wordsearch"
  | "project"
  | "gallery"
  | "bonus";

export type ContentBlock =
  | { type: "paragraph"; text: string; emphasis?: boolean }
  | { type: "quote"; text: string }
  | { type: "heading"; text: string; level?: 3 | 4 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "questions"; questions: string[]; placeholder?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | {
      type: "panels";
      panels: { label: string; text: string }[];
      footer?: string;
    }
  | {
      type: "exploration";
      items: { emoji: string; title: string; text: string }[];
    }
  | {
      type: "glossary";
      items: { emoji: string; term: string; definition: string }[];
    }
  | {
      type: "matching";
      pairs: { id: number; term: string; definition: string }[];
    }
  | {
      type: "quiz";
      questions: {
        question: string;
        options: { label: string; text: string }[];
        answer: string;
      }[];
    }
  | { type: "wordsearch"; words: string[] }
  | {
      type: "planets";
      items: {
        number: number;
        character: string;
        defect: string;
      }[];
      hint?: string;
    }
  | {
      type: "rubric";
      headers: string[];
      rows: string[][];
    }
  | { type: "gallery"; description: string }
  | { type: "classification"; items: { title: string; genre: string }[] }
  | { type: "pdf"; src: string; title?: string }
  | {
      type: "story";
      title?: string;
      slides: {
        image: string;
        alt: string;
        chapter: string;
        heading: string;
        text: string;
      }[];
    };

export type StationContent = {
  type: StationType;
  blocks: ContentBlock[];
};

export type ModuleContentMap = Record<ModuleId, StationContent[]>;

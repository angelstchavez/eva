import type { ModuleId } from "@/lib/modules-config";

import { MODULE_CONTENT_ES } from "./es";
import type { ModuleContentMap, StationContent } from "./types";

export type { ContentBlock, StationContent, StationType } from "./types";

const CONTENT_BY_LOCALE: Record<string, ModuleContentMap> = {
  es: MODULE_CONTENT_ES,
};

export function getModuleStations(
  moduleId: ModuleId,
  locale: string,
): StationContent[] {
  const content = CONTENT_BY_LOCALE[locale] ?? CONTENT_BY_LOCALE.es;
  return content[moduleId] ?? [];
}

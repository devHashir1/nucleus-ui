import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getComponentBySlug } from "@/lib/registry";

/**
 * Server-only helper: reads the real source file of a registry component
 * from disk at build/render time. Must not be imported from client components.
 */
export function getComponentSource(slug: string): string | null {
  const entry = getComponentBySlug(slug);
  if (!entry?.sourceFile) return null;

  try {
    return readFileSync(join(process.cwd(), entry.sourceFile), "utf8");
  } catch {
    return null;
  }
}

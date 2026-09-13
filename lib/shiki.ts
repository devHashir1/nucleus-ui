import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Server-only: get (and memoize) a shiki highlighter with the langs we need.
 * Returns pre-highlighted HTML so client bundles stay small.
 */
export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper"],
      langs: ["tsx", "typescript", "css", "bash"],
    });
  }
  const highlighter = await highlighterPromise;
  const lang = (
    ["tsx", "typescript", "css", "bash"].includes(language) ? language : "tsx"
  ) as BundledLanguage;

  return highlighter.codeToHtml(code, {
    lang,
    theme: "vesper",
  });
}

"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

/**
 * Renders pre-highlighted shiki HTML (generated server-side) with a
 * copy button that confirms with a "Copied!" state for ~1.5s.
 */
export function CodeBlock({
  code,
  html,
  language = "tsx",
  filename,
}: {
  code: string;
  /** Pre-highlighted HTML from shiki (server-rendered). */
  html?: string;
  language?: string;
  /** Shown in the header as the destination path (e.g. components/nucleus/nucleus-button.tsx). */
  filename?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="group/code relative overflow-hidden rounded-xl border border-border/70 bg-[#101010] text-[#f2f2f2]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="truncate font-mono text-xs text-zinc-400">
          {filename ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all duration-150 active:scale-95 ${
            copied
              ? "bg-primary/15 text-primary"
              : "text-zinc-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {html ? (
        <div
          className="nucleus-code overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:bg-transparent!"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono">{code}</code>
        </pre>
      )}
    </div>
  );
}

/** One-line copyable command (npm install …, npx shadcn add …). */
export function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/50 px-4 py-2.5">
      <code className="truncate font-mono text-sm">{command}</code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy command"}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all duration-150 active:scale-95 ${
          copied ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  language = "tsx",
  filename,
}: {
  code: string;
  language?: string;
  /** Shown in the header as the destination path (e.g. components/nucleus/nucleus-button.tsx). */
  filename?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="group/code relative overflow-hidden rounded-xl border border-border/70 bg-zinc-950 dark:bg-black">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="truncate font-mono text-xs text-zinc-400">
          {filename ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-zinc-100">{code}</code>
      </pre>
    </div>
  );
}

/** One-line copyable command (npm install …, npx shadcn add …). */
export function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        aria-label={copied ? "Copied" : "Copy command"}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

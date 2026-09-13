"use client";

import * as React from "react";

/**
 * Clipboard copy with a timed "copied" confirmation (default 1.5s).
 * Timer is cleaned up on unmount and on repeated copies.
 */
export function useCopy(confirmMs = 1500) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), confirmMs);
        return true;
      } catch (err) {
        // Clipboard API unavailable (insecure context / permissions) — surface in console.
        console.error("Failed to copy to clipboard:", err);
        return false;
      }
    },
    [confirmMs]
  );

  return { copied, copy };
}

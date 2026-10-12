"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NucleusAccordionItemData {
  /** Unique value used to identify the open item. */
  value: string;
  /** Row title. */
  title: string;
  /** Collapsed content. */
  content: React.ReactNode;
}

export interface NucleusAccordionProps {
  items: NucleusAccordionItemData[];
  /** Allow more than one item open at once. Default true. */
  multiple?: boolean;
  /** Value opened on first render. */
  defaultValue?: string;
  className?: string;
}

/**
 * Simple animated accordion. Items expand with spring physics and the
 * chevron rotates in place. Keyboard accessible with native buttons.
 */
export function NucleusAccordion({
  items,
  multiple = true,
  defaultValue,
  className,
}: NucleusAccordionProps) {
  const [open, setOpen] = React.useState<string[]>(
    defaultValue ? [defaultValue] : []
  );

  const toggle = (value: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(value);
      if (multiple) {
        return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
      }
      return isOpen ? [] : [value];
    });
  };

  return (
    <div
      data-slot="nucleus-accordion"
      className={cn("flex w-full flex-col", className)}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value} className="border-b border-border/70 last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`panel-${item.value}`}
              onClick={() => toggle(item.value)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground"
              >
                <ChevronDown className="size-3.5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`panel-${item.value}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

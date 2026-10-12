"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NucleusTabItem {
  /** Unique tab id. */
  value: string;
  /** Label shown in the tab strip. */
  label: string;
  /** Panel content. */
  content: React.ReactNode;
}

export interface NucleusTabsProps {
  items: NucleusTabItem[];
  /** Initially active tab id. Default: first item. */
  defaultValue?: string;
  className?: string;
}

/**
 * Tabs with a sliding underline indicator driven by Motion layout
 * animations. Keyboard accessible: native buttons + role attributes.
 */
export function NucleusTabs({ items, defaultValue, className }: NucleusTabsProps) {
  const active = defaultValue ?? items[0]?.value;
  const [selected, setSelected] = React.useState(active);
  const tabsId = React.useId();

  const current = items.find((t) => t.value === selected) ?? items[0];

  return (
    <div className={cn("flex w-full flex-col", className)} data-slot="nucleus-tabs">
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex items-center gap-1 border-b border-border/70"
      >
        {items.map((item) => {
          const isActive = item.value === selected;
          return (
            <button
              key={item.value}
              role="tab"
              id={`${tabsId}-tab-${item.value}`}
              aria-selected={isActive}
              aria-controls={`${tabsId}-panel-${item.value}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelected(item.value)}
              className={cn(
                "relative cursor-pointer px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId={`${tabsId}-underline`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tabsId}-panel-${current?.value}`}
        aria-labelledby={`${tabsId}-tab-${current?.value}`}
        className="pt-4 focus-visible:outline-none"
        tabIndex={0}
      >
        {current?.content}
      </div>
    </div>
  );
}

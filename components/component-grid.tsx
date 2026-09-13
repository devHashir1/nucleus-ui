"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Atom, SearchX, Search } from "lucide-react";
import { registry, type RegistryEntry } from "@/lib/registry";
import { NucleusBadge } from "@/components/nucleus/nucleus-badge";

/* ---------------- Loading skeleton ---------------- */

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="h-40 animate-pulse border-b border-border/60 bg-muted/50" />
      <div className="flex flex-col gap-2.5 p-5">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function ComponentGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ---------------- Card ---------------- */

function ComponentCard({ entry, index }: { entry: RegistryEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        href={`/components/${entry.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-[box-shadow,border-color] duration-200 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklch,var(--primary)_35%,transparent)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {/* live mini-preview */}
        <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-border/60 bg-muted/30 p-6">
          <div className="nucleus-grid-bg" />
          <div className="relative z-10 flex w-full items-center justify-center pointer-events-none">
            <entry.preview />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-sm font-semibold tracking-tight">
              {entry.name}
            </h3>
            {entry.status === "new" && <NucleusBadge>New</NucleusBadge>}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View component →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------------- Grid with search + categories ---------------- */

export function ComponentGrid() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");

  const categories = React.useMemo(
    () => ["All", ...new Set(registry.map((entry) => entry.category))],
    []
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return registry.filter((entry) => {
      const matchesCategory = category === "All" || entry.category === category;
      const haystack = `${entry.name} ${entry.description} ${entry.category}`.toLowerCase();
      return matchesCategory && (q === "" || haystack.includes(q));
    });
  }, [query, category]);

  return (
    <section id="components" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {registry.length} components
          </p>
        </div>

        {/* Search + category tabs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              aria-label="Search components"
              className="h-10 w-full rounded-xl border border-input bg-transparent pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-150 active:scale-95 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards / empty state */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((entry, i) => (
              <ComponentCard key={entry.slug} entry={entry} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/70 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
            {query ? (
              <SearchX className="size-5 text-muted-foreground" />
            ) : (
              <Atom className="size-5 text-muted-foreground" />
            )}
          </div>
          <h3 className="mt-4 font-semibold">No components found</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            {query ? (
              <>
                Nothing matches <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>.
                Try a different term or clear the filter.
              </>
            ) : (
              "No components in this category yet."
            )}
          </p>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition-all hover:border-primary/40 hover:bg-muted active:scale-95"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </section>
  );
}

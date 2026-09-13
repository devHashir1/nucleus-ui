"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { registry, type RegistryEntry } from "@/lib/registry";
import { Badge } from "@/components/nucleus/badge";

function ComponentCard({ entry, index }: { entry: RegistryEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/components/${entry.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-[box-shadow,border-color] duration-200 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklch,var(--primary)_35%,transparent)]"
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
            {entry.status === "new" && <Badge>New</Badge>}
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

export function ComponentGrid() {
  return (
    <section id="components" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {registry.length} building blocks — more on the way.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {registry.map((entry, i) => (
          <ComponentCard key={entry.slug} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}

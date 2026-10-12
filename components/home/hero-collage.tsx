"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Atom, Star, Zap } from "lucide-react";
import { NucleusSwitch } from "@/components/nucleus/nucleus-switch";
import { NucleusAvatarGroup, NucleusAvatar } from "@/components/nucleus/nucleus-avatar";
import { NucleusButton } from "@/components/nucleus/nucleus-button";

/**
 * Client island for the hero: floating component cards on spring
 * physics. Collapses to a static layout under prefers-reduced-motion.
 */
export function HeroCollage() {
  const reduce = useReducedMotion();

  const float = reduce
    ? {}
    : {
        animate: { y: [0, -8, 0] },
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const floatSlow = reduce
    ? {}
    : {
        animate: { y: [0, 7, 0] },
        transition: {
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="relative flex h-full min-h-[380px] w-full items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_260px_at_50%_40%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_70%)]"
      />

      {/* switch card */}
      <motion.div
        {...float}
        className="absolute left-0 top-10 w-56 sm:left-4 md:left-10"
      >
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-[0_12px_40px_-18px_color-mix(in_oklch,var(--primary)_50%,transparent)]">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Settings
          </p>
          <NucleusSwitch defaultChecked label="Autosave" hint="Every 2 minutes" />
        </div>
      </motion.div>

      {/* avatars card */}
      <motion.div
        {...floatSlow}
        className="absolute bottom-8 right-0 w-60 sm:right-4 md:right-10"
      >
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-[0_12px_40px_-18px_color-mix(in_oklch,var(--primary)_50%,transparent)]">
          <div className="flex items-center gap-3">
            <NucleusAvatarGroup max={3}>
              <NucleusAvatar name="Rania Moussa" size="md" />
              <NucleusAvatar name="Tom Brekke" size="md" />
              <NucleusAvatar name="June Park" size="md" />
              <NucleusAvatar name="Ada Figueroa" size="md" />
              <NucleusAvatar name="Ken Watanabe" size="md" />
            </NucleusAvatarGroup>
            <p className="text-xs font-medium text-muted-foreground">
              12 contributors
            </p>
          </div>
        </div>
      </motion.div>

      {/* central orbit */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="relative flex size-36 items-center justify-center rounded-[2rem] border border-primary/30 bg-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_-24px_color-mix(in_oklch,var(--primary)_60%,transparent)] sm:size-44">
          <Atom className="size-14 text-primary sm:size-16" strokeWidth={1.5} />
          <span className="absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-semibold shadow-sm">
            <Star className="size-3 text-primary" />
            MIT
          </span>
          <span className="absolute -bottom-3 -left-3 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-semibold shadow-sm">
            <Zap className="size-3 text-primary" />
            10 components
          </span>
        </div>
      </motion.div>

      <div className="absolute right-2 top-8 hidden md:block">
        <NucleusButton size="sm" variant="secondary">
          v0.1
        </NucleusButton>
      </div>
    </div>
  );
}

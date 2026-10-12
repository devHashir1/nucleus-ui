"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface StackCard {
  key: string;
  node: ReactNode;
}

/**
 * Card stacking: every card except the last pins at the viewport top
 * ("top top") and scales down + dims as the next card slides over it.
 * Under prefers-reduced-motion, renders a plain stacked list with no
 * pinning or transforms.
 */
export function StickyCards({
  cards,
  className,
}: {
  cards: StackCard[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const instanceId = useId().replace(/:/g, "");
  const cardClass = `stack-card-${instanceId}`;
  const innerClass = `stack-inner-${instanceId}`;

  useEffect(() => {
    if (reduce || !ref.current || cards.length <= 1) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(`.${cardClass}`);
      els.forEach((card, i) => {
        if (i === els.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: els[els.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
        const inner = card.querySelector(`.${innerClass}`);
        if (!inner) return;
        gsap.to(inner, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: els[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce, cards.length, cardClass, innerClass]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {cards.map((card, i) => (
        <div
          key={card.key}
          style={{ zIndex: i + 1 }}
          className={`${cardClass} relative flex min-h-[70vh] items-center justify-center py-6`}
        >
          <div
            className={`${innerClass} w-full will-change-transform ${reduce ? "" : "shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.35)]"}`}
          >
            {card.node}
          </div>
        </div>
      ))}
    </div>
  );
}

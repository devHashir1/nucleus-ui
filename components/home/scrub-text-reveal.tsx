"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbing text reveal: each word starts at opacity 0.1 and scrubs
 * to 1.0 sequentially as the user scrolls through the section.
 * Under prefers-reduced-motion, renders fully opaque static text.
 */
export function ScrubTextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;

    const ctx = gsap.context(() => {
      const words = ref.current!.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className={cn("max-w-[65ch] text-pretty leading-relaxed", className)}
    >
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}
          {"\u00A0"}
        </span>
      ))}
    </p>
  );
}

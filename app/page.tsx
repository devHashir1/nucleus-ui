import Link from "next/link";
import { ArrowRight, Star, Zap } from "lucide-react";
import { ComponentGrid } from "@/components/component-grid";
import { NucleusButton } from "@/components/nucleus/nucleus-button";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="nucleus-grid-bg" />
        <div className="nucleus-glow" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-24">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Zap className="size-3.5" />
            v0.1 — early days, moving fast
          </span>
          <h1 className="max-w-3xl text-balance text-4xl leading-[1.05] font-bold tracking-tighter sm:text-6xl sm:leading-[1.05]">
            The component library with a{" "}
            <span className="text-primary">positive charge</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            nucleusUI is an open-source collection of polished components built
            on top of shadcn/ui. Copy the code, own the component, ship faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#components">
              <NucleusButton size="lg" iconEnd={<ArrowRight />}>
                Browse components
              </NucleusButton>
            </Link>
            <a href="https://github.com/devHashir1/nucleus-ui" target="_blank" rel="noopener noreferrer">
              <NucleusButton size="lg" variant="outline"icon={<Star />}>Star on GitHub
              </NucleusButton>
            </a>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            npm install nucleus-ui · MIT licensed
          </p>
        </div>
      </section>

      {/* Registry-driven grid */}
      <ComponentGrid />
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Heart, Package, Sparkles, Star } from "lucide-react";
import { registry } from "@/lib/registry";
import { NucleusButton } from "@/components/nucleus/nucleus-button";
import { ComponentGrid } from "@/components/component-grid";
import { HeroCollage } from "@/components/home/hero-collage";

/* Component grid section: search, filters and card grid. */
function ComponentSection() {
  return <ComponentGrid />;
}
import { ScrubTextReveal } from "@/components/home/scrub-text-reveal";
import { StickyCards } from "@/components/home/sticky-cards";
import { NucleusAccordion } from "@/components/nucleus/nucleus-accordion";
import { NucleusTabs } from "@/components/nucleus/nucleus-tabs";
import { NucleusBadge } from "@/components/nucleus/nucleus-badge";
import { NucleusAvatar, NucleusAvatarGroup } from "@/components/nucleus/nucleus-avatar";

/* ---------------- AIDA: ATTENTION - cinematic center hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="nucleus-grid-bg" />
      <div className="nucleus-glow" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-24 pb-20 text-center sm:px-6 md:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          Open source, MIT licensed
        </div>

        {/* H1: max-w-5xl keeps this to 2 lines at desktop. Brand-gradient
            pill embedded as visual punctuation inside the headline. */}
        <h1 className="max-w-5xl text-wrap-balance text-4xl leading-[1.06] font-bold tracking-tighter sm:text-5xl md:text-6xl">
          The component library with a{" "}
          <span
            aria-hidden
            className="mx-1 inline-block h-9 w-20 rounded-full align-middle shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-6px_color-mix(in_oklch,var(--primary)_55%,transparent)] sm:h-11 sm:w-24 md:h-12 md:w-28"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, color-mix(in oklch, white 35%, transparent), transparent 60%), linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 65%, black))",
            }}
          />{" "}
          <span className="text-primary">positive charge</span>
        </h1>

        <p className="mt-6 max-w-[42ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          nucleusUI is polished shadcn/ui components you copy straight into
          your repo. Own the code, skip the dependency.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="#components">
            <NucleusButton size="lg" iconEnd={<ArrowRight />}>
              Browse components
            </NucleusButton>
          </Link>
          <a
            href="https://github.com/devHashir1/nucleus-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NucleusButton size="lg" variant="outline" icon={<Star />}>
              Star on GitHub
            </NucleusButton>
          </a>
        </div>

        <div
          aria-hidden
          className="mt-14 hidden w-full justify-center md:flex"
        >
          <div className="w-xl rounded-t-2xl border border-b-0 border-border/70 bg-card p-2 shadow-[0_-20px_60px_-30px_color-mix(in_oklch,var(--primary)_40%,transparent)]">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AIDA: INTEREST - desire copy, scrubbed on scroll ---------------- */

function Interest() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-32 sm:px-6 md:py-40">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Copy, own, ship
      </h2>
      <div className="mt-10">
        <ScrubTextReveal
          className="text-xl leading-relaxed text-foreground sm:text-2xl"
          text="Every component ships with its full source. You paste the file into your repo, rename what you want, delete what you don't, and nothing lives in node_modules waiting to break your next upgrade."
        />
      </div>
      <div className="mt-12 max-w-xl">
        <NucleusTabs
          items={[
            {
              value: "copy",
              label: "Copy",
              content: (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each detail page shows the exact file path and a one-click
                  copy of the full source. No CLI, no registry to configure.
                </p>
              ),
            },
            {
              value: "own",
              label: "Own",
              content: (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The code becomes yours the moment you paste it. Refactor it,
                  restyle it, evolve it with your product instead of against it.
                </p>
              ),
            },
            {
              value: "ship",
              label: "Ship",
              content: (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Standard shadcn tokens mean dark mode, focus rings and
                  keyboard access come free. Spend the saved hours on product.
                </p>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}

/* ---------------- AIDA: INTEREST - gapless bento (grid-flow-dense) ---------------- */

function Bento() {
  const entries = registry.filter((entry) =>
    ["switch", "tabs", "form", "avatar"].includes(entry.slug)
  );

  return (
    <section className="border-y border-border/60 bg-muted/20 py-32 md:py-40">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Fresh out of the reactor
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The newest components, rendered live in place.
        </p>

        {/* 4 tiles, 2-col grid: form=full row (2), switch=1, tabs=1.
            Total spans = 4 columns = no empty cells, grid-flow-dense
            guarantees interlock. */}
        <div className="mt-10 grid auto-rows-[minmax(200px,auto)] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2">
          {entries.map((entry, i) => {
            const Preview = entry.preview;
            const span = i === 0 ? "sm:col-span-2" : "";
            return (
              <Link
                key={entry.slug}
                href={`/components/${entry.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-[0_12px_40px_-18px_color-mix(in_oklch,var(--primary)_45%,transparent)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${span}`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 px-5 py-3">
                  <span className="font-mono text-sm font-semibold">{entry.name}</span>
                  {entry.status === "new" && <NucleusBadge>New</NucleusBadge>}
                </div>
                <div className="relative flex flex-1 items-center justify-center px-6 py-8">
                  <div className="nucleus-grid-bg" />
                  <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
                    <Preview />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{entry.description}</p>
                  <ArrowRight className="size-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- AIDA: DESIRE - GSAP card stacking ---------------- */

const stackCards = [
  {
    key: "grid",
    node: (
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-card p-8 sm:p-12">
        <p className="font-mono text-sm font-semibold text-primary">Components</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ten components, one design system
        </h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
          Buttons, inputs, forms, switches, tabs, accordions, avatars. Every
          piece shares the same violet accent, the same radii, the same motion
          physics. Use one or use them all.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {registry.map((e) => (
            <span
              key={e.slug}
              className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 font-mono text-xs"
            >
              {e.name.replace("Nucleus", "")}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "ownership",
    node: (
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-card p-8 sm:p-12">
        <p className="font-mono text-sm font-semibold text-primary">Ownership</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Your repo, your rules
        </h3>
        <div className="mt-6">
          <ScrubTextReveal
            className="text-base sm:text-lg"
            text="No lock-in, no version churn, no waiting for a maintainer to merge your edge case. The code is in your repository and follows your standards from day one."
          />
        </div>
      </div>
    ),
  },
  {
    key: "community",
    node: (
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-card p-8 sm:p-12">
        <p className="font-mono text-sm font-semibold text-primary">Community</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Built in the open
        </h3>
        <div className="mt-6 flex items-center gap-4">
          <NucleusAvatarGroup max={4}>
            <NucleusAvatar name="Rania Moussa" size="lg" />
            <NucleusAvatar name="Tom Brekke" size="lg" />
            <NucleusAvatar name="June Park" size="lg" />
            <NucleusAvatar name="Ada Figueroa" size="lg" />
            <NucleusAvatar name="Ken Watanabe" size="lg" />
          </NucleusAvatarGroup>
          <p className="text-sm text-muted-foreground">12 contributors and counting</p>
        </div>
      </div>
    ),
  },
];

function Desire() {
  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto mb-10 w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why copy from nucleus
        </h2>
      </div>
      <StickyCards cards={stackCards} />
    </section>
  );
}

/* ---------------- AIDA: ACTION - CTA + component grid + FAQ ---------------- */

function Action() {
  return (
    <>
      <section id="components" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-32 sm:px-6 md:pb-40">
        <ComponentSection />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-32 sm:px-6 md:pb-40">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions before you paste
          </h2>
          <div className="mt-8">
            <NucleusAccordion
              items={[
                {
                  value: "license",
                  title: "Is it really free?",
                  content:
                    "Yes. MIT licensed, forever. Copy every file, use it in commercial work, no attribution needed.",
                },
                {
                  value: "stack",
                  title: "What do I need installed?",
                  content:
                    "shadcn/ui plus Tailwind v4. Every component page lists exact npm installs and the CSS tokens to paste.",
                },
                {
                  value: "updates",
                  title: "How do I get updates?",
                  content:
                    "You don't need them. Components live in your repo once copied, so they evolve with your codebase instead of against it.",
                },
              ]}
              defaultValue="license"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-32 sm:px-6 md:pb-40">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/15 to-transparent px-6 py-16 text-center sm:px-12 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_220px_at_50%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_70%)]"
          />
          <div className="relative flex flex-col items-center">
            <h2 className="max-w-2xl text-wrap-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Stop styling buttons. Start shipping product.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every component is one click from your codebase. Which one do you
              need first?
            </p>
            <div className="mt-8">
              <Link href="#components">
                <NucleusButton size="lg" iconEnd={<ArrowRight />}>
                  Browse components
                </NucleusButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <Hero />
      <Interest />
      <Bento />
      <Desire />
      <Action />
    </main>
  );
}

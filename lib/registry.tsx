import type { ReactNode } from "react";
import { ArrowRight, Moon } from "lucide-react";
import { NucleusButton } from "@/components/nucleus/nucleus-button";
import { NucleusInput } from "@/components/nucleus/nucleus-input";
import { NucleusForm } from "@/components/nucleus/nucleus-form";
import { NucleusCard } from "@/components/nucleus/nucleus-card";
import { NucleusNavbar } from "@/components/nucleus/nucleus-navbar";
import { NucleusContainer } from "@/components/nucleus/nucleus-container";

export type ComponentCategory =
  | "Buttons"
  | "Inputs"
  | "Forms"
  | "Layout"
  | "Navigation";

export interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface RegistryEntry {
  /** URL slug — powers /components/[slug]. */
  slug: string;
  /** Display name. */
  name: string;
  /** Short marketing description shown on cards. */
  description: string;
  /** Grouping used for the category badge + filters. */
  category: ComponentCategory;
  /** Optional lifecycle badge. */
  status?: "new" | "stable";
  /** Live mini-preview rendered on cards and detail pages. */
  preview: () => ReactNode;
  /** Copyable usage snippet shown on the detail page. */
  code: string;
  /** Path to the component's real source file (read at render time for the source viewer). */
  sourceFile?: string;
  /** npm packages a consumer must install to use this component. */
  dependencies?: string[];
  /** Free-text prerequisite steps shown in the Installation section. */
  prerequisites?: string[];
  /** CSS variable blocks a consumer must add to globals.css (brand signatures, custom tokens). */
  cssVars?: string;
  /** Files whose full code is rendered under "Prerequisite — install this first" (shared custom files). Paths are resolved to code at render time. */
  prerequisiteFilePaths?: string[];
  /** Simple props documentation table. */
  props: PropRow[];
}

/** The shadcn primitives every project needs before copying nucleus components. */
export const basePrerequisites = [
  "shadcn/ui initialized (`npx shadcn@latest init`)",
  "Tailwind CSS v4 configured with the nucleusUI theme tokens",
];

/** npm packages shared by every nucleus component. */
export const baseDependencies = ["lucide-react", "clsx", "tailwind-merge"];

/**
 * Brand signature: the nucleusUI violet accent, expressed as standard shadcn
 * tokens. Without it, a fresh shadcn project renders these components zinc.
 */
export const themeCssVars = `:root {
  --primary: oklch(0.54 0.24 291);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.54 0.24 291);
  --accent: oklch(0.96 0.03 291);
  --accent-foreground: oklch(0.4 0.19 291);
}

.dark {
  --primary: oklch(0.68 0.21 291);
  --primary-foreground: oklch(0.145 0 0);
  --ring: oklch(0.68 0.21 291);
  --accent: oklch(0.26 0.06 291);
  --accent-foreground: oklch(0.87 0.09 291);
}`;

const navbarDemoLinks = [
  { label: "Docs", href: "#/docs" },
  { label: "Components", href: "#/components" },
  { label: "Pricing", href: "#/pricing" },
  { label: "Blog", href: "#/blog" },
];

export const registry: RegistryEntry[] = [
  {
    slug: "button",
    name: "NucleusButton",
    description:
      "A confident button with primary/secondary/outline/ghost variants, a built-in loading state and icon slots on either side.",
    category: "Buttons",
    status: "stable",
    preview: () => (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <NucleusButton size="sm">Primary</NucleusButton>
        <NucleusButton size="sm" variant="secondary">
          Secondary
        </NucleusButton>
        <NucleusButton size="sm" variant="outline" iconEnd={<ArrowRight />}>
          Outline
        </NucleusButton>
        <NucleusButton size="sm" variant="ghost">
          Ghost
        </NucleusButton>
        <NucleusButton size="sm" loading>
          Saving
        </NucleusButton>
      </div>
    ),
    code: `import { NucleusButton } from "@/components/nucleus/nucleus-button";
import { Rocket } from "lucide-react";

export function Example() {
  return (
    <div className="flex gap-3">
      <NucleusButton>Launch</NucleusButton>
      <NucleusButton variant="secondary">Plan</NucleusButton>
      <NucleusButton variant="outline" iconEnd={<Rocket />}>
        Outline
      </NucleusButton>
      <NucleusButton variant="ghost">Ghost</NucleusButton>
      <NucleusButton loading>Saving…</NucleusButton>
    </div>
  );
}`,
    sourceFile: "components/nucleus/nucleus-button.tsx",
    prerequisites: basePrerequisites,
    dependencies: baseDependencies,
    cssVars: themeCssVars,
    props: [
      {
        name: "variant",
        type: `"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
        defaultValue: `"primary"`,
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg" | "icon"`,
        defaultValue: `"md"`,
        description: "Controls height, padding and font size.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Shows a spinner, disables the button and swaps the icon slot.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Optional icon rendered before the label.",
      },
      {
        name: "iconEnd",
        type: "ReactNode",
        description: "Optional icon rendered after the label.",
      },
      {
        name: "...rest",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "All native button attributes are forwarded.",
      },
    ],
  },
  {
    slug: "input",
    name: "NucleusInput",
    description:
      "A text field that handles the boring parts for you — label wiring, helper text and a red error state with proper aria attributes.",
    category: "Inputs",
    status: "stable",
    preview: () => (
      <div className="flex w-full max-w-64 flex-col gap-3">
        <NucleusInput placeholder="Default" />
        <NucleusInput label="Email" type="email" placeholder="you@example.com" hint="We never share it." />
        <NucleusInput label="Workspace" placeholder="acme-inc" error="That handle is taken." />
      </div>
    ),
    code: `import { NucleusInput } from "@/components/nucleus/nucleus-input";

export function Example() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <NucleusInput placeholder="Default" />
      <NucleusInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        hint="We never share it."
      />
      <NucleusInput
        label="Workspace"
        placeholder="acme-inc"
        error="That handle is taken."
      />
    </div>
  );
}`,
    sourceFile: "components/nucleus/nucleus-input.tsx",
    prerequisites: [
      ...basePrerequisites,
      "shadcn Input + Label (`npx shadcn@latest add input label`)",
    ],
    dependencies: baseDependencies,
    cssVars: themeCssVars,
    props: [
      { name: "label", type: "string", description: "Optional label rendered above the field." },
      { name: "hint", type: "string", description: "Helper text shown below the field." },
      {
        name: "error",
        type: "string",
        description: "Error message — switches the field into its error state and sets aria-invalid.",
      },
      {
        name: "...rest",
        type: "InputHTMLAttributes<HTMLInputElement>",
        description: "All native input attributes are forwarded.",
      },
    ],
  },
  {
    slug: "form",
    name: "NucleusForm",
    description:
      "An opinionated sign-up form (name + email) wired with react-hook-form and zod validation, composed from Nucleus primitives.",
    category: "Forms",
    status: "new",
    preview: () => <NucleusForm />,
    code: `import { NucleusForm } from "@/components/nucleus/nucleus-form";

export function Example() {
  return (
    <NucleusForm
      onSubmit={(values) => {
        console.log(values); // { name: string, email: string }
      }}
    />
  );
}`,
    sourceFile: "components/nucleus/nucleus-form.tsx",
    prerequisites: [
      ...basePrerequisites,
      "shadcn Input + Label (`npx shadcn@latest add input label`)",
    ],
    dependencies: [
      ...baseDependencies,
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    cssVars: themeCssVars,
    props: [
      {
        name: "onSubmit",
        type: "(values: { name: string; email: string }) => void | Promise<void>",
        description: "Called with validated values on successful submit.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes for the form element.",
      },
    ],
  },
  {
    slug: "card",
    name: "NucleusCard",
    description:
      "A content card with header/content/footer slots, an optional flush image slot and a hoverLift interaction variant that floats the card on a violet glow.",
    category: "Layout",
    status: "new",
    preview: () => (
      <NucleusCard
        title="Atomic structure"
        description="Everything orbits neatly."
        hoverLift
        footer={
          <span className="text-xs text-muted-foreground">Updated 2h ago</span>
        }
      >
        <p className="text-sm">
          Cards keep related content together — with slots for exactly the
          parts you need.
        </p>
      </NucleusCard>
    ),
    code: `import { NucleusCard } from "@/components/nucleus/nucleus-card";

export function Example() {
  return (
    <NucleusCard
      title="Atomic structure"
      description="Everything orbits neatly."
      image={<img src="/cover.png" alt="" className="aspect-[3/1] w-full object-cover" />}
      hoverLift
      footer={<span className="text-xs text-muted-foreground">Updated 2h ago</span>}
    >
      <p>Card body goes here.</p>
    </NucleusCard>
  );
}`,
    sourceFile: "components/nucleus/nucleus-card.tsx",
    prerequisites: [
      ...basePrerequisites,
      "shadcn Card (`npx shadcn@latest add card`)",
    ],
    dependencies: baseDependencies,
    cssVars: themeCssVars,
    props: [
      { name: "title", type: "ReactNode", description: "Card title rendered in the header." },
      { name: "description", type: "ReactNode", description: "Muted subtitle under the title." },
      { name: "image", type: "ReactNode", description: "Optional image slot, rendered flush at the top." },
      { name: "hoverLift", type: "boolean", defaultValue: "false", description: "Lifts the card with an accent shadow on hover." },
      { name: "footer", type: "ReactNode", description: "Footer slot for actions or meta info." },
      { name: "className", type: "string", description: "Extra classes for the root card element." },
    ],
  },
  {
    slug: "navbar",
    name: "NucleusNavbar",
    description:
      "A responsive navbar — horizontal links on desktop, hamburger + slide-out panel on mobile, with logo and CTA slots.",
    category: "Navigation",
    status: "new",
    preview: () => (
      <div className="w-full overflow-hidden rounded-xl border border-border/70">
        <NucleusNavbar
          className="relative"
          logo={
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"><Moon className="size-3.5" /></span>
              orbit
            </span>
          }
          links={navbarDemoLinks}
          cta={<NucleusButton size="sm">Sign up</NucleusButton>}
        />
      </div>
    ),
    code: `import { NucleusNavbar } from "@/components/nucleus/nucleus-navbar";
import { NucleusButton } from "@/components/nucleus/nucleus-button";
import { Atom } from "lucide-react";

export function Example() {
  return (
    <NucleusNavbar
      logo={
        <span className="flex items-center gap-2 font-semibold">
          <Atom className="size-5 text-primary" />
          orbit
        </span>
      }
      links={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/components" },
        { label: "Blog", href: "/blog" },
      ]}
      cta={<NucleusButton size="sm">Sign up</NucleusButton>}
    />
  );
}`,
    sourceFile: "components/nucleus/nucleus-navbar.tsx",
    prerequisites: basePrerequisites,
    dependencies: baseDependencies,
    cssVars: themeCssVars,
    prerequisiteFilePaths: ["components/nucleus/nucleus-button.tsx"],
    props: [
      { name: "logo", type: "ReactNode", description: "Logo slot — typically an icon + wordmark." },
      { name: "links", type: "{ label: string; href: string }[]", defaultValue: "[]", description: "Links rendered inline on desktop, in the slide-out on mobile." },
      { name: "cta", type: "ReactNode", description: "Call-to-action button rendered at the end." },
      { name: "actions", type: "ReactNode", description: "Secondary desktop-only actions next to the CTA." },
      { name: "className", type: "string", description: "Extra classes for the header element." },
    ],
  },
  {
    slug: "container",
    name: "NucleusContainer / NucleusSection",
    description:
      "The boring-but-essential layout primitives: consistent max-width, gutters and vertical rhythm so every page breathes the same.",
    category: "Layout",
    status: "new",
    preview: () => (
      <div className="flex w-full flex-col items-stretch gap-2">
        <NucleusContainer size="sm" className="rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-center font-mono text-xs">
          size=&quot;sm&quot;
        </NucleusContainer>
        <NucleusContainer size="md" className="rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-center font-mono text-xs">
          size=&quot;md&quot;
        </NucleusContainer>
        <NucleusContainer size="lg" className="rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-center font-mono text-xs">
          size=&quot;lg&quot; · default
        </NucleusContainer>
      </div>
    ),
    code: `import { NucleusContainer } from "@/components/nucleus/nucleus-container";

export function Example() {
  return (
    <NucleusSection spacing="lg">
      <NucleusContainer size="md">
        <h1>Consistent width and rhythm</h1>
        <p>Container handles gutters + max-width, Section handles vertical padding.</p>
      </NucleusContainer>
    </NucleusSection>
  );
}`,
    sourceFile: "components/nucleus/nucleus-container.tsx",
    prerequisites: basePrerequisites,
    dependencies: baseDependencies,
    cssVars: themeCssVars,
    props: [
      { name: "size", type: `"sm" | "md" | "lg" | "full"`, defaultValue: `"lg"`, description: "Container max-width scale." },
      { name: "center", type: "boolean", defaultValue: "true", description: "Center the container horizontally." },
      { name: "spacing", type: `"none" | "sm" | "md" | "lg"`, defaultValue: `"md"`, description: "Section vertical padding scale. (NucleusSection only)" },
      { name: "className", type: "string", description: "Extra classes for the root element." },
    ],
  },
];

export function getComponentBySlug(slug: string): RegistryEntry | undefined {
  return registry.find((entry) => entry.slug === slug);
}

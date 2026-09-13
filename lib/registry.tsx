import type { ReactNode } from "react";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import { NucleusButton } from "@/components/nucleus/nucleus-button";
import { NucleusInput } from "@/components/nucleus/nucleus-input";
import { NucleusForm } from "@/components/nucleus/nucleus-form";

export type ComponentCategory = "Buttons" | "Inputs" | "Forms";

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
  /** Files whose full code is rendered under "Prerequisite — install this first" (shared custom files). */
  prerequisiteFiles?: { path: string; code: string }[];
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
];

export function getComponentBySlug(slug: string): RegistryEntry | undefined {
  return registry.find((entry) => entry.slug === slug);
}

export const categories: ComponentCategory[] = [
  ...new Set(registry.map((entry) => entry.category)),
];

export const registryIcons = { Rocket, Sparkles };

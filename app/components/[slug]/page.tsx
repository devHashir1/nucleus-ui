import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { registry, getComponentBySlug } from "@/lib/registry";
import { getComponentSource, readProjectFile } from "@/lib/source";
import { CodeBlock, CommandBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { Badge } from "@/components/nucleus/badge";

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComponentBySlug(slug);
  if (!entry) return { title: "Not found" };
  return { title: entry.name, description: entry.description };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </h2>
  );
}

export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const entry = getComponentBySlug(slug);
  if (!entry) notFound();

  const source = getComponentSource(slug);
  const Preview = entry.preview;

  const deps = entry.dependencies ?? [];
  const installCmd = deps.length > 0 ? `npm install ${deps.join(" ")}` : null;
  const destination = entry.sourceFile ?? `components/nucleus/${entry.slug}.tsx`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/#components"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All components
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-3xl font-bold tracking-tight">{entry.name}</h1>
        <Badge>{entry.category}</Badge>
        {entry.status === "new" && <Badge>New</Badge>}
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {entry.description}
      </p>

      {/* Live preview */}
      <section className="mt-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-muted/20 p-8">
          <div className="nucleus-grid-bg" />
          <div className="relative z-10 flex w-full items-center justify-center">
            <Preview />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mt-10">
        <SectionTitle>Installation</SectionTitle>
        <ol className="mb-4 flex flex-col gap-3 text-sm text-muted-foreground">
          {entry.prerequisites?.map((step, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        {installCmd && <CommandBlock command={installCmd} />}
      </section>

      {/* Full code of shared prerequisite files, if any */}
      {entry.prerequisiteFilePaths?.map((path) => {
        const code = readProjectFile(path);
        if (!code) return null;
        return (
          <section key={path} className="mt-10">
            <SectionTitle>Prerequisite — install this first</SectionTitle>
            <p className="mb-3 text-sm text-muted-foreground">
              The usage example depends on <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">{path}</code>.
              Copy it into your project before copying the main component.
            </p>
            <CodeBlock code={code} filename={path} />
          </section>
        );
      })}

      {/* Brand CSS variables the component needs in globals.css */}
      {entry.cssVars && (
        <section className="mt-10">
          <SectionTitle>Add to your globals.css</SectionTitle>
          <p className="mb-3 text-sm text-muted-foreground">
            The nucleusUI accent lives in these CSS variables — without them the
            component falls back to the default shadcn zinc theme.
          </p>
          <CodeBlock code={entry.cssVars} language="css" filename="app/globals.css" />
        </section>
      )}

      {/* Usage */}
      <section className="mt-10">
        <SectionTitle>Usage</SectionTitle>
        <CodeBlock code={entry.code} />
      </section>

      {/* Real source, read from disk at render time */}
      {source && (
        <section className="mt-10">
          <SectionTitle>Source</SectionTitle>
          <p className="mb-3 text-sm text-muted-foreground">
            Copy this file into <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">{destination}</code> in
            your project — it&apos;s yours to own and modify.
          </p>
          <CodeBlock code={source} filename={destination} />
        </section>
      )}

      {/* Props */}
      <section className="mt-10">
        <SectionTitle>Props</SectionTitle>
        <PropsTable rows={entry.props} />
      </section>
    </div>
  );
}

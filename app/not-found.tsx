import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { NucleusButton } from "@/components/nucleus/nucleus-button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="nucleus-grid-bg" />
      <div className="nucleus-glow" />
      <div className="relative flex flex-col items-center">
        <p className="font-mono text-7xl font-bold tracking-tighter text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          This particle doesn&apos;t exist
        </h1>
        <p className="mt-3 max-w-md text-balance leading-relaxed text-muted-foreground">
          The page you&apos;re looking for drifted out of orbit. Try heading
          back to the component gallery.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <NucleusButton icon={<Home />}>Back home</NucleusButton>
          </Link>
          <Link href="/#components">
            <NucleusButton variant="outline" icon={<Compass />}>
              Browse components
            </NucleusButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Atom } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Atom className="size-4" />
          </span>
          nucleus<span className="text-primary">UI</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/#components"
            className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <a
            href="https://github.com/devHashir1/nucleus-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

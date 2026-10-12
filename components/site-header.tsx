import Link from "next/link";
import { Atom, Star } from "lucide-react";
import { registry } from "@/lib/registry";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="relative flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Atom className="size-4" />
          </span>
          nucleus<span className="text-primary">UI</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#components"
            className="nucleus-navlink rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <a
            href="https://github.com/devHashir1/nucleus-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="nucleus-navlink flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
            <span className="hidden items-center gap-1 rounded-full border border-border/70 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
              <Star className="size-2.5" />
              star
            </span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

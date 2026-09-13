"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NucleusNavLink {
  label: string;
  href: string;
}

export interface NucleusNavbarProps extends React.ComponentProps<"header"> {
  /** Logo slot — typically an icon + wordmark. */
  logo?: React.ReactNode;
  /** Links shown inline on desktop and inside the slide-out on mobile. */
  links?: NucleusNavLink[];
  /** Call-to-action button rendered at the end (e.g. <NucleusButton>Sign up</NucleusButton>). */
  cta?: React.ReactNode;
  /** Optional secondary actions rendered next to the CTA on desktop. */
  actions?: React.ReactNode;
}

/**
 * Responsive navbar: horizontal links on md+, hamburger + slide-out
 * panel below md. Uses only standard shadcn tokens; works in light
 * and dark mode.
 */
export function NucleusNavbar({
  className,
  logo,
  links = [],
  cta,
  actions,
  ...props
}: NucleusNavbarProps) {
  const [open, setOpen] = React.useState(false);

  // Close the mobile menu on Escape
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-slot="nucleus-navbar"
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          {logo}
          {/* Desktop links */}
          {links.length > 0 && (
            <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
              {links.map((link, i) => (
                <a
                  key={`${link.label}-${link.href}-${i}`}
                  href={link.href}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions && <div className="hidden items-center gap-2 md:flex">{actions}</div>}
          {cta && <div className="hidden md:block">{cta}</div>}
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-out panel */}
      <div
        className={cn(
          "overflow-hidden border-border/60 transition-[max-height,opacity] duration-200 ease-out md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3 sm:px-6">
          {links.map((link, i) => (
            <a
              key={`${link.label}-${link.href}-${i}`}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          {(cta || actions) && (
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3 md:hidden">
              {actions}
              {cta}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

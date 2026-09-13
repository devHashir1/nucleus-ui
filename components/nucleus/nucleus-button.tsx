"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type Size = "sm" | "md" | "lg" | "icon";

export interface NucleusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  variant?: Variant;
  /** Control the height / padding. */
  size?: Size;
  /** Shows a spinner and disables interaction when true. */
  loading?: boolean;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Optional icon rendered after the label. */
  iconEnd?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95",
  secondary:
    "bg-secondary text-secondary-foreground border border-border/60 hover:bg-secondary/70",
  outline:
    "border border-border bg-transparent hover:bg-muted hover:border-primary/40",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive text-white shadow-sm hover:bg-destructive/90",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-xl px-6 text-base",
  icon: "size-10 rounded-xl",
};

export const NucleusButton = React.forwardRef<HTMLButtonElement, NucleusButtonProps>(
  function NucleusButton(
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconEnd,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        data-slot="nucleus-button"
        data-variant={variant}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap transition-all duration-150 select-none",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-55 active:translate-y-px",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          icon
        )}
        {children}
        {!loading && iconEnd}
      </button>
    );
  }
);

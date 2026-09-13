import * as React from "react";
import { cn } from "@/lib/utils";

export interface NucleusContainerProps extends React.ComponentProps<"div"> {
  /** Max content width. */
  size?: "sm" | "md" | "lg" | "full";
  /** Center the container horizontally (default true). */
  center?: boolean;
}

const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-none",
} as const;

/**
 * Horizontal layout primitive — enforces a consistent max-width,
 * responsive gutters and optional centering.
 */
export function NucleusContainer({
  className,
  size = "lg",
  center = true,
  ...props
}: NucleusContainerProps) {
  return (
    <div
      data-slot="nucleus-container"
      className={cn("w-full px-4 sm:px-6", center && "mx-auto", containerSizes[size], className)}
      {...props}
    />
  );
}

export interface NucleusSectionProps extends React.ComponentProps<"section"> {
  /** Vertical padding scale. */
  spacing?: "none" | "sm" | "md" | "lg";
}

const sectionSpacing = {
  none: "py-0",
  sm: "py-8 sm:py-10",
  md: "py-12 sm:py-16",
  lg: "py-20 sm:py-28",
} as const;

/**
 * Vertical layout primitive — consistent section rhythm,
 * wraps content in a NucleusContainer by default.
 */
export function NucleusSection({
  className,
  spacing = "md",
  children,
  ...props
}: NucleusSectionProps) {
  return (
    <section
      data-slot="nucleus-section"
      className={cn(sectionSpacing[spacing], className)}
      {...props}
    >
      <NucleusContainer>{children}</NucleusContainer>
    </section>
  );
}

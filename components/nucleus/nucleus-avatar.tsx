"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NucleusAvatarProps extends React.ComponentProps<"span"> {
  /** Image URL. Falls back to initials when missing or broken. */
  src?: string;
  /** Alt text for the image (ignored when rendering initials). */
  alt?: string;
  /** Name used to derive initials (first letters of the first two words). */
  name: string;
  /** Visual size. */
  size?: "sm" | "md" | "lg";
  /** Adds a 2px violet ring. */
  ring?: boolean;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

/** Deterministic fallback hue from the name, so each person keeps their color. */
function hueFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/**
 * Avatar with graceful fallback: shows initials on a stable pastel
 * background when no image is provided (or the image fails to load).
 */
export function NucleusAvatar({
  src,
  alt,
  name,
  size = "md",
  ring = false,
  className,
  ...props
}: NucleusAvatarProps) {
  const [broken, setBroken] = React.useState(false);
  const showImage = Boolean(src) && !broken;
  const hue = hueFromName(name);

  return (
    <span
      data-slot="nucleus-avatar"
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-semibold text-foreground",
        sizeClasses[size],
        ring && "ring-2 ring-ring/60",
        className
      )}
      style={
        showImage
          ? undefined
          : {
              backgroundColor: `oklch(0.85 0.09 ${hue})`,
              color: `oklch(0.35 0.12 ${hue})`,
            }
      }
      {...props}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? name}
          onError={() => setBroken(true)}
          className="size-full object-cover"
        />
      ) : (
        initialsOf(name)
      )}
    </span>
  );
}

/** Horizontally overlapping row of avatars, capped with a "+n" chip. */
export function NucleusAvatarGroup({
  max = 4,
  className,
  children,
  ...rest
}: React.ComponentProps<"div"> & {
  /** Visible avatars before the overflow chip appears. */
  max?: number;
  className?: string;
}) {
  const list = React.Children.toArray(children) as React.ReactElement[];
  const visible = list.slice(0, max);
  const overflow = list.length - visible.length;

  return (
    <div
      data-slot="nucleus-avatar-group"
      className={cn("flex -space-x-2.5", className)}
      {...rest}
    >
      {visible}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border bg-muted font-semibold text-foreground",
            sizeClasses.md
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

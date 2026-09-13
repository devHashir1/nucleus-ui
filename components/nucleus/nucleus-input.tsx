"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface NucleusInputProps extends React.ComponentProps<"input"> {
  /** Optional label rendered above the field. */
  label?: string;
  /** Helper text shown below the field. */
  hint?: string;
  /** Error message — switches the field into its error state. */
  error?: string;
}

export const NucleusInput = React.forwardRef<HTMLInputElement, NucleusInputProps>(
  function NucleusInput({ className, label, hint, error, id, ...props }, ref) {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex w-full flex-col gap-1.5" data-slot="nucleus-input">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 rounded-xl px-3.5 transition-shadow",
            error &&
              "border-destructive aria-invalid:border-destructive focus-visible:ring-destructive/25",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

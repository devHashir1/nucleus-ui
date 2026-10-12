"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NucleusSwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Fires with the next checked value. */
  onCheckedChange?: (checked: boolean) => void;
  /** Label rendered beside the track. */
  label?: string;
  /** Helper text rendered under the label. */
  hint?: string;
}

/**
 * Accessible toggle switch. Renders a real <button role="switch"> so it
 * works with keyboard and screen readers out of the box.
 */
export const NucleusSwitch = React.forwardRef<HTMLButtonElement, NucleusSwitchProps>(
  function NucleusSwitch(
    {
      className,
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      label,
      hint,
      id,
      disabled,
      ...props
    },
    ref
  ) {
    const autoId = React.useId();
    const switchId = id ?? autoId;
    const [internal, setInternal] = React.useState(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internal;

    const toggle = () => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternal(next);
      onCheckedChange?.(next);
    };

    return (
      <div className="flex items-center gap-3" data-slot="nucleus-switch">
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={props["aria-label"] ?? (label ? undefined : "Toggle")}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border/60 transition-colors duration-200 select-none",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-55",
            checked
              ? "bg-primary shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
              : "bg-muted",
            className
          )}
          {...props}
        >
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-1 flex size-4 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-200",
              checked && "translate-x-5"
            )}
          />
        </button>
        {(label || hint) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={switchId}
                className="cursor-pointer text-sm font-medium leading-5"
                onClick={toggle}
              >
                {label}
              </label>
            )}
            {hint && (
              <p className="text-xs text-muted-foreground">{hint}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

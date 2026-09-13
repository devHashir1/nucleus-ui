"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/*
 * NucleusButton and NucleusInput are inlined below (rather than imported
 * from sibling files) so this single file is fully self-contained:
 * copy it into a fresh shadcn project and it works.
 */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface NucleusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
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

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-xl px-6 text-base",
  icon: "size-10 rounded-xl",
};

function NucleusButton({
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
}: NucleusButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      data-slot="nucleus-button"
      data-variant={variant}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap transition-all duration-150 select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-55 active:translate-y-px",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : icon}
      {children}
      {!loading && iconEnd}
    </button>
  );
}

interface NucleusInputProps extends React.ComponentProps<"input"> {
  label?: string;
  hint?: string;
  error?: string;
}

const NucleusInput = React.forwardRef<HTMLInputElement, NucleusInputProps>(
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

export interface NucleusFormProps {
  /** Called with validated values on successful submit. */
  onSubmit?: (values: FormValues) => void | Promise<void>;
  className?: string;
}

/**
 * Example form (name + email) built with react-hook-form + zod,
 * composed from inlined NucleusInput and NucleusButton.
 */
export function NucleusForm({ onSubmit, className }: NucleusFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  return (
    <form
      data-slot="nucleus-form"
      className={cn("flex w-full max-w-sm flex-col gap-4", className)}
      onSubmit={handleSubmit(async (values) => {
        await onSubmit?.(values);
        setSubmitted(true);
        reset();
      })}
      noValidate
    >
      <NucleusInput
        label="Name"
        placeholder="Ada Lovelace"
        error={errors.name?.message}
        {...register("name")}
      />
      <NucleusInput
        label="Email"
        type="email"
        placeholder="ada@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="flex items-center gap-3">
        <NucleusButton type="submit" loading={isSubmitting}>
          Subscribe
        </NucleusButton>
        {submitted && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary" aria-hidden />
            Thanks! You&apos;re on the list.
          </span>
        )}
      </div>
    </form>
  );
}

export { formSchema as nucleusFormSchema };

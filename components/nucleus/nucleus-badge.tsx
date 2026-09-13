import { cn } from "@/lib/utils";

export function NucleusBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="nucleus-badge"
      className={cn(
        "inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary uppercase",
        className
      )}
      {...props}
    />
  );
}

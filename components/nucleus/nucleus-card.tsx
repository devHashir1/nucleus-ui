import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface NucleusCardProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Card title (rendered in the header). */
  title?: React.ReactNode;
  /** Muted subtitle rendered under the title. */
  description?: React.ReactNode;
  /** Optional image slot — rendered flush at the top of the card. */
  image?: React.ReactNode;
  /** Adds a subtle lift + accent shadow on hover. */
  hoverLift?: boolean;
  /** Content rendered between header and footer. */
  children?: React.ReactNode;
  /** Footer slot — ideal for actions or meta info. */
  footer?: React.ReactNode;
}

export function NucleusCard({
  className,
  title,
  description,
  image,
  hoverLift = false,
  children,
  footer,
  ...props
}: NucleusCardProps) {
  return (
    <Card
      data-slot="nucleus-card"
      className={cn(
        hoverLift &&
          "transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_color-mix(in_oklch,var(--primary)_45%,transparent)]",
        className
      )}
      {...props}
    >
      {image}
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

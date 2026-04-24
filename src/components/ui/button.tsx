import { cn } from "@/lib/utils";
import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "accent";

const variantClass: Record<ButtonVariant, string> = {
  primary: "aa-btn-primary",
  secondary: "aa-btn-secondary",
  accent: "aa-btn-accent",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

/**
 * Site button scale: primary (blue), secondary (outline), accent (emerald).
 * For light-on-dark surfaces use global class `aa-btn-inverse` instead.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(variantClass[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

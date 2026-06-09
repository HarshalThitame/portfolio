import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyanflare/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-ink shadow-[0_0_38px_rgba(248,251,255,0.12)] hover:bg-white/90",
        secondary: "border border-white/10 bg-white/[0.055] text-pearl hover:border-white/20 hover:bg-white/[0.085]",
        ghost: "text-frost/75 hover:bg-white/[0.06] hover:text-white",
        destructive: "border border-red-400/20 bg-red-500/10 text-red-100 hover:bg-red-500/16",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "min-h-9 rounded-lg px-3 py-2 text-xs",
        lg: "min-h-12 px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };

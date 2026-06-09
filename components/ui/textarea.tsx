import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3 text-sm leading-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition placeholder:text-frost/32 focus:border-cyanflare/45 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyanflare/10",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Yellow marker-style highlight for key phrases. */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("marker", className)}>{children}</span>;
}

/** Skewed yellow block highlight (hero / emergency headline style). */
export function SkewHighlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span aria-hidden className="absolute inset-0 -skew-x-6 rounded-lg bg-brand" />
      <span className="relative block px-3 sm:px-4">{children}</span>
    </span>
  );
}

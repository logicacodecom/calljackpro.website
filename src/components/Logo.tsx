import Link from "next/link";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark — no padlock, house or key symbol, by design.
 * A subtle yellow swoosh underlines the name.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${business.name} — home`}
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-heading whitespace-nowrap text-ink",
          compact ? "text-[1.6rem]" : "text-[1.75rem] lg:text-[2.1rem]",
        )}
        style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        Call Jack Pro
      </span>
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="-mt-0.5 h-2 w-[92%] self-center"
        aria-hidden
        focusable="false"
      >
        <path d="M4 9C60 2 140 1 196 5" stroke="#FFCC00" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
    </Link>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** "—— Our Services ——" style heading with yellow rules, as in the mockup. */
export function SectionHeading({
  id,
  title,
  subtitle,
  as: Tag = "h2",
  className,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-center gap-4 sm:gap-6">
        <span aria-hidden className="h-[3px] flex-1 rounded-full bg-brand" />
        <Tag id={id} className="font-heading text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </Tag>
        <span aria-hidden className="h-[3px] flex-1 rounded-full bg-brand" />
      </div>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base italic text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}

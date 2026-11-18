import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/services";
import { ServiceIcon } from "@/components/icons/BrandIcons";

export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Link
      href={service.href}
      className="group flex h-full flex-col items-center rounded-[var(--radius-card)] border-2 border-ink/80 bg-paper px-4 pt-6 pb-5 text-center transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-1 hover:border-ink hover:shadow-[0_6px_0_0_#FFCC00,0_6px_0_2px_#111] focus-visible:-translate-y-1"
    >
      <ServiceIcon name={service.icon} className="size-16 sm:size-20" />
      <H className="mt-3 font-display text-xl font-bold leading-tight sm:text-2xl">
        <span className="block">{service.cardTitle[0]}</span>
        <span className="block">{service.cardTitle[1]}</span>
      </H>
      <p className="mt-2 text-[0.95rem] leading-snug text-ink/85">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold underline decoration-brand decoration-2 underline-offset-4">
        Learn more
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        <span className="sr-only"> about {service.title}</span>
      </span>
    </Link>
  );
}

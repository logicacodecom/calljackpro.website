import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/config/services";
import { ServiceIcon } from "@/components/icons/BrandIcons";
import { CallButton, HelpButton } from "@/components/PrimaryCTA";

/** A full service block: icon, intro, checklist and the right CTA for the job type. */
export function ServiceDetail({ service, moreLink }: { service: Service; moreLink?: { href: string; label: string } }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="grid gap-5 rounded-[var(--radius-card)] border-2 border-ink/80 bg-paper p-5 sm:p-8 md:grid-cols-[auto_1fr]"
    >
      <ServiceIcon name={service.icon} className="size-16 sm:size-20" />
      <div>
        <h2 id={`${service.id}-title`} className="font-heading text-2xl sm:text-3xl">
          {service.title}
        </h2>
        <p className="mt-2 text-lg">{service.intro}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 rounded bg-brand p-0.5" strokeWidth={3.5} />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {service.emergency ? (
            <CallButton size="md" />
          ) : (
            <HelpButton label="Request a Visit" size="md" />
          )}
          {moreLink && (
            <Link href={moreLink.href} className="inline-flex min-h-11 items-center gap-1 font-bold underline decoration-brand decoration-2 underline-offset-4">
              {moreLink.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

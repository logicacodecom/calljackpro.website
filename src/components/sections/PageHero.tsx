import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/** Compact hero for interior pages, same visual language as the homepage. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-12 lg:px-8">
        <div>
          {eyebrow && <p className="font-heading text-sm uppercase tracking-wide text-ink/80">{eyebrow}</p>}
          <h1 className="mt-1 font-heading text-[2.4rem] leading-[1] sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <div className="mt-4 max-w-xl text-lg sm:text-xl">{lead}</div>}
          {actions && <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="mx-auto h-auto w-full max-w-xl"
            priority
          />
        )}
      </div>
    </section>
  );
}

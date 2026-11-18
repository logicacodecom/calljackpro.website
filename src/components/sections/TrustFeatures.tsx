import Image from "next/image";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { ClockIcon, FastTruckIcon, VanLockIcon } from "@/components/icons/BrandIcons";
import jackFace from "../../../public/images/jack-face.webp";

type Feature = { title: string; text: string; icon: ReactNode };

export function TrustFeatures() {
  const features: Feature[] = [
    {
      title: business.hours.lockout247 ? "24/7 Response" : "Fast Response",
      text: business.hours.lockout247 ? "Get help anytime, day or night." : "Call us and we'll help right away.",
      icon: <ClockIcon className="size-12 sm:size-14" />,
    },
    {
      title: "Fast Arrival",
      text: "We respond promptly and help coordinate service.",
      icon: <FastTruckIcon className="h-12 w-16 sm:h-14 sm:w-[4.5rem]" />,
    },
    {
      title: "Friendly Technician",
      text: "A skilled, courteous professional you can trust.",
      icon: <Image src={jackFace} alt="" className="size-12 object-contain sm:size-14" sizes="56px" />,
    },
    {
      title: "Mobile Service Van",
      text: "Equipped to handle lockouts and repairs on-site.",
      icon: <VanLockIcon className="h-12 w-16 sm:h-14 sm:w-[4.5rem]" />,
    },
  ];

  return (
    <section aria-labelledby="why-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <h2 id="why-heading" className="sr-only">
        Why choose {business.name}?
      </h2>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-5 rounded-[var(--radius-card)] bg-cream px-5 py-6 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-4">
        {features.map((f, i) => (
          <li
            key={f.title}
            className={`flex items-start gap-3 lg:px-5 ${i > 0 ? "lg:border-l-2 lg:border-brand/70" : ""}`}
          >
            <span className="flex shrink-0 items-center justify-center">{f.icon}</span>
            <div>
              <h3 className="font-heading text-lg leading-tight sm:text-xl">{f.title}</h3>
              <p className="mt-0.5 text-sm leading-snug sm:text-[0.95rem]">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

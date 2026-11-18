import Image from "next/image";
import { Check } from "lucide-react";
import { business } from "@/config/business";
import { CallButton } from "@/components/PrimaryCTA";
import { SkewHighlight } from "@/components/Highlight";
import { NightScene } from "./NightScene";
import jackNight from "../../../public/images/jack-night.webp";

const points = [
  "Late-night & after-hours service",
  "Fast, reliable lockout assistance",
  "Real help from a friendly pro",
];

export function EmergencyNightSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="midnight-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[var(--radius-card)] border-2 border-ink bg-paper md:grid md:grid-cols-[1.05fr_1fr]">
        {/* Illustration */}
        <div className="relative h-60 bg-night sm:h-72 md:h-auto md:min-h-[19rem] md:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]">
          <NightScene className="absolute inset-0 size-full" />
          <Image
            src={jackNight}
            alt="Jack from Call Jack Pro smiling and holding up a phone showing Call Jack Pro outside a house at night"
            sizes="(min-width: 768px) 300px, 60vw"
            className="absolute bottom-0 left-[44%] h-[96%] w-auto max-w-none md:left-[40%]"
          />
        </div>

        {/* Copy */}
        <div className="px-5 py-6 sm:px-8 md:py-8 md:pl-2 lg:pr-10">
          <H id="midnight-heading" className="font-heading text-[2rem] leading-[1.02] sm:text-4xl lg:text-[2.75rem]">
            Need help after midnight?
          </H>
          <p className="mt-3 font-heading text-xl leading-tight sm:text-2xl">
            <SkewHighlight className="py-1">
              {business.hours.lockout247
                ? "We’re available for emergency lockout service."
                : "Call to check after-hours lockout availability."}
            </SkewHighlight>
          </p>
          <ul className="mt-5 space-y-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-lg">
                <Check aria-hidden className="mt-0.5 size-6 shrink-0 rounded bg-brand p-0.5 text-ink" strokeWidth={3.5} />
                {p}
              </li>
            ))}
          </ul>
          <CallButton label="Call for Emergency Help" size="lg" className="mt-6 w-full sm:w-auto" />
          <p className="mt-3 text-sm text-muted">
            Call to talk with Jack directly — we&rsquo;ll confirm availability and timing for your location on the phone.
          </p>
        </div>
      </div>
    </section>
  );
}

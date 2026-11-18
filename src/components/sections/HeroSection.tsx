import Image from "next/image";
import { business } from "@/config/business";
import { CallButton, HelpButton } from "@/components/PrimaryCTA";
import { SkewHighlight, } from "@/components/Highlight";
import { SpeedLines } from "@/components/icons/BrandIcons";
import heroImage from "../../../public/images/jack-hero-van.webp";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pt-6 pb-8 sm:px-6 md:grid-cols-[1.12fr_1fr] md:gap-4 md:py-10 lg:px-8 lg:py-12">
        {/* Copy first in DOM so mobile users see the headline + call button immediately */}
        <div className="md:order-2 md:pl-2">
          <h1 id="hero-heading" className="font-heading text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-7xl">
            <span className="block">Locked Out?</span>
            <span className="relative mt-2 inline-block">
              <SkewHighlight className="py-1 sm:py-2">
                <span className="block">We&rsquo;re Ready</span>
                <span className="block">Anytime.</span>
              </SkewHighlight>
              <span
                aria-hidden
                className="absolute -right-8 bottom-1 hidden w-10 flex-col gap-1.5 sm:flex lg:-right-12 lg:w-14"
              >
                <span className="h-1 rounded-full bg-brand" />
                <span className="ml-3 h-1 rounded-full bg-brand" />
                <span className="ml-1 h-1 rounded-full bg-brand" />
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-md font-display text-lg font-semibold italic leading-snug sm:text-2xl">
            Instant lockout service, anytime&nbsp;&mdash; even after midnight.
          </p>
          <svg viewBox="0 0 220 10" className="mt-1 h-2.5 w-44 sm:w-56" aria-hidden focusable="false">
            <path d="M3 7C70 1 150 1 217 5" stroke="#FFCC00" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex items-center">
              <SpeedLines className="absolute -left-9 hidden size-8 -scale-x-100 lg:block" />
              <CallButton size="xl" className="w-full sm:w-auto" />
            </div>
            <HelpButton size="lg" className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm font-semibold text-muted">
            Home, business &amp; vehicle lockouts
            {business.hours.lockout247 ? " · Available 24/7" : ""} · Tap to call{" "}
            <a href={business.phone.href} className="whitespace-nowrap text-ink underline decoration-brand decoration-2 underline-offset-4">
              {business.phone.display}
            </a>
          </p>
        </div>

        <div className="md:order-1">
          <Image
            src={heroImage}
            alt="Illustration of Jack, the friendly Call Jack Pro technician, giving a thumbs-up and holding a phone showing Call Jack Pro, standing in front of the Call Jack Pro handyperson and locksmith van with a ladder on its roof"
            priority
            sizes="(min-width: 1280px) 680px, (min-width: 768px) 54vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

import { CallButton, HelpButton } from "@/components/PrimaryCTA";
import { SpeedLines } from "@/components/icons/BrandIcons";

export function ContactCTA({
  eyebrow = "Locked out or need a quick fix?",
  showOnline = true,
}: {
  eyebrow?: string;
  showOnline?: boolean;
}) {
  return (
    <section aria-labelledby="contact-cta-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-[var(--radius-card)] border-2 border-ink bg-paper px-5 py-7 sm:px-10 md:grid-cols-[1.35fr_auto_1fr] md:items-center [&>*]:min-w-0">
        <div>
          <p className="font-heading text-sm uppercase tracking-wide sm:text-base">{eyebrow}</p>
          <h2 id="contact-cta-heading" className="mt-1 font-heading text-[2rem] leading-tight sm:text-4xl lg:text-5xl">
            Contact Call Jack Pro Now!
          </h2>
          <svg viewBox="0 0 220 10" className="ml-12 h-2.5 w-40 sm:w-52" aria-hidden focusable="false">
            <path d="M3 7C70 1 150 1 217 5" stroke="#FFCC00" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
          <p className="mt-2 italic sm:text-lg">
            Get immediate help from a friendly, experienced technician&nbsp;&mdash; anytime, day or night.
          </p>
        </div>
        <span aria-hidden className="hidden h-28 w-0.5 bg-ink md:block" />
        <div className="relative flex flex-col gap-3">
          <SpeedLines className="absolute -left-10 -top-3 hidden size-9 -scale-x-100 lg:block" />
          <CallButton showNumber size="xl" className="w-full px-4 text-lg sm:text-2xl" />
          {showOnline && <HelpButton label="Get Immediate Help Online" icon="chat" size="lg" className="w-full px-3 text-base sm:text-xl" />}
        </div>
      </div>
    </section>
  );
}

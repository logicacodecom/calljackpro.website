import { Building2, Car, House, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { EmergencyNightSection } from "@/components/sections/EmergencyNightSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CallButton } from "@/components/PrimaryCTA";
import { SkewHighlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Emergency Lockout Service 24/7 — Home, Business & Car",
  description:
    "Locked out? Call Jack Pro for emergency lockout help 24/7, including after midnight. Home, business and vehicle lockouts — tap to call now.",
  path: "/lockout",
});

const lockoutTypes = [
  { icon: House, title: "Home lockouts", text: "Keys inside, lost keys, or a lock that won’t turn." },
  { icon: Building2, title: "Business lockouts", text: "Shops, offices and storage — before or after hours." },
  { icon: Car, title: "Vehicle lockouts", text: "Keys locked in the car? Call and tell us the make & model." },
];

const steps = [
  { title: "Call now", text: "You’ll talk with Jack directly — no call center." },
  { title: "Tell us where you are", text: "Share your location and what’s happening so we can confirm timing." },
  { title: "Get back inside", text: "Jack arrives in the service van with the tools for the job." },
];

export default function LockoutPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd(
          {
            title: "Emergency Lockout Service",
            intro: "Emergency home, business and vehicle lockout assistance, including late nights and after midnight.",
            items: lockoutTypes.map((l) => l.title),
          },
          "/lockout",
        )}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Emergency Lockout", path: "/lockout" }])} />

      {/* Urgent, call-first hero: everything that matters fits on the first mobile screen */}
      <section className="bg-night text-paper">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6 sm:py-14">
          <p className="font-heading text-base uppercase tracking-wide text-brand">
            {business.hours.lockout247 ? "Emergency lockout service · 24/7" : "Emergency lockout service"}
          </p>
          <h1 className="mt-2 font-heading text-[2.6rem] leading-[0.98] sm:text-6xl">
            Locked Out?{" "}
            <SkewHighlight className="mt-2 py-1 text-ink">Call Jack Now.</SkewHighlight>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg sm:text-xl">
            Home, business or vehicle — {business.hours.lockout247 ? "day or night, even after midnight" : "call to check availability"}.
          </p>
          <div className="mt-6 flex justify-center">
            <CallButton showNumber size="xl" className="w-full sm:w-auto" />
          </div>
          <p className="mt-3 text-sm text-paper/80">Calling is the fastest way to get help. Online requests are answered by call-back.</p>
        </div>
      </section>

      <section aria-labelledby="types-heading" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h2 id="types-heading" className="font-heading text-3xl sm:text-4xl">
          We help with
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {lockoutTypes.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-[var(--radius-card)] border-2 border-ink/80 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-brand">
                <Icon aria-hidden className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-xl">{title}</h3>
                <p className="mt-1">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="steps-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-card)] bg-cream p-6 sm:p-8">
          <h2 id="steps-heading" className="font-heading text-2xl sm:text-3xl">
            What happens when you call
          </h2>
          <ol className="mt-5 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-brand font-heading text-lg">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm">
            For everyone&rsquo;s security, we may ask for ID or other proof that you live at, own, or are authorized to
            access the property or vehicle before opening it.
          </p>
          <a
            href={business.phone.href}
            className="mt-5 inline-flex min-h-12 items-center gap-2 font-heading text-xl underline decoration-brand decoration-4 underline-offset-4"
          >
            <Phone aria-hidden className="size-5" fill="currentColor" strokeWidth={1.5} />
            {business.phone.display}
          </a>
        </div>
      </section>

      <EmergencyNightSection />
      <ContactCTA eyebrow="Locked out right now?" />
    </>
  );
}

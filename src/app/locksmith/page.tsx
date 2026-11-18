import { pageMetadata } from "@/lib/seo";
import { getService } from "@/config/services";
import { business } from "@/config/business";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { EmergencyNightSection } from "@/components/sections/EmergencyNightSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CallButton, HelpButton } from "@/components/PrimaryCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import heroImage from "../../../public/images/jack-hero-van.webp";

export const metadata = pageMetadata({
  title: "Locksmith Services — Lockouts, Rekeying & Lock Repair",
  description:
    "Mobile locksmith service from Call Jack Pro: home, business and vehicle lockouts, rekeying, lock repair and replacement, and spare keys.",
  path: "/locksmith",
});

const service = getService("locksmith");

export default function LocksmithPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd(service, "/locksmith")} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Locksmith Services", path: "/locksmith" }])} />
      <PageHero
        eyebrow="Locksmith Services"
        title={
          <>
            Locks, keys &amp; <Highlight>lockouts.</Highlight>
          </>
        }
        lead={
          <p>
            On-site locksmith work from a fully equipped service van.{" "}
            {business.hours.lockout247 && <strong>Emergency lockouts are handled 24/7.</strong>}
          </p>
        }
        actions={
          <>
            <CallButton />
            <HelpButton label="Request Lock Work" />
          </>
        }
        image={heroImage}
        imageAlt="Jack from Call Jack Pro in front of the locksmith service van"
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <ServiceDetail service={service} moreLink={{ href: "/lockout", label: "Locked out right now?" }} />
      </div>
      <section aria-labelledby="rekey-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[var(--radius-card)] bg-cream p-6 sm:p-8 md:grid-cols-3">
          <h2 id="rekey-heading" className="font-heading text-2xl md:col-span-3">
            Rekey or replace?
          </h2>
          <p>
            <strong>Rekeying</strong> changes which key opens your existing lock — a good option after moving in or
            losing a key, when the hardware is still in good shape.
          </p>
          <p>
            <strong>Replacing</strong> makes sense when a lock is worn, damaged, or you want an upgrade such as a
            sturdier deadbolt or a smart lock.
          </p>
          <p>Not sure which you need? Describe the situation on the phone and Jack will talk you through the options.</p>
        </div>
      </section>
      <EmergencyNightSection />
      <ContactCTA />
    </>
  );
}

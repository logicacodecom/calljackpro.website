import { Clock, MapPin, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { business, serviceAreaPages } from "@/config/business";
import { isLeadDeliveryConfigured } from "@/lib/lead-delivery";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { CallButton } from "@/components/PrimaryCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Contact & Request Service",
  description:
    "Call Jack Pro now for lockout help, or send a service request for repairs, installation and assembly. Emergency lockouts: call any time.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[1fr_1.35fr] lg:px-8">
        <div>
          <p className="font-heading text-sm uppercase tracking-wide">Locked out or need a quick fix?</p>
          <h1 className="mt-1 font-heading text-[2.4rem] leading-none sm:text-5xl">
            Contact <Highlight>Call Jack Pro</Highlight>
          </h1>
          <div className="mt-6 rounded-[var(--radius-card)] border-2 border-ink bg-brand p-5 sm:p-6">
            <h2 className="font-heading text-2xl leading-tight">Locked out? Call — don&rsquo;t wait online.</h2>
            <p className="mt-1">Calling is the fastest way to get help{business.hours.lockout247 ? ", 24/7" : ""}.</p>
            <a
              href={business.phone.href}
              className="mt-4 flex min-h-16 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 font-display text-2xl font-bold italic shadow-pop"
            >
              <Phone aria-hidden className="size-6" fill="currentColor" strokeWidth={1.5} />
              {business.phone.display}
            </a>
          </div>
          <dl className="mt-6 space-y-4">
            <div className="flex gap-3">
              <Clock aria-hidden className="mt-1 size-5 shrink-0" />
              <div>
                <dt className="font-bold">Hours</dt>
                <dd>
                  Emergency lockouts: {business.hours.lockout247 ? business.hours.lockoutLabel : "call for availability"}
                  <br />
                  Handyperson work: {business.hours.handymanLabel}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0" />
              <div>
                <dt className="font-bold">Service area</dt>
                <dd>
                  {serviceAreaPages.length > 0 ? (
                    <>
                      Mobile service in{" "}
                      {serviceAreaPages.map((a, i) => (
                        <span key={a.slug}>
                          <Link href={a.path} className="underline">
                            {a.name}
                          </Link>
                          {i < serviceAreaPages.length - 1 ? " · " : "."}
                        </span>
                      ))}
                    </>
                  ) : (
                    "Mobile service — we come to you. Call to confirm we cover your location."
                  )}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <section id="request" aria-labelledby="request-heading" className="rounded-[var(--radius-card)] border-2 border-ink p-5 sm:p-8">
          <h2 id="request-heading" className="font-heading text-3xl">
            Request service online
          </h2>
          <p className="mt-1 mb-5 text-muted">Send the details and Jack will call you back.</p>
          <ServiceRequestForm deliveryConfigured={isLeadDeliveryConfigured()} />
          <div className="mt-6 border-t-2 border-ink/10 pt-5 lg:hidden">
            <CallButton showNumber size="lg" className="w-full" />
          </div>
        </section>
      </div>
    </>
  );
}

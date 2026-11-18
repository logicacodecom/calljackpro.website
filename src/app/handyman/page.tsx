import { pageMetadata } from "@/lib/seo";
import { getService } from "@/config/services";
import { business } from "@/config/business";
import { isLeadDeliveryConfigured } from "@/lib/lead-delivery";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { HelpButton, CallButton } from "@/components/PrimaryCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import portrait from "../../../public/images/jack-portrait.webp";

export const metadata = pageMetadata({
  title: "Handyperson Services — Repairs, Installation & Assembly",
  description:
    "Schedule a friendly handyperson: everyday home repairs, furniture assembly, TV and shelf mounting, fixture installation and ongoing maintenance.",
  path: "/handyman",
});

const handymanServices = ["home-repairs", "installation", "maintenance"].map(getService);

export default function HandymanPage() {
  return (
    <>
      {handymanServices.map((s) => (
        <JsonLd key={s.id} data={serviceJsonLd(s, `/handyman#${s.id}`)} />
      ))}
      <JsonLd data={breadcrumbJsonLd([{ name: "Handyman", path: "/handyman" }])} />
      <PageHero
        eyebrow="Handyperson Services"
        title={
          <>
            Your to-do list, <Highlight>done right.</Highlight>
          </>
        }
        lead={
          <p>
            Scheduled repairs, installation, assembly and maintenance — handled by one friendly, careful pro. Tell us
            what needs doing and we&rsquo;ll set up a time that works for you.
          </p>
        }
        actions={
          <>
            <HelpButton label="Schedule a Visit" />
            <CallButton label="Call to Book" />
          </>
        }
        image={portrait}
        imageAlt="Jack from Call Jack Pro smiling with arms crossed, wearing a tool belt"
      />
      <div className="mx-auto max-w-7xl space-y-5 px-4 pt-8 sm:px-6 lg:px-8">
        {handymanServices.map((s) => (
          <ServiceDetail key={s.id} service={s} />
        ))}
      </div>

      <section aria-labelledby="book-heading" className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <h2 id="book-heading" className="font-heading text-3xl sm:text-4xl">
          Request a visit
        </h2>
        <p className="mt-2 text-lg">
          Share a few details and Jack will call you back to confirm the job and a time. Hours: {business.hours.handymanLabel}.
        </p>
        <div className="mt-6 rounded-[var(--radius-card)] border-2 border-ink p-5 sm:p-8">
          <ServiceRequestForm deliveryConfigured={isLeadDeliveryConfigured()} defaultService="home-repair" />
        </div>
      </section>
    </>
  );
}

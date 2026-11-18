import { pageMetadata } from "@/lib/seo";
import { services } from "@/config/services";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { TrustFeatures } from "@/components/sections/TrustFeatures";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CallButton, HelpButton } from "@/components/PrimaryCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Locksmith & Handyperson Services",
  description:
    "All Call Jack Pro services: emergency lockouts, rekeying and lock repair, home repairs, installation, furniture assembly and ongoing maintenance.",
  path: "/services",
});

const more: Record<string, { href: string; label: string }> = {
  locksmith: { href: "/locksmith", label: "Locksmith details" },
  "home-repairs": { href: "/handyman", label: "Handyperson services" },
  installation: { href: "/handyman#installation", label: "Installation details" },
  maintenance: { href: "/handyman#maintenance", label: "Maintenance details" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            One call for <Highlight>locks &amp; fixes.</Highlight>
          </>
        }
        lead="Reliable locksmith and handyman services for your home, business, and everyday needs."
        actions={
          <>
            <CallButton />
            <HelpButton />
          </>
        }
      />
      <div className="mx-auto max-w-7xl space-y-5 px-4 pt-8 sm:px-6 lg:px-8">
        {services.map((s) => (
          <ServiceDetail key={s.id} service={s} moreLink={more[s.id]} />
        ))}
      </div>
      <TrustFeatures />
      <ContactCTA />
    </>
  );
}

import { business } from "@/config/business";
import type { Service } from "@/config/services";

const businessId = () => `${business.siteUrl}/#business`;

/**
 * LocalBusiness + Locksmith markup built only from configured facts.
 * No reviews, ratings, prices or addresses are invented: optional fields are
 * omitted until they are configured in src/config/business.ts.
 */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Locksmith", "HomeAndConstructionBusiness"],
    "@id": businessId(),
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: business.phone.e164,
    image: `${business.siteUrl}/images/og-call-jack-pro.jpg`,
    logo: `${business.siteUrl}/icon.png`,
    knowsAbout: ["Lockout service", "Rekeying", "Lock repair", "Handyperson services", "Furniture assembly"],
  };

  if (business.hours.lockout247) {
    data.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ];
  }
  if (business.serviceAreas.length > 0) {
    data.areaServed = business.serviceAreas.map((name) => ({ "@type": "City", name }));
  }
  if (business.address) {
    data.address = { "@type": "PostalAddress", ...business.address };
  }
  if (business.email) data.email = business.email;

  const sameAs = [business.links.googleBusinessUrl, ...business.links.profileUrls].filter(Boolean);
  if (sameAs.length > 0) data.sameAs = sameAs;
  if (business.links.googleBusinessUrl) data.hasMap = business.links.googleBusinessUrl;

  return data;
}

export function serviceJsonLd(service: Pick<Service, "title" | "intro" | "items">, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    url: `${business.siteUrl}${path}`,
    provider: { "@id": businessId() },
    ...(business.serviceAreas.length > 0 && {
      areaServed: business.serviceAreas.map((name) => ({ "@type": "City", name })),
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.items.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.siteUrl}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/config/services";
import { business, serviceAreaPages } from "@/config/business";
import { PageHero } from "@/components/sections/PageHero";
import { EmergencyNightSection } from "@/components/sections/EmergencyNightSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CallButton, HelpButton } from "@/components/PrimaryCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import heroImage from "../../../../public/images/jack-hero-van.webp";

/**
 * One page per confirmed service area (NEXT_PUBLIC_SERVICE_AREAS), so people
 * searching "locksmith in <city>" land on a page about their city.
 *
 * With Cache Components, generateStaticParams must return at least one entry,
 * so a placeholder is returned when no areas are configured; it renders a 404.
 */
const PLACEHOLDER = "_none";

export function generateStaticParams() {
  return serviceAreaPages.length > 0 ? serviceAreaPages.map((a) => ({ city: a.slug })) : [{ city: PLACEHOLDER }];
}

const findArea = (slug: string) => serviceAreaPages.find((a) => a.slug === slug);

export async function generateMetadata({ params }: PageProps<"/areas/[city]">): Promise<Metadata> {
  const area = findArea((await params).city);
  if (!area) return { title: "Page not found", robots: { index: false } };
  return pageMetadata({
    title: `Locksmith & Handyman in ${area.name}${business.hours.lockout247 ? " — 24/7 Lockouts" : ""}`,
    description: `Locked out in ${area.name}? Call Jack Pro comes to you${
      business.hours.lockout247 ? " 24/7" : ""
    } for home, business and car lockouts, rekeying and lock repair, plus handyperson repairs and assembly. Call ${
      business.phone.display
    }.`,
    path: area.path,
  });
}

export default async function AreaPage({ params }: PageProps<"/areas/[city]">) {
  const area = findArea((await params).city);
  if (!area) notFound();

  const otherAreas = serviceAreaPages.filter((a) => a.slug !== area.slug && a.state === area.state);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Locksmith & handyperson services in ${area.name}`,
          serviceType: "Locksmith",
          url: `${business.siteUrl}${area.path}`,
          provider: { "@id": `${business.siteUrl}/#business` },
          areaServed: { "@type": "City", name: area.name },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: `Service in ${area.name}`, path: area.path }])} />
      <PageHero
        eyebrow={`Serving ${area.name}`}
        title={
          <>
            Locksmith &amp; handyman in <Highlight>{area.name}.</Highlight>
          </>
        }
        lead={
          <p>
            Locked out, need a lock rekeyed, or have a list of small jobs around the house? Jack comes to you in{" "}
            {area.city} in a fully equipped service van.{" "}
            {business.hours.lockout247 && <strong>Emergency lockouts are handled 24/7.</strong>}
          </p>
        }
        actions={
          <>
            <CallButton showNumber />
            <HelpButton label="Request Service Online" />
          </>
        }
        image={heroImage}
        imageAlt={`Jack from Call Jack Pro with the service van, ready to help in ${area.name}`}
      />

      <section aria-labelledby="area-services-heading" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h2 id="area-services-heading" className="font-heading text-3xl">
          What Jack does in {area.city}
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="rounded-[var(--radius-card)] border-2 border-ink/80 p-5">
              <h3 className="font-heading text-xl">
                <Link href={s.href} className="hover:underline">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-1">{s.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {s.items.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg">
          <Link href="/lockout" className="font-bold underline">
            Locked out in {area.city} right now?
          </Link>{" "}
          Call {business.phone.display} — you&rsquo;ll talk with Jack directly.
        </p>
      </section>

      {otherAreas.length > 0 && (
        <section aria-labelledby="other-areas-heading" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h2 id="other-areas-heading" className="font-heading text-2xl">
            Also serving nearby
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {otherAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={a.path}
                  className="inline-flex min-h-10 items-center rounded-full border-2 border-ink px-4 font-semibold hover:bg-cream"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <EmergencyNightSection />
      <ContactCTA eyebrow={`Locked out or need a quick fix in ${area.city}?`} />
    </>
  );
}

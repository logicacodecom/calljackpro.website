import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { faqs } from "@/config/faq";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Highlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Questions & Answers — Lockouts, Locksmith & Handyman",
  description: `Answers about ${business.name}: where we work, 24/7 lockout help, locksmith and handyman services, and how to reach Jack at ${business.phone.display}.`,
  path: "/faq",
});

export default function FaqPage() {
  const items = faqs();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }])} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="font-heading text-sm uppercase tracking-wide">Questions &amp; answers</p>
        <h1 className="mt-1 font-heading text-[2.4rem] leading-none sm:text-5xl">
          Good to <Highlight>know.</Highlight>
        </h1>
        <dl className="mt-8 space-y-6">
          {items.map(({ q, a }) => (
            <div key={q} className="rounded-[var(--radius-card)] border-2 border-ink/80 p-5">
              <dt>
                <h2 className="font-heading text-xl">{q}</h2>
              </dt>
              <dd className="mt-2 text-lg">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <ContactCTA />
    </>
  );
}

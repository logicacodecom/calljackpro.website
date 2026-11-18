import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { TrustFeatures } from "@/components/sections/TrustFeatures";
import { SkewHighlight } from "@/components/Highlight";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import portrait from "../../../public/images/jack-portrait.webp";

export const metadata = pageMetadata({
  title: "About Jack — Your Local Locksmith & Handyperson",
  description:
    "Meet Jack — the friendly local locksmith and handyperson behind Call Jack Pro. Real help from a real person, day or night.",
  path: "/about",
});

const values = [
  { title: "Answer the phone", text: "When you’re locked out, you need a person — not a voicemail maze." },
  { title: "Be straightforward", text: "Clear explanations of what’s wrong and what it will take, before work starts." },
  { title: "Treat your place with care", text: "Tidy work, respect for your home or business, and no shortcuts." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_1.1fr] lg:px-8">
        <Image
          src={portrait}
          alt="Portrait illustration of Jack, the Call Jack Pro technician, smiling with arms crossed and a tool belt with keys and tools"
          sizes="(min-width: 768px) 40vw, 90vw"
          className="mx-auto h-auto w-full max-w-md"
          priority
        />
        <div>
          <p className="font-heading text-sm uppercase tracking-wide">About {business.name}</p>
          <h1 className="mt-1 font-heading text-[2.4rem] leading-none sm:text-5xl lg:text-6xl">
            Hi, I&rsquo;m Jack. <SkewHighlight className="mt-2 py-1">Let&rsquo;s get it fixed.</SkewHighlight>
          </h1>
          <div className="mt-5 space-y-4 text-lg">
            <p>
              {business.name} is a local locksmith and handyperson service built around one simple idea: when
              something goes wrong at home or work, you should be able to call a real, friendly person who shows up
              ready to help.
            </p>
            <p>
              That might mean getting you back inside after a late-night lockout, rekeying your locks after a move,
              or knocking out the repair list that&rsquo;s been waiting for a free weekend. The service van carries the
              tools for both, so most jobs can be handled on-site.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="values-heading" className="font-heading text-3xl sm:text-4xl">
          How we work
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-[var(--radius-card)] border-2 border-ink/80 p-5">
              <h3 className="font-heading text-xl">{v.title}</h3>
              <p className="mt-1">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <TrustFeatures />
      <ContactCTA />
    </>
  );
}

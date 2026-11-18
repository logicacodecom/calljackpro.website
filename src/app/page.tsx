import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustFeatures } from "@/components/sections/TrustFeatures";
import { EmergencyNightSection } from "@/components/sections/EmergencyNightSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: { absolute: `${business.name} | 24/7 Lockout Service & Handyperson Help` },
  description:
    "Locked out? Call Jack Pro for emergency lockout help 24/7 — even after midnight. Friendly local locksmith and handyperson for repairs, installation and assembly.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <TrustFeatures />
      <EmergencyNightSection />
      <ContactCTA />
    </>
  );
}

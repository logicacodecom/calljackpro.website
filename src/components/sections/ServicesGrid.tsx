import { services } from "@/config/services";
import { ServiceCard } from "./ServiceCard";
import { SectionHeading } from "./SectionHeading";

export function ServicesGrid({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section aria-labelledby="services-heading" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      {showHeading && (
        <SectionHeading
          id="services-heading"
          title="Our Services"
          subtitle="Reliable locksmith and handyman services for your home, business, and everyday needs."
        />
      )}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {services.map((s) => (
          <li key={s.id}>
            <ServiceCard service={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}

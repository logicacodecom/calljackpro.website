import Link from "next/link";
import { business } from "@/config/business";
import { mainNav, servicesMenu } from "@/config/navigation";
import { Logo } from "@/components/Logo";
import { CallButton } from "@/components/PrimaryCTA";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-mist">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm font-semibold">{business.tagline}</p>
          <p className="text-sm text-muted">
            Friendly local lockout help and handyperson services
            {business.regionLabel ? ` in ${business.regionLabel}` : ""}.
          </p>
        </div>

        <nav aria-label="Footer services">
          <h2 className="font-heading text-lg">Services</h2>
          <ul className="mt-3 space-y-1">
            {servicesMenu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer">
          <h2 className="font-heading text-lg">Company</h2>
          <ul className="mt-3 space-y-1">
            {mainNav
              .filter((i) => !["/services", "/lockout", "/handyman"].includes(i.href))
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-10 items-center hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="font-heading text-lg">Get help now</h2>
          <CallButton showNumber size="md" />
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-bold">Emergency lockouts</dt>
              <dd>{business.hours.lockout247 ? business.hours.lockoutLabel : "Call for current availability"}</dd>
            </div>
            <div>
              <dt className="font-bold">Handyperson work</dt>
              <dd>{business.hours.handymanLabel}</dd>
            </div>
            <div>
              <dt className="font-bold">Service area</dt>
              <dd>
                {business.serviceAreas.length > 0
                  ? business.serviceAreas.join(", ")
                  : "Mobile service — call to confirm we cover your location."}
              </dd>
            </div>
            {business.email && (
              <div>
                <dt className="font-bold">Email</dt>
                <dd>
                  <a className="underline" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="border-t border-ink/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
          © <CurrentYear /> {business.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/**
 * Central business configuration.
 *
 * Every phone number, URL, hour and service-area string on the site comes
 * from here. Override values with environment variables (see `.env.example`)
 * rather than editing components.
 *
 * IMPORTANT: Values marked "PLACEHOLDER" must be replaced before launch.
 */

// NEXT_PUBLIC_* values must be referenced literally so Next.js can inline
// them into client bundles (Header, MobileCallBar, form).
const raw = {
  NEXT_PUBLIC_PHONE_DISPLAY: process.env.NEXT_PUBLIC_PHONE_DISPLAY,
  NEXT_PUBLIC_PHONE_E164: process.env.NEXT_PUBLIC_PHONE_E164,
  NEXT_PUBLIC_SERVICE_AREAS: process.env.NEXT_PUBLIC_SERVICE_AREAS,
  NEXT_PUBLIC_LEGAL_NAME: process.env.NEXT_PUBLIC_LEGAL_NAME,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_LOCKOUT_24_7: process.env.NEXT_PUBLIC_LOCKOUT_24_7,
  NEXT_PUBLIC_HANDYMAN_HOURS: process.env.NEXT_PUBLIC_HANDYMAN_HOURS,
  NEXT_PUBLIC_STREET_ADDRESS: process.env.NEXT_PUBLIC_STREET_ADDRESS,
  NEXT_PUBLIC_ADDRESS_CITY: process.env.NEXT_PUBLIC_ADDRESS_CITY,
  NEXT_PUBLIC_ADDRESS_REGION: process.env.NEXT_PUBLIC_ADDRESS_REGION,
  NEXT_PUBLIC_ADDRESS_POSTAL_CODE: process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE,
  NEXT_PUBLIC_ADDRESS_COUNTRY: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY,
  NEXT_PUBLIC_REGION_LABEL: process.env.NEXT_PUBLIC_REGION_LABEL,
};

const env = (key: keyof typeof raw) => {
  const value = raw[key];
  return value && value.trim() !== "" ? value.trim() : undefined;
};

/** Display format, e.g. "(555) 123-4567". PLACEHOLDER until NEXT_PUBLIC_PHONE_DISPLAY is set. */
const phoneDisplay = env("NEXT_PUBLIC_PHONE_DISPLAY") ?? "(555) 123-4567";

/** E.164 format used for tel: links, e.g. "+15551234567". Derived from the display number if not set. */
const phoneE164 =
  env("NEXT_PUBLIC_PHONE_E164") ??
  (() => {
    const digits = phoneDisplay.replace(/\D/g, "");
    return digits.length === 10 ? `+1${digits}` : `+${digits}`;
  })();

/** Comma-separated list, e.g. "Springfield, Shelbyville, Capital City". */
const serviceAreas = (env("NEXT_PUBLIC_SERVICE_AREAS") ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const business = {
  name: "Call Jack Pro",
  legalName: env("NEXT_PUBLIC_LEGAL_NAME") ?? "Call Jack Pro",
  tagline: "Handyperson & Locksmith",
  description:
    "Friendly local locksmith and handyperson service. Emergency lockout help 24/7 — even after midnight — plus everyday home repairs, installation, assembly and maintenance.",

  /** Canonical site origin, no trailing slash. PLACEHOLDER until NEXT_PUBLIC_SITE_URL is set. */
  siteUrl: (env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000").replace(/\/$/, ""),

  phone: {
    display: phoneDisplay,
    e164: phoneE164,
    href: `tel:${phoneE164}`,
    isPlaceholder: !env("NEXT_PUBLIC_PHONE_DISPLAY"),
  },

  email: env("NEXT_PUBLIC_CONTACT_EMAIL"),

  /**
   * Service areas (cities / neighborhoods). Leave empty until confirmed —
   * the site then asks visitors to call to confirm coverage instead of
   * listing invented locations.
   */
  serviceAreas,

  /**
   * Hours. Emergency lockout availability is 24/7 per the business owner.
   * Set NEXT_PUBLIC_LOCKOUT_24_7=false if that changes; copy and structured
   * data will follow.
   */
  hours: {
    lockout247: env("NEXT_PUBLIC_LOCKOUT_24_7") !== "false",
    lockoutLabel: "24/7, including late nights and after midnight",
    handymanLabel: env("NEXT_PUBLIC_HANDYMAN_HOURS") ?? "Scheduled by appointment",
  },

  /**
   * Public street address. Leave unset for a service-area business with no
   * storefront — the site will not display or mark up an address.
   */
  address: env("NEXT_PUBLIC_STREET_ADDRESS")
    ? {
        streetAddress: env("NEXT_PUBLIC_STREET_ADDRESS")!,
        addressLocality: env("NEXT_PUBLIC_ADDRESS_CITY") ?? "",
        addressRegion: env("NEXT_PUBLIC_ADDRESS_REGION") ?? "",
        postalCode: env("NEXT_PUBLIC_ADDRESS_POSTAL_CODE") ?? "",
        addressCountry: env("NEXT_PUBLIC_ADDRESS_COUNTRY") ?? "US",
      }
    : null,

  /** Primary region shown in copy, e.g. "Springfield, IL". Optional. */
  regionLabel: env("NEXT_PUBLIC_REGION_LABEL"),
} as const;

export type Business = typeof business;

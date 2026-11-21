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
  NEXT_PUBLIC_GOOGLE_BUSINESS_URL: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL,
  NEXT_PUBLIC_GOOGLE_REVIEW_URL: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL,
  NEXT_PUBLIC_PROFILE_URLS: process.env.NEXT_PUBLIC_PROFILE_URLS,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
};

const env = (key: keyof typeof raw) => {
  const value = raw[key];
  return value && value.trim() !== "" ? value.trim() : undefined;
};

/** Display format. Override with NEXT_PUBLIC_PHONE_DISPLAY. */
const phoneDisplay = env("NEXT_PUBLIC_PHONE_DISPLAY") ?? "(954) 662-2972";

/** E.164 format used for tel: links, e.g. "+15551234567". Derived from the display number if not set. */
const phoneE164 =
  env("NEXT_PUBLIC_PHONE_E164") ??
  (() => {
    const digits = phoneDisplay.replace(/\D/g, "");
    return digits.length === 10 ? `+1${digits}` : `+${digits}`;
  })();

const list = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** URL-safe slug for a service-area name, e.g. "Fort Lauderdale" → "fort-lauderdale". */
export const areaSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Service-area cities as "City/ST", comma-separated, e.g. "Tampa/FL, Clarkston/MI".
 * The state is optional. Override with NEXT_PUBLIC_SERVICE_AREAS.
 */
const DEFAULT_SERVICE_AREAS = [
  // Tampa Bay Area, FL
  "Tampa/FL",
  "St. Petersburg/FL",
  "Clearwater/FL",
  "Brandon/FL",
  "Largo/FL",
  "Riverview/FL",
  "Wesley Chapel/FL",
  "Palm Harbor/FL",
  // Clarkston, MI area (Oakland County)
  "Clarkston/MI",
  "Waterford/MI",
  "Independence Township/MI",
  "Lake Orion/MI",
  "Auburn Hills/MI",
  "Pontiac/MI",
].join(", ");

const serviceAreaList = list(env("NEXT_PUBLIC_SERVICE_AREAS") ?? DEFAULT_SERVICE_AREAS).map((entry) => {
  const [city, state] = entry.split("/").map((s) => s.trim());
  return { city, state: state || undefined, name: state ? `${city}, ${state}` : city };
});

/** Display names, e.g. "Tampa, FL". */
const serviceAreas = serviceAreaList.map((a) => a.name);

export const business = {
  name: "Call Jack Pro",
  legalName: env("NEXT_PUBLIC_LEGAL_NAME") ?? "Call Jack Pro",
  tagline: "Handyperson & Locksmith",
  description:
    "Friendly mobile locksmith and handyperson service in the Tampa Bay Area, FL and the Clarkston, MI area. Emergency lockout help 24/7 — even after midnight — plus rekeying, lock repair and everyday home repairs, installation, assembly and maintenance.",
  /** Other names people search for, used as schema alternateName. */
  alternateNames: ["CallJackPro", "Call Jack Pro Locksmith", "Call Jack Pro Handyman"],

  /** Canonical site origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL (e.g. for previews). */
  siteUrl: (env("NEXT_PUBLIC_SITE_URL") ?? "https://www.calljackpro.com").replace(/\/$/, ""),

  phone: {
    display: phoneDisplay,
    e164: phoneE164,
    href: `tel:${phoneE164}`,
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
   * Public street address. Call Jack Pro is a mobile, service-area business
   * with no physical location, so this stays unset — the site neither
   * displays nor marks up an address. Only set it if a storefront opens.
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
  regionLabel: env("NEXT_PUBLIC_REGION_LABEL") ?? "Tampa Bay, FL & Clarkston, MI",

  /**
   * Off-site profiles. Each one is optional and only shown/marked up once set.
   * - googleBusinessUrl: the public Google Maps / Business Profile link
   * - googleReviewUrl: the "Ask for reviews" short link from the Business Profile
   * - profileUrls: comma-separated Yelp, Nextdoor, Facebook, Angi… profile URLs
   */
  links: {
    googleBusinessUrl: env("NEXT_PUBLIC_GOOGLE_BUSINESS_URL") ?? "https://share.google/iE1gBzzXEU6oSwhTQ",
    googleReviewUrl: env("NEXT_PUBLIC_GOOGLE_REVIEW_URL"),
    profileUrls: list(env("NEXT_PUBLIC_PROFILE_URLS") ?? "https://yelp.to/_5v3on9zD5"),
  },

  /** Google Analytics 4 measurement ID (G-XXXXXXX). Optional; enables call/lead tracking. */
  gaMeasurementId: env("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
} as const;

/** Configured service areas with their page paths (/areas/<slug>). */
export const serviceAreaPages = serviceAreaList.map((a) => ({
  ...a,
  slug: areaSlug(a.city),
  path: `/areas/${areaSlug(a.city)}`,
}));

/** Human label for a profile URL, e.g. "Yelp". */
export const profileLabel = (url: string) => {
  const host = url.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  const known: Record<string, string> = {
    "yelp.com": "Yelp",
    "yelp.to": "Yelp",
    "facebook.com": "Facebook",
    "nextdoor.com": "Nextdoor",
    "instagram.com": "Instagram",
    "angi.com": "Angi",
    "thumbtack.com": "Thumbtack",
    "bbb.org": "BBB",
  };
  return known[host] ?? host;
};

export type Business = typeof business;

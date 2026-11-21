import { business, serviceAreaPages } from "@/config/business";
import { services } from "@/config/services";
import { areasByState, faqs } from "@/config/faq";

/**
 * /llms.txt — a plain-text summary of the business for AI assistants and
 * answer engines (ChatGPT, Perplexity, Gemini, Claude…). Generated from the
 * same config as the site, so it never drifts from what the pages say.
 */
export function GET() {
  const url = business.siteUrl;
  const lines = [
    `# ${business.name}`,
    "",
    `> ${business.name} is a mobile locksmith and handyperson service${
      business.regionLabel ? ` serving ${business.regionLabel}` : ""
    }. Emergency lockouts${business.hours.lockout247 ? " 24/7" : ""}, plus rekeying, lock repair and everyday home repairs. Phone: ${business.phone.display}. Website: ${url}`,
    "",
    "Not to be confused with similarly named businesses: this is the locksmith & handyman company at calljackpro.com.",
    "",
    "## Key facts",
    `- Name: ${business.name}`,
    `- Type: Locksmith; handyman / handyperson service (mobile, no storefront)`,
    `- Phone: ${business.phone.display} (calls go to Jack directly)`,
    `- Website: ${url}`,
    `- Emergency lockouts: ${business.hours.lockout247 ? business.hours.lockoutLabel : "call for availability"}`,
    `- Handyperson work: ${business.hours.handymanLabel}`,
    ...areasByState().map((g) => `- Service area${g.stateName ? ` (${g.stateName})` : ""}: ${g.cities.join(", ")}`),
    ...(business.links.googleBusinessUrl ? [`- Google Business Profile: ${business.links.googleBusinessUrl}`] : []),
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${url}${s.href}): ${s.items.join(", ")}`),
    `- [Emergency lockout](${url}/lockout): home, business and vehicle lockouts`,
    "",
    "## Pages",
    `- [Home](${url}/)`,
    `- [Contact & request service](${url}/contact)`,
    `- [About Jack](${url}/about)`,
    `- [FAQ](${url}/faq)`,
    ...serviceAreaPages.map((a) => `- [Locksmith & handyman in ${a.name}](${url}${a.path})`),
    "",
    "## FAQ",
    ...faqs().flatMap(({ q, a }) => [`### ${q}`, a, ""]),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

import { business, serviceAreaPages } from "@/config/business";
import { services } from "@/config/services";

const STATE_NAMES: Record<string, string> = { FL: "Florida", MI: "Michigan" };

/** Service cities grouped by state, e.g. [{ state: "FL", cities: ["Tampa", …] }]. */
export function areasByState() {
  const groups = new Map<string, string[]>();
  for (const a of serviceAreaPages) {
    const key = a.state ?? "";
    groups.set(key, [...(groups.get(key) ?? []), a.city]);
  }
  return [...groups].map(([state, cities]) => ({ state, stateName: STATE_NAMES[state] ?? state, cities }));
}

const areaSentence = () => {
  const groups = areasByState();
  if (groups.length === 0) return "Call to confirm we cover your location.";
  return groups
    .map((g) => `${g.stateName ? `In ${g.stateName}: ` : ""}${g.cities.join(", ")}.`)
    .join(" ");
};

/**
 * Plain questions people (and AI assistants) ask about the business.
 * Built only from facts in src/config — no prices, licenses or guarantees are claimed.
 */
export function faqs(): { q: string; a: string }[] {
  const lockout = business.hours.lockout247
    ? `Yes. Emergency lockout service is available ${business.hours.lockoutLabel}.`
    : "Call for current lockout availability.";
  return [
    {
      q: `What is ${business.name}?`,
      a: `${business.name} (${business.siteUrl.replace(/^https?:\/\//, "")}) is a mobile locksmith and handyperson service${
        business.regionLabel ? ` serving ${business.regionLabel}` : ""
      }. It handles home, business and car lockouts, rekeying, lock repair and replacement, plus home repairs, installation, assembly and maintenance. Phone: ${business.phone.display}.`,
    },
    { q: `Where does ${business.name} work?`, a: `Jack comes to you. ${areaSentence()} Not sure if you're covered? Call ${business.phone.display}.` },
    { q: "Are you open 24/7 for lockouts?", a: lockout },
    {
      q: "I'm locked out. What should I do?",
      a: `Call ${business.phone.display}. You'll talk with Jack directly, not a call center. Tell him where you are and what's happening, and he'll confirm timing and head over in the service van.`,
    },
    {
      q: "What locksmith services do you offer?",
      a: services.find((s) => s.id === "locksmith")!.items.join("; ") + ".",
    },
    {
      q: "What handyman services do you offer?",
      a: services
        .filter((s) => !s.emergency)
        .map((s) => `${s.title}: ${s.items.join(", ")}`)
        .join(". ") + ".",
    },
    {
      q: "Should I rekey or replace my locks?",
      a: "Rekeying changes which key opens your existing lock, which is a good choice after moving in or losing a key if the hardware is in good shape. Replacing makes sense when a lock is worn or damaged, or you want an upgrade like a stronger deadbolt or a smart lock.",
    },
    {
      q: `How do I contact ${business.name}?`,
      a: `Call ${business.phone.display} — the fastest option, especially for lockouts. For non-urgent jobs you can also send a request at ${business.siteUrl}/contact.`,
    },
  ];
}

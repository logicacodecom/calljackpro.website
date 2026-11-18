export type ServiceIconName = "key" | "tools" | "drill" | "gear";

export type Service = {
  id: string;
  title: string;
  /** Title split for the two-line card heading in the mockup. */
  cardTitle: [string, string];
  icon: ServiceIconName;
  summary: string;
  href: string;
  intro: string;
  items: string[];
  /** Whether this is urgent/emergency work (affects copy & CTAs). */
  emergency: boolean;
};

export const services: Service[] = [
  {
    id: "locksmith",
    title: "Locksmith Services",
    cardTitle: ["Locksmith", "Services"],
    icon: "key",
    summary: "Lockouts, key service, rekeying, and more.",
    href: "/locksmith",
    intro:
      "Locked out, lost a key, or moving into a new place? Jack handles residential, business and vehicle lock work on-site from a fully equipped service van.",
    items: [
      "Home, business and vehicle lockouts",
      "Rekeying after a move-in or lost key",
      "Lock repair and replacement",
      "Deadbolt and smart lock installation",
      "Key duplication and spare keys",
      "Mailbox and cabinet locks",
    ],
    emergency: true,
  },
  {
    id: "home-repairs",
    title: "Home Repairs",
    cardTitle: ["Home", "Repairs"],
    icon: "tools",
    summary: "Everyday repairs and quick fixes around your home.",
    href: "/handyman#home-repairs",
    intro: "The small jobs that pile up — fixed properly, without the runaround.",
    items: [
      "Sticking or sagging doors",
      "Drywall patches and touch-ups",
      "Loose railings, handles and hinges",
      "Caulking and weather stripping",
      "Minor trim and carpentry fixes",
    ],
    emergency: false,
  },
  {
    id: "installation",
    title: "Installation & Assembly",
    cardTitle: ["Installation &", "Assembly"],
    icon: "drill",
    summary: "Hardware, fixtures, furniture, and more.",
    href: "/handyman#installation",
    intro: "Get it hung, mounted, assembled and level the first time.",
    items: [
      "Furniture and flat-pack assembly",
      "TV, shelf and mirror mounting",
      "Door hardware and cabinet pulls",
      "Light fixtures and ceiling fans (non-permit work)",
      "Curtain rods, blinds and hooks",
    ],
    emergency: false,
  },
  {
    id: "maintenance",
    title: "Maintenance & More",
    cardTitle: ["Maintenance", "& More"],
    icon: "gear",
    summary: "Ongoing maintenance, small projects, and custom requests.",
    href: "/handyman#maintenance",
    intro: "Keep your home or rental running smoothly with routine upkeep and odd jobs.",
    items: [
      "Seasonal home maintenance checklists",
      "Rental turnover punch lists",
      "Smoke detector battery and filter changes",
      "Small custom projects — just ask",
    ],
    emergency: false,
  },
];

export const getService = (id: string) => services.find((s) => s.id === id)!;

/** Categories offered in the service request form. */
export const requestCategories = [
  { value: "home-lockout", label: "Home lockout", emergency: true },
  { value: "business-lockout", label: "Business lockout", emergency: true },
  { value: "vehicle-lockout", label: "Vehicle lockout", emergency: true },
  { value: "lock-repair", label: "Lock repair / rekeying", emergency: false },
  { value: "home-repair", label: "Home repair", emergency: false },
  { value: "installation", label: "Installation / assembly", emergency: false },
  { value: "other", label: "Other", emergency: false },
] as const;

export type RequestCategory = (typeof requestCategories)[number]["value"];

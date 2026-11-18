export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Lockout Service", href: "/lockout" },
  { label: "Handyman", href: "/handyman" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const servicesMenu: NavItem[] = [
  { label: "All Services", href: "/services" },
  { label: "Locksmith Services", href: "/locksmith" },
  { label: "Emergency Lockout", href: "/lockout" },
  { label: "Home Repairs", href: "/handyman#home-repairs" },
  { label: "Installation & Assembly", href: "/handyman#installation" },
  { label: "Maintenance & More", href: "/handyman#maintenance" },
];

export const REQUEST_FORM_HREF = "/contact#request";

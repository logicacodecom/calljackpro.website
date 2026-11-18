import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const routes = ["/", "/lockout", "/locksmith", "/services", "/handyman", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${business.siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/lockout" ? 0.9 : 0.7,
  }));
}

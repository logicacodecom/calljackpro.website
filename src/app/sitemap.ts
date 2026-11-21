import type { MetadataRoute } from "next";
import { business, serviceAreaPages } from "@/config/business";

export const routes = ["/", "/lockout", "/locksmith", "/services", "/handyman", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...serviceAreaPages.map((a) => a.path)].map((path) => ({
    url: `${business.siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/lockout" ? 0.9 : path.startsWith("/areas/") ? 0.8 : 0.7,
  }));
}

import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.map((n) => ({ url: `${SITE.url}${n.href === "/" ? "" : n.href}`, lastModified: new Date() }));
}

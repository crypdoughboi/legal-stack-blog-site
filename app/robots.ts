import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/origin";

export default function robots(): MetadataRoute.Robots {
  const base = publicSiteUrl();

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}

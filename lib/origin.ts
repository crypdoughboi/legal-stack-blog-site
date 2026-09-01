import { site } from "@/content/site";
import { env } from "./env";

/**
 * Absolute origin for OAuth redirects. Prefers the configured site URL so a
 * preview deployment cannot be used to mint a session for production.
 */
export function siteOrigin(request: Request) {
  if (env.siteUrl) return env.siteUrl.replace(/\/$/, "");
  return new URL(request.url).origin;
}

/** Canonical public origin, for feeds, sitemaps, and metadata. */
export function publicSiteUrl() {
  return (env.siteUrl || site.url).replace(/\/$/, "");
}

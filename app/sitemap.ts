import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/origin";
import { getPublishedPosts, getTags } from "@/lib/posts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = publicSiteUrl();
  const [posts, tags] = await Promise.all([getPublishedPosts(), getTags()]);

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/writing`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/notes`, lastModified: new Date(), priority: 0.5 },
    ...posts.map((post) => ({
      url: `${base}/writing/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.8,
    })),
    ...tags.map((entry) => ({
      url: `${base}/topics/${encodeURIComponent(entry.tag)}`,
      lastModified: new Date(),
      priority: 0.3,
    })),
  ];
}

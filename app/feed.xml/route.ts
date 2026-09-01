import { leadEssay, recentPosts, site } from "@/content/site";

export const dynamic = "force-static";

type FeedItem = {
  title: string;
  href: string;
  dek: string;
  published: string;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Posts still pointing at "#" have nowhere to link, so they are left out of
 * the feed rather than published as dead entries. The feed is valid but empty
 * until the first post has a real URL.
 */
export function GET() {
  const candidates: FeedItem[] = [
    {
      title: leadEssay.title,
      href: leadEssay.href,
      dek: leadEssay.body[0],
      published: leadEssay.published,
    },
    ...recentPosts.map((post) => ({
      title: post.title,
      href: post.href,
      dek: post.dek,
      published: post.published,
    })),
  ];

  const items = candidates
    .filter((item) => item.href !== "#")
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((item) => {
      const url = new URL(item.href, site.url).toString();
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(item.dek)}</description>
      <pubDate>${new Date(`${item.published}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.tagline)}</description>
    <language>en</language>
    <atom:link href="${escapeXml(`${site.url}/feed.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

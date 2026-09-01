import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { longDate } from "@/lib/format";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Archive",
  description: "Everything published on The Legal Stack.",
  alternates: { canonical: "/archive" },
};

export default async function ArchivePage() {
  const posts = await getPublishedPosts();

  const byYear = new Map<number, typeof posts>();
  for (const post of posts) {
    const year = (post.publishedAt ?? post.createdAt).getUTCFullYear();
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <div className="page">
      <Masthead />
      <section className="section index">
        <h1 className="index__title display">Archive</h1>
        {posts.length === 0 ? (
          <p className="writing__empty">Nothing published yet.</p>
        ) : (
          [...byYear.entries()]
            .sort((a, b) => b[0] - a[0])
            .map(([year, yearPosts]) => (
              <div key={year} className="index__year">
                <h2 className="eyebrow index__year-label">{year}</h2>
                <ol className="writing__list">
                  {yearPosts.map((post) => (
                    <li key={post.id} className="index__item">
                      <h3 className="writing__title">
                        <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="writing__dek">{post.dek}</p>
                      <span className="writing__date">
                        {longDate(post.publishedAt)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))
        )}
        <p className="post__back">
          <Link href="/">← The Legal Stack</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { excerpt, longDate } from "@/lib/format";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Everything published on The Legal Stack, newest first: notes on artificial intelligence inside transactional practice.",
  alternates: { canonical: "/writing" },
};

export default async function WritingIndex() {
  const posts = await getPublishedPosts();

  return (
    <div className="page">
      <Masthead />
      <section className="section listing">
        <div className="listing__head">
          <h1 className="listing__title display">Writing</h1>
          <p className="listing__dek">
            Everything published here, newest first.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="writing__empty">Nothing published yet.</p>
        ) : (
          <ol className="listing__list">
            {posts.map((post) => (
              <li key={post.id} className="listing__item">
                <div className="listing__meta">
                  <time
                    dateTime={(post.publishedAt ?? post.createdAt).toISOString()}
                  >
                    {longDate(post.publishedAt ?? post.createdAt)}
                  </time>
                  <span>{post.readingMinutes ?? 1} min</span>
                </div>
                <h2 className="listing__post-title display">
                  <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="listing__excerpt">{excerpt(post)}</p>
                <div className="listing__foot">
                  {post.tags.length > 0 && (
                    <span className="listing__tags">
                      {post.tags.map((tag, index) => (
                        <span key={tag}>
                          <Link href={`/topics/${encodeURIComponent(tag)}`}>
                            {tag}
                          </Link>
                          {index < post.tags.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  )}
                  <Link
                    href={`/writing/${post.slug}`}
                    className="listing__continue"
                  >
                    Continue reading
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        )}

        <p className="post__back">
          <Link href="/">← The Legal Stack</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}

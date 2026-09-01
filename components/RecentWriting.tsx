import Link from "next/link";
import type { Post } from "@/lib/posts";
import { numeral, shortDate } from "@/lib/format";

export function RecentWriting({
  posts,
  tags,
  totalPublished,
}: {
  posts: Post[];
  tags: { tag: string; count: number }[];
  /** Everything published, including the lead essay shown above this list. */
  totalPublished: number;
}) {
  return (
    <section id="writing" className="section writing">
      <div className="writing__head">
        <h2 className="eyebrow">Recent writing</h2>
        {totalPublished > 0 && (
          <Link href="/writing" className="writing__archive">
            All writing
          </Link>
        )}
      </div>

      {/*
        The empty note belongs to a site with nothing on it. Once the lead
        essay is carrying the only post, this list simply stays quiet rather
        than contradicting the essay above it.
      */}
      {posts.length === 0 ? (
        totalPublished === 0 ? (
          <p className="writing__empty">Nothing published yet.</p>
        ) : null
      ) : (
        <ol className="writing__list">
          {posts.map((post, index) => (
            <li key={post.id} className="writing__item">
              <span className="writing__numeral">{numeral(index)}</span>
              <h3 className="writing__title">
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="writing__dek">{post.dek}</p>
              <span className="writing__date">
                {shortDate(post.publishedAt)}
              </span>
            </li>
          ))}
        </ol>
      )}

      {tags.length > 0 && (
        <p className="writing__filed">
          Filed under{" "}
          {tags.map((entry, index) => (
            <span key={entry.tag}>
              <Link href={`/topics/${encodeURIComponent(entry.tag)}`}>
                {entry.tag}
              </Link>
              {index < tags.length - 2
                ? ", "
                : index === tags.length - 2
                  ? ", and "
                  : "."}
            </span>
          ))}
        </p>
      )}
    </section>
  );
}

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { shortDate } from "@/lib/format";
import { LeadIllustration } from "./LeadIllustration";

/** First paragraph or two of the body, as the standfirst on the landing page. */
function standfirst(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0 && !block.startsWith("#"))
    .slice(0, 2);
}

export function LeadEssay({ post }: { post: Post }) {
  const href = `/writing/${post.slug}`;
  const eyebrow = post.tags[0]
    ? `Lead essay · ${post.tags[0]}`
    : "Lead essay";

  return (
    <section className="section lead">
      <div>
        <p className="lead__eyebrow">{eyebrow}</p>
        <h2 className="lead__title display">
          <Link href={href}>{post.title}</Link>
        </h2>
        {standfirst(post.body).map((paragraph, index) => (
          <p key={index} className="lead__body">
            {paragraph}
          </p>
        ))}
        <div className="lead__meta">
          <span>{shortDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingMinutes ?? 1} min</span>
          <span>·</span>
          <Link href={href}>Continue reading</Link>
        </div>
      </div>
      <LeadIllustration />
    </section>
  );
}

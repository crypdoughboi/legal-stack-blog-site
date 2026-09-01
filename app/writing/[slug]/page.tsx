import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { Markdown } from "@/components/Markdown";
import { longDate } from "@/lib/format";
import { getPostBySlug } from "@/lib/posts";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      publishedTime: post.publishedAt?.toISOString(),
      url: `/writing/${post.slug}`,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
    },
    alternates: { canonical: `/writing/${post.slug}` },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="page">
      <Masthead />
      <article className="section post">
        <div className="post__head">
          {post.tags[0] && <p className="post__eyebrow">{post.tags[0]}</p>}
          <h1 className="post__title display">{post.title}</h1>
          {post.dek && <p className="post__dek">{post.dek}</p>}
          <div className="post__meta">
            <span>{longDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readingMinutes ?? 1} min</span>
          </div>
        </div>

        <div className="prose">
          <Markdown>{post.body}</Markdown>
        </div>

        {post.tags.length > 0 && (
          <p className="post__tags">
            Filed under{" "}
            {post.tags.map((tag, index) => (
              <span key={tag}>
                <Link href={`/topics/${encodeURIComponent(tag)}`}>{tag}</Link>
                {index < post.tags.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}

        <p className="post__back">
          <Link href="/">← The Legal Stack</Link>
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}

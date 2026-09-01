import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { longDate } from "@/lib/format";
import { getPostsByTag } from "@/lib/posts";

export const revalidate = 60;

type Params = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);

  return {
    title: label,
    description: `Posts filed under ${label}.`,
    alternates: { canonical: `/topics/${tag}` },
  };
}

export default async function TopicPage({ params }: Params) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const posts = await getPostsByTag(label);

  if (posts.length === 0) notFound();

  return (
    <div className="page">
      <Masthead />
      <section className="section index">
        <p className="post__eyebrow">Filed under</p>
        <h1 className="index__title display">{label}</h1>
        <ol className="writing__list">
          {posts.map((post) => (
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
        <p className="post__back">
          <Link href="/">← The Legal Stack</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}

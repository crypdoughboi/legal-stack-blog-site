import { notFound } from "next/navigation";
import { PostEditor } from "@/components/PostEditor";
import { getPostById } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <PostEditor
      post={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        dek: post.dek,
        body: post.body,
        status: post.status,
        featured: post.featured,
        tags: post.tags,
        publishedAt: post.publishedAt
          ? post.publishedAt.toISOString().slice(0, 10)
          : "",
      }}
    />
  );
}

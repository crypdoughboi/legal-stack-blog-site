"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  clearOtherFeatured,
  createPost,
  deletePost,
  getPostById,
  slugExists,
  slugify,
  updatePost,
  type PostInput,
} from "@/lib/posts";

export type ActionState = { error?: string };

/** Every write re-checks the session; the middleware is a convenience, not the gate. */
async function requireAuthor() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

function refresh(slug: string, tags: string[]) {
  revalidatePath("/");
  revalidatePath("/archive");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/writing/${slug}`);
  for (const tag of tags) {
    revalidatePath(`/topics/${encodeURIComponent(tag)}`);
  }
}

function parseTags(raw: string) {
  return [
    ...new Set(
      raw
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
}

export async function savePost(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuthor();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const dek = String(formData.get("dek") ?? "").trim();
  const status = formData.get("status") === "published" ? "published" : "draft";
  const featured = formData.get("featured") === "on";
  const tags = parseTags(String(formData.get("tags") ?? ""));
  const publishedInput = String(formData.get("publishedAt") ?? "").trim();

  if (!title) return { error: "A title is required." };
  if (!body.trim()) return { error: "The post has no body yet." };

  const slug = slugify(String(formData.get("slug") ?? "") || title);
  if (!slug) return { error: "That title does not produce a usable URL." };

  if (await slugExists(slug, id || undefined)) {
    return { error: `Another post already uses the URL /writing/${slug}.` };
  }

  const existing = id ? await getPostById(id) : null;

  // Publishing stamps the date once; later edits keep the original date
  // unless one is entered by hand.
  let publishedAt: Date | null = null;
  if (publishedInput) {
    publishedAt = new Date(`${publishedInput}T12:00:00Z`);
  } else if (status === "published") {
    publishedAt = existing?.publishedAt ?? new Date();
  }

  const input: PostInput = {
    slug,
    title,
    dek,
    body,
    status,
    featured,
    tags,
    publishedAt,
  };

  let savedId = id;

  try {
    if (existing) {
      await updatePost(existing.id, input);
    } else {
      const created = await createPost(input);
      savedId = created.id;
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Could not save this post.",
    };
  }

  if (featured && savedId) await clearOtherFeatured(savedId);

  refresh(slug, tags);
  redirect("/admin");
}

export async function removePost(formData: FormData) {
  await requireAuthor();

  const id = String(formData.get("id") ?? "");
  const post = id ? await getPostById(id) : null;
  if (!post) redirect("/admin");

  await deletePost(id);
  refresh(post.slug, post.tags);
  redirect("/admin");
}

import { getSql } from "./db";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  status: PostStatus;
  featured: boolean;
  tags: string[];
  readingMinutes: number | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type Row = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  status: PostStatus;
  featured: boolean;
  tags: string[];
  reading_minutes: number | null;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

function toPost(row: Row): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    dek: row.dek,
    body: row.body,
    status: row.status,
    featured: row.featured,
    tags: row.tags ?? [],
    readingMinutes: row.reading_minutes,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Roughly 220 words a minute, floored at one. */
export function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Published posts, newest first. Empty when the database is unconfigured. */
export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = limit
    ? await sql<Row[]>`
        select * from posts
        where status = 'published'
        order by published_at desc nulls last, created_at desc
        limit ${limit}`
    : await sql<Row[]>`
        select * from posts
        where status = 'published'
        order by published_at desc nulls last, created_at desc`;

  return rows.map(toPost);
}

/**
 * The lead essay: the newest published post flagged featured, falling back to
 * the newest published post so the slot is never empty once anything exists.
 */
export async function getFeaturedPost(): Promise<Post | null> {
  const sql = getSql();
  if (!sql) return null;

  const [row] = await sql<Row[]>`
    select * from posts
    where status = 'published'
    order by featured desc, published_at desc nulls last, created_at desc
    limit 1`;

  return row ? toPost(row) : null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const sql = getSql();
  if (!sql) return null;

  const [row] = await sql<Row[]>`
    select * from posts where slug = ${slug} and status = 'published' limit 1`;

  return row ? toPost(row) : null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = await sql<Row[]>`
    select * from posts
    where status = 'published' and ${tag} = any (tags)
    order by published_at desc nulls last, created_at desc`;

  return rows.map(toPost);
}

/** Distinct tags across published posts, with counts, alphabetical. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = await sql<{ tag: string; count: string }[]>`
    select unnest(tags) as tag, count(*) as count
    from posts
    where status = 'published'
    group by tag
    order by tag asc`;

  return rows.map((row) => ({ tag: row.tag, count: Number(row.count) }));
}

/* --- author-only reads and writes ------------------------------ */

export async function getAllPosts(): Promise<Post[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = await sql<Row[]>`
    select * from posts
    order by coalesce(published_at, updated_at) desc`;

  return rows.map(toPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const sql = getSql();
  if (!sql) return null;

  const [row] = await sql<Row[]>`select * from posts where id = ${id} limit 1`;
  return row ? toPost(row) : null;
}

export type PostInput = {
  slug: string;
  title: string;
  dek: string;
  body: string;
  status: PostStatus;
  featured: boolean;
  tags: string[];
  publishedAt: Date | null;
};

export async function createPost(input: PostInput): Promise<Post> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");

  const [row] = await sql<Row[]>`
    insert into posts
      (slug, title, dek, body, status, featured, tags, reading_minutes, published_at)
    values (
      ${input.slug}, ${input.title}, ${input.dek}, ${input.body},
      ${input.status}, ${input.featured}, ${input.tags},
      ${readingMinutes(input.body)}, ${input.publishedAt}
    )
    returning *`;

  return toPost(row);
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");

  const [row] = await sql<Row[]>`
    update posts set
      slug = ${input.slug},
      title = ${input.title},
      dek = ${input.dek},
      body = ${input.body},
      status = ${input.status},
      featured = ${input.featured},
      tags = ${input.tags},
      reading_minutes = ${readingMinutes(input.body)},
      published_at = ${input.publishedAt}
    where id = ${id}
    returning *`;

  return toPost(row);
}

export async function deletePost(id: string): Promise<void> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");

  await sql`delete from posts where id = ${id}`;
}

/** Only one post carries the lead slot. */
export async function clearOtherFeatured(id: string): Promise<void> {
  const sql = getSql();
  if (!sql) return;

  await sql`update posts set featured = false where id <> ${id}`;
}

export async function slugExists(slug: string, excludeId?: string) {
  const sql = getSql();
  if (!sql) return false;

  const rows = excludeId
    ? await sql`select 1 from posts where slug = ${slug} and id <> ${excludeId} limit 1`
    : await sql`select 1 from posts where slug = ${slug} limit 1`;

  return rows.length > 0;
}

import Link from "next/link";
import { removePost } from "./actions";
import { longDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import { isDatabaseConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title display">Posts</h1>
        <Link href="/admin/new" className="admin__button">
          New post
        </Link>
      </div>

      {!isDatabaseConfigured && (
        <p className="admin__notice">
          No database is configured, so nothing can be saved yet. Set
          DATABASE_URL in the project&rsquo;s environment variables.
        </p>
      )}

      {posts.length === 0 ? (
        <p className="admin__empty">
          Nothing written yet. <Link href="/admin/new">Start the first post.</Link>
        </p>
      ) : (
        <table className="admin__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link href={`/admin/${post.id}`}>{post.title}</Link>
                  {post.featured && post.status === "published" && (
                    <span className="admin__flag">lead</span>
                  )}
                  <span className="admin__slug">/writing/{post.slug}</span>
                </td>
                <td>
                  <span
                    className={
                      post.status === "published"
                        ? "admin__status is-live"
                        : "admin__status"
                    }
                  >
                    {post.status}
                  </span>
                </td>
                <td className="admin__date">
                  {post.publishedAt ? longDate(post.publishedAt) : "—"}
                </td>
                <td className="admin__actions">
                  {post.status === "published" && (
                    <Link href={`/writing/${post.slug}`}>View</Link>
                  )}
                  <Link href={`/admin/${post.id}`}>Edit</Link>
                  <form action={removePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="admin__link-button is-danger">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

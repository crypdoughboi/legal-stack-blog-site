"use client";

import { useActionState, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost, type ActionState } from "@/app/admin/actions";

export type EditorPost = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  status: "draft" | "published";
  featured: boolean;
  tags: string[];
  publishedAt: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function PostEditor({ post }: { post?: EditorPost }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    savePost,
    {},
  );

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [body, setBody] = useState(post?.body ?? "");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  /** Drops the uploaded image in as Markdown at the cursor. */
  function insertAtCursor(snippet: string) {
    const textarea = bodyRef.current;
    if (!textarea) {
      setBody((current) => `${current}\n\n${snippet}\n`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = `${body.slice(0, start)}${snippet}${body.slice(end)}`;
    setBody(next);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
    });
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError(null);

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        setUploadError(result.error ?? "Upload failed.");
        return;
      }

      insertAtCursor(`\n\n![${file.name.replace(/\.[^.]+$/, "")}](${result.url})\n\n`);
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="editor">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <div className="editor__head">
        <h1 className="admin__title display">
          {post ? "Edit post" : "New post"}
        </h1>
        <div className="editor__actions">
          <button
            type="button"
            className="admin__link-button"
            onClick={() => setPreview((value) => !value)}
          >
            {preview ? "Write" : "Preview"}
          </button>
          <button type="submit" className="admin__button" disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {state.error && <p className="editor__error">{state.error}</p>}

      <label className="editor__field">
        <span>Title</span>
        <input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Why legal AI tends to stall around week six"
          required
        />
      </label>

      <label className="editor__field">
        <span>URL</span>
        <input
          name="slug"
          value={effectiveSlug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
          placeholder="auto-generated from the title"
        />
        <small>/writing/{effectiveSlug || "…"}</small>
      </label>

      <label className="editor__field">
        <span>Standfirst</span>
        <input
          name="dek"
          defaultValue={post?.dek ?? ""}
          placeholder="One line, shown under the title in the list"
        />
      </label>

      <label className="editor__field">
        <span>Topics</span>
        <input
          name="tags"
          defaultValue={post?.tags.join(", ") ?? ""}
          placeholder="adoption, diligence, drafting"
        />
        <small>Comma separated. These become the &ldquo;filed under&rdquo; links.</small>
      </label>

      <div className="editor__field">
        <span>Body</span>
        {preview ? (
          <div className="prose editor__preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {body || "_Nothing to preview yet._"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            ref={bodyRef}
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={24}
            placeholder="Markdown. Headings with ##, links with [text](url)."
            required
          />
        )}
        {preview && <input type="hidden" name="body" value={body} />}
      </div>

      <div className="editor__field">
        <span>Image</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleUpload(file);
            event.target.value = "";
          }}
        />
        <small>
          {uploading
            ? "Uploading…"
            : "Uploads and inserts the Markdown at your cursor."}
        </small>
        {uploadError && <p className="editor__error">{uploadError}</p>}
      </div>

      <div className="editor__row">
        <label className="editor__field">
          <span>Status</span>
          <select name="status" defaultValue={post?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <label className="editor__field">
          <span>Date</span>
          <input
            type="date"
            name="publishedAt"
            defaultValue={post?.publishedAt ?? ""}
          />
          <small>Left empty, publishing stamps today.</small>
        </label>

        <label className="editor__checkbox">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured ?? false}
          />
          <span>Lead essay on the front page</span>
        </label>
      </div>
    </form>
  );
}

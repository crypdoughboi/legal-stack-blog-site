import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSession } from "@/lib/auth";
import { env, isStorageConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/** Author-only image upload into the Supabase storage bucket. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!isStorageConfigured) {
    return NextResponse.json(
      { error: "Image storage is not configured on this deployment." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "That file type is not allowed." },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Images must be 8 MB or smaller." },
      { status: 413 },
    );
  }

  const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: { persistSession: false },
  });

  // Server-generated name: nothing from the client reaches the storage path.
  const name = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${
    EXTENSIONS[file.type]
  }`;

  const { error } = await supabase.storage
    .from(env.supabaseBucket)
    .upload(name, await file.arrayBuffer(), {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(env.supabaseBucket).getPublicUrl(name);

  return NextResponse.json({ url: data.publicUrl });
}

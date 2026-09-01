import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { isAuthConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  state: "That sign-in attempt expired or did not match. Try again.",
  exchange: "GitHub would not complete the sign-in. Try again.",
  profile: "Could not read your GitHub profile.",
  forbidden: "That GitHub account is not the author of this site.",
  unconfigured: "Sign-in is not configured on this deployment yet.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/admin");

  const { error } = await searchParams;
  const message = error ? (MESSAGES[error] ?? MESSAGES.state) : null;

  return (
    <div className="page auth">
      <div className="auth__frame">
        <p className="auth__eyebrow">The Legal Stack</p>
        <h1 className="auth__title display">Author sign-in</h1>
        <p className="auth__dek">
          This page is for the author. Everything worth reading is on the{" "}
          <Link href="/">front page</Link>.
        </p>

        {message && <p className="auth__error">{message}</p>}

        {isAuthConfigured ? (
          <a className="auth__button" href="/api/auth/signin">
            Continue with GitHub
          </a>
        ) : (
          <p className="auth__error">
            Sign-in is not configured on this deployment yet.
          </p>
        )}
      </div>
    </div>
  );
}

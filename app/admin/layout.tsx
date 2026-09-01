import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editor",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page admin">
      <header className="admin__bar">
        <Link href="/admin" className="admin__brand">
          The Legal Stack · Editor
        </Link>
        <nav className="admin__nav">
          <Link href="/">View site</Link>
          <Link href="/admin/new">New post</Link>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="admin__link-button">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="admin__main">{children}</main>
    </div>
  );
}

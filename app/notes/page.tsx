import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { practiceNotes } from "@/content/site";

export const metadata: Metadata = {
  title: "Practice notes",
  description: practiceNotes.dek,
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <div className="page">
      <Masthead />
      <section className="section listing">
        <div className="listing__head">
          <p className="post__eyebrow">Practice notes</p>
          <h1 className="listing__title display">{practiceNotes.eyebrow}</h1>
          <p className="listing__dek">{practiceNotes.dek}</p>
        </div>

        <div className="notes__full">
          {practiceNotes.notes.map((note) => (
            <article key={note.group} className="notes__row">
              <h2 className="notes__group display">{note.group}</h2>
              <p className="notes__body">{note.body}</p>
            </article>
          ))}
        </div>

        <p className="post__back">
          <Link href="/">← The Legal Stack</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}

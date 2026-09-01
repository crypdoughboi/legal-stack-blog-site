import Link from "next/link";
import { practiceNotes } from "@/content/site";

export function PracticeNotes() {
  return (
    <section id="notes" className="section notes">
      <h2 className="eyebrow notes__eyebrow">{practiceNotes.eyebrow}</h2>
      <p className="notes__dek">{practiceNotes.dek}</p>
      <div>
        {practiceNotes.notes.map((note) => (
          <div key={note.group} className="notes__row">
            <h3 className="notes__group display">{note.group}</h3>
            <p className="notes__body">{note.body}</p>
          </div>
        ))}
      </div>
      <p className="notes__more">
        <Link href="/notes">The practice notes in full</Link>
      </p>
    </section>
  );
}

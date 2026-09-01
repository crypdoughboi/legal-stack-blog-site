import { premise } from "@/content/site";

export function Premise() {
  return (
    <section className="section premise">
      <p className="premise__eyebrow">{premise.eyebrow}</p>
      <h2 className="premise__heading display">{premise.heading}</h2>
      <p className="premise__body">{premise.body}</p>
      <p className="premise__byline">{premise.byline}</p>
    </section>
  );
}

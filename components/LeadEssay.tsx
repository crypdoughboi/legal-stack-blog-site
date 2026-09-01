import { leadEssay } from "@/content/site";
import { LeadIllustration } from "./LeadIllustration";

export function LeadEssay() {
  return (
    <section className="section lead">
      <div>
        <p className="lead__eyebrow">{leadEssay.eyebrow}</p>
        <h2 className="lead__title display">
          <a href={leadEssay.href}>{leadEssay.title}</a>
        </h2>
        {leadEssay.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="lead__body">
            {paragraph}
          </p>
        ))}
        <div className="lead__meta">
          <span>{leadEssay.date}</span>
          <span>·</span>
          <span>{leadEssay.readingTime}</span>
          <span>·</span>
          <a href={leadEssay.href}>Continue reading</a>
        </div>
      </div>
      <LeadIllustration />
    </section>
  );
}

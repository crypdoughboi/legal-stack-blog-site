import { about } from "@/content/site";
import { PlaceholderPlate } from "./PlaceholderPlate";

export function About() {
  return (
    <section id="about" className="section about">
      <div>
        <p className="eyebrow about__eyebrow">{about.eyebrow}</p>
        <h2 className="about__heading display">{about.heading}</h2>
        {about.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="about__body">
            {paragraph}
          </p>
        ))}
        <a href={about.link.href} className="about__link">
          {about.link.label}
        </a>
      </div>
      <PlaceholderPlate
        id="portrait"
        width={300}
        height={375}
        labelY={190}
        fontSize={14}
        letterSpacing={1.5}
        label="portrait — 4:5"
      />
    </section>
  );
}

import { site } from "@/content/site";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead__meta">
        <span>{site.author}</span>
        <span>{site.updated}</span>
      </div>
      <div className="masthead__plate">
        <h1 className="masthead__title display">{site.title}</h1>
        <p className="masthead__tagline">{site.tagline}</p>
      </div>
      <nav className="masthead__nav">
        {site.nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={"accent" in item && item.accent ? "is-accent" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

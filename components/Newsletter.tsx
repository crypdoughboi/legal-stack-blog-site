"use client";

import { newsletter } from "@/content/site";

export function Newsletter() {
  return (
    <section id="subscribe" className="subscribe">
      <div className="subscribe__frame">
        <p className="subscribe__eyebrow">{newsletter.eyebrow}</p>
        <h2 className="subscribe__heading display">{newsletter.heading}</h2>
        <p className="subscribe__dek">{newsletter.dek}</p>
        {/* Inert until a provider is wired up, same as the prototype. */}
        <form
          className="subscribe__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="subscribe-email">
            Email address
          </label>
          <input
            id="subscribe-email"
            className="subscribe__input"
            type="email"
            placeholder={newsletter.placeholder}
          />
          <button className="subscribe__button" type="submit">
            {newsletter.cta}
          </button>
        </form>
        <p className="subscribe__footnote">{newsletter.footnote}</p>
      </div>
    </section>
  );
}

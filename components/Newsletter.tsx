"use client";

import { newsletter } from "@/content/site";

const BUTTONDOWN_ENDPOINT = "https://buttondown.com/api/emails/embed-subscribe";

export function Newsletter() {
  const username = newsletter.buttondownUsername;
  const wired = username.length > 0;

  return (
    <section id="subscribe" className="subscribe">
      <div className="subscribe__frame">
        <p className="subscribe__eyebrow">{newsletter.eyebrow}</p>
        <h2 className="subscribe__heading display">{newsletter.heading}</h2>
        <p className="subscribe__dek">{newsletter.dek}</p>
        <form
          className="subscribe__form"
          action={wired ? `${BUTTONDOWN_ENDPOINT}/${username}` : undefined}
          method={wired ? "post" : undefined}
          target={wired ? "_blank" : undefined}
          rel={wired ? "noopener noreferrer" : undefined}
          onSubmit={wired ? undefined : (event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="subscribe-email">
            Email address
          </label>
          <input
            id="subscribe-email"
            className="subscribe__input"
            type="email"
            name="email"
            autoComplete="email"
            required={wired}
            placeholder={newsletter.placeholder}
          />
          {wired && <input type="hidden" name="embed" value="1" />}
          <button className="subscribe__button" type="submit">
            {newsletter.cta}
          </button>
        </form>
        <p className="subscribe__footnote">{newsletter.footnote}</p>
      </div>
    </section>
  );
}

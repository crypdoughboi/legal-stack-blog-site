import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__links">
        {footer.links
          .filter((link) => link.href.length > 0)
          .map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
      </div>
      <p className="footer__disclaimer">{footer.disclaimer}</p>
      {/*
        The way back into the editor. Deliberately quiet: it sits below the
        disclaimer at low contrast and only resolves on hover or keyboard
        focus. /login sends an already-signed-in author straight to /admin,
        so this stays a plain link and the page stays static.
      */}
      <p className="footer__author">
        <a href="/login">Author sign-in</a>
      </p>
    </footer>
  );
}

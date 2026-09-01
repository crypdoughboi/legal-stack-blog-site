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
    </footer>
  );
}

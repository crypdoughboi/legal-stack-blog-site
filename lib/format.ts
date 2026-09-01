/** "Aug 24" — the masthead's date register, matching the original design. */
export function shortDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(value);
}

/** "August 24, 2026" — for post pages, where the year matters. */
export function longDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** The list numerals from the design: I., II., III., IV. */
export function numeral(index: number) {
  return `${ROMAN[index] ?? String(index + 1)}.`;
}

/**
 * The preview line on index pages: the standfirst when there is one, else
 * the opening prose of the post, trimmed at a word boundary.
 */
export function excerpt(
  { dek, body }: { dek: string; body: string },
  max = 220,
) {
  if (dek.trim()) return dek.trim();

  const opening = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#"));

  if (!opening) return "";
  if (opening.length <= max) return opening;

  return `${opening.slice(0, opening.lastIndexOf(" ", max))}…`;
}

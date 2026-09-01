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

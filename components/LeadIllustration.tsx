/**
 * The 13:16 plate beside the lead essay: an abstract document column in the
 * page palette — hairline text rules, a marked-up passage in the accent, and
 * a margin mark. Deterministic geometry, so SSR and client agree.
 */

const COLUMN_X = 64;
const COLUMN_W = 392;
const LINE_H = 6;

/** Line widths as fractions of the column, grouped into paragraphs. */
const PARAGRAPHS = [
  [1, 0.96, 1, 0.88, 0.97, 0.62],
  [1, 0.93, 1, 0.71],
  [0.98, 1, 0.62],
];

/** Zero-based line indices, counted across all paragraphs, that read as struck. */
const MARKED = new Set([6, 7, 8]);

export function LeadIllustration() {
  const lines: {
    y: number;
    w: number;
    marked: boolean;
    index: number;
  }[] = [];

  let y = 176;
  let index = 0;

  for (const paragraph of PARAGRAPHS) {
    for (const fraction of paragraph) {
      lines.push({
        y,
        w: COLUMN_W * fraction,
        marked: MARKED.has(index),
        index,
      });
      y += 24;
      index += 1;
    }
    y += 18;
  }

  const marked = lines.filter((line) => line.marked);
  const markTop = marked[0].y - 8;
  const markBottom = marked[marked.length - 1].y + LINE_H + 8;

  return (
    <div className="plate">
      <svg
        viewBox="0 0 520 640"
        role="img"
        aria-label="A column of text with one passage marked up in the margin"
      >
        <rect width="520" height="640" fill="var(--panel)" />

        {/* Masthead rules, echoing the page header's double rule. */}
        <rect x={COLUMN_X} y="72" width={COLUMN_W} height="2" fill="var(--ink)" />
        <rect x={COLUMN_X} y="79" width={COLUMN_W} height="1" fill="var(--ink)" />

        {/* Display line and byline above the body column. */}
        <rect x={COLUMN_X} y="104" width={244} height="10" fill="var(--ink)" />
        <rect x={COLUMN_X} y="126" width={168} height="10" fill="var(--ink)" />
        <rect
          x={COLUMN_X}
          y="152"
          width={96}
          height="4"
          fill="var(--lightest)"
        />

        {/* Body text as hairline rules. */}
        {lines.map((line) => (
          <rect
            key={line.index}
            x={COLUMN_X}
            y={line.y}
            width={line.w}
            height={LINE_H}
            fill={line.marked ? "var(--panel-stripe)" : "var(--rule)"}
          />
        ))}

        {/* The marked passage: a margin bracket, a strike, and a query mark. */}
        <rect
          x={COLUMN_X - 22}
          y={markTop}
          width="3"
          height={markBottom - markTop}
          fill="var(--accent)"
        />
        {marked.map((line) => (
          <rect
            key={`strike-${line.index}`}
            x={COLUMN_X}
            y={line.y + LINE_H / 2 - 1}
            width={line.w}
            height="2"
            fill="var(--accent)"
          />
        ))}
        <circle
          cx={COLUMN_X - 20.5}
          cy={markTop - 18}
          r="5"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />

        {/* Closing rule and folio. */}
        <rect
          x={COLUMN_X}
          y="556"
          width={COLUMN_W}
          height="1"
          fill="var(--rule)"
        />
        <rect
          x={COLUMN_X}
          y="576"
          width={40}
          height="4"
          fill="var(--lightest)"
        />
      </svg>
    </div>
  );
}

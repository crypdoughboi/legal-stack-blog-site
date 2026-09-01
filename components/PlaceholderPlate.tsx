/**
 * The hatched image slots from the design. Two of them are live: a 13:16
 * illustration beside the lead essay and a 4:5 portrait in the about
 * section. Swap the whole component out for an <Image /> once real art
 * exists.
 */
export function PlaceholderPlate({
  id,
  width,
  height,
  label,
  fontSize = 16,
  letterSpacing = 2,
  labelY,
}: {
  id: string;
  width: number;
  height: number;
  label: string;
  fontSize?: number;
  letterSpacing?: number;
  labelY?: number;
}) {
  const patternId = `plate-${id}`;

  return (
    <div className="plate">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <defs>
          <pattern
            id={patternId}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="var(--panel)" />
            <rect width="12" height="4" fill="var(--panel-stripe)" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill={`url(#${patternId})`} />
        <text
          x={width / 2}
          y={labelY ?? height / 2 + 5}
          textAnchor="middle"
          fontFamily="var(--font-newsreader), Newsreader, Georgia, serif"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          fill="var(--lightest)"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

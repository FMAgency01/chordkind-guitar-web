import { lookupChordShape, lookupBarreShape, type ChordShape } from '@/data/chord-shapes';

const STRING_COUNT = 6;
const FRET_COUNT = 4;

type Props = {
  chord: string;
  size?: 'sm' | 'md';
  className?: string;
  voicing?: 'barre';
  leftHanded?: boolean;
};

type Dot = { stringIndex: number; x: number; y: number; finger: number; relative: number };
type Barre = { finger: number; relative: number; startX: number; endX: number; y: number; minString: number; maxString: number };

function DiagramSvg({ shape, label, size, leftHanded = false }: { shape: ChordShape; label: string; size: 'sm' | 'md'; leftHanded?: boolean }) {
  const w = size === 'sm' ? 88 : 112;
  const h = size === 'sm' ? 112 : 140;
  const padL = leftHanded ? 12 : 18;
  const padR = leftHanded ? 18 : 10;
  const padT = 22;
  const padB = 14;
  const gridW = w - padL - padR;
  const gridH = h - padT - padB;
  const stringGap = gridW / (STRING_COUNT - 1);
  const fretGap = gridH / FRET_COUNT;
  const nutY = padT;
  const showNut = shape.baseFret === 1;
  const r = size === 'sm' ? 7.5 : 9;
  const barreH = size === 'sm' ? 14 : 17;

  // 1. Identify all fretted notes
  const rawDots: { stringIndex: number; finger: number; relative: number }[] = [];
  shape.frets.forEach((fret, i) => {
    if (fret === null || fret === 0) return;
    const relative = fret - shape.baseFret + 1;
    if (relative < 1 || relative > FRET_COUNT) return;
    rawDots.push({ stringIndex: i, finger: shape.fingers[i] || 0, relative });
  });

  // 2. Identify full barre spans (e.g. finger 1 spanning across strings with higher fretted notes in between)
  const barres: Barre[] = [];
  const coveredStrings = new Set<string>(); // key: `${stringIndex}:${relative}`

  // Check each finger (typically finger 1) for barre
  const uniqueFingers = Array.from(new Set(rawDots.map((d) => d.finger).filter((f) => f > 0)));
  for (const finger of uniqueFingers) {
    const fingerDots = rawDots.filter((d) => d.finger === finger);
    // Group by relative fret
    const fretsForFinger = Array.from(new Set(fingerDots.map((d) => d.relative)));
    for (const rel of fretsForFinger) {
      const dotsAtRel = fingerDots.filter((d) => d.relative === rel);
      if (dotsAtRel.length >= 2) {
        const stringIndices = dotsAtRel.map((d) => d.stringIndex).sort((a, b) => a - b);
        const minS = stringIndices[0];
        const maxS = stringIndices[stringIndices.length - 1];

        // Check if all strings between minS and maxS are valid (either fretted by this finger or fretted higher)
        let isValidBarre = true;
        for (let s = minS; s <= maxS; s++) {
          const fretVal = shape.frets[s];
          if (fretVal === null || fretVal === 0) {
            isValidBarre = false;
            break;
          }
          const relFret = fretVal - shape.baseFret + 1;
          if (relFret < rel) {
            isValidBarre = false;
            break;
          }
        }

        if (isValidBarre) {
          const pos1 = leftHanded ? STRING_COUNT - 1 - minS : minS;
          const pos2 = leftHanded ? STRING_COUNT - 1 - maxS : maxS;
          const x1 = padL + pos1 * stringGap;
          const x2 = padL + pos2 * stringGap;
          const startX = Math.min(x1, x2);
          const endX = Math.max(x1, x2);
          const y = nutY + (rel - 0.5) * fretGap;

          barres.push({ finger, relative: rel, startX, endX, y, minString: minS, maxString: maxS });

          // Mark all dots at this relative fret between minS and maxS as covered by the barre
          for (let s = minS; s <= maxS; s++) {
            const fretVal = shape.frets[s];
            if (fretVal !== null && fretVal - shape.baseFret + 1 === rel) {
              coveredStrings.add(`${s}:${rel}`);
            }
          }
        }
      }
    }
  }

  // 3. Collect individual single dots not absorbed into barre
  const singleDots: Dot[] = [];
  rawDots.forEach((d) => {
    if (coveredStrings.has(`${d.stringIndex}:${d.relative}`)) return;
    const stringPos = leftHanded ? STRING_COUNT - 1 - d.stringIndex : d.stringIndex;
    const x = padL + stringPos * stringGap;
    const y = nutY + (d.relative - 0.5) * fretGap;
    singleDots.push({ stringIndex: stringPos, x, y, finger: d.finger, relative: d.relative });
  });

  return (
    <svg
      className="chord-diagram-svg"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`${label} chord fingering diagram${leftHanded ? ' (left-handed)' : ''}`}
    >
      <title>{`${label} chord diagram${leftHanded ? ' (left-handed)' : ''}`}</title>
      {/* Open / mute markers */}
      {shape.frets.map((fret, i) => {
        const stringPos = leftHanded ? STRING_COUNT - 1 - i : i;
        const x = padL + stringPos * stringGap;
        const y = padT - 11;
        if (fret === null) {
          return (
            <text
              key={`m-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="diagram-mute"
              fontSize={size === 'sm' ? 11 : 13}
              fontWeight="700"
            >
              ×
            </text>
          );
        }
        if (fret === 0) {
          return (
            <circle
              key={`o-${i}`}
              cx={x}
              cy={y}
              r={size === 'sm' ? 4 : 5}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="diagram-open"
            />
          );
        }
        return null;
      })}

      {/* Nut or top fret line */}
      <line
        x1={padL}
        y1={nutY}
        x2={padL + gridW}
        y2={nutY}
        stroke="currentColor"
        strokeWidth={showNut ? 3.5 : 1.5}
        strokeLinecap="square"
      />

      {/* Fret lines */}
      {Array.from({ length: FRET_COUNT }, (_, f) => (
        <line
          key={`fret-${f}`}
          x1={padL}
          y1={nutY + (f + 1) * fretGap}
          x2={padL + gridW}
          y2={nutY + (f + 1) * fretGap}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.55"
        />
      ))}

      {/* Strings */}
      {Array.from({ length: STRING_COUNT }, (_, s) => (
        <line
          key={`str-${s}`}
          x1={padL + s * stringGap}
          y1={nutY}
          x2={padL + s * stringGap}
          y2={nutY + gridH}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.7"
        />
      ))}

      {/* Base fret label when not at nut */}
      {shape.baseFret > 1 && (
        <text
          x={leftHanded ? padL + gridW + 10 : padL - 10}
          y={nutY + fretGap * 0.55}
          textAnchor="middle"
          dominantBaseline="middle"
          className="diagram-fret-num"
          fontSize={size === 'sm' ? 9 : 10}
          fontWeight="700"
        >
          {shape.baseFret}
        </text>
      )}

      {/* Continuous full barre bars */}
      {barres.map((b, i) => {
        const barW = b.endX - b.startX;
        const cx = (b.startX + b.endX) / 2;
        return (
          <g key={`barre-${i}`}>
            <rect
              x={b.startX - r}
              y={b.y - barreH / 2}
              width={barW + r * 2}
              height={barreH}
              rx={barreH / 2}
              ry={barreH / 2}
              className="diagram-dot"
            />
            {b.finger > 0 && (
              <text
                x={cx}
                y={b.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="diagram-finger"
                fontSize={size === 'sm' ? 10 : 11}
                fontWeight="700"
              >
                {b.finger}
              </text>
            )}
          </g>
        );
      })}

      {/* Individual finger dots (non-barre or higher fret finger placements) */}
      {singleDots.map((d, i) => (
        <g key={`dot-${i}`}>
          <circle cx={d.x} cy={d.y} r={r} className="diagram-dot" />
          {d.finger > 0 && (
            <text
              x={d.x}
              y={d.y + 0.5}
              textAnchor="middle"
              dominantBaseline="middle"
              className="diagram-finger"
              fontSize={size === 'sm' ? 10 : 11}
              fontWeight="700"
            >
              {d.finger}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

export function ChordDiagram({ chord, size = 'md', className = '', voicing, leftHanded = false }: Props) {
  const shape = voicing === 'barre' ? lookupBarreShape(chord) : lookupChordShape(chord);

  if (!shape) {
    return (
      <div className={`chord-diagram-fallback ${className}`} role="img" aria-label={`No diagram available for ${chord}`}>
        <span className="chord-diagram-fallback-name">{chord}</span>
        <span className="chord-diagram-fallback-note">Diagram coming soon</span>
      </div>
    );
  }

  return (
    <div className={`chord-diagram-frame ${className}`}>
      <DiagramSvg shape={shape} label={chord} size={size} leftHanded={leftHanded} />
    </div>
  );
}

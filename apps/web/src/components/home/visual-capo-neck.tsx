import { ChordDiagram } from '@/components/home/chord-diagram';
import { Sparkles } from 'lucide-react';

type Props = {
  fret: number;
  chords: string[];
  leftHanded?: boolean;
};

export function VisualCapoNeck({ fret, chords, leftHanded = false }: Props) {
  const TOTAL_FRETS = 7;
  const neckWidth = 460;
  const neckHeight = 90;
  const padLeft = 32;
  const padRight = 20;
  const padTop = 15;
  const padBottom = 20;
  const fretboardWidth = neckWidth - padLeft - padRight;
  const fretboardHeight = neckHeight - padTop - padBottom;
  const fretWidth = fretboardWidth / TOTAL_FRETS;
  const stringGap = fretboardHeight / 5;

  // Calculate capo X position (positioned right before fret wire)
  const capoX = padLeft + (fret - 0.5) * fretWidth;
  const markerFrets = [3, 5, 7];

  const stringNames = leftHanded ? ['e', 'B', 'G', 'D', 'A', 'E'] : ['E', 'A', 'D', 'G', 'B', 'e'];

  return (
    <div className="capo-visualizer-container">
      <div className="capo-header-row">
        <div className="capo-badge-group">
          <span className="capo-pill">
            <Sparkles size={14} /> CAPO FRET {fret}
          </span>
          <span className="capo-subtitle">
            Clamp at fret {fret} to play easy open shapes in the original key
          </span>
        </div>
      </div>

      <div className="capo-fretboard-wrap">
        <svg
          className="capo-fretboard-svg"
          viewBox={`0 0 ${neckWidth} ${neckHeight}`}
          role="img"
          aria-label={`Guitar fretboard showing capo positioned on fret ${fret}`}
        >
          {/* Fretboard background */}
          <rect
            x={padLeft}
            y={padTop}
            width={fretboardWidth}
            height={fretboardHeight}
            rx={4}
            className="fretboard-wood"
          />

          {/* Position inlay markers (dots on 3, 5, 7) */}
          {markerFrets.map((mFret) => {
            const cx = padLeft + (mFret - 0.5) * fretWidth;
            const cy = padTop + fretboardHeight / 2;
            return (
              <circle
                key={`marker-${mFret}`}
                cx={cx}
                cy={cy}
                r={4}
                className="fret-marker"
              />
            );
          })}

          {/* Nut (fret 0) */}
          <rect
            x={padLeft - 5}
            y={padTop - 2}
            width={5}
            height={fretboardHeight + 4}
            className="nut-bar"
          />

          {/* Fret wires */}
          {Array.from({ length: TOTAL_FRETS + 1 }, (_, i) => {
            const x = padLeft + i * fretWidth;
            return (
              <line
                key={`wire-${i}`}
                x1={x}
                y1={padTop}
                x2={x}
                y2={padTop + fretboardHeight}
                className="fret-wire"
              />
            );
          })}

          {/* Strings */}
          {Array.from({ length: 6 }, (_, s) => {
            const y = padTop + s * stringGap;
            const strokeWidth = 1 + (leftHanded ? 5 - s : s) * 0.45;
            return (
              <g key={`str-${s}`}>
                <text
                  x={padLeft - 14}
                  y={y + 3}
                  className="string-name-label"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {stringNames[s]}
                </text>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + fretboardWidth}
                  y2={y}
                  strokeWidth={strokeWidth}
                  className="guitar-string-line"
                />
              </g>
            );
          })}

          {/* Fret numbers along bottom */}
          {Array.from({ length: TOTAL_FRETS }, (_, i) => {
            const fretNum = i + 1;
            const x = padLeft + (i + 0.5) * fretWidth;
            const isCapoFret = fretNum === fret;
            return (
              <text
                key={`fret-num-${fretNum}`}
                x={x}
                y={padTop + fretboardHeight + 14}
                textAnchor="middle"
                fontSize="10"
                className={`fret-number ${isCapoFret ? 'capo-active-fret' : ''}`}
              >
                {fretNum}
              </text>
            );
          })}

          {/* Capo Clamp overlay */}
          <g className="capo-clamp-group" transform={`translate(${capoX - 7}, ${padTop - 8})`}>
            {/* Capo shadow */}
            <rect
              x={0}
              y={2}
              width={14}
              height={fretboardHeight + 16}
              rx={6}
              fill="rgba(0,0,0,0.18)"
            />
            {/* Capo main body */}
            <rect
              x={0}
              y={0}
              width={14}
              height={fretboardHeight + 16}
              rx={6}
              className="capo-clamp-body"
            />
            {/* Capo rubber strip */}
            <rect
              x={3}
              y={6}
              width={8}
              height={fretboardHeight + 4}
              rx={3}
              className="capo-clamp-rubber"
            />
            {/* Capo screw / lever hint */}
            <circle
              cx={7}
              cy={fretboardHeight + 10}
              r={3.5}
              className="capo-clamp-pin"
            />
          </g>
        </svg>
      </div>

      {/* Transposed open chord shape diagrams */}
      <div className="capo-diagrams-section">
        <div className="capo-diagrams-heading">
          <span className="capo-diagrams-label">Shapes to finger with Capo on {fret}:</span>
        </div>
        <div className="capo-diagrams-grid">
          {chords.map((chord, idx) => (
            <div key={`${chord}-${idx}`} className="capo-chord-item">
              <span className="capo-chord-name">{chord}</span>
              <ChordDiagram
                chord={chord}
                size="sm"
                className="diagram-capo"
                leftHanded={leftHanded}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

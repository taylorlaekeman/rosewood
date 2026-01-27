import type { Fret } from './frets';
import type { GuitarString } from './guitarStrings';

export function Fretboard({
  highlights = [],
}: {
  highlights?: Array<{ fret?: Fret; guitarString?: GuitarString }>;
}) {
  return (
    <div id="binding">
      <svg id="fretboard" viewBox={`0 0 ${FRET_POSITIONS[11] + 12} 170`}>
        {/* nut */}
        <line id="nut" x1="45" x2="45" y1="0" y2="100%" strokeWidth="10" />
        {FRET_POSITIONS.map((position) => (
          <line
            className="fret"
            key={position}
            strokeWidth="4"
            x1={position}
            x2={position}
            y1="0"
            y2="100%"
          />
        ))}
        {STRING_POSITIONS.map((position, i) => (
          <line
            className="guitar-string"
            key={position}
            strokeWidth={STRING_WIDTHS[i]}
            x1="0"
            x2="100%"
            y1={position}
            y2={position}
          />
        ))}
        {/* fret 3 marker */}
        <circle
          className="fret-marker"
          cx={FRET_POSITIONS[1] + (FRET_POSITIONS[2] - FRET_POSITIONS[1]) / 2}
          cy="85"
          r="10"
        />
        {/* fret 5 marker */}
        <circle
          className="fret-marker"
          cx={FRET_POSITIONS[3] + (FRET_POSITIONS[4] - FRET_POSITIONS[3]) / 2}
          cy="85"
          r="10"
        />
        {/* fret 7 marker */}
        <circle
          className="fret-marker"
          cx={FRET_POSITIONS[5] + (FRET_POSITIONS[6] - FRET_POSITIONS[5]) / 2}
          cy="85"
          r="10"
        />
        {/* fret 9 marker */}
        <circle
          className="fret-marker"
          cx={FRET_POSITIONS[7] + (FRET_POSITIONS[8] - FRET_POSITIONS[7]) / 2}
          cy="85"
          r="10"
        />
        {/* fret 12 markers */}
        <circle
          className="fret-marker"
          cx={
            FRET_POSITIONS[10] + (FRET_POSITIONS[11] - FRET_POSITIONS[10]) / 2
          }
          cy="55"
          r="10"
        />
        <circle
          className="fret-marker"
          cx={
            FRET_POSITIONS[10] + (FRET_POSITIONS[11] - FRET_POSITIONS[10]) / 2
          }
          cy="115"
          r="10"
        />
        {highlights.map(({ fret, guitarString }) => {
          if (fret === undefined || guitarString === undefined) return;
          const key = `${fret}-${guitarString}`;
          const stringPosition = STRING_POSITIONS[STRING_INDICES[guitarString]];
          if (fret === 0)
            return (
              <circle
                className="highlighted-note"
                cx="20"
                cy={stringPosition}
                key={key}
                r="10"
              />
            );
          if (fret === 1)
            return (
              <rect
                className="highlighted-note"
                height="20"
                key={key}
                rx="10"
                ry="10"
                width={FRET_POSITIONS[0] - 50 - 20}
                x={50 + 10}
                y={stringPosition - 10}
              />
            );
          return (
            <rect
              className="highlighted-note"
              height="20"
              key={key}
              rx="10"
              ry="10"
              width={FRET_POSITIONS[fret - 1] - FRET_POSITIONS[fret - 2] - 20}
              x={FRET_POSITIONS[fret - 2] + 10}
              y={stringPosition - 10}
            />
          );
        })}
      </svg>
    </div>
  );
}

const FRET_POSITIONS = [
  175, 302, 422, 535, 642, 743, 838, 928, 1013, 1093, 1169, 1240,
];

const STRING_POSITIONS = [10, 40, 70, 100, 130, 160];
const STRING_INDICES = { E: 5, A: 4, D: 3, G: 2, B: 1, e: 0 };

const STRING_WIDTHS = [1, 1, 2, 3, 3, 4];

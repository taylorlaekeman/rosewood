import type { Fret } from './frets';
import type { GuitarString } from './guitarStrings';

export function Fretboard({
  highlights = [],
}: {
  highlights?: Array<{ fret?: Fret; guitarString?: GuitarString }>;
}) {
  return (
    <svg
      height="100%"
      viewBox={`0 0 ${FRET_POSITIONS[11] + 12} 170`}
      width="100%"
    >
      {/* nut */}
      <line x1="45" x2="45" y1="0" y2="100%" stroke="bisque" strokeWidth="10" />
      {FRET_POSITIONS.map((position) => (
        <line
          key={position}
          stroke="slategrey"
          strokeWidth="4"
          x1={position}
          x2={position}
          y1="0"
          y2="100%"
        />
      ))}
      {STRING_POSITIONS.map((position, i) => (
        <line
          key={position}
          stroke="grey"
          strokeWidth={STRING_WIDTHS[i]}
          x1="0"
          x2="100%"
          y1={position}
          y2={position}
        />
      ))}
      {/* fret 3 marker */}
      <circle
        cx={FRET_POSITIONS[1] + (FRET_POSITIONS[2] - FRET_POSITIONS[1]) / 2}
        cy="85"
        fill="grey"
        r="10"
      />
      {/* fret 5 marker */}
      <circle
        cx={FRET_POSITIONS[3] + (FRET_POSITIONS[4] - FRET_POSITIONS[3]) / 2}
        cy="85"
        fill="grey"
        r="10"
      />
      {/* fret 7 marker */}
      <circle
        cx={FRET_POSITIONS[5] + (FRET_POSITIONS[6] - FRET_POSITIONS[5]) / 2}
        cy="85"
        fill="grey"
        r="10"
      />
      {/* fret 9 marker */}
      <circle
        cx={FRET_POSITIONS[7] + (FRET_POSITIONS[8] - FRET_POSITIONS[7]) / 2}
        cy="85"
        fill="grey"
        r="10"
      />
      {/* fret 12 markers */}
      <circle
        cx={FRET_POSITIONS[10] + (FRET_POSITIONS[11] - FRET_POSITIONS[10]) / 2}
        cy="55"
        fill="grey"
        r="10"
      />
      <circle
        cx={FRET_POSITIONS[10] + (FRET_POSITIONS[11] - FRET_POSITIONS[10]) / 2}
        cy="115"
        fill="grey"
        r="10"
      />
      {highlights.map(({ fret, guitarString }) => {
        if (fret === undefined || guitarString === undefined) return;
        const key = `${fret}-${guitarString}`;
        const stringPosition = STRING_POSITIONS[STRING_INDICES[guitarString]];
        if (fret === 0)
          return (
            <circle
              cx="20"
              cy={stringPosition}
              fill="orange"
              key={key}
              r="10"
            />
          );
        if (fret === 1)
          return (
            <rect
              fill="orange"
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
            fill="orange"
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
  );
}

const FRET_POSITIONS = [
  175, 302, 422, 535, 642, 743, 838, 928, 1013, 1093, 1169, 1240,
];

const STRING_POSITIONS = [10, 40, 70, 100, 130, 160];
const STRING_INDICES = { E: 5, A: 4, D: 3, G: 2, B: 1, e: 0 };

const STRING_WIDTHS = [1, 1, 2, 3, 3, 4];

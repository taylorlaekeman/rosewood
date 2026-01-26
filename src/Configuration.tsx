import { useState } from 'react';
import { FRETS, type Fret } from './frets';
import { GUITAR_STRINGS, type GuitarString } from './guitarStrings';

export function Configuration({
  onConfigure = () => {
    /* empty */
  },
}: {
  onConfigure?: (input: {
    enabledFrets: Fret[];
    enabledStrings: GuitarString[];
  }) => void;
}) {
  const [stringConfiguration, setStringConfiguration] =
    useState<StringConfiguration>(ALL_STRINGS_ENABLED);
  const [fretConfiguration, setFretConfiguration] =
    useState<FretConfiguration>(ALL_FRETS_ENABLED);
  const enabledStrings = Object.entries(stringConfiguration)
    .filter(([_, enabled]) => enabled)
    .map(([guitarString]) => guitarString as GuitarString);
  const enabledFrets = Object.entries(fretConfiguration)
    .filter(([_, enabled]) => enabled)
    .map(([fret]) => parseInt(fret, 10) as Fret);
  return (
    <>
      <div>
        <p>Strings</p>
        {GUITAR_STRINGS.map((guitarString) => (
          <div key={guitarString}>
            <input
              checked={stringConfiguration[guitarString]}
              id={guitarString}
              onChange={() => {
                setStringConfiguration((currentStringConfiguration) => ({
                  ...currentStringConfiguration,
                  [guitarString]: !currentStringConfiguration[guitarString],
                }));
              }}
              name={guitarString}
              type="checkbox"
            />
            <label htmlFor={guitarString}>{guitarString}</label>
          </div>
        ))}
        {enabledStrings.length === 0 && (
          <p>Please select at least one string</p>
        )}
      </div>
      <div>
        <p>Frets</p>
        {FRETS.map((fret) => {
          const fretString = fret.toString(10);
          return (
            <div key={fretString}>
              <input
                checked={fretConfiguration[fret]}
                id={fretString}
                onChange={() => {
                  setFretConfiguration((currentFretConfiguration) => ({
                    ...currentFretConfiguration,
                    [fret]: !currentFretConfiguration[fret],
                  }));
                }}
                name={fretString}
                type="checkbox"
              />
              <label htmlFor={fretString}>{fret}</label>
            </div>
          );
        })}
        {enabledFrets.length === 0 && <p>Please select at least one fret</p>}
      </div>
      {enabledStrings.length === 1 && enabledFrets.length === 1 && (
        <p>Please select at least two notes</p>
      )}
      <button
        disabled={
          enabledStrings.length === 0 ||
          enabledFrets.length === 0 ||
          (enabledStrings.length === 1 && enabledFrets.length === 1)
        }
        onClick={() => onConfigure({ enabledFrets, enabledStrings })}
      >
        Practice
      </button>
    </>
  );
}

type StringConfiguration = Record<GuitarString, boolean>;

const ALL_STRINGS_ENABLED: StringConfiguration = {
  E: true,
  A: true,
  D: true,
  G: true,
  B: true,
  e: true,
};

type FretConfiguration = Record<Fret, boolean>;

const ALL_FRETS_ENABLED: FretConfiguration = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
};

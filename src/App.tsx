import { useState } from 'react';
import './App.css';

function App() {
  const [stringConfiguration, setStringConfiguration] =
    useState<Record<GuitarString, boolean>>(ALL_STRINGS_ENABLED);
  const [fretConfiguration, setFretConfiguration] =
    useState<Record<Fret, boolean>>(ALL_FRETS_ENABLED);
  const enabledStrings = Object.entries(stringConfiguration)
    .filter(([_, enabled]) => enabled)
    .map(([guitarString]) => guitarString);
  const enabledFrets = Object.entries(fretConfiguration)
    .filter(([_, enabled]) => enabled)
    .map((fret) => fret);
  return (
    <>
      <h1>Rosewood</h1>
      <div>
        <p>Strings</p>
        {GUITAR_STRINGS.map((guitarString) => (
          <div>
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
            <div>
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
    </>
  );
}

const GUITAR_STRINGS: GuitarString[] = ['E', 'A', 'D', 'G', 'B', 'e'];

const ALL_STRINGS_ENABLED: Record<GuitarString, boolean> = {
  E: true,
  A: true,
  D: true,
  G: true,
  B: true,
  e: true,
};

type GuitarString = 'E' | 'A' | 'D' | 'G' | 'B' | 'e';

const FRETS: Fret[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ALL_FRETS_ENABLED: Record<Fret, boolean> = {
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

type Fret = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default App;

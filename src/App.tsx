import { useState } from 'react';
import './App.css';

function App() {
  const [configuredStrings, setConfiguredStrings] =
    useState<Record<GuitarString, boolean>>(ALL_STRINGS_ENABLED);
  const [configuredFrets, setConfiguredFrets] =
    useState<Record<Fret, boolean>>(ALL_FRETS_ENABLED);
  return (
    <>
      <h1>Rosewood</h1>
      <div>
        <p>Strings</p>
        {GUITAR_STRINGS.map((guitarString) => (
          <div>
            <input
              checked={configuredStrings[guitarString]}
              id={guitarString}
              onChange={() => {
                setConfiguredStrings((currentConfiguredStrings) => ({
                  ...currentConfiguredStrings,
                  [guitarString]: !currentConfiguredStrings[guitarString],
                }));
              }}
              name={guitarString}
              type="checkbox"
            />
            <label htmlFor={guitarString}>{guitarString}</label>
          </div>
        ))}
      </div>
      <div>
        <p>Frets</p>
        {FRETS.map((fret) => {
          const fretString = fret.toString(10);
          return (
            <div>
              <input
                checked={configuredFrets[fret]}
                id={fretString}
                onChange={() => {
                  setConfiguredFrets((currentConfiguredFrets) => ({
                    ...currentConfiguredFrets,
                    [fret]: !currentConfiguredFrets[fret],
                  }));
                }}
                name={fretString}
                type="checkbox"
              />
              <label htmlFor={fretString}>{fret}</label>
            </div>
          );
        })}
      </div>
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

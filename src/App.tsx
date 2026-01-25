import { useState } from 'react';
import './App.css';
import { Fretboard } from './Fretboard';
import { FRETS, type Fret } from './frets';
import { GUITAR_STRINGS, type GuitarString } from './guitarStrings';
import { useRandomNote } from './useRandomNote';
import { NOTES, type Note } from './notes';

function App() {
  const [stringConfiguration, setStringConfiguration] =
    useState<Record<GuitarString, boolean>>(ALL_STRINGS_ENABLED);
  const [fretConfiguration, setFretConfiguration] =
    useState<Record<Fret, boolean>>(ALL_FRETS_ENABLED);
  const enabledStrings = Object.entries(stringConfiguration)
    .filter(([_, enabled]) => enabled)
    .map(([guitarString]) => guitarString as GuitarString);
  const enabledFrets = Object.entries(fretConfiguration)
    .filter(([_, enabled]) => enabled)
    .map(([fret]) => parseInt(fret, 10) as Fret);
  const { fret, getNewNote, guitarString, note } = useRandomNote({
    enabledStrings,
    enabledFrets,
  });
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [count, setCount] = useState<number>(1);
  return (
    <>
      <h1>Rosewood</h1>
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
      >
        Practice
      </button>
      {count > 10 ? (
        <>
          <p>done!</p>
          <button onClick={() => setCount(1)}>restart</button>
        </>
      ) : (
        <>
          <p>{`${count} / 10`}</p>
          <Fretboard highlights={[{ fret, guitarString }]} />
          <fieldset>
            {NOTES.map((note) => (
              <div key={note}>
                <input
                  checked={note === selectedNote}
                  id={note}
                  name="note"
                  onChange={() => setSelectedNote(note)}
                  type="radio"
                  value={note}
                />
                <label htmlFor={note}>{note}</label>
              </div>
            ))}
          </fieldset>
          {selectedNote === note && <p>correct!</p>}
          {selectedNote && selectedNote !== note && <p>try again</p>}
          <button
            onClick={() => {
              setSelectedNote(undefined);
              setCount((currentCount) => currentCount + 1);
              getNewNote();
            }}
          >
            Next
          </button>
        </>
      )}
    </>
  );
}

const ALL_STRINGS_ENABLED: Record<GuitarString, boolean> = {
  E: true,
  A: true,
  D: true,
  G: true,
  B: true,
  e: true,
};

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

export default App;

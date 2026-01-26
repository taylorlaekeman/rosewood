import { useState } from 'react';
import './App.css';
import { Configuration } from './Configuration';
import { Fretboard } from './Fretboard';
import { type Fret } from './frets';
import { type GuitarString } from './guitarStrings';
import { NOTES, type Note } from './notes';
import { useRandomNote } from './useRandomNote';

function App() {
  const [enabledStrings, setEnabledStrings] = useState<
    GuitarString[] | undefined
  >();
  const [enabledFrets, setEnabledFrets] = useState<Fret[] | undefined>();
  const { fret, getNewNote, guitarString, note } = useRandomNote({
    enabledStrings,
    enabledFrets,
  });
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [count, setCount] = useState<number>(1);
  return (
    <>
      <h1>Rosewood</h1>
      <Configuration
        onConfigure={({ enabledFrets, enabledStrings }) => {
          setEnabledFrets(enabledFrets);
          setEnabledStrings(enabledStrings);
        }}
      />
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

export default App;

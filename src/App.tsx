import { useState } from 'react';
import './App.css';
import { Configuration } from './Configuration';
import { Flashcard } from './Flashcard';
import { type Fret } from './frets';
import { type GuitarString } from './guitarStrings';
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
  const [count, setCount] = useState<number>(1);
  return (
    <>
      <h1>Rosewood</h1>
      {!enabledFrets && (
        <Configuration
          onConfigure={({ enabledFrets, enabledStrings }) => {
            setEnabledFrets(enabledFrets);
            setEnabledStrings(enabledStrings);
          }}
        />
      )}
      {enabledFrets &&
        count <= 10 &&
        fret !== undefined &&
        guitarString !== undefined &&
        note !== undefined && (
          <Flashcard
            count={count}
            fret={fret}
            guitarString={guitarString}
            note={note}
            onNext={() => {
              setCount(count + 1);
              getNewNote();
            }}
          />
        )}
      {count > 10 && (
        <>
          <p>done!</p>
          <button
            onClick={() => {
              setEnabledFrets(undefined);
              setEnabledStrings(undefined);
              setCount(1);
            }}
          >
            Restart
          </button>
        </>
      )}
    </>
  );
}

export default App;

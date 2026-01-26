import { useState } from 'react';
import { Fretboard } from './Fretboard';
import type { Fret } from './frets';
import type { GuitarString } from './guitarStrings';
import { NOTES, type Note } from './notes';

export function Flashcard({
  count,
  fret,
  guitarString,
  note,
  onNext = () => {
    /* empty */
  },
}: {
  count?: number;
  fret: Fret;
  guitarString: GuitarString;
  note: Note;
  onNext?: () => void;
}) {
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  return (
    <>
      {count && <p>{`${count} / 10`}</p>}
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
        disabled={note !== selectedNote}
        onClick={() => {
          setSelectedNote(undefined);
          onNext();
        }}
      >
        Next
      </button>
    </>
  );
}

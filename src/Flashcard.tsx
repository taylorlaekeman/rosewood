import { useState } from 'react';
import { Fretboard } from './Fretboard';
import type { Fret } from './frets';
import type { GuitarString } from './guitarStrings';
import { NOTES, type Note } from './notes';

export function Flashcard({
  count,
  fret,
  guitarString,
  note: expectedNote,
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
              onChange={() => {
                setSelectedNote(note);
                if (note === expectedNote) {
                  setTimeout(() => {
                    setSelectedNote(undefined);
                    onNext();
                  }, 1000);
                }
              }}
              type="radio"
              value={note}
            />
            <label htmlFor={note}>{note}</label>
          </div>
        ))}
      </fieldset>
      {selectedNote === expectedNote && <p>correct!</p>}
      {selectedNote && selectedNote !== expectedNote && <p>try again</p>}
    </>
  );
}

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
    <div id="flashcard">
      {count && <p>{`${count} / 10`}</p>}
      <Fretboard highlights={[{ fret, guitarString }]} />
      <div id="note-buttons">
        {NOTES.map((note) => {
          const classes = ['note-button'];
          if (note === selectedNote && selectedNote === expectedNote)
            classes.push('correct');
          if (note === selectedNote && selectedNote !== expectedNote)
            classes.push('incorrect');
          return (
            <button
              className={classes.join(' ')}
              key={note}
              onClick={() => {
                setSelectedNote(note);
                if (note === expectedNote) {
                  setTimeout(() => {
                    setSelectedNote(undefined);
                    onNext();
                  }, 1000);
                }
              }}
            >
              {note}
            </button>
          );
        })}
      </div>
    </div>
  );
}

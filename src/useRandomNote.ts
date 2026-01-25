import { useCallback, useEffect, useMemo, useState } from 'react';
import { FRETS, type Fret } from './frets';
import { GUITAR_STRINGS, type GuitarString } from './guitarStrings';
import { NOTES, type Note } from './notes';

export function useRandomNote({
  enabledStrings = GUITAR_STRINGS,
  enabledFrets = FRETS,
}: {
  enabledStrings?: GuitarString[];
  enabledFrets?: Fret[];
} = {}): {
  fret?: Fret;
  getNewNote: () => void;
  guitarString?: GuitarString;
  note?: Note;
} {
  const [fret, setFret] = useState<Fret | undefined>();
  const [guitarString, setGuitarString] = useState<GuitarString | undefined>();

  const getRandomNote = useCallback(() => {
    if (enabledFrets.length === 0 || enabledStrings.length === 0) {
      setFret(undefined);
      setGuitarString(undefined);
      return;
    }
    setFret(enabledFrets[Math.floor(Math.random() * enabledFrets.length)]);
    setGuitarString(
      enabledStrings[Math.floor(Math.random() * enabledStrings.length)],
    );
  }, [enabledFrets, enabledStrings]);

  useEffect(() => {
    getRandomNote();
  }, [getRandomNote]);

  const note = useMemo(() => {
    if (fret === undefined || guitarString === undefined) return;
    return identifyNote({ guitarString, fret });
  }, [guitarString, fret]);

  return {
    fret,
    getNewNote: getRandomNote,
    guitarString,
    note,
  };
}

function identifyNote({
  guitarString,
  fret,
}: {
  guitarString: GuitarString;
  fret: Fret;
}): Note {
  const rootNote: Note = guitarString.toUpperCase() as Note;
  const rootNoteIndex = NOTES.findIndex((note) => note === rootNote);
  const noteIndex = (rootNoteIndex + fret) % NOTES.length;
  return NOTES[noteIndex];
}

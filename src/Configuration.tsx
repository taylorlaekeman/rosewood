import { useState } from 'react';
import { CustomConfiguration } from './CustomConfiguration';
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
  const [isCustomConfiguration, setIsCustomConfiguration] =
    useState<boolean>(false);
  if (isCustomConfiguration)
    return (
      <CustomConfiguration
        onCancel={() => setIsCustomConfiguration(false)}
        onStart={onConfigure}
      />
    );
  return (
    <div id="regimen-list">
      {PRESET_OPTIONS.map((option) => (
        <button
          className="regimen"
          key={option.id}
          onClick={() => {
            onConfigure({
              enabledFrets: option.enabledFrets,
              enabledStrings: option.enabledStrings,
            });
          }}
        >
          {option.label}
        </button>
      ))}
      <button
        className="regimen"
        onClick={() => setIsCustomConfiguration(true)}
      >
        Custom Configuration
      </button>
    </div>
  );
}

const PRESET_OPTIONS: PresetOption[] = [
  {
    id: 'full',
    label: 'Full Fretboard',
    enabledFrets: FRETS,
    enabledStrings: GUITAR_STRINGS,
  },
  {
    id: 'chords',
    label: 'Open Chords',
    enabledFrets: [0, 1, 2, 3],
    enabledStrings: GUITAR_STRINGS,
  },
  {
    id: 'low',
    label: 'Low Strings',
    enabledFrets: FRETS,
    enabledStrings: ['E', 'A'],
  },
  {
    id: 'middle',
    label: 'Middle Strings',
    enabledFrets: FRETS,
    enabledStrings: ['D', 'G'],
  },
  {
    id: 'high',
    label: 'High Strings',
    enabledFrets: FRETS,
    enabledStrings: ['B', 'e'],
  },
];

interface PresetOption {
  enabledFrets: Fret[];
  enabledStrings: GuitarString[];
  id: string;
  label: string;
}

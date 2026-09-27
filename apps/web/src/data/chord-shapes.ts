/** Guitar chord fingerings for diagram display.
 * frets: 6 values low E → high e. null = muted (X), 0 = open (O), 1–n = fret number.
 * fingers: parallel array; 0 when open/muted, else finger 1–4.
 * baseFret: lowest fret shown (1 = nut). When > 1, a fret label is shown.
 */
export type ChordShape = {
  frets: (number | null)[];
  fingers: number[];
  baseFret: number;
};

export const CHORD_SHAPES: Record<string, ChordShape> = {
  // --- OPEN & BASIC MAJORS ---
  C: { frets: [null, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  'C#': { frets: [null, 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], baseFret: 4 },
  Db: { frets: [null, 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], baseFret: 4 },
  D: { frets: [null, null, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  'D#': { frets: [null, 6, 8, 8, 8, 6], fingers: [0, 1, 2, 3, 4, 1], baseFret: 6 },
  Eb: { frets: [null, 6, 8, 8, 8, 6], fingers: [0, 1, 2, 3, 4, 1], baseFret: 6 },
  E: { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 1 },
  F: { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], baseFret: 1 },
  'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], baseFret: 2 },
  Gb: { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], baseFret: 2 },
  G: { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1 },
  'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], baseFret: 4 },
  Ab: { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], baseFret: 4 },
  A: { frets: [null, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  'A#': { frets: [null, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },
  Bb: { frets: [null, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },
  B: { frets: [null, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },

  // --- MINORS ---
  Cm: { frets: [null, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 3 },
  'C#m': { frets: [null, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4 },
  Dbm: { frets: [null, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4 },
  Dm: { frets: [null, null, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
  'D#m': { frets: [null, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], baseFret: 6 },
  Ebm: { frets: [null, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], baseFret: 6 },
  Em: { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  Fm: { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1 },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], baseFret: 2 },
  Gbm: { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], baseFret: 2 },
  Gm: { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 3 },
  'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], baseFret: 4 },
  Abm: { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], baseFret: 4 },
  Am: { frets: [null, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  'A#m': { frets: [null, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },
  Bbm: { frets: [null, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },
  Bm: { frets: [null, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },

  // --- DOMINANT 7ths ---
  C7: { frets: [null, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  'C#7': { frets: [null, 4, 3, 4, 2, null], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  Db7: { frets: [null, 4, 3, 4, 2, null], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  D7: { frets: [null, null, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1 },
  'D#7': { frets: [null, 6, 8, 6, 8, 6], fingers: [0, 1, 3, 1, 4, 1], baseFret: 6 },
  Eb7: { frets: [null, 6, 8, 6, 8, 6], fingers: [0, 1, 3, 1, 4, 1], baseFret: 6 },
  E7: { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1 },
  F7: { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1], baseFret: 1 },
  'F#7': { frets: [2, 4, 2, 3, 2, 2], fingers: [1, 3, 1, 2, 1, 1], baseFret: 2 },
  Gb7: { frets: [2, 4, 2, 3, 2, 2], fingers: [1, 3, 1, 2, 1, 1], baseFret: 2 },
  G7: { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  'G#7': { frets: [4, 6, 4, 5, 4, 4], fingers: [1, 3, 1, 2, 1, 1], baseFret: 4 },
  Ab7: { frets: [4, 6, 4, 5, 4, 4], fingers: [1, 3, 1, 2, 1, 1], baseFret: 4 },
  A7: { frets: [null, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], baseFret: 1 },
  'A#7': { frets: [null, 1, 3, 1, 3, 1], fingers: [0, 1, 3, 1, 4, 1], baseFret: 1 },
  Bb7: { frets: [null, 1, 3, 1, 3, 1], fingers: [0, 1, 3, 1, 4, 1], baseFret: 1 },
  B7: { frets: [null, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1 },

  // --- MINOR 7ths ---
  Cm7: { frets: [null, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1], baseFret: 3 },
  'C#m7': { frets: [null, 4, 6, 4, 5, 4], fingers: [0, 1, 3, 1, 2, 1], baseFret: 4 },
  Dbm7: { frets: [null, 4, 6, 4, 5, 4], fingers: [0, 1, 3, 1, 2, 1], baseFret: 4 },
  Dm7: { frets: [null, null, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], baseFret: 1 },
  'D#m7': { frets: [null, 6, 8, 6, 7, 6], fingers: [0, 1, 3, 1, 2, 1], baseFret: 6 },
  Ebm7: { frets: [null, 6, 8, 6, 7, 6], fingers: [0, 1, 3, 1, 2, 1], baseFret: 6 },
  Em7: { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], baseFret: 1 },
  Fm7: { frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1], baseFret: 1 },
  'F#m7': { frets: [2, 4, 2, 2, 2, 2], fingers: [1, 3, 1, 1, 1, 1], baseFret: 2 },
  Gbm7: { frets: [2, 4, 2, 2, 2, 2], fingers: [1, 3, 1, 1, 1, 1], baseFret: 2 },
  Gm7: { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], baseFret: 3 },
  'G#m7': { frets: [4, 6, 4, 4, 4, 4], fingers: [1, 3, 1, 1, 1, 1], baseFret: 4 },
  Abm7: { frets: [4, 6, 4, 4, 4, 4], fingers: [1, 3, 1, 1, 1, 1], baseFret: 4 },
  Am7: { frets: [null, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], baseFret: 1 },
  'A#m7': { frets: [null, 1, 3, 1, 2, 1], fingers: [0, 1, 3, 1, 2, 1], baseFret: 1 },
  Bbm7: { frets: [null, 1, 3, 1, 2, 1], fingers: [0, 1, 3, 1, 2, 1], baseFret: 1 },
  Bm7: { frets: [null, 2, 0, 2, 0, 2], fingers: [0, 1, 0, 2, 0, 3], baseFret: 1 },

  // --- MAJOR 7ths ---
  Cmaj7: { frets: [null, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], baseFret: 1 },
  'C#maj7': { frets: [null, 4, 6, 5, 6, 4], fingers: [0, 1, 3, 2, 4, 1], baseFret: 4 },
  Dbmaj7: { frets: [null, 4, 6, 5, 6, 4], fingers: [0, 1, 3, 2, 4, 1], baseFret: 4 },
  Dmaj7: { frets: [null, null, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1], baseFret: 1 },
  'D#maj7': { frets: [null, 6, 8, 7, 8, 6], fingers: [0, 1, 3, 2, 4, 1], baseFret: 6 },
  Ebmaj7: { frets: [null, 6, 8, 7, 8, 6], fingers: [0, 1, 3, 2, 4, 1], baseFret: 6 },
  Emaj7: { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0], baseFret: 1 },
  Fmaj7: { frets: [null, null, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 1 },
  'F#maj7': { frets: [2, 4, 3, 3, 2, 2], fingers: [1, 4, 2, 3, 1, 1], baseFret: 2 },
  Gbmaj7: { frets: [2, 4, 3, 3, 2, 2], fingers: [1, 4, 2, 3, 1, 1], baseFret: 2 },
  Gmaj7: { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  'G#maj7': { frets: [4, 6, 5, 5, 4, 4], fingers: [1, 4, 2, 3, 1, 1], baseFret: 4 },
  Abmaj7: { frets: [4, 6, 5, 5, 4, 4], fingers: [1, 4, 2, 3, 1, 1], baseFret: 4 },
  Amaj7: { frets: [null, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], baseFret: 1 },
  'A#maj7': { frets: [null, 1, 3, 2, 3, 1], fingers: [0, 1, 3, 2, 4, 1], baseFret: 1 },
  Bbmaj7: { frets: [null, 1, 3, 2, 3, 1], fingers: [0, 1, 3, 2, 4, 1], baseFret: 1 },
  Bmaj7: { frets: [null, 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1], baseFret: 1 },

  // --- HALF-DIMINISHED / MINOR 7b5 (ø / m7b5) ---
  'F#m7b5': { frets: [2, 0, 2, 2, 1, 0], fingers: [2, 0, 3, 4, 1, 0], baseFret: 1 },
  'Gbm7b5': { frets: [2, 0, 2, 2, 1, 0], fingers: [2, 0, 3, 4, 1, 0], baseFret: 1 },
  Bm7b5: { frets: [null, 2, 3, 2, 3, null], fingers: [0, 1, 3, 2, 4, 0], baseFret: 1 },
  Am7b5: { frets: [null, 0, 1, 2, 1, null], fingers: [0, 0, 1, 3, 2, 0], baseFret: 1 },
  Em7b5: { frets: [0, 1, 2, 0, 3, 0], fingers: [0, 1, 2, 0, 4, 0], baseFret: 1 },
  Dm7b5: { frets: [null, null, 0, 1, 1, 1], fingers: [0, 0, 0, 1, 1, 1], baseFret: 1 },
  'C#m7b5': { frets: [null, 4, 5, 4, 5, null], fingers: [0, 1, 3, 2, 4, 0], baseFret: 4 },
  Dbm7b5: { frets: [null, 4, 5, 4, 5, null], fingers: [0, 1, 3, 2, 4, 0], baseFret: 4 },
  'G#m7b5': { frets: [4, null, 4, 4, 3, null], fingers: [2, 0, 3, 4, 1, 0], baseFret: 3 },
  Abm7b5: { frets: [4, null, 4, 4, 3, null], fingers: [2, 0, 3, 4, 1, 0], baseFret: 3 },
  Cm7b5: { frets: [null, 3, 4, 3, 4, null], fingers: [0, 1, 3, 2, 4, 0], baseFret: 3 },
  'Ebm7b5': { frets: [null, 6, 7, 6, 7, null], fingers: [0, 1, 3, 2, 4, 0], baseFret: 6 },
  Gm7b5: { frets: [3, null, 3, 3, 2, null], fingers: [2, 0, 3, 4, 1, 0], baseFret: 2 },

  // --- DIMINISHED (dim / dim7) ---
  Cdim: { frets: [null, 3, 4, 5, 4, null], fingers: [0, 1, 2, 4, 3, 0], baseFret: 3 },
  Cdim7: { frets: [null, 3, 4, 2, 4, null], fingers: [0, 2, 3, 1, 4, 0], baseFret: 1 },
  'C#dim': { frets: [null, 4, 5, 3, 5, null], fingers: [0, 2, 3, 1, 4, 0], baseFret: 3 },
  'C#dim7': { frets: [null, 4, 5, 3, 5, null], fingers: [0, 2, 3, 1, 4, 0], baseFret: 3 },
  Dbdim: { frets: [null, 4, 5, 3, 5, null], fingers: [0, 2, 3, 1, 4, 0], baseFret: 3 },
  Dbdim7: { frets: [null, 4, 5, 3, 5, null], fingers: [0, 2, 3, 1, 4, 0], baseFret: 3 },
  Ddim: { frets: [null, null, 0, 1, 3, 1], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  Ddim7: { frets: [null, null, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  'D#dim': { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  'D#dim7': { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Ebdim: { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Ebdim7: { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Edim: { frets: [null, null, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Edim7: { frets: [null, null, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Fdim: { frets: [null, null, 3, 4, 3, 4], fingers: [0, 0, 1, 3, 2, 4], baseFret: 3 },
  Fdim7: { frets: [null, null, 3, 4, 3, 4], fingers: [0, 0, 1, 3, 2, 4], baseFret: 3 },
  'F#dim': { frets: [2, null, 1, 2, 1, null], fingers: [2, 0, 1, 3, 1, 0], baseFret: 1 },
  'F#dim7': { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Gbdim: { frets: [2, null, 1, 2, 1, null], fingers: [2, 0, 1, 3, 1, 0], baseFret: 1 },
  Gbdim7: { frets: [null, null, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Gdim: { frets: [null, null, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4], baseFret: 2 },
  Gdim7: { frets: [null, null, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4], baseFret: 2 },
  'G#dim': { frets: [null, null, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  'G#dim7': { frets: [null, null, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  Abdim: { frets: [null, null, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  Abdim7: { frets: [null, null, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  Adim: { frets: [null, 0, 1, 2, 1, null], fingers: [0, 0, 1, 3, 2, 0], baseFret: 1 },
  Adim7: { frets: [null, 0, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  Bbdim: { frets: [null, 1, 2, 0, 2, null], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  Bbdim7: { frets: [null, 1, 2, 0, 2, 0], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  Bdim: { frets: [null, 2, 3, 4, 3, null], fingers: [0, 1, 2, 4, 3, 0], baseFret: 1 },
  Bdim7: { frets: [null, 2, 0, 1, 0, 1], fingers: [0, 2, 0, 1, 0, 1], baseFret: 1 },

  // --- AUGMENTED (aug / +) ---
  Caug: { frets: [null, 3, 2, 1, 1, 0], fingers: [0, 3, 2, 1, 1, 0], baseFret: 1 },
  Daug: { frets: [null, null, 0, 3, 3, 2], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
  Eaug: { frets: [0, 3, 2, 1, 1, 0], fingers: [0, 4, 3, 1, 2, 0], baseFret: 1 },
  Faug: { frets: [null, null, 3, 2, 2, 1], fingers: [0, 0, 4, 2, 3, 1], baseFret: 1 },
  Gaug: { frets: [3, 2, 1, 0, 0, 3], fingers: [3, 2, 1, 0, 0, 4], baseFret: 1 },
  Aaug: { frets: [null, 0, 3, 2, 2, 1], fingers: [0, 0, 4, 2, 3, 1], baseFret: 1 },
  Baug: { frets: [null, 2, 1, 0, 0, 3], fingers: [0, 2, 1, 0, 0, 3], baseFret: 1 },

  // --- SUSPENDED (sus2 / sus4) ---
  Csus2: { frets: [null, 3, 0, 0, 1, null], fingers: [0, 3, 0, 0, 1, 0], baseFret: 1 },
  Csus4: { frets: [null, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 1], baseFret: 1 },
  Dsus2: { frets: [null, null, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], baseFret: 1 },
  Dsus4: { frets: [null, null, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
  Esus2: { frets: [0, 2, 2, 4, 0, 0], fingers: [0, 1, 2, 4, 0, 0], baseFret: 1 },
  Esus4: { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], baseFret: 1 },
  Fsus2: { frets: [null, null, 3, 0, 1, 1], fingers: [0, 0, 3, 0, 1, 1], baseFret: 1 },
  Fsus4: { frets: [1, 3, 3, 3, 1, 1], fingers: [1, 2, 3, 4, 1, 1], baseFret: 1 },
  'F#sus4': { frets: [2, 4, 4, 4, 2, 2], fingers: [1, 2, 3, 4, 1, 1], baseFret: 2 },
  Gsus2: { frets: [3, 0, 0, 0, 3, 3], fingers: [1, 0, 0, 0, 3, 4], baseFret: 1 },
  Gsus4: { frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4], baseFret: 1 },
  Asus2: { frets: [null, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], baseFret: 1 },
  Asus4: { frets: [null, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  Bbsus2: { frets: [null, 1, 3, 3, 1, 1], fingers: [0, 1, 3, 4, 1, 1], baseFret: 1 },
  Bbsus4: { frets: [null, 1, 3, 3, 4, 1], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },
  Bsus2: { frets: [null, 2, 4, 4, 2, 2], fingers: [0, 1, 3, 4, 1, 1], baseFret: 1 },
  Bsus4: { frets: [null, 2, 4, 4, 5, 2], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },

  // --- ADD9 & 9ths ---
  Cadd9: { frets: [null, 3, 2, 0, 3, 0], fingers: [0, 2, 1, 0, 3, 0], baseFret: 1 },
  Dadd9: { frets: [null, null, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], baseFret: 1 },
  Eadd9: { frets: [0, 2, 2, 1, 0, 2], fingers: [0, 2, 3, 1, 0, 4], baseFret: 1 },
  Fadd9: { frets: [null, null, 3, 2, 1, 3], fingers: [0, 0, 3, 2, 1, 4], baseFret: 1 },
  Gadd9: { frets: [3, 2, 0, 2, 0, 3], fingers: [2, 1, 0, 3, 0, 4], baseFret: 1 },
  Aadd9: { frets: [null, 0, 2, 4, 2, 0], fingers: [0, 0, 1, 3, 2, 0], baseFret: 1 },
  C9: { frets: [null, 3, 2, 3, 3, 3], fingers: [0, 2, 1, 3, 3, 3], baseFret: 2 },
  D9: { frets: [null, null, 0, 2, 1, 0], fingers: [0, 0, 0, 2, 1, 0], baseFret: 1 },
  E9: { frets: [0, 2, 0, 1, 0, 2], fingers: [0, 2, 0, 1, 0, 3], baseFret: 1 },
  G9: { frets: [3, 2, 0, 2, 0, 1], fingers: [3, 2, 0, 4, 0, 1], baseFret: 1 },
  A9: { frets: [null, 0, 2, 4, 2, 3], fingers: [0, 0, 1, 4, 1, 2], baseFret: 1 },
  Am9: { frets: [null, 0, 2, 4, 1, 0], fingers: [0, 0, 2, 4, 1, 0], baseFret: 1 },
  Dm9: { frets: [null, null, 0, 2, 1, 0], fingers: [0, 0, 0, 2, 1, 0], baseFret: 1 },
  Em9: { frets: [0, 2, 0, 0, 0, 2], fingers: [0, 1, 0, 0, 0, 2], baseFret: 1 },

  // --- 6ths & MINOR 6ths ---
  C6: { frets: [null, 3, 2, 2, 1, 0], fingers: [0, 3, 2, 2, 1, 0], baseFret: 1 },
  Cm6: { frets: [null, 3, 5, 5, 4, 5], fingers: [0, 1, 2, 3, 1, 4], baseFret: 3 },
  D6: { frets: [null, null, 0, 2, 0, 2], fingers: [0, 0, 0, 2, 0, 3], baseFret: 1 },
  Dm6: { frets: [null, null, 0, 2, 0, 1], fingers: [0, 0, 0, 2, 0, 1], baseFret: 1 },
  E6: { frets: [0, 2, 2, 1, 2, 0], fingers: [0, 2, 3, 1, 4, 0], baseFret: 1 },
  Em6: { frets: [0, 2, 2, 0, 2, 0], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  F6: { frets: [null, null, 3, 2, 3, 1], fingers: [0, 0, 2, 1, 3, 1], baseFret: 1 },
  G6: { frets: [3, 2, 0, 0, 0, 0], fingers: [2, 1, 0, 0, 0, 0], baseFret: 1 },
  Gm6: { frets: [3, 5, 5, 3, 5, 3], fingers: [1, 2, 3, 1, 4, 1], baseFret: 3 },
  A6: { frets: [null, 0, 2, 2, 2, 2], fingers: [0, 0, 1, 1, 1, 1], baseFret: 1 },
  Am6: { frets: [null, 0, 2, 2, 1, 2], fingers: [0, 0, 2, 3, 1, 4], baseFret: 1 },
  Bb6: { frets: [null, 1, 3, 3, 3, 3], fingers: [0, 1, 2, 3, 4, 4], baseFret: 1 },
  B6: { frets: [null, 2, 4, 4, 4, 4], fingers: [0, 1, 2, 3, 4, 4], baseFret: 1 },
  Bm6: { frets: [null, 2, 0, 1, 0, 2], fingers: [0, 2, 0, 1, 0, 3], baseFret: 1 },

  // --- COMMON SLASH CHORDS ---
  'F/C': { frets: [null, 3, 3, 2, 1, 1], fingers: [0, 3, 4, 2, 1, 1], baseFret: 1 },
  'D/F#': { frets: [2, 0, 0, 2, 3, 2], fingers: [1, 0, 0, 2, 4, 3], baseFret: 1 },
  'G/B': { frets: [null, 2, 0, 0, 0, 3], fingers: [0, 1, 0, 0, 0, 3], baseFret: 1 },
  'C/G': { frets: [3, 3, 2, 0, 1, 0], fingers: [3, 4, 2, 0, 1, 0], baseFret: 1 },
  'C/E': { frets: [0, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  'A/E': { frets: [0, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  'A/C#': { frets: [null, 4, 2, 2, 2, null], fingers: [0, 4, 1, 2, 3, 0], baseFret: 1 },
  'Am/E': { frets: [0, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  'Am/G': { frets: [3, 0, 2, 2, 1, 0], fingers: [3, 0, 2, 4, 1, 0], baseFret: 1 },
  'Em/B': { frets: [null, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  'G/D': { frets: [null, null, 0, 0, 0, 3], fingers: [0, 0, 0, 0, 0, 3], baseFret: 1 },
  'E/G#': { frets: [4, 2, 2, 1, 0, 0], fingers: [4, 2, 3, 1, 0, 0], baseFret: 1 },
};

/** Resolve a display chord name to a known shape key (canonical). */
export function lookupChordShape(name: string): ChordShape | null {
  const trimmed = name.trim();
  if (CHORD_SHAPES[trimmed]) return CHORD_SHAPES[trimmed];

  // Check case-insensitive exact key
  const matchKey = Object.keys(CHORD_SHAPES).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase()
  );
  if (matchKey && CHORD_SHAPES[matchKey]) return CHORD_SHAPES[matchKey];

  // Try enharmonic root conversion (e.g. Db -> C#, D# -> Eb, Gb -> F#, G# -> Ab, A# -> Bb)
  const m = trimmed.match(/^([A-Ga-g][#b♯♭]?)(.*)$/);
  if (m) {
    const rawRoot = m[1].replace('♯', '#').replace('♭', 'b');
    const root = rawRoot[0].toUpperCase() + (rawRoot[1] || '');
    const rest = m[2];

    const enharmonics: Record<string, string> = {
      Db: 'C#', 'C#': 'Db',
      'D#': 'Eb', Eb: 'D#',
      Gb: 'F#', 'F#': 'Gb',
      'G#': 'Ab', Ab: 'G#',
      'A#': 'Bb', Bb: 'A#',
    };

    if (enharmonics[root]) {
      const altKey = enharmonics[root] + rest;
      if (CHORD_SHAPES[altKey]) return CHORD_SHAPES[altKey];
    }
  }

  // Word-form major/minor (e.g. "A major", "A minor") → canonical shape
  const majorMinor = canonicalMajorMinor(trimmed);
  if (majorMinor && CHORD_SHAPES[majorMinor]) return CHORD_SHAPES[majorMinor];

  // Compact spacing
  const compact = trimmed.replace(/\s+/g, '');
  if (CHORD_SHAPES[compact]) return CHORD_SHAPES[compact];

  return null;
}

/** Common movable barre voicings for open major/minor chords.
 * These are the "harder way" someone might already know — shown as the
 * original voicing so the open shape can be presented as the easier option.
 */
export const CHORD_BARRE_SHAPES: Record<string, ChordShape> = {
  A:  { frets: [5, 7, 7, 6, 5, 5],     fingers: [1, 2, 3, 4, 1, 1], baseFret: 5 },
  C:  { frets: [null, 3, 5, 5, 5, 3],  fingers: [0, 1, 2, 3, 4, 1], baseFret: 3 },
  D:  { frets: [null, 5, 7, 7, 7, 5],  fingers: [0, 1, 2, 3, 4, 1], baseFret: 5 },
  G:  { frets: [3, 5, 5, 4, 3, 3],     fingers: [1, 2, 3, 4, 1, 1], baseFret: 3 },
  E:  { frets: [null, 7, 9, 9, 9, 7],  fingers: [0, 1, 2, 3, 4, 1], baseFret: 7 },
  F:  { frets: [1, 3, 3, 2, 1, 1],     fingers: [1, 3, 4, 2, 1, 1], baseFret: 1 },
  'F#': { frets: [2, 4, 4, 3, 2, 2],   fingers: [1, 3, 4, 2, 1, 1], baseFret: 2 },
  B:  { frets: [null, 2, 4, 4, 4, 2],  fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },
  Bb: { frets: [null, 1, 3, 3, 3, 1],  fingers: [0, 1, 2, 3, 4, 1], baseFret: 1 },
  Am: { frets: [5, 7, 7, 5, 6, 5],     fingers: [1, 3, 4, 1, 2, 1], baseFret: 5 },
  Dm: { frets: [null, 5, 7, 7, 6, 5],  fingers: [0, 1, 3, 4, 2, 1], baseFret: 5 },
  Em: { frets: [7, 9, 9, 7, 8, 7],     fingers: [1, 3, 4, 1, 2, 1], baseFret: 7 },
  Bm: { frets: [null, 2, 4, 4, 3, 2],  fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },
  'F#m': { frets: [2, 4, 4, 2, 2, 2],  fingers: [1, 3, 4, 1, 1, 1], baseFret: 2 },
  'C#m': { frets: [null, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4 },
};

/** Reduce a display name to a canonical major/minor root (e.g. "A major" → "A",
 *  "A minor" → "Am"), or null if it isn't a plain major/minor triad. */
function canonicalMajorMinor(name: string): string | null {
  const m = name.trim().match(/^([A-G][#b]?)(.*)$/);
  if (!m) return null;
  const root = m[1];
  const rest = m[2].replace(/\s+/g, '').toLowerCase();
  if (rest === '' || rest === 'major' || rest === 'maj') return root;
  if (rest === 'm' || rest === 'min' || rest === 'minor') return root + 'm';
  return null;
}

/** Resolve a display chord name to a barre voicing shape, if one exists. */
export function lookupBarreShape(name: string): ChordShape | null {
  const canon = canonicalMajorMinor(name);
  if (!canon) return null;
  return CHORD_BARRE_SHAPES[canon] || null;
}

/** Whether a common barre voicing exists for the given chord name. */
export function hasBarreVoicing(name: string): boolean {
  return !!lookupBarreShape(name);
}

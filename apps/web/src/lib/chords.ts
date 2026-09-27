export type Suggestion = { chord: string; label: 'Easier option' | 'Alternative' | 'Capo option' | 'Original shape' | 'Open shape'; explanation: string; approximate: boolean };
export type ChordResult = { original: string; primary: Suggestion; other?: Suggestion; originalVoicing?: string };
export type CapoResult = { fret: number; chords: string[]; score: number };

import { hasBarreVoicing } from '@/data/chord-shapes';

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const ENHARMONIC: Record<string, string> = { Db: 'C#', 'D#': 'Eb', Gb: 'F#', 'G#': 'Ab', 'A#': 'Bb', Cb: 'B', 'B#': 'C', Fb: 'E', 'E#': 'F' };
const OPEN = new Set(['C', 'D', 'E', 'G', 'A', 'Am', 'Dm', 'Em', 'C7', 'D7', 'E7', 'G7', 'A7', 'B7', 'Am7', 'Dm7', 'Em7', 'Cmaj7', 'Dmaj7', 'Emaj7', 'Gmaj7', 'Amaj7', 'Asus2', 'Dsus2', 'Esus2', 'Asus4', 'Dsus4', 'Esus4', 'Csus4', 'Gsus4', 'Cadd9']);
// Canonical qualities the rest of the code understands:
//   '' 'm' '7' 'maj7' 'm7' 'm7b5' 'sus2' 'sus4' 'dim' 'dim7' 'aug' 'add9' '6' 'm6' '9' 'maj9' 'm9'
// QUALITY_ALIASES maps every accepted spelling to one of those. Exact-case keys are
// checked first so single-letter 'M' (major) and 'm' (minor) stay distinct; everything
// else is matched case-insensitively so 'Maj7', 'MAJ7', 'maj7' all resolve the same way.
const QUALITY_ALIASES: Record<string, string> = {
  '': '', 'm': 'm', 'min': 'm', 'minor': 'm',
  'M': '', 'maj': '', 'major': '',
  '7': '7', 'dom7': '7', 'dominant7': '7',
  'M7': 'maj7', 'maj7': 'maj7', 'major7': 'maj7',
  'm7': 'm7', 'min7': 'm7', 'minor7': 'm7',
  'm7b5': 'm7b5', 'min7b5': 'm7b5', 'minor7b5': 'm7b5', 'ø': 'm7b5', 'ø7': 'm7b5',
  'sus': 'sus4', 'sus4': 'sus4', 'sus2': 'sus2',
  'dim': 'dim', 'diminished': 'dim', '°': 'dim',
  'dim7': 'dim7', 'diminished7': 'dim7', '°7': 'dim7',
  'aug': 'aug', 'augmented': 'aug', '+': 'aug',
  'add9': 'add9', 'add9th': 'add9',
  '6': '6', 'M6': '6', 'maj6': '6', 'major6': '6',
  'm6': 'm6', 'min6': 'm6', 'minor6': 'm6',
  '9': '9', 'M9': 'maj9', 'maj9': 'maj9', 'major9': 'maj9',
  'm9': 'm9', 'min9': 'm9', 'minor9': 'm9',
};
function normalizeQuality(raw: string): string | null {
  if (raw === '') return '';
  if (Object.hasOwn(QUALITY_ALIASES, raw)) return QUALITY_ALIASES[raw];
  const lower = raw.toLowerCase();
  if (Object.hasOwn(QUALITY_ALIASES, lower)) return QUALITY_ALIASES[lower];
  return null;
}
const EXACT_SHAPES: Record<string, { chord: string; explanation: string }> = {
  F: { chord: 'F/C', explanation: 'A smaller F voicing with C in the bass; you can avoid a full six-string barre.' },
  Bm: { chord: 'Bm7', explanation: 'A more forgiving grip, though the added seventh changes the sound slightly.' },
};
const APPROX_SHAPES: Record<string, { chord: string; explanation: string }> = {
  F: { chord: 'Fmaj7', explanation: 'Keep the F major feel with an open high E string instead of a full barre.' },
};

type Parsed = { root: string; quality: string; bass?: string; name: string; source: string };
function canonicalNote(note: string): string { const clean = note[0].toUpperCase() + (note[1] || ''); return ENHARMONIC[clean] || clean; }
function parseChord(input: string): Parsed | null {
  const match = input.match(/^([A-Ga-g])([#b♯♭]?)(.*)$/);
  if (!match) return null;
  const root = canonicalNote(match[1] + match[2].replace('♯', '#').replace('♭', 'b'));
  const [rawQuality, rawBass, ...extra] = match[3].split('/');
  if (extra.length) return null;
  const quality = normalizeQuality(rawQuality);
  if (quality === null) return null;
  if (rawBass && !/^[A-Ga-g][#b♯♭]?$/.test(rawBass)) return null;
  const bass = rawBass ? canonicalNote(rawBass.replace('♯', '#').replace('♭', 'b')) : undefined;
  return { root, quality, bass, name: root + quality + (bass ? '/' + bass : ''), source: input };
}
function transpose(note: string, by: number): string { return NOTES[(NOTES.indexOf(note) + by + 120) % 12]; }
function shift(chord: Parsed, fret: number): string { return transpose(chord.root, -fret) + chord.quality + (chord.bass ? '/' + transpose(chord.bass, -fret) : ''); }
function easeScore(name: string): number {
  if (OPEN.has(name)) return 0;
  if (name.includes('/')) return 3;
  if (/m7b5|dim7|dim|aug/.test(name)) return 5;
  if (/maj7|m7|7|sus|9|6/.test(name)) return 3;
  return 4;
}
function suggestion(chord: string, label: Suggestion['label'], explanation: string, approximate = false): Suggestion { return { chord, label, explanation, approximate }; }
function recommend(parsed: Parsed): ChordResult {
  const original = parsed.name;
  if (OPEN.has(original)) {
    if (hasBarreVoicing(original)) {
      return { original, originalVoicing: 'Barre shape', primary: suggestion(original, 'Open shape', 'A simpler open-position shape — no barre needed, so it’s easier on your hand.') };
    }
    return { original, primary: suggestion(original, 'Original shape', 'Already a comfortable open-position chord. No change needed.') };
  }
  if (parsed.bass) {
    const plain = parsed.root + parsed.quality;
    if (OPEN.has(plain)) return { original, primary: suggestion(plain, 'Easier option', `Play the familiar ${plain} shape without the ${parsed.bass} bass note. The bass movement will change slightly.`, true) };
    return { original, primary: suggestion(original, 'Original shape', 'The bass note is part of this voicing. A capo may offer a friendlier shape without changing the song’s harmony.') };
  }
  if (original === 'F#m7b5') return { original, primary: suggestion('Am', 'Easier option', 'A familiar open shape that shares three notes, but leaves out F♯ and changes the harmony.', true), other: suggestion('Am6', 'Alternative', 'Contains the same four notes in a different order; more accurate, but the shape takes practice.') };
  if (original === 'Bb') return { original, primary: suggestion(original, 'Original shape', 'A different basic chord would change Bb too much. Try a compact Bb voicing, or use the capo option below to play an A shape.') };
  const exact = EXACT_SHAPES[original];
  const approx = APPROX_SHAPES[original];
  if (exact) return {
    original,
    primary: suggestion(exact.chord, original === 'Bm' ? 'Alternative' : 'Easier option', exact.explanation, original === 'Bm'),
    ...(approx ? { other: suggestion(approx.chord, 'Alternative', approx.explanation, true) } : {}),
  };
  if (parsed.quality === '7' || parsed.quality === 'maj7' || parsed.quality === 'm7' || parsed.quality === 'add9' || parsed.quality === '6' || parsed.quality === 'm6' || parsed.quality === '9' || parsed.quality === 'maj9' || parsed.quality === 'm9') {
    const base = parsed.root + (parsed.quality === 'm7' || parsed.quality === 'm6' || parsed.quality === 'm9' ? 'm' : '');
    if (OPEN.has(base)) return { original, primary: suggestion(base, 'Easier option', 'An open shape with the same root and major/minor feel. It drops a color note, so the sound changes slightly.', true) };
  }
  if (parsed.quality === 'sus2' || parsed.quality === 'sus4') {
    const base = parsed.root;
    if (OPEN.has(base)) return { original, primary: suggestion(base, 'Alternative', 'An easier major shape, but replacing the suspended note changes the sound.', true) };
  }
  if (parsed.quality === 'dim' || parsed.quality === 'dim7' || parsed.quality === 'aug' || parsed.quality === 'm7b5') {
    return { original, primary: suggestion(original, 'Original shape', 'This chord has a distinctive sound; a basic major or minor chord would change it too much. Try a compact voicing or the capo suggestion instead.') };
  }
  return { original, primary: suggestion(original, 'Original shape', 'Keeping the original chord preserves the song’s harmony. Try a smaller voicing or a capo if the grip is difficult.') };
}

export function simplifyChords(input: string): { results: ChordResult[]; capo: CapoResult | null; invalid: string[] } {
  const tokens = input.trim().split(/[\s|,;]+/).map(token => token.replace(/^[\[(]+|[\]):]+$/g, '')).filter(Boolean);
  const invalid: string[] = [];
  const parsed: Parsed[] = [];
  for (const token of tokens) {
    const chord = parseChord(token);
    if (chord) parsed.push(chord);
    else invalid.push(token);
  }
  if (!parsed.length) return { results: [], capo: null, invalid };
  const results = parsed.map(chord => { const result = recommend(chord); return { ...result, original: chord.source, primary: { ...result.primary, chord: result.primary.chord === chord.name ? chord.source : result.primary.chord } }; });
  const originalScore = parsed.reduce((sum, chord) => sum + easeScore(chord.name), 0);
  let best: CapoResult | null = null;
  for (let fret = 1; fret <= 7; fret++) {
    const chords = parsed.map(chord => shift(chord, fret));
    const score = chords.reduce((sum, chord) => sum + easeScore(chord), 0);
    if (score < originalScore - 1 && (!best || score < best.score || (score === best.score && fret < best.fret))) best = { fret, chords, score };
  }
  return { results, capo: best, invalid };
}

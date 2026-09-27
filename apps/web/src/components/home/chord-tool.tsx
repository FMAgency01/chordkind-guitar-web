import { useEffect, useRef, useState, useCallback } from 'react';
import { Check, Clipboard, Lightbulb, RotateCcw, Music2, Share2, Hand, ChevronLeft, ChevronRight } from 'lucide-react';
import { simplifyChords, type ChordResult, type CapoResult } from '@/lib/chords';
import { Feedback } from '@/components/home/feedback';
import { ChordDiagram } from '@/components/home/chord-diagram';
import { VisualCapoNeck } from '@/components/home/visual-capo-neck';

const PRESET_SONGS = [
  { name: 'Outnumbered', artist: 'Dermot Kennedy', chords: 'Em | C | G | D' },
  { name: 'Dive', artist: 'Olivia Dean', chords: 'Ebmaj7 | Gm7 | Fm7 | Bb7' },
  { name: 'Boston', artist: 'Stella Lefty', chords: 'C | Dm | F | G' },
  { name: 'Hotel California', artist: 'Eagles', chords: 'Bm | F# | A | E | G | D | Em | F#' },
  { name: 'Creep', artist: 'Radiohead', chords: 'G | B | C | Cm' },
  { name: 'Riptide', artist: 'Vance Joy', chords: 'Am | G | C | F' },
  { name: 'Wonderwall', artist: 'Oasis', chords: 'Em7 | G | Dsus4 | A7sus4 | Cadd9' },
  { name: 'Let It Be', artist: 'The Beatles', chords: 'C | G | Am | F | C | G | F | C' },
  { name: 'Hallelujah', artist: 'Leonard Cohen', chords: 'C | Am | F | G | E7' },
  { name: 'Fly Me to the Moon', artist: 'Frank Sinatra', chords: 'Am7 | Dm7 | G7 | Cmaj7 | Fmaj7 | Bm7b5 | E7' },
  { name: 'Stand By Me', artist: 'Ben E. King', chords: 'A | F#m | D | E' },
  { name: 'Someone Like You', artist: 'Adele', chords: 'A | E/G# | F#m | D' },
  { name: 'Knockin’ on Heaven’s Door', artist: 'Bob Dylan', chords: 'G | D | Am | G | D | C' },
  { name: 'Yellow', artist: 'Coldplay', chords: 'B | F# | E | B | G#m | F#' },
  { name: 'Zombie', artist: 'The Cranberries', chords: 'Em | Cmaj7 | G | D/F#' },
];

export function ChordTool() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<ChordResult[] | null>(null);
  const [capo, setCapo] = useState<CapoResult | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copiedChords, setCopiedChords] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [leftHanded, setLeftHanded] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const presetsScrollRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Load initial state: Read URL params and Left-handed preference
  useEffect(() => {
    try {
      const storedLefty = localStorage.getItem('chordkind_lefty');
      if (storedLefty === 'true') {
        setLeftHanded(true);
      }
    } catch {
      // Ignore storage error
    }

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const chordsParam = searchParams.get('chords') || searchParams.get('c');
      if (chordsParam) {
        const decoded = decodeURIComponent(chordsParam);
        setInput(decoded);
        const outcome = simplifyChords(decoded);
        setInvalid(outcome.invalid);
        setCapo(outcome.capo);
        setResults(outcome.results);
      }
    }
  }, []);

  const handleSimplify = useCallback((chordText: string, shouldScroll = false) => {
    if (!chordText.trim()) {
      setResults(null);
      setCapo(null);
      setInvalid([]);
      setError('');
      return;
    }

    const outcome = simplifyChords(chordText);
    setInvalid(outcome.invalid);
    setCapo(outcome.capo);
    setResults(outcome.results);
    setError(
      outcome.results.length
        ? ''
        : 'We couldn’t identify any chords. Try entering chords like Am, F, C#m7, F#m or Bb, separated by spaces or commas.'
    );

    if (shouldScroll && outcome.results.length) {
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, []);

  // Live Instant Simplification (Debounced) & URL query sync
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      handleSimplify(input, false);

      // Sync shareable URL in browser address bar
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (input.trim()) {
          url.searchParams.set('chords', input.trim());
        } else {
          url.searchParams.delete('chords');
          url.searchParams.delete('c');
        }
        window.history.replaceState(null, '', url.toString());
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [input, handleSimplify]);

  function toggleLeftHanded() {
    setLeftHanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('chordkind_lefty', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }

  function applyPreset(presetChords: string) {
    setInput(presetChords);
    setError('');
    handleSimplify(presetChords, true);
  }

  function scrollPresets(direction: 'left' | 'right') {
    if (presetsScrollRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      presetsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }

  function clear() {
    setInput('');
    setResults(null);
    setCapo(null);
    setInvalid([]);
    setError('');
    setCopiedChords(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('chords');
      url.searchParams.delete('c');
      window.history.replaceState(null, '', url.toString());
    }
  }

  async function copyChords() {
    if (!results?.length) return;
    try {
      await navigator.clipboard.writeText(results.map((item) => item.primary.chord).join(' | '));
      setCopiedChords(true);
      window.setTimeout(() => setCopiedChords(false), 2400);
    } catch {
      setError('Copy didn’t work in this browser. Please select the chords above and copy them manually.');
    }
  }

  async function copyShareLink() {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (input.trim()) {
        url.searchParams.set('chords', input.trim());
      }
      await navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      setError('Could not copy link to clipboard.');
    }
  }

  return (
    <section id="tool" className="tool-wrap" aria-label="Guitar chord simplifier">
      <div className="tool-card">
        <div className="tool-heading">
          <div className="tool-heading-icon">
            <Music2 size={19} />
          </div>
          <div>
            <span className="overline">THE CHORD SIMPLIFIER</span>
            <p>Less wrestling. More playing.</p>
          </div>

          {/* Controls: Left-Handed mode toggle & Free badge */}
          <div className="tool-header-actions">
            <button
              type="button"
              className={`hand-toggle-btn ${leftHanded ? 'is-active' : ''}`}
              onClick={toggleLeftHanded}
              title={leftHanded ? 'Switch to right-handed diagrams' : 'Switch to left-handed diagrams'}
              aria-label={leftHanded ? 'Switch to right-handed' : 'Switch to left-handed'}
            >
              <Hand size={14} className={leftHanded ? 'rotate-180' : ''} />
              <span>{leftHanded ? 'Left-Handed' : 'Right-Handed'}</span>
            </button>
            <span className="free-badge">FREE TO USE</span>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="input-header-row">
            <label htmlFor="chords" className="input-label">
              Enter your chords
            </label>
            {input.trim() && (
              <span className="live-pill" title="Simplifying live as you type">
                <span className="live-dot" /> Live Auto-Simplify
              </span>
            )}
          </div>
          <p className="input-hint">
            Paste a progression, or type chords separated by spaces, commas, or |. Most spellings work — Cmaj, C major, Bmin, B minor, Db7, F#m7b5.
          </p>

          <textarea
            id="chords"
            rows={3}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              if (error) setError('');
            }}
            placeholder="Try: F#m7b5 | C#m7 | Bb | G# | F"
            aria-describedby={error ? 'chord-error' : 'chord-help'}
          />

          {/* Single-line Song Presets Carousel with < and > arrows */}
          <div className="presets-area">
            <span className="presets-label">Popular song presets:</span>
            <div className="presets-carousel-wrap">
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={() => scrollPresets('left')}
                title="Scroll previous song presets"
                aria-label="Previous songs"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="presets-scroll-track" ref={presetsScrollRef}>
                {PRESET_SONGS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    className={`preset-chip ${input === preset.chords ? 'is-active' : ''}`}
                    onClick={() => applyPreset(preset.chords)}
                    title={`${preset.name} by ${preset.artist} (${preset.chords})`}
                  >
                    <span className="preset-name">{preset.name}</span>
                    <span className="preset-artist">{preset.artist}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="carousel-nav-btn"
                onClick={() => scrollPresets('right')}
                title="Scroll next song presets"
                aria-label="Next songs"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="tool-bottom">
            <span id="chord-help" className="helper-line">
              <Lightbulb size={15} /> Chords simplify automatically as you type.
            </span>
            <div className="tool-buttons">
              {input.trim() && (
                <button type="button" className="clear-button" onClick={clear}>
                  <RotateCcw size={15} /> Clear Chords
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className="form-error" id="chord-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>

      {results && results.length > 0 && (
        <div className="results-area" ref={resultsRef} aria-live="polite">
          <div className="results-card">
            <div className="results-title-row">
              <div>
                <span className="overline">READY TO PLAY</span>
                <h2>Your Easier Chords</h2>
                <p>Not sure which version to choose? Start with the first option.</p>
              </div>
              <div className="results-actions-top">
                <button
                  type="button"
                  className="share-link-btn"
                  onClick={copyShareLink}
                  title="Share this simplified chord progression"
                >
                  {copiedLink ? <Check size={15} /> : <Share2 size={15} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Song'}</span>
                </button>
                <span className="results-count">
                  {results.length} {results.length === 1 ? 'CHORD' : 'CHORDS'}
                </span>
              </div>
            </div>

            <div className="results-table">
              <div className="results-table-head">
                <span>Original</span>
                <span>Easier option</span>
                <span>Why it’s easier</span>
              </div>
              {results.map((item, index) => (
                <div className="result-row" key={`${item.original}-${index}`}>
                  <div className="original-cell">
                    <div className="original-chord">{item.original}</div>
                    {item.originalVoicing && (
                      <span className="original-voicing">{item.originalVoicing}</span>
                    )}
                    <ChordDiagram
                      chord={item.original}
                      size="sm"
                      voicing={item.originalVoicing === 'Barre shape' ? 'barre' : undefined}
                      className="diagram-original"
                      leftHanded={leftHanded}
                    />
                  </div>
                  <div className="option-cell">
                    <div className="option-main">
                      <div className="option-text">
                        <span className="new-chord">{item.primary.chord}</span>
                        <span className="option-label">{item.primary.label}</span>
                      </div>
                      <ChordDiagram
                        chord={item.primary.chord}
                        size="md"
                        className="diagram-primary"
                        leftHanded={leftHanded}
                      />
                    </div>
                    {item.other && (
                      <div className="other-option">
                        <div className="other-option-text">
                          <span>{item.other.chord}</span>
                          <small>
                            {item.other.label} · {item.other.explanation}
                          </small>
                        </div>
                        <ChordDiagram
                          chord={item.other.chord}
                          size="sm"
                          className="diagram-other"
                          leftHanded={leftHanded}
                        />
                      </div>
                    )}
                  </div>
                  <p className="explanation">
                    {item.primary.explanation}
                    {item.primary.approximate && (
                      <span className="approx-note">Approximation — the sound may change.</span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="results-footer">
              <p>Some alternatives slightly change the sound of the original chord. Trust your ears.</p>
              <div className="results-footer-buttons">
                <button type="button" className="share-link-btn footer-share-btn" onClick={copyShareLink}>
                  {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
                </button>
                <button type="button" className="copy-button" onClick={copyChords}>
                  {copiedChords ? <Check size={17} /> : <Clipboard size={17} />}
                  <span>{copiedChords ? 'Copied!' : 'Copy simplified progression'}</span>
                </button>
              </div>
            </div>
          </div>

          {invalid.length > 0 && (
            <div className="invalid-note" role="status">
              <strong>We skipped: {invalid.join(', ')}</strong>
              <span>
                We couldn’t confidently recognize {invalid.length === 1 ? 'this entry' : 'these entries'}, so we haven’t guessed. Use chord names only (for example, C#m7 or Fsus4).
              </span>
            </div>
          )}

          {/* Visual Capo Neck */}
          {capo && (
            <VisualCapoNeck
              fret={capo.fret}
              chords={capo.chords}
              leftHanded={leftHanded}
            />
          )}

          <Feedback search={input} resultCount={results.length} />
        </div>
      )}
    </section>
  );
}

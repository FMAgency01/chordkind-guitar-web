import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, MessageSquareHeart } from 'lucide-react';
import pocketbaseClient from '@/lib/pocketbase-client';

type Rating = 'helpful' | 'not_helpful';

const STORAGE_KEY = 'chordkind_feedback';

function hashSearch(search: string): string {
  let h = 5381;
  const s = search.trim().toLowerCase();
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

function readStore(): Record<string, Rating> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, Rating>;
  } catch {
    return {};
  }
}

export function Feedback({ search, resultCount }: { search: string; resultCount: number }) {
  const key = hashSearch(search);
  const [submitted, setSubmitted] = useState<Rating | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const store = readStore();
    setSubmitted(store[key] ?? null);
    setStatus('idle');
    setError('');
  }, [key]);

  async function send(rating: Rating) {
    if (submitted || status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      await pocketbaseClient.collection('feedback').create({
        search: search.trim().slice(0, 2000),
        rating,
        result_count: resultCount,
      });
      setSubmitted(rating);
      setStatus('idle');
      try {
        const store = readStore();
        store[key] = rating;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch {
        /* localStorage unavailable — de-dupe is best-effort */
      }
    } catch {
      setStatus('error');
      setError('We couldn’t save your feedback right now. Thanks anyway for giving it a try.');
    }
  }

  return (
    <div className="feedback-card" aria-live="polite">
      <div className="feedback-icon" aria-hidden="true">
        <MessageSquareHeart size={22} />
      </div>
      <div className="feedback-body">
        <span className="overline">YOUR FEEDBACK</span>
        <h3>Was this helpful?</h3>
        <p>Your rating is saved with the chord progression you entered, so we can spot which suggestions work and improve the tool.</p>
        {submitted ? (
          <div className="feedback-thanks" role="status">
            <Check size={18} />
            <span>Thanks for your feedback!</span>
          </div>
        ) : (
          <div className="feedback-buttons">
            <button
              type="button"
              className="feedback-thumb"
              onClick={() => send('helpful')}
              disabled={status === 'sending'}
              aria-pressed={false}
            >
              <ThumbsUp size={17} /> Yes, helpful
            </button>
            <button
              type="button"
              className="feedback-thumb"
              onClick={() => send('not_helpful')}
              disabled={status === 'sending'}
              aria-pressed={false}
            >
              <ThumbsDown size={17} /> Not really
            </button>
          </div>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    </div>
  );
}

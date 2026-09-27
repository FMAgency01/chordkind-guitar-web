import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'chordkind_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* storage unavailable — banner just dismisses */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie policy notice">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-copy">
          <Cookie size={26} aria-hidden="true" />
          <p>
            We only use essential browser storage to remember your cookie choice and avoid recording the same feedback twice — no advertising or tracking cookies. See our{' '}
            <a href="/privacy#cookies">cookie policy</a>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="clear-button" onClick={() => choose('declined')}>
            Only essential
          </button>
          <button type="button" className="primary-button" onClick={() => choose('accepted')}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

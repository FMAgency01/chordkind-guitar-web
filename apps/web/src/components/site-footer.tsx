import { Guitar } from 'lucide-react';

export function SiteFooter() {
  return <footer className="site-footer"><div className="page-shell footer-inner"><div><a className="brand" href="/"><span className="brand-icon"><Guitar size={21}/></span><span>chordkind<span className="brand-dot">.</span></span></a><p>Good songs. Easier chords. More playing.</p></div><div className="footer-links"><a href="/#tool">Simplify chords</a><a href="/#about">About</a><a href="/privacy">Privacy policy</a><a href="/privacy#cookies">Cookie policy</a></div><small>© {new Date().getFullYear()} chordkind. Made for the joy of playing.</small></div></footer>;
}

import { Guitar, ArrowUpRight } from 'lucide-react';

export function SiteHeader() {
  return <header className="site-header"><div className="page-shell header-inner">
    <a className="brand" href="/" aria-label="Chordkind home"><span className="brand-icon"><Guitar size={21} strokeWidth={2.1} /></span><span>chordkind<span className="brand-dot">.</span></span></a>
    <nav aria-label="Main navigation" className="header-nav"><a href="/#how-it-works">How it works</a><a href="/#about">About</a><a href="/#faq">FAQs</a></nav>
    <a className="header-action" href="/#tool">Try the tool <ArrowUpRight size={15}/></a>
  </div></header>;
}

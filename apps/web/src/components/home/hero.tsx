import { Check, ArrowDownRight } from 'lucide-react';
import { ChordTool } from '@/components/home/chord-tool';

export function Hero() {
  return <div className="hero-region"><div className="page-shell"><div className="hero-intro"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> FOR THE SONGS YOU WANT TO PLAY</div><h1>Make Any Guitar <em>Chord</em> Easier<span className="hero-period">.</span></h1><p>Paste your song’s chords and get simpler, beginner-friendly alternatives in seconds.</p><div className="hero-proof"><span><Check size={15}/> No account needed</span><span><Check size={15}/> Free to use</span><span><Check size={15}/> Made for real guitarists</span></div></div><div className="hero-art" aria-hidden="true"><div className="hero-photo"><img src="https://images.hostinger.com/ba8a9d41-3f19-44f3-82e5-2716c689814e.png" alt="" width="800" height="600" fetchPriority="high" /></div><div className="art-stamp"><span>LESS</span><span>BARRE.</span><span>MORE</span><span>MUSIC.</span><ArrowDownRight size={22}/></div></div></div><ChordTool /></div></div>;
}

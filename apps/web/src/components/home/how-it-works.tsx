import { ClipboardPaste, WandSparkles, Guitar } from 'lucide-react';

const steps = [
  { number: '01', title: 'Paste your chords', description: 'Drop in a single tricky chord or a whole song progression.', icon: ClipboardPaste },
  { number: '02', title: 'Simplify them', description: 'See practical easier shapes and honest notes about what changes.', icon: WandSparkles },
  { number: '03', title: 'Start playing', description: 'Copy your new progression, grab your guitar, and make some music.', icon: Guitar },
];
export function HowItWorks() {
  return <section id="how-it-works" className="how-section"><div className="page-shell"><div className="section-heading"><div><span className="overline">A BETTER WAY TO BEGIN</span><h2>From stuck to strumming<br/><em>in three steps.</em></h2></div><p>No complicated theory lesson. Just a clearer way to play the songs you love.</p></div><div className="steps-grid">{steps.map(step => <div className="step" key={step.number}><div className="step-top"><span>{step.number} / 03</span><step.icon size={25} strokeWidth={1.6}/></div><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></div></section>;
}

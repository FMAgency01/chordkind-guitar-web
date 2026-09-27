import { Plus } from 'lucide-react';
import { faqs } from '@/data/faqs';

export function FAQ() {
  return <section id="faq" className="faq-section"><div className="page-shell faq-layout"><div className="faq-intro"><span className="overline">GOOD QUESTIONS</span><h2>A few things you <em>might be wondering.</em></h2><p>New to easy guitar chords? Here’s what you need to know before you play.</p></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} className="faq-item"><summary><span className="faq-index">{String(index + 1).padStart(2, '0')}</span><span>{faq.question}</span><Plus className="faq-plus" size={19}/></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}

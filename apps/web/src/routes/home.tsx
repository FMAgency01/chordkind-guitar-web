import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { About } from '@/components/home/about';
import { FAQ } from '@/components/home/faq';
import { AdSpace } from '@/components/home/ad-space';
import { faqs } from '@/data/faqs';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Guitar Chord Simplifier | Easier Chords in Seconds',
		description: 'Simplify guitar chords instantly with beginner-friendly alternatives, clear explanations and helpful capo suggestions. Free guitar chord simplifier, no account needed.',
		image: 'https://images.hostinger.com/ba8a9d41-3f19-44f3-82e5-2716c689814e.png',
		jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'chordkind', description: 'A free guitar chord simplifier for practical, beginner-friendly chord alternatives.' }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }],
	});
}

export default function HomePage() {
	return <main><Hero /><HowItWorks /><AdSpace /><About /><FAQ /></main>;
}

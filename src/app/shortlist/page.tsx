import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { Shortlist } from '@/components/shortlist';
export const metadata: Metadata = { title: 'Your shortlist' };
export default function ShortlistPage(){return <><PageIntro number="YOUR EDIT" label="THE SHORTLIST" title="THE ONES THAT" accent="STAY WITH YOU."><p>A little collection of your own.<br/>Save, compare, and take a closer look.</p></PageIntro><Shortlist/></>}

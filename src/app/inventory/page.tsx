import type { Metadata } from 'next';
import { PageIntro, ContactBand } from '@/components/ui';
import { InventoryBrowser } from '@/components/inventory-browser';
export const metadata: Metadata = { title: 'The collection' };
export default function Inventory() { return <><PageIntro number="01" label="THE COLLECTION" title="A GOOD PLACE" accent="TO FALL IN LOVE."><p>Different characters. One common thread.<br/>A collection chosen for the way it makes you feel.</p><span className="intro-footnote">SIX CARS. COUNTLESS POSSIBILITIES.</span></PageIntro><InventoryBrowser/><ContactBand title="THE ONE IS OUT THERE." text="If you haven’t found it yet, let’s start a conversation."/></>; }

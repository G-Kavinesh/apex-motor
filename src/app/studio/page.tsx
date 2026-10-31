import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { PitchStudio } from '@/components/pitch-studio';
export const metadata: Metadata={title:'The pitch studio',robots:{index:false,follow:false}};
export default function Studio(){return <><PageIntro number="MADE FOR YOUR NEXT PITCH" label="THE STUDIO" title="MAKE IT" accent="THEIR NEXT CHAPTER."><p>A considered showroom experience.<br/>An identity that can become your client’s.</p></PageIntro><PitchStudio/></>}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/journal';
import { CarImage } from '@/components/car-image';
import { Eyebrow, ContactBand, TextLink } from '@/components/ui';
import { ArrowLeft } from '@/components/icon';
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const a=articles.find(a=>a.slug===slug);return{title:a?.title,description:a?.excerpt};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)notFound();return <><article><div className="container article-header"><Link className="back-link" href="/journal"><ArrowLeft size={15}/> Back to the journal</Link><Eyebrow>{a.category} / THE APEX JOURNAL</Eyebrow><h1 className="display">{a.title}</h1><p>{a.excerpt}</p><span className="article-reading">WORDS BY THE ATELIER · {a.read}</span></div><div className="article-cover"><CarImage image={a.image} alt={a.title} priority width={2200}/></div><div className="article-body"><span className="article-drop">A NOTE FOR THE JOURNEY</span>{a.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}<div className="article-end"><span>TAKE THE LONG WAY. MAKE IT YOURS.</span><TextLink href="/inventory">Find your next chapter</TextLink></div></div></article><ContactBand title="THE ROAD IS CALLING."/></>}

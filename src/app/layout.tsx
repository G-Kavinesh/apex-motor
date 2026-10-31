import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
export const metadata: Metadata = { title: { default: 'APEX Motor Atelier — For the love of the drive', template: '%s | APEX Motor Atelier' }, description: 'A considered collection of exceptional cars. Discover the APEX Motor Atelier showroom experience, explore the collection and plan your next great drive.', icons: { icon: '/icon.svg' } };
export const viewport: Viewport = { themeColor: '#1b201a' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=DM+Sans:wght@400;450;500;550;600;650;700&display=swap" rel="stylesheet"/></head><body><Providers><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></Providers></body></html>; }

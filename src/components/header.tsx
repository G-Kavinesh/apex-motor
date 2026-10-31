'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '@/lib/site';
import { useShowroom } from './providers';
import { ArrowUpRight, Heart, Menu, X } from './icon';
export function Header() {
  const path = usePathname(), { saved, brand } = useShowroom(); const [open, setOpen] = useState(false);
  return <header className="site-header"><Link className={`wordmark ${brand.name.length > 7 ? 'brand-long' : ''}`} href="/" onClick={() => setOpen(false)} aria-label={`${brand.name} home`}>{brand.name}<sup>®</sup><span>{brand.descriptor}</span></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n => <Link className={path.startsWith(n.href) ? 'current' : ''} key={n.href} href={n.href}>{n.label}</Link>)}</nav><div className="header-actions"><Link className="shortlist-link" href="/shortlist" aria-label={`Shortlist, ${saved.length} saved vehicles`}><Heart size={18} /><span>{String(saved.length).padStart(2, '0')}</span></Link><Link className="button button-outline compact header-book" href="/contact">Let’s talk cars <ArrowUpRight size={16}/></Link><button className="menu-button icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...navigation, { href: '/sell', label: 'Sell your car' }, { href: '/contact', label: 'Book a viewing' }, { href: '/shortlist', label: 'Your shortlist' }].map(n => <Link key={n.href} onClick={() => setOpen(false)} href={n.href}>{n.label}<ArrowUpRight size={20}/></Link>)}</nav>}</header>;
}

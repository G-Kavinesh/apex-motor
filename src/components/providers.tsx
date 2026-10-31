'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { site } from '@/lib/site';
type Brand = { name: string; accent: string; descriptor: string };
type Context = { saved: string[]; toggleSaved: (slug: string) => void; ready: boolean; brand: Brand; setBrand: (brand: Brand) => void; resetBrand: () => void; storageAvailable: boolean };
const defaults: Brand = { name: site.name, accent: site.accent, descriptor: site.descriptor };
const AppContext = createContext<Context | null>(null);
export function Providers({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]), [ready, setReady] = useState(false), [brand, updateBrand] = useState<Brand>(defaults), [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => { try { const list = JSON.parse(localStorage.getItem('apex-shortlist') || '[]'); if (Array.isArray(list)) setSaved(list.filter((x): x is string => typeof x === 'string')); const b = JSON.parse(localStorage.getItem('apex-brand') || 'null'); if (b && typeof b.name === 'string' && typeof b.descriptor === 'string' && /^#[0-9a-f]{6}$/i.test(b.accent)) updateBrand(b); } catch { setStorageAvailable(false); } setReady(true); }, []);
  useEffect(() => { document.documentElement.style.setProperty('--accent', brand.accent); }, [brand]);
  function persist(key: string, value: unknown) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { setStorageAvailable(false); } }
  function toggleSaved(slug: string) { setSaved(previous => { const next = previous.includes(slug) ? previous.filter(s => s !== slug) : [...previous, slug]; persist('apex-shortlist', next); return next; }); }
  function setBrand(value: Brand) { updateBrand(value); persist('apex-brand', value); }
  return <AppContext.Provider value={{ saved, toggleSaved, ready, brand, setBrand, resetBrand: () => setBrand(defaults), storageAvailable }}>{children}</AppContext.Provider>;
}
export function useShowroom() { const context = useContext(AppContext); if (!context) throw new Error('Showroom provider missing'); return context; }

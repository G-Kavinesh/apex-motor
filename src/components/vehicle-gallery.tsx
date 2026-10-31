'use client';
import { useRef, useState } from 'react';
import { type Vehicle } from '@/lib/vehicles';
import { CarImage } from './car-image';
import { ChevronLeft, ChevronRight, X, Plus } from './icon';
export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [view, setView] = useState(0), dialog = useRef<HTMLDialogElement>(null);
  const names = ['The complete picture', 'The closer look', 'The design study'];
  function step(direction: number) { setView(v=>(v+direction+3)%3); }
  function gallery(expanded: boolean) { return <><div className={`gallery-main gallery-view-${view}`}><CarImage priority={!expanded} image={vehicle.image} alt={`${vehicle.make} ${vehicle.model} — ${names[view]}, editorial crop`} width={2200}/><span className="gallery-label">{names[view]} <small>EDITORIAL IMAGE / {view === 0 ? 'FULL FRAME' : 'DETAIL CROP'}</small></span><button className="gallery-expand" onClick={()=>expanded?dialog.current?.close():dialog.current?.showModal()} aria-label={expanded?'Close photography viewer':'Expand photography'}>{expanded?<X size={20}/>:<Plus size={20}/>}</button><div className="gallery-controls"><button onClick={()=>step(-1)} aria-label="Previous image view"><ChevronLeft size={17}/></button><span aria-live="polite">0{view+1} / 03</span><button onClick={()=>step(1)} aria-label="Next image view"><ChevronRight size={17}/></button></div></div><div className="gallery-thumbnails" role="group" aria-label="Photography views">{names.map((name,i)=><button key={name} className={`gallery-thumb gallery-view-${i} ${i===view?'selected':''}`} onClick={()=>setView(i)} aria-label={name} aria-pressed={i===view}><CarImage image={vehicle.image} alt={name} width={600}/><span>0{i+1}</span></button>)}</div></>; }
  return <><div className="vehicle-gallery">{gallery(false)}</div><dialog className="gallery-dialog" ref={dialog} aria-label={`${vehicle.make} ${vehicle.model} photography viewer`} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}>{gallery(true)}</dialog></>;
}

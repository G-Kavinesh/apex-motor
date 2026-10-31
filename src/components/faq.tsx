'use client';
import { Plus, Minus } from './icon';
import { useState } from 'react';
export function Faq({ items }: { items: { question: string; answer: string }[] }) { const [open,setOpen]=useState<number|null>(0);return <div className="faq">{items.map((item,i)=><div className="faq-item" key={item.question}><h3><button aria-expanded={open===i} aria-controls={`faq-answer-${i}`} onClick={()=>setOpen(open===i?null:i)}>{item.question}{open===i?<Minus size={18}/>:<Plus size={18}/>}</button></h3><div id={`faq-answer-${i}`} hidden={open!==i}><p>{item.answer}</p></div></div>)}</div>}

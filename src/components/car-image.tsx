'use client';
import { useState } from 'react';
import { imageUrl } from '@/lib/vehicles';
export function CarImage({ image, alt, className = '', priority = false, width = 1400 }: { image: string; alt: string; className?: string; priority?: boolean; width?: number }) {
  const [failed, setFailed] = useState(false);
  return <img className={className} src={failed ? '/images/atelier-car.svg' : imageUrl(image, width)} alt={failed ? `${alt} — illustrative silhouette` : alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)} />;
}

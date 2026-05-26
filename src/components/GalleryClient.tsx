'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import type { GalleryImage } from '@/lib/gallery';
import { Lightbox } from './Lightbox';

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
        {images.map((img, i) => (
          <motion.figure
            key={img.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.05 }}
            className="group relative mb-4 sm:mb-5 break-inside-avoid overflow-hidden rounded-3xl border hairline bg-cream-100/40 shadow-soft cursor-zoom-in"
            onClick={() => setActive(i)}
          >
            <button
              type="button"
              aria-label={`${img.alt} — büyüt`}
              className="block w-full text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/55 via-plum/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur px-2.5 py-1.5 text-[10px] tracking-[0.2em] uppercase text-plum opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <Expand className="h-3 w-3" strokeWidth={1.8} />
              Büyüt
            </div>
          </motion.figure>
        ))}
      </div>

      <Lightbox
        images={images}
        index={active}
        onClose={() => setActive(null)}
        onChange={setActive}
      />
    </>
  );
}

'use client';

import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/lib/gallery';

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

const SWIPE_THRESHOLD = 70;

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const open = index !== null;
  const reduce = useReducedMotion();

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-ink/85 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Galeri görseli"
        >
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 rounded-full p-2.5 text-cream-50 bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="hidden sm:flex absolute left-4 md:left-8 z-10 items-center justify-center rounded-full p-3 text-cream-50 bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.6} />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="hidden sm:flex absolute right-4 md:right-8 z-10 items-center justify-center rounded-full p-3 text-cream-50 bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.6} />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              drag={images.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) goNext();
                else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[82vh] cursor-grab active:cursor-grabbing"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.alt}
                draggable={false}
                className="max-w-[92vw] max-h-[82vh] w-auto h-auto rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream-50/85 text-xs tracking-[0.3em] uppercase">
              {String((index ?? 0) + 1).padStart(2, '0')}
              <span className="opacity-50"> / {String(images.length).padStart(2, '0')}</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

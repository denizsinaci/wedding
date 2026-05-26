'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FloralOrnament } from './FloralOrnament';
import { Countdown } from './Countdown';

export function Hero() {
  const reduce = useReducedMotion();

  const scrollNext = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Decorative florals */}
      <FloralOrnament
        variant="sprig"
        className="absolute -top-2 -left-8 sm:-left-4 w-56 sm:w-80 md:w-[28rem] opacity-70 pointer-events-none animate-float"
      />
      <FloralOrnament
        variant="sprig"
        flip
        className="absolute -bottom-4 -right-8 sm:-right-4 w-56 sm:w-80 md:w-[28rem] opacity-70 pointer-events-none animate-float"
      />
      <FloralOrnament
        variant="leaf"
        className="absolute top-32 right-6 sm:right-16 w-32 sm:w-44 opacity-50 hidden sm:block"
      />
      <FloralOrnament
        variant="leaf"
        flip
        className="absolute bottom-28 left-6 sm:left-16 w-32 sm:w-44 opacity-50 hidden sm:block"
      />

      {/* Soft floating petals */}
      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute left-[12%] top-[28%] w-2.5 h-2.5 rounded-full bg-rose-dust/60 blur-[1px]"
            animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden
            className="absolute right-[14%] top-[35%] w-2 h-2 rounded-full bg-mauve/60 blur-[1px]"
            animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
          <motion.span
            aria-hidden
            className="absolute left-[22%] bottom-[28%] w-1.5 h-1.5 rounded-full bg-sage/70 blur-[1px]"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </>
      )}

      <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 text-plum/80"
        >
          <span className="h-px w-10 bg-plum/40" />
          <span className="text-xs sm:text-sm tracking-[0.42em] uppercase">Save the Date</span>
          <span className="h-px w-10 bg-plum/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-7 font-display text-ink text-[clamp(2.6rem,9vw,5.75rem)] leading-[1.02] tracking-[-0.01em] text-balance"
        >
          <span className="block italic">Süheylanur</span>
          <span className="my-1 sm:my-2 inline-block font-display italic text-[0.62em] text-mauve">
            &amp;
          </span>
          <span className="block italic">Deniz</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg text-plum/80 font-light tracking-wide italic"
        >
          Mutluluğumuza davetlisiniz…
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-3 text-plum"
        >
          <span className="h-px w-10 bg-plum/40" />
          <span className="text-xs sm:text-sm tracking-[0.42em] uppercase">25 · 07 · 2026</span>
          <span className="h-px w-10 bg-plum/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-10 sm:mt-12"
        >
          <Countdown />
        </motion.div>
      </div>

      <button
        onClick={scrollNext}
        aria-label="Aşağı kaydır"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-plum/70 hover:text-plum transition-colors"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Kaydır</span>
        <ChevronDown className="h-5 w-5 animate-bounceSoft" strokeWidth={1.5} />
      </button>
    </section>
  );
}

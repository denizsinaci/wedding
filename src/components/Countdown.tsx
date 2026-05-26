'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { diffParts, WEDDING_DATE } from '@/lib/date';

const UNITS: Array<{ key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }> = [
  { key: 'days', label: 'Gün' },
  { key: 'hours', label: 'Saat' },
  { key: 'minutes', label: 'Dakika' },
  { key: 'seconds', label: 'Saniye' },
];

export function Countdown() {
  const [parts, setParts] = useState(() => diffParts(WEDDING_DATE, new Date(0)));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(diffParts(WEDDING_DATE));
    const id = setInterval(() => setParts(diffParts(WEDDING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3 md:gap-4"
      aria-live="polite"
      aria-label="Düğüne kalan süre"
    >
      {UNITS.map(({ key, label }, i) => {
        const value = parts[key];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}
            className="glass-strong rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[96px] shadow-soft"
          >
            <div className="font-display text-2xl sm:text-4xl md:text-5xl text-plum tabular-nums leading-none text-center">
              {mounted ? String(value).padStart(2, '0') : '—'}
            </div>
            <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink/60 text-center">
              {label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

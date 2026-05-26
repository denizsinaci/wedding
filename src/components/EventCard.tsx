'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, ExternalLink, Info } from 'lucide-react';
import type { WeddingEvent } from '@/data/events';
import { FloralOrnament } from './FloralOrnament';

const ACCENTS = {
  rose: {
    ribbon: 'from-rose-dust/40 via-rose-deep/20 to-transparent',
    chip: 'bg-rose-dust/15 text-rose-deep',
    button: 'bg-rose-deep hover:bg-plum',
    glow: 'shadow-[0_30px_60px_-20px_rgba(185,138,134,0.45)]',
    icon: 'text-rose-deep',
  },
  plum: {
    ribbon: 'from-mauve/40 via-plum/25 to-transparent',
    chip: 'bg-mauve/15 text-plum',
    button: 'bg-plum hover:bg-plum-deep',
    glow: 'shadow-[0_30px_60px_-20px_rgba(122,89,105,0.45)]',
    icon: 'text-plum',
  },
};

export function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const a = ACCENTS[event.accent];
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-[28px] glass-strong p-7 sm:p-9 ${a.glow}`}
    >
      <div
        aria-hidden
        className={`absolute -top-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${a.ribbon} blur-3xl`}
      />
      <FloralOrnament
        variant="sprig"
        className="pointer-events-none absolute -top-6 -right-6 w-44 opacity-30"
      />
      <FloralOrnament
        variant="leaf"
        flip
        className="pointer-events-none absolute -bottom-2 -left-2 w-36 opacity-40"
      />

      <div className="relative">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] tracking-[0.3em] uppercase ${a.chip}`}
        >
          {event.tagline}
        </span>

        <h3 className="mt-5 font-display italic text-4xl sm:text-5xl text-ink leading-tight">
          {event.title}
        </h3>

        <div className="mt-5 flex items-center gap-2 text-plum/80">
          <Calendar className={`h-4 w-4 ${a.icon}`} strokeWidth={1.5} />
          <span className="text-sm sm:text-base tracking-wide">{event.date}</span>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {event.details.map((d) => (
            <div
              key={d.label}
              className="rounded-2xl border hairline bg-cream-50/60 px-4 py-3 flex items-center gap-3"
            >
              <Clock className={`h-4 w-4 ${a.icon}`} strokeWidth={1.5} />
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ink/55">
                  {d.label}
                </div>
                <div className="font-display text-2xl text-ink leading-none mt-0.5">
                  {d.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3">
          <MapPin className={`h-5 w-5 mt-0.5 shrink-0 ${a.icon}`} strokeWidth={1.5} />
          <div>
            <div className="font-display text-xl text-ink">{event.venue.name}</div>
            <p className="text-sm text-ink/70 whitespace-pre-line leading-relaxed mt-1">
              {event.venue.address}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-cream-100/50 border hairline p-4">
          <Info className={`h-4 w-4 mt-0.5 shrink-0 ${a.icon}`} strokeWidth={1.5} />
          <p className="text-sm text-ink/75 leading-relaxed">{event.note}</p>
        </div>

        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide text-cream-50 transition-colors ${a.button}`}
        >
          <MapPin className="h-4 w-4" strokeWidth={1.8} />
          Google Maps'te Aç
          <ExternalLink className="h-3.5 w-3.5 opacity-80" strokeWidth={1.8} />
        </a>
      </div>
    </motion.article>
  );
}

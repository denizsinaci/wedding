import { Heart } from 'lucide-react';
import { FloralOrnament } from './FloralOrnament';

export function Footer() {
  return (
    <footer className="relative pt-16 pb-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FloralOrnament variant="divider" className="mx-auto w-64 sm:w-80" />
        <p className="mt-7 font-display italic text-2xl sm:text-3xl text-ink leading-snug text-balance">
          Sizinle bu özel günü paylaşmak için
          <br className="hidden sm:block" />
          {' '}sabırsızlanıyoruz.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-plum/70 text-sm tracking-[0.3em] uppercase">
          <span>Süheylanur</span>
          <Heart className="h-3.5 w-3.5 text-rose-deep" strokeWidth={1.8} fill="currentColor" fillOpacity={0.35} />
          <span>Deniz</span>
        </div>
        <p className="mt-3 text-xs text-ink/40 tracking-wider">
          25 · 07 · 2026 — Bursa
        </p>
      </div>
    </footer>
  );
}

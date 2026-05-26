'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Anasayfa' },
  { id: 'events', label: 'Etkinlikler' },
  { id: 'rsvp', label: 'Katılım' },
  { id: 'announcements', label: 'Duyurular' },
  { id: 'gallery', label: 'Galeri' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 transition-all duration-500 ${
          scrolled ? 'sm:px-6' : 'sm:px-4'
        }`}
      >
        <nav
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-soft' : 'glass'
          }`}
          aria-label="Ana navigasyon"
        >
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-2 group"
            aria-label="Başa dön"
          >
            <Heart
              className="h-4 w-4 text-rose-deep group-hover:scale-110 transition-transform"
              strokeWidth={1.6}
              fill="currentColor"
              fillOpacity={0.15}
            />
            <span className="font-display italic text-plum text-base sm:text-lg">
              S<span className="text-mauve"> &amp; </span>D
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`relative px-4 py-2 text-sm tracking-wide transition-colors ${
                      isActive ? 'text-plum' : 'text-ink/70 hover:text-plum'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-rose-deep to-transparent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => handleNav('rsvp')}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-plum text-cream-50 px-4 py-2 text-sm tracking-wide hover:bg-plum-deep transition-colors shadow-soft"
          >
            Katılım Bildir
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-1 text-plum"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" strokeWidth={1.6} />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" strokeWidth={1.6} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-2 glass-strong rounded-3xl shadow-soft overflow-hidden"
            >
              <ul className="p-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNav(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-base transition-colors ${
                          isActive
                            ? 'bg-rose-dust/15 text-plum'
                            : 'text-ink/80 hover:bg-cream-100/50'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
                <li className="px-2 pt-2 pb-1">
                  <button
                    onClick={() => handleNav('rsvp')}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-plum text-cream-50 px-4 py-3 text-sm tracking-wide hover:bg-plum-deep transition-colors"
                  >
                    Katılım Bildir
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

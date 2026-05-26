import { Sparkles, MapPinned, Gift, CalendarHeart, Bus } from 'lucide-react';
import { ANNOUNCEMENTS, type Announcement } from '@/data/announcements';
import { ScrollReveal } from './ScrollReveal';
import { SectionDivider } from './SectionDivider';

const ICONS = {
  sparkle: Sparkles,
  map: MapPinned,
  gift: Gift,
  calendar: CalendarHeart,
  bus: Bus,
} as const;

function iconFor(a: Announcement) {
  const Icon = ICONS[a.icon ?? 'sparkle'];
  return <Icon className="h-5 w-5" strokeWidth={1.5} />;
}

export function Announcements() {
  return (
    <section id="announcements" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionDivider label="Duyurular" />
          <h2 className="mt-6 font-display italic text-center text-ink text-4xl sm:text-5xl md:text-6xl">
            Sizinle Paylaşacaklarımız
          </h2>
          <p className="mt-4 text-center text-plum/80 max-w-xl mx-auto">
            Yaklaşan günlerde detayları buradan duyuracağız.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-3">
          {ANNOUNCEMENTS.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 0.08}>
              <article className="group relative h-full rounded-3xl glass border hairline p-6 sm:p-7 hover:shadow-soft transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-dust/15 text-rose-deep">
                    {iconFor(a)}
                  </span>
                  {a.date && (
                    <span className="text-[10px] tracking-[0.3em] uppercase text-ink/55">
                      {a.date}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl sm:text-2xl text-ink leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] text-ink/70 leading-relaxed">
                  {a.body}
                </p>
                <span className="pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-rose-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

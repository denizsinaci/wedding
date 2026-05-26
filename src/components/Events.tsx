import { EVENTS, HOME_DEPARTURE_NOTE } from '@/data/events';
import { EventCard } from './EventCard';
import { ScrollReveal } from './ScrollReveal';
import { SectionDivider } from './SectionDivider';

export function Events() {
  return (
    <section id="events" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionDivider label="Etkinlikler" />
          <h2 className="mt-6 font-display italic text-center text-ink text-4xl sm:text-5xl md:text-6xl text-balance">
            İki Gün, Bir Hikâye
          </h2>
          <p className="mt-4 text-center text-plum/80 max-w-xl mx-auto text-pretty">
            Beraberce kutlamak istediğimiz iki özel an. Bu güzel günlerimizde yanımızda
            olmanız bizi mutlu eder.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 mx-auto max-w-3xl rounded-3xl glass border hairline px-6 py-5 text-center">
            <p className="text-sm sm:text-base text-plum italic">
              <span className="font-display not-italic tracking-[0.3em] text-xs uppercase block mb-1 text-plum/70">
                Not
              </span>
              {HOME_DEPARTURE_NOTE}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

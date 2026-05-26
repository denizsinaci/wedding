import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Events } from '@/components/Events';
import { Rsvp } from '@/components/Rsvp';
import { Announcements } from '@/components/Announcements';
import { Gallery } from '@/components/Gallery';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Events />
      <Rsvp />
      <Announcements />
      <Gallery />
      <Footer />
    </main>
  );
}

import { loadGalleryImages } from '@/lib/gallery';
import { GalleryClient } from './GalleryClient';
import { ScrollReveal } from './ScrollReveal';
import { SectionDivider } from './SectionDivider';

export function Gallery() {
  const images = loadGalleryImages();

  return (
    <section id="gallery" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionDivider label="Galeri" />
          <h2 className="mt-6 font-display italic text-center text-ink text-4xl sm:text-5xl md:text-6xl">
            Anılarımızdan Karelere
          </h2>
          <p className="mt-4 text-center text-plum/80 max-w-xl mx-auto">
            Birlikte yaşadığımız anlardan küçük bir derleme.
          </p>
        </ScrollReveal>

        {images.length === 0 ? (
          <ScrollReveal delay={0.1} className="mt-14">
            <div className="mx-auto max-w-xl text-center rounded-3xl glass border hairline p-10">
              <p className="font-display italic text-2xl text-plum">Yakında…</p>
              <p className="mt-3 text-sm text-ink/65">
                Anılarımız bu galeride yer alacak.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <GalleryClient images={images} />
        )}
      </div>
    </section>
  );
}

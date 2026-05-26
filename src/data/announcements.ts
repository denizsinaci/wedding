/**
 * Edit this file to update the announcements section.
 * Each entry renders as a card. Keep `body` short (1–2 sentences).
 */
export type Announcement = {
  id: string;
  title: string;
  body: string;
  /** Optional date label, e.g. "Yakında" or "12 Haziran 2026". */
  date?: string;
  /** Optional icon — one of: 'sparkle' | 'map' | 'gift' | 'calendar' | 'bus' */
  icon?: 'sparkle' | 'map' | 'gift' | 'calendar' | 'bus';
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'placeholder-1',
    title: 'Yakında paylaşılacak',
    body: 'Düğünümüzle ilgili detaylı bilgileri burada paylaşacağız. Sizi haberdar edeceğiz.',
    date: 'Yakında',
    icon: 'sparkle',
  },
  {
    id: 'placeholder-2',
    title: 'Ulaşım bilgileri eklenecek',
    body: 'Otopark, servis ve yakın çevredeki konaklama önerilerini bu bölümde paylaşacağız.',
    date: 'Yakında',
    icon: 'bus',
  },
  {
    id: 'placeholder-3',
    title: 'Organizasyon detayları paylaşılacak',
    body: 'Kıyafet seçimi, program akışı ve özel detayları burada bulabileceksiniz.',
    date: 'Yakında',
    icon: 'gift',
  },
];

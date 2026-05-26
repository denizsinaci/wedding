export type EventDetail = { label: string; value: string };

export type WeddingEvent = {
  id: 'henna' | 'wedding';
  title: string;
  tagline: string;
  date: string;
  details: EventDetail[];
  venue: { name: string; address: string };
  note: string;
  mapsUrl: string;
  accent: 'rose' | 'plum';
};

export const EVENTS: WeddingEvent[] = [
  {
    id: 'henna',
    title: 'Kına Gecesi',
    tagline: 'Geleneğin sıcacık halkasında',
    date: '23 Temmuz 2026 · Perşembe',
    details: [{ label: 'Başlangıç', value: '18:30' }],
    venue: {
      name: 'Melodi Garden',
      address:
        'Gümüştepe, Çaylar Caddesi No:2,\n16110 Nilüfer / Bursa, Türkiye',
    },
    note:
      'Adrenalin Park karşısı, Misi Yaşam girişinin yanında — cadde üzerindedir.',
    mapsUrl: 'https://maps.app.goo.gl/jDBddJeSBDcWGydM7',
    accent: 'rose',
  },
  {
    id: 'wedding',
    title: 'Düğün',
    tagline: 'Hayatımızın en güzel günü',
    date: '25 Temmuz 2026 · Cumartesi',
    details: [
      { label: 'Karşılama', value: '18:30' },
      { label: 'Nikah', value: '19:15' },
      { label: 'Eğlence', value: '∞' },
    ],
    venue: {
      name: 'Peridot Garden',
      address:
        'Çeltikköy, Yeniceabat Cd. 316. Sk No:39,\n16190 Osmangazi / Bursa, Türkiye',
    },
    note:
      'Bursa Şehirlerarası Otobüs Terminaline araç ile yaklaşık 10 dakika mesafededir.',
    mapsUrl: 'https://maps.app.goo.gl/E6eTQbEKRBJpmb6w6',
    accent: 'plum',
  },
];

export const HOME_DEPARTURE_NOTE =
  'Evden Çıkış Merasimi (Gelin Alma) 25 Temmuz, saat 10:30’da olacaktır.';

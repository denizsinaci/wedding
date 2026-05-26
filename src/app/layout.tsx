import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const siteUrl = 'https://denizsinaci.github.io' + (basePath || '/wedding');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Süheylanur & Deniz · 25 Temmuz 2026',
  description:
    'Süheylanur ve Deniz\'in mutluluğuna ortak olmanızı dileriz. 25 Temmuz 2026 — Peridot Garden, Bursa.',
  keywords: [
    'düğün davetiyesi',
    'Süheylanur Deniz',
    'wedding invitation',
    'Bursa düğün',
    '2026 düğün',
  ],
  authors: [{ name: 'Süheylanur & Deniz' }],
  openGraph: {
    title: 'Süheylanur & Deniz · 25 Temmuz 2026',
    description: 'Mutluluğumuza davetlisiniz...',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Süheylanur & Deniz Wedding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Süheylanur & Deniz · 25 Temmuz 2026',
    description: 'Mutluluğumuza davetlisiniz...',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#FBF8F3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export type GalleryImage = {
  src: string;
  alt: string;
};

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const DIR_NAME = 'picturestoreplace';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Reads every supported image inside `public/picturestoreplace/` at build time.
 * Drop a new photo into that folder and rebuild — the gallery picks it up
 * automatically. No manual imports.
 */
export function loadGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), 'public', DIR_NAME);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith('.'))
    .filter((name) => SUPPORTED.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'tr'));

  return files.map((file, i) => ({
    src: `${basePath}/${DIR_NAME}/${encodeURIComponent(file)}`,
    alt: `Anı ${i + 1}`,
  }));
}

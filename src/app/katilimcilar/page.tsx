import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { AdminClient } from './AdminClient';
import { parseCsv } from '@/lib/csv';

export const metadata: Metadata = {
  title: 'Katılımcılar · Süheylanur & Deniz',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const csvPath = path.join(process.cwd(), 'katilimcilar.csv');
  const raw = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, 'utf8') : '';
  const { headers, rows } = parseCsv(raw);

  return <AdminClient headers={headers} rows={rows} />;
}

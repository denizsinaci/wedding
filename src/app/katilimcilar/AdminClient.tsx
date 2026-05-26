'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Lock,
  Search,
  Users,
  UserCheck,
  UserX,
  Download,
  LogOut,
  HardDrive,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { CsvRow } from '@/lib/csv';
import { toCsv } from '@/lib/csv';
import { readLocalRsvps } from '@/lib/rsvp';
import { FloralOrnament } from '@/components/FloralOrnament';

const PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? '';
const SESSION_KEY = 'wedding-admin-session';

type Props = {
  headers: string[];
  rows: CsvRow[];
};

type Filter = 'all' | 'yes' | 'no';

const ATTENDANCE_KEY = 'Katılım';
const NAME_KEY = 'Ad Soyad';
const PHONE_KEY = 'Telefon';
const GUESTS_KEY = 'Kişi Sayısı';
const MESSAGE_KEY = 'Mesaj';
const DATE_KEY = 'Tarih';

export function AdminClient({ headers, rows }: Props) {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!PASSCODE) {
      setAuthError(
        'Admin parolası tanımlı değil. .env içine NEXT_PUBLIC_ADMIN_PASSCODE ekleyin.',
      );
      return;
    }
    if (pass === PASSCODE) {
      setAuthed(true);
      setAuthError(null);
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } else {
      setAuthError('Parola hatalı.');
    }
  };

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5 py-16">
        <div className="relative w-full max-w-md">
          <FloralOrnament
            variant="leaf"
            className="absolute -top-10 left-4 w-32 opacity-50 hidden sm:block"
          />
          <FloralOrnament
            variant="leaf"
            flip
            className="absolute -top-10 right-4 w-32 opacity-50 hidden sm:block"
          />
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="relative glass-strong rounded-3xl p-7 sm:p-9 shadow-soft"
          >
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mauve/15 text-plum">
                <Lock className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h1 className="mt-4 font-display italic text-3xl text-ink">Katılımcılar</h1>
              <p className="mt-2 text-sm text-plum/80">
                Bu alan korumalıdır. Lütfen erişim parolasını girin.
              </p>
            </div>

            <label className="mt-7 block">
              <span className="text-[11px] tracking-[0.3em] uppercase text-ink/55">
                Parola
              </span>
              <div className="mt-2 rounded-2xl border hairline bg-cream-50/70 px-4 py-3 flex items-center gap-2 focus-within:border-plum/40 focus-within:bg-cream-50 transition-colors">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoFocus
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none placeholder:text-ink/35 text-ink"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-ink/50 hover:text-ink/80 transition-colors"
                  aria-label={showPass ? 'Parolayı gizle' : 'Parolayı göster'}
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.6} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.6} />
                  )}
                </button>
              </div>
            </label>

            {authError && (
              <p className="mt-3 text-sm text-rose-deep">{authError}</p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-plum text-cream-50 px-5 py-3 text-sm tracking-wide hover:bg-plum-deep transition-colors shadow-soft"
            >
              Giriş Yap
            </button>

            <p className="mt-5 text-center text-xs text-ink/45">
              <a href="../" className="hover:text-plum transition-colors">
                ← Anasayfaya dön
              </a>
            </p>
          </motion.form>
        </div>
      </main>
    );
  }

  return <AdminDashboard headers={headers} rows={rows} onLogout={() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }} />;
}

function AdminDashboard({
  headers,
  rows,
  onLogout,
}: {
  headers: string[];
  rows: CsvRow[];
  onLogout: () => void;
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [showLocal, setShowLocal] = useState(false);
  const [localRows, setLocalRows] = useState<CsvRow[]>([]);

  useEffect(() => {
    const local = readLocalRsvps();
    setLocalRows(
      local.map((r) => ({
        [NAME_KEY]: r.name,
        [PHONE_KEY]: r.phone ?? '',
        [ATTENDANCE_KEY]: r.attendance === 'attending' ? 'Geliyorum' : 'Maalesef Katılamıyorum',
        [GUESTS_KEY]: String(r.guests),
        [MESSAGE_KEY]: r.message ?? '',
        [DATE_KEY]: r.submittedAt,
      })),
    );
  }, []);

  const sourceRows = showLocal ? localRows : rows;
  const effectiveHeaders =
    headers.length > 0
      ? headers
      : [NAME_KEY, PHONE_KEY, ATTENDANCE_KEY, GUESTS_KEY, MESSAGE_KEY, DATE_KEY];

  const stats = useMemo(() => {
    let attending = 0;
    let notAttending = 0;
    let guestTotal = 0;
    for (const r of sourceRows) {
      const a = (r[ATTENDANCE_KEY] ?? '').toLowerCase();
      const isAttending = a.includes('geliyorum') || a === 'attending';
      if (isAttending) {
        attending++;
        const g = parseInt(r[GUESTS_KEY] ?? '0', 10);
        if (Number.isFinite(g)) guestTotal += g;
      } else if (a.length > 0) {
        notAttending++;
      }
    }
    return { attending, notAttending, guestTotal, total: sourceRows.length };
  }, [sourceRows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sourceRows.filter((r) => {
      if (filter !== 'all') {
        const a = (r[ATTENDANCE_KEY] ?? '').toLowerCase();
        const isYes = a.includes('geliyorum') || a === 'attending';
        if (filter === 'yes' && !isYes) return false;
        if (filter === 'no' && isYes) return false;
      }
      if (!q) return true;
      return Object.values(r).some((v) => v.toLowerCase().includes(q));
    });
  }, [sourceRows, query, filter]);

  const downloadCsv = () => {
    const csv = toCsv(
      effectiveHeaders,
      filtered.map((r) => effectiveHeaders.map((h) => r[h] ?? '')),
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'katilimcilar.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen px-5 sm:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-plum/70">Admin</p>
            <h1 className="mt-1 font-display italic text-4xl sm:text-5xl text-ink">
              Katılımcılar
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLocal((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-wide transition-colors ${
                showLocal
                  ? 'bg-mauve/20 text-plum'
                  : 'glass border hairline text-ink/70 hover:text-plum'
              }`}
              title="Bu cihazda yapılan submitleri göster"
            >
              <HardDrive className="h-3.5 w-3.5" strokeWidth={1.6} />
              {showLocal ? 'CSV kaynak' : 'Bu cihaz'}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-full glass border hairline px-4 py-2 text-xs text-ink/70 hover:text-plum transition-colors"
              title="Yenile"
            >
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.6} />
              Yenile
            </button>
            <button
              onClick={downloadCsv}
              className="inline-flex items-center gap-2 rounded-full bg-plum text-cream-50 px-4 py-2 text-xs tracking-wide hover:bg-plum-deep transition-colors"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
              CSV İndir
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full glass border hairline px-3 py-2 text-xs text-ink/60 hover:text-plum transition-colors"
              aria-label="Çıkış"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Stat label="Toplam Yanıt" value={stats.total} icon={<Users className="h-4 w-4" />} />
          <Stat label="Geliyor" value={stats.attending} icon={<UserCheck className="h-4 w-4" />} tone="sage" />
          <Stat label="Katılamıyor" value={stats.notAttending} icon={<UserX className="h-4 w-4" />} tone="rose" />
          <Stat label="Toplam Kişi" value={stats.guestTotal} icon={<Users className="h-4 w-4" />} tone="plum" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px] rounded-full glass border hairline px-4 py-2.5 flex items-center gap-2 focus-within:border-plum/40 transition-colors">
            <Search className="h-4 w-4 text-ink/50" strokeWidth={1.6} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="İsim, telefon veya mesaj ara…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink/40"
            />
          </div>
          <div className="inline-flex rounded-full border hairline bg-cream-50/60 p-1 text-xs">
            {([
              ['all', 'Tümü'],
              ['yes', 'Geliyor'],
              ['no', 'Katılamıyor'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filter === key
                    ? 'bg-plum text-cream-50'
                    : 'text-ink/65 hover:text-plum'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {showLocal && (
          <p className="mt-4 text-xs text-plum/70">
            Bu görünüm yalnızca bu cihazdan yapılan submitleri gösterir (localStorage).
          </p>
        )}

        <div className="mt-6 rounded-3xl glass-strong border hairline overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream-100/60 text-ink/65">
                <tr>
                  {effectiveHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-left font-medium tracking-wide px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={Math.max(1, effectiveHeaders.length)}
                        className="text-center text-ink/55 italic py-14"
                      >
                        Henüz kayıt yok.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t hairline hover:bg-cream-100/50 transition-colors"
                      >
                        {effectiveHeaders.map((h) => {
                          const val = r[h] ?? '';
                          const isAttendance = h === ATTENDANCE_KEY;
                          const isAttending =
                            val.toLowerCase().includes('geliyorum');
                          return (
                            <td
                              key={h}
                              className="px-4 py-3 align-top text-ink/85 max-w-xs"
                            >
                              {isAttendance ? (
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                                    isAttending
                                      ? 'bg-sage/20 text-sage-deep'
                                      : 'bg-rose-dust/25 text-rose-deep'
                                  }`}
                                >
                                  {val || '—'}
                                </span>
                              ) : (
                                <span className="whitespace-pre-wrap break-words">
                                  {val || <span className="text-ink/35">—</span>}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">
          Her yeni yanıt GitHub üzerinde otomatik işlenir; CSV'ye eklenir ve site
          yeniden dağıtılır (~2-3 dk). Yerel cihazdan yapılan submitleri anında
          görmek için <em>Bu cihaz</em> moduna geçebilirsin.
        </p>

        <div className="mt-8 text-center">
          <a
            href="../"
            className="text-xs text-plum/70 hover:text-plum tracking-wide transition-colors"
          >
            ← Anasayfaya dön
          </a>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  icon,
  tone = 'plum',
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: 'plum' | 'rose' | 'sage';
}) {
  const accent =
    tone === 'rose'
      ? 'bg-rose-dust/15 text-rose-deep'
      : tone === 'sage'
        ? 'bg-sage/15 text-sage-deep'
        : 'bg-mauve/15 text-plum';
  return (
    <div className="rounded-2xl glass border hairline p-4 flex items-center gap-3">
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${accent}`}>
        {icon}
      </span>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-ink/55">{label}</div>
        <div className="font-display text-2xl text-ink leading-none mt-0.5 tabular-nums">{value}</div>
      </div>
    </div>
  );
}

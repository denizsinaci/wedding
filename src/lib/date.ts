export const WEDDING_DATE = new Date('2026-07-25T19:15:00+03:00');
export const HENNA_DATE = new Date('2026-07-23T18:30:00+03:00');

export function diffParts(target: Date, now: Date = new Date()) {
  const total = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

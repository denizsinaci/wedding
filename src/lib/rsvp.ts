export type RsvpAttendance = 'attending' | 'not_attending';

export type RsvpPayload = {
  name: string;
  phone?: string;
  attendance: RsvpAttendance;
  guests: number;
  message?: string;
  submittedAt: string;
};

const GH_REPO = process.env.NEXT_PUBLIC_GH_REPO; // e.g. "denizsinaci/wedding"
const GH_TOKEN = process.env.NEXT_PUBLIC_GH_TOKEN;
const ENDPOINT = GH_REPO ? `https://api.github.com/repos/${GH_REPO}/issues` : null;
const LOCAL_KEY = 'wedding-rsvp-log';

const ATTENDANCE_LABEL: Record<RsvpAttendance, string> = {
  attending: 'Geliyorum',
  not_attending: 'Maalesef Katılamıyorum',
};

export class RsvpError extends Error {
  constructor(message: string, public retryable = false) {
    super(message);
    this.name = 'RsvpError';
  }
}

function storeLocally(payload: RsvpPayload) {
  if (typeof window === 'undefined') return;
  try {
    const prev: RsvpPayload[] = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? '[]');
    prev.push(payload);
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(prev));
  } catch {
    /* localStorage unavailable — ignore */
  }
}

/**
 * Build a Markdown issue body the workflow can parse with a simple regex.
 * Field order and label text matter — keep in sync with scripts/process-rsvp-issue.mjs.
 */
function buildIssueBody(p: RsvpPayload) {
  const yes = '';
  const msg = (p.message ?? '').trim();
  return [
    '### RSVP',
    '',
    `- **Ad Soyad:** ${p.name.trim()}`,
    `- **Telefon:** ${(p.phone ?? '').trim() || yes}`,
    `- **Katılım:** ${ATTENDANCE_LABEL[p.attendance]}`,
    `- **Kişi Sayısı:** ${p.attendance === 'attending' ? p.guests : 0}`,
    `- **Tarih:** ${p.submittedAt}`,
    '',
    '### Mesaj',
    msg ? msg : '_(boş)_',
  ].join('\n');
}

async function postToGitHub(payload: RsvpPayload, signal?: AbortSignal): Promise<void> {
  if (!ENDPOINT || !GH_TOKEN) return;
  const body = {
    title: `RSVP: ${payload.name.slice(0, 60)}`,
    body: buildIssueBody(payload),
    labels: ['rsvp'],
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GH_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal,
  });

  if (res.ok) return;

  const retryable = res.status >= 500;
  let detail = `Sunucu hatası (${res.status})`;
  try {
    const json = await res.json();
    if (json?.message) detail = json.message;
  } catch {
    /* ignore parse error */
  }
  throw new RsvpError(detail, retryable);
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (err instanceof RsvpError && !err.retryable) throw err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw lastError;
}

/**
 * Submit an RSVP.
 * - If GitHub creds are configured (NEXT_PUBLIC_GH_REPO + NEXT_PUBLIC_GH_TOKEN),
 *   posts as a GitHub Issue. The `Process RSVP` workflow appends to the CSV.
 * - Otherwise simulates a network call.
 * In both modes a local copy is cached in localStorage so nothing is lost.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  if (!ENDPOINT || !GH_TOKEN) {
    await new Promise((r) => setTimeout(r, 600));
    storeLocally(payload);
    return;
  }

  try {
    await withRetry(() => postToGitHub(payload));
    storeLocally(payload);
  } catch (err) {
    storeLocally(payload);
    if (err instanceof RsvpError) throw err;
    throw new RsvpError('Yanıt gönderilemedi. Lütfen tekrar deneyin.', true);
  }
}

export function readLocalRsvps(): RsvpPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? '[]');
  } catch {
    return [];
  }
}

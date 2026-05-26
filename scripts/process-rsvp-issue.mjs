#!/usr/bin/env node
/**
 * Parse an issue body posted by the RSVP form and append a row to
 * katilimcilar.csv. Exits with code 1 if the issue is invalid (the workflow
 * then redacts and closes it as "not planned").
 *
 * Env:
 *   ISSUE_BODY    — raw Markdown body of the issue
 *   ISSUE_NUMBER  — issue number (only used in commit messages)
 */

import fs from 'node:fs';
import path from 'node:path';

const CSV_PATH = path.join(process.cwd(), 'katilimcilar.csv');
const HEADERS = ['Ad Soyad', 'Telefon', 'Katılım', 'Kişi Sayısı', 'Mesaj', 'Tarih'];

const LIMITS = {
  name: 100,
  phone: 30,
  message: 1000,
};

function escapeCsv(value) {
  if (value === undefined || value === null) return '';
  const s = String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function parseCsv(text) {
  if (!text.trim()) return { headers: [], rows: [] };
  const records = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      row.push(field);
      field = '';
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      records.push(row);
      row = [];
      continue;
    }
    field += ch;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    records.push(row);
  }
  const cleaned = records.filter((r) => r.some((c) => c.trim().length > 0));
  if (!cleaned.length) return { headers: [], rows: [] };
  const [headers, ...body] = cleaned;
  const rows = body.map((cols) => {
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = cols[idx] ?? ''));
    return obj;
  });
  return { headers, rows };
}

function formatDate(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input ?? '');
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fail(reason) {
  console.error(`Invalid RSVP: ${reason}`);
  process.exit(1);
}

const body = process.env.ISSUE_BODY ?? '';
if (!body.trim()) fail('empty body');

// Pull each field with a tolerant regex. Stop at end of line.
function field(label) {
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n\\r]*)`);
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

function messageBlock() {
  const m = body.match(/###\s*Mesaj\s*\n([\s\S]*)$/);
  if (!m) return '';
  let text = m[1].trim();
  if (text === '_(boş)_' || text === '') return '';
  return text;
}

const name = field('Ad Soyad');
const phone = field('Telefon');
const attendance = field('Katılım');
const guestsRaw = field('Kişi Sayısı');
const submittedAt = field('Tarih');
const message = messageBlock();

if (!name) fail('missing name');
if (name.length > LIMITS.name) fail('name too long');
if (phone.length > LIMITS.phone) fail('phone too long');
if (message.length > LIMITS.message) fail('message too long');
if (!attendance) fail('missing attendance');

const guests = Math.max(0, Math.min(20, parseInt(guestsRaw, 10) || 0));
const tarih = submittedAt ? formatDate(submittedAt) : formatDate(new Date().toISOString());

const existing = fs.existsSync(CSV_PATH) ? fs.readFileSync(CSV_PATH, 'utf8') : '';
const { rows } = parseCsv(existing);

// Basic dedupe: same name + same minute already exists.
const dupKey = `${name}|${tarih}`;
const isDup = rows.some((r) => `${r['Ad Soyad'] ?? ''}|${r['Tarih'] ?? ''}` === dupKey);

if (isDup) {
  console.log('Duplicate; skipping write.');
  process.exit(0);
}

let out = existing;
if (!out.trim()) out = HEADERS.map(escapeCsv).join(',') + '\n';
if (!out.endsWith('\n')) out += '\n';
out += [name, phone, attendance, guests, message, tarih].map(escapeCsv).join(',') + '\n';

fs.writeFileSync(CSV_PATH, out, 'utf8');
console.log(`Appended RSVP from ${name}.`);

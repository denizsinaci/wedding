export type CsvRow = Record<string, string>;

/**
 * Minimal RFC 4180-ish CSV parser. Handles quoted fields, embedded commas,
 * escaped double-quotes (`""`), and CRLF / LF line endings.
 * First non-empty line is treated as the header.
 */
export function parseCsv(text: string): { headers: string[]; rows: CsvRow[] } {
  if (!text.trim()) return { headers: [], rows: [] };

  const records: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
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
  if (cleaned.length === 0) return { headers: [], rows: [] };

  const [headers, ...body] = cleaned;
  const rows = body.map((cols) => {
    const obj: CsvRow = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? '';
    });
    return obj;
  });
  return { headers, rows };
}

export function escapeCsv(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(headers: string[], rows: Array<Array<string | number | undefined | null>>) {
  const lines = [headers.map(escapeCsv).join(',')];
  for (const r of rows) lines.push(r.map(escapeCsv).join(','));
  return lines.join('\n') + '\n';
}

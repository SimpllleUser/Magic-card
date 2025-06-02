export function toTxt(data: Record<string, any>[]): string {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map((item) => headers.map((key) => `${key}: ${item[key] ?? ''}`).join('\n'));

  return rows.join('\n\n');
}

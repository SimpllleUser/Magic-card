export function toCsv(data: Record<string, any>[]): string {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map((item) =>
    headers
      .map((key) => {
        const value = item[key] ?? '';
        return typeof value === 'string' && value.includes(',') ? `"${value.replace(/"/g, '""')}"` : value;
      })
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

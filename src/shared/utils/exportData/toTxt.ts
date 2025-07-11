export function toTxt(data: Record<string, any>[]): string {
  if (!data || data.length === 0) return '';

  return data.map((item) => `${item.from} - ${item.to}`).join(',\n');
}

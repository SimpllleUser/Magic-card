export function toJson(data: any, pretty: boolean = false): string {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}

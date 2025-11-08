export enum FileFormat {
  TEXT_CSV = 'text/csv',
  APPLICATION_JSON = 'application/json',
  TEXT_PLAIN = 'text/plain'
}

export enum FileExtension {
  TXT = 'txt',
  JSON = 'json',
  CSV = 'csv'
}
export interface ExportFormat {
  id: string;
  title: string;
  mime: FileFormat;
  extension: FileExtension;
  action: (data: any) => string;
}

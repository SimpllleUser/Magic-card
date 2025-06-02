import { toCsv, toJson, toTxt } from '@/shared/utils/exportData';

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

const EXTENSION_TO_MIME: Record<FileExtension, FileFormat> = {
  [FileExtension.TXT]: FileFormat.TEXT_PLAIN,
  [FileExtension.JSON]: FileFormat.APPLICATION_JSON,
  [FileExtension.CSV]: FileFormat.TEXT_CSV
};
const MIME_WITH_CHARSET: Record<FileFormat, string> = {
  [FileFormat.TEXT_PLAIN]: 'text/plain;charset=utf-8',
  [FileFormat.APPLICATION_JSON]: 'application/json;charset=utf-8',
  [FileFormat.TEXT_CSV]: 'text/csv;charset=utf-8'
};

export const exportFormats: ExportFormat[] = [
  {
    id: FileExtension.CSV,
    title: 'CSV',
    mime: FileFormat.TEXT_CSV,
    extension: FileExtension.CSV,
    action: toCsv
  },
  {
    id: FileExtension.JSON,
    title: 'JSON',
    mime: FileFormat.APPLICATION_JSON,
    extension: FileExtension.JSON,
    action: (data: any) => toJson(data, true)
  },
  {
    id: FileExtension.TXT,
    title: 'TXT',
    mime: FileFormat.TEXT_PLAIN,
    extension: FileExtension.TXT,
    action: toTxt
  }
];

export function downloadFile(
  filename: string,
  content: string,
  extension: FileExtension,
  customMimeType?: string
): void {
  const fullFilename = filename.includes('.') ? filename : `${filename}.${extension}`;

  const mimeType = customMimeType || MIME_WITH_CHARSET[EXTENSION_TO_MIME[extension]] || 'text/plain;charset=utf-8';

  const blob = new Blob([content], { type: mimeType });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fullFilename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

import { http, LocalStorageService } from '@/shared';
import { WiktionaryEntity } from '../model/types';
const API_URL = 'https://freedictionaryapi.com/api/v1/entries';
const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'wiktionary-results';

export class WiktionaryApi {
  language: string;
  private storageService: LocalStorageService;
  constructor(language?: string) {
    this.language = language || DEFAULT_LANGUAGE;
    this.storageService = new LocalStorageService<WiktionaryEntity>(STORAGE_KEY);
  }

  private getUrlForWord(word: string) {
    return `${API_URL}/${this.language}/${word}`;
  }

  private getFromStorage(word: string): WiktionaryEntity {
    return this.storageService.get()[word];
  }

  async getWord(word: string): Promise<WiktionaryEntity> {
    if (this.storageService.deepHas(word)) {
      return this.getFromStorage(word);
    }

    const url = this.getUrlForWord(word);
    const result = await http.get<WiktionaryEntity>(url);
    this.storageService.set({
      [word]: result
    });
    return result;
  }
}

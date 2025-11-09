import { WiktionaryEntity } from '../model/types';
import { WIKTIONARY_STORAGE_KEY } from '../constants';
import { LocalStorageService } from '@/shared';

export class Wiktionary {
  private words: Record<string, WiktionaryEntity> = {};
  constructor() {
    this.words = new LocalStorageService<Record<string, WiktionaryEntity>>(WIKTIONARY_STORAGE_KEY).get() || {};
  }

  getWords() {
    return this.words;
  }

  getWord(word: string) {
    return this.words[word] || null;
  }
  hasWord(word: string) {
    return !!this.words[word];
  }
}

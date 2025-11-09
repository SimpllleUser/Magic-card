import { Wiktionary, WiktionaryApi, WiktionaryEntity } from '@/features/wiktionary';
import { defineStore } from 'pinia';

const wiktionaryApi = new WiktionaryApi();
export const useWiktionaryStore = defineStore('wiktionary', {
  state: () => ({
    wiktionary: new Wiktionary()
  }),
  getters: {
    getWord: (s) => (word: string) => s.wiktionary.getWord(word),
    hasWord: (s) => (word: string) => s.wiktionary.hasWord(word)
  },
  actions: {
    async fetchWord(word: string): Promise<WiktionaryEntity> {
      return wiktionaryApi.getWord(word);
    }
  }
});

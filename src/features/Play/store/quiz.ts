import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { DictionaryItem } from '@/core/models/Topic';

export const useQuizsStore = defineStore('quize', () => {
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);

  const setWords = (currentWords: DictionaryItem[]): void => {
    words.value = currentWords;
  };

  const reset = (): void => setWords([]);

  return {
    words,
    setWords,
    reset
  };
});

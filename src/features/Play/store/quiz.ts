import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { DictionaryItem } from '@/core/models/Topic';

export const useQuizsStore = defineStore('quize', () => {
  const activeModuleId = useLocalStorage<DictionaryItem[]>('quize-module-id', '');
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);

  const setWords = (currentWords: DictionaryItem[]): void => {
    words.value = currentWords;
  };

  const setActiveModule = (id: string): void => {
    activeModuleId.value = id;
  };

  const reset = (): void => setWords([]);
  const resetActiveModule = (): void => setActiveModule('');

  return {
    words,
    setWords,
    reset,
    setActiveModule,
    resetActiveModule,
    activeModuleId
  };
});

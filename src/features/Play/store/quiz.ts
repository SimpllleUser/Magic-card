import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { DictionaryItem } from '@/core/models/Topic';
import { QuizeType } from '../Quize/types';

export const useQuizsStore = defineStore('quize', () => {
  const activeModuleId = useLocalStorage<DictionaryItem[]>('quize-module-id', '');
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);
  const currentType = useLocalStorage<QuizeType>('current-type', QuizeType.SelectWord);

  const setWords = (currentWords: DictionaryItem[]): void => {
    words.value = currentWords;
  };

  const setActiveModule = (id: string): void => {
    activeModuleId.value = id;
  };

  const reset = (): void => setWords([]);
  const resetActiveModule = (): void => setActiveModule('');

  const setCurrentType = (mode: QuizeType) => {
    currentType.value = mode;
  };

  return {
    words,
    setWords,
    reset,
    setActiveModule,
    resetActiveModule,
    setCurrentType,
    currentType,
    activeModuleId
  };
});

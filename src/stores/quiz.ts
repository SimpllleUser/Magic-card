import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { DictionaryItem } from '@/features/dictionary/model/types';
import { QuizType } from '@/features/quiz/model/types';

export const useQuizsStore = defineStore('quize', () => {
  const activeModuleId = useLocalStorage<DictionaryItem[]>('quiz-module-id', '');
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);
  const currentType = useLocalStorage<QuizType>('current-type', QuizType.SelectWord);

  const setWords = (currentWords: DictionaryItem[]): void => {
    words.value = currentWords;
  };

  const setActiveModule = (id: string): void => {
    activeModuleId.value = id;
  };

  const reset = (): void => setWords([]);
  const resetActiveModule = (): void => setActiveModule('');

  const setCurrentType = (mode: QuizType) => {
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

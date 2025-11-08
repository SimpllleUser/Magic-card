import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { DictionaryItem } from '@/features/dictionary';
import { QuizType } from '@/features/quiz';

export const useQuizStore = defineStore('quiz', () => {
  const activeModuleId = useLocalStorage<string>('quiz-module-id', '');
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

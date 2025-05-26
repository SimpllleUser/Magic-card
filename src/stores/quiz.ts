import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { chunk } from 'lodash';
import { DictionaryItem } from '@/features/dictionary/model/types';
import { QuizType } from '@/features/quiz/model/types';

export const useQuizStore = defineStore('quiz', () => {
  const activeModuleId = useLocalStorage<DictionaryItem[]>('quiz-module-id', '');
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);
  const currentType = useLocalStorage<QuizType>('current-type', QuizType.SelectWord);
  const quizFlowSession = useLocalStorage<{
    step: number;
    chunks: Array<DictionaryItem[]>;
  }>('quiz-flow-session', {
    step: 0,
    chunks: []
  });

  const initQuizFlowSession = (words: DictionaryItem[]): void => {
    if (!quizFlowSession.value.chunks.length) {
      quizFlowSession.value.chunks = chunk<DictionaryItem>(words, 8);
    }
  };

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

  const getChunkOfWordsByStep = (step: number): DictionaryItem[] => quizFlowSession.value.chunks[step - 1] || [];

  return {
    words,
    setWords,
    reset,
    setActiveModule,
    resetActiveModule,
    setCurrentType,
    currentType,
    activeModuleId,
    quizFlowSession,
    initQuizFlowSession,
    getChunkOfWordsByStep
  };
});

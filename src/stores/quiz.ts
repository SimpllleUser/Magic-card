import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { chunk } from 'lodash';
import { DictionaryItem } from '@/features/dictionary/model/types';
import { QuizType } from '@/features/quiz/model/types';

export const useQuizStore = defineStore('quiz', () => {
  const activeModuleId = useLocalStorage<string>('quiz-module-id', '');
  const words = useLocalStorage<DictionaryItem[]>('current-words', []);
  const currentType = useLocalStorage<QuizType>('current-type', QuizType.SelectWord);
  const quizFlowSession = useLocalStorage<{
    step: number;
    chunks: Array<DictionaryItem[]>;
  }>('quiz-flow-session', {
    step: 0,
    chunks: []
  });

  // Новая логика: если для каждого типа < 5 слов, то в каждом типе использовать все слова
  const initQuizFlowSession = (wordList: DictionaryItem[]): void => {
    const quizTypes = Object.values(QuizType);
    const minWordsPerType = Math.ceil(wordList.length / quizTypes.length);

    if (minWordsPerType < 5) {
      // Для каждого типа используем все слова
      quizFlowSession.value.chunks = quizTypes.map(() => [...wordList]);
    } else {
      // Иначе делим слова равномерно между типами
      const chunkSize = Math.ceil(wordList.length / quizTypes.length);
      quizFlowSession.value.chunks = [];
      for (let i = 0; i < quizTypes.length; i++) {
        quizFlowSession.value.chunks.push(wordList.slice(i * chunkSize, (i + 1) * chunkSize));
      }
    }
    quizFlowSession.value.step = 1;
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

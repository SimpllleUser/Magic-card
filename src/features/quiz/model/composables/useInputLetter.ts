import { DictionaryItem } from '@/features/dictionary/model/types';
import { Nullable } from 'base-form/src/core/types/common';
import { shuffle, upperFirst } from 'lodash';
import { computed, ref } from 'vue';

export type QuestionItem = DictionaryItem & {
  isCorrect: boolean;
  answer: Nullable<string>;
};

const makeWordWithGaps = (word: string): string => {
  if (word.length < 4) return word; // Короткі слова не змінюємо

  const gapFrequency = word.length <= 7 ? 2 : word.length <= 10 ? 3 : 2;
  const startIndex = word.length > 10 ? 1 : 0; // Довші слова починають з пропуску
  return word
    .split('')
    .map((char, index) => ((index + startIndex) % gapFrequency === 0 ? ' ' : char))
    .join('');
};

export interface UseMissingLettersQuiz {
  next: () => void;
  prev: () => void;
  setAnswer: (payload: { question: QuestionItem; value: string }) => void;
  reset: () => void;
  getQuestion: (question: QuestionItem) => string;
  actualQuestionIndex: Ref<number>;
  actualQuestion: ComputedRef<QuestionItem | undefined>;
  questions: Ref<Array<QuestionItem>>;
}

export function useInputLetter(dictionary: DictionaryItem[]): UseMissingLettersQuiz {
  const setInRandomOrderWords = (words: DictionaryItem[]) => (): DictionaryItem[] => shuffle<DictionaryItem>(words);
  const getWordsinRandomOrder = setInRandomOrderWords(dictionary);

  const getQuestions = () =>
    getWordsinRandomOrder().map((item: DictionaryItem): QuestionItem => {
      return {
        ...item,
        isCorrect: false,
        from: item.from.trimStart().trimEnd(),
        answer: makeWordWithGaps(item.from.trimStart().trimEnd())
      };
    });

  const questions = ref(getQuestions());
  const actualQuestionIndex = ref(0);
  const actualQuestion = computed(() => questions.value[actualQuestionIndex.value]);

  const setActualQuestionIndex = (value: number) => {
    actualQuestionIndex.value = value || 0;
  };

  const next = () => {
    const index = actualQuestionIndex.value === questions.value.length - 1 ? 0 : actualQuestionIndex.value + 1;

    setActualQuestionIndex(index);
  };

  const prev = () => {
    const index = actualQuestionIndex.value === 0 ? questions.value.length - 1 : actualQuestionIndex.value - 1;
    setActualQuestionIndex(index);
  };

  const setAnswer = ({ question, value }: { question: QuestionItem; value: string }): void => {
    questions.value[actualQuestionIndex.value] = {
      ...question,
      isCorrect: question.from?.trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase(),
      answer: value
    };
  };

  const reset = () => {
    questions.value = getQuestions();
    actualQuestionIndex.value = 0;
  };

  const getQuestion = (question: QuestionItem): string => upperFirst(question.to);

  return {
    next,
    prev,
    setAnswer,
    reset,
    getQuestion,
    actualQuestionIndex,
    actualQuestion,
    questions
  };
}

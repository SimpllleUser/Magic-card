import { shuffle } from 'lodash';
import { ref } from 'vue';
import { Nullable } from 'base-form/src/core/types/common';
import { DictionaryItem, QuestionItem } from '@/core/models/Topic';
import { useInputLetter } from './useInputLetter';

export interface QuestionItem extends DictionaryItem {
  isCorrect: boolean;
  answer: Nullable<string>;
}

export interface UseInputWord {
  next: () => void;
  prev: () => void;
  setAnswer: (payload: { question: QuestionItem; value: string }) => void;
  reset: () => void;
  getQuestion: (question: QuestionItem) => string;
  actualQuestionIndex: Ref<number>;
  actualQuestion: ComputedRef<QuestionItem | undefined>;
  questions: Ref<Array<QuestionItem>>;
}

export function useInputWord(dictionary: DictionaryItem[]): UseInputWord {
  const base = useInputLetter(dictionary);

  const getQuestion = (item: QuestionItem) => ({
    ...item,
    answer: ''
  });

  const questions = ref<QuestionItem[]>(shuffle(base.questions.value.map(getQuestion)));

  const reset = () => {
    questions.value = shuffle(base.questions.value.map(getQuestion));
    base.actualQuestionIndex.value = 0;
  };

  const actualQuestion = computed(() => questions.value[base.actualQuestionIndex.value]);

  const setAnswer = ({ question, value }: { question: QuestionItem; value: string }) => {
    questions.value[base.actualQuestionIndex.value] = {
      ...question,
      isCorrect: question.from?.trim() === value,
      answer: value
    };
  };

  return {
    ...base,
    questions,
    actualQuestion,
    setAnswer,
    reset
  };
}

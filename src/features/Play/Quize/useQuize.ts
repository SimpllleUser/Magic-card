import { DictionaryItem } from '@/core/models/Topic';
import { Nullable } from 'base-form/src/core/types/common';
import { computed, ref } from 'vue';

interface QuestionItem extends DictionaryItem {
  isCorrect: boolean;
  answerId: Nullable<string>;
  answer: Nullable<string>;
}

export function useQuiz(questions: DictionaryItem[]) {
  const setInRandomOrderWords = (words: DictionaryItem[]) => (): DictionaryItem[] => shuffle<DictionaryItem>(words);
  const getWordsinRandomOrder = setInRandomOrderWords(questions);

  const getQuestions = () =>
    getWordsinRandomOrder().map(
      (item: DictionaryItem): QuestionItem => ({
        ...item,
        isCorrect: false,
        answerId: null,
        answer: null
      })
    );

  const shuffledQuestions = ref(getQuestions());

  const variantsOfQuestions = ref(
    shuffledQuestions.value.map((item) => {
      const otherVariants = shuffle(shuffledQuestions.value.filter(({ id }) => id !== item.id)).slice(0, 3);

      return shuffle([item, ...otherVariants]);
    })
  );

  const actualQuestionIndex = ref(0);
  const actualQuestion = computed(() => shuffledQuestions.value[actualQuestionIndex.value]);
  const actualVariants = computed(() => variantsOfQuestions.value[actualQuestionIndex.value]);

  const setActualQuestionIndex = (value: number) => {
    actualQuestionIndex.value = value || 0;
  };

  const nextQuestion = () => {
    const index = actualQuestionIndex.value === shuffledQuestions.value.length - 1 ? 0 : actualQuestionIndex.value + 1;

    setActualQuestionIndex(index);
  };

  const prevQuestion = () => {
    const index = actualQuestionIndex.value === 0 ? shuffledQuestions.value.length - 1 : actualQuestionIndex.value - 1;
    setActualQuestionIndex(index);
  };

  const setAnswer = (question: QuestionItem, answer: QuestionItem) => {
    shuffledQuestions.value[actualQuestionIndex.value] = {
      ...question,
      isCorrect: question.to === answer.to,
      answerId: answer.id,
      answer: answer.to
    };
  };

  const reset = () => {
    actualQuestionIndex.value = 0;
    shuffledQuestions.value = getQuestions();
  };

  return {
    nextQuestion,
    prevQuestion,
    setAnswer,
    reset,
    actualQuestionIndex,
    actualQuestion,
    variantsOfQuestions,
    actualVariants,
    shuffledQuestions
  };
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

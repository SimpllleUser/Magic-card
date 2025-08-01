import { shuffle, upperFirst } from 'lodash';
import { QuestionItem } from './useInputLetter';
import { DictionaryItem } from '@/features/dictionary/model/types';

export function useSelectWord(dictionary: DictionaryItem[]) {
  const setInRandomOrderWords = (words: DictionaryItem[]) => (): DictionaryItem[] => shuffle<DictionaryItem>(words);
  const getWordsinRandomOrder = setInRandomOrderWords(dictionary);

  const getVariantsOfQuestions = (questionsOfQuiz: QuestionItem[]) =>
    questionsOfQuiz.map((itemAnswer) => {
      const otherOptions = shuffle(questionsOfQuiz)
        .filter((item) => item.id !== itemAnswer.id)
        .slice(0, 3);
      return shuffle([...otherOptions, itemAnswer]);
    });

  const getQuestions = () =>
    getWordsinRandomOrder().map(
      (item: DictionaryItem): QuestionItem => ({
        ...item,
        isCorrect: false,
        answerId: null,
        answer: null
      })
    );

  const questions = ref(getQuestions());
  const variantsOfQuestions = ref(getVariantsOfQuestions(questions.value));
  const actualQuestionIndex = ref(0);
  const actualQuestion = computed(() => questions.value[actualQuestionIndex.value]);
  const actualVariants = computed(() => variantsOfQuestions.value[actualQuestionIndex.value]);

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

  const setAnswer = ({ question, answer }: { question: QuestionItem; answer: QuestionItem }) => {
    questions.value[actualQuestionIndex.value] = {
      ...question,
      isCorrect: question.to === answer.to,
      answerId: answer.id,
      answer: answer.to
    };
  };

  const reset = () => {
    questions.value = getQuestions();
    variantsOfQuestions.value = getVariantsOfQuestions(questions.value);
    actualQuestionIndex.value = 0;
  };

  const getQuestion = (question: QuestionItem) => upperFirst(question.from.trimStart());

  return {
    next,
    prev,
    setAnswer,
    reset,
    getQuestion,
    actualQuestionIndex,
    actualQuestion,
    variantsOfQuestions,
    actualVariants,
    questions
  };
}

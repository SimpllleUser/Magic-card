import QuizeWordVariants from '../components/QuizeWordVariants.vue';
import QuizeMissLetters from '../components/QuizeMissLetters.vue';
import { useWordVariants } from './useWordVariants';
import { useMissingLettersQuiz } from './useMissingLettersQuiz';

export enum QuizeType {
  Words = 'Words',
  MissLetters = 'MissLetters'
}

export function useQuizeFactory(quizeType: QuizeType) {
  const componentsByType = {
    [QuizeType.Words]: QuizeWordVariants,
    [QuizeType.MissLetters]: QuizeMissLetters
  };

  const logicsByType = {
    [QuizeType.Words]: useWordVariants,
    [QuizeType.MissLetters]: useMissingLettersQuiz
  };

  const quizComponent = computed(() => componentsByType[quizeType]);
  const quizLogic = computed(() => logicsByType[quizeType]);

  return {
    quizComponent,
    quizLogic
  };
}

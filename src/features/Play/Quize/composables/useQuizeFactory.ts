import QuizeWords from '../components/QuizeWords.vue';
import QuizeMissLetters from '../components/QuizeMissLetters.vue';
import { useQuiz } from './useQuize';
import { useMissingLettersQuiz } from './useMissingLettersQuiz';

export enum QuizeType {
  Words = 'Words',
  MissLetters = 'MissLetters'
}

export function useQuizeFactory(quizeType: QuizeType) {
  const componentsByType = {
    [QuizeType.Words]: QuizeWords,
    [QuizeType.MissLetters]: QuizeMissLetters
  };

  const logicsByType = {
    [QuizeType.Words]: useQuiz,
    [QuizeType.MissLetters]: useMissingLettersQuiz
  };

  const quizComponent = computed(() => componentsByType[quizeType]);
  const quizLogic = computed(() => logicsByType[quizeType]);

  return {
    quizComponent,
    quizLogic
  };
}

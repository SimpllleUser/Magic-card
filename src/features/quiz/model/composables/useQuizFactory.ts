import { InputLetters, InputWord, SelectWord } from '../../ui/inputs';
import { QuizType } from '../types';
import { useInputLetter, useInputWord, useSelectWord } from '../composables';

const COMPONENT_BY_TYPE = {
  [QuizType.SelectWord]: SelectWord,
  [QuizType.InputLetters]: InputLetters,
  [QuizType.InputWord]: InputWord
};

const COMPOSBLE_BY_TYPE = {
  [QuizType.SelectWord]: useSelectWord,
  [QuizType.InputLetters]: useInputLetter,
  [QuizType.InputWord]: useInputWord
};

export function useQuizFactory(quizType: QuizType) {
  const quizComponent = computed(() => COMPONENT_BY_TYPE[quizType]);
  const quizLogic = computed(() => COMPOSBLE_BY_TYPE[quizType]);

  return {
    quizComponent,
    quizLogic
  };
}

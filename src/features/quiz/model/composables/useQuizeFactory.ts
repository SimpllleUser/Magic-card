import { InputLetters, InputWord, SelectWord } from '../../ui/inputs';
import { QuizeType } from '../types';
import { useInputLetter, useInputWord, useSelectWord } from '../composables';

const COMPONENT_BY_TYPE = {
  [QuizeType.SelectWord]: SelectWord,
  [QuizeType.InputLetters]: InputLetters,
  [QuizeType.InputWord]: InputWord
};

const COMPOSBLE_BY_TYPE = {
  [QuizeType.SelectWord]: useSelectWord,
  [QuizeType.InputLetters]: useInputLetter,
  [QuizeType.InputWord]: useInputWord
};

export function useQuizeFactory(quizeType: QuizeType) {
  const quizComponent = computed(() => COMPONENT_BY_TYPE[quizeType]);
  const quizLogic = computed(() => COMPOSBLE_BY_TYPE[quizeType]);

  return {
    quizComponent,
    quizLogic
  };
}

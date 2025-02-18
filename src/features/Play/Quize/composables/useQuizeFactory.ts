import InputLetters from '../components/InputLetters.vue';
import SelectWords from '../components/SelectWords.vue';
import { QuizeType } from '../types';
import { useInputLetter } from './useInputLetter';
import { useSelectWord } from './useSelectWord';

export function useQuizeFactory(quizeType: QuizeType) {
  const COMPONENT_BY_TYPE = {
    [QuizeType.SelectWord]: SelectWords,
    [QuizeType.InputLetters]: InputLetters
  };

  const COMPOSBLE_BY_TYPE = {
    [QuizeType.SelectWord]: useSelectWord,
    [QuizeType.InputLetters]: useInputLetter
  };

  const quizComponent = computed(() => COMPONENT_BY_TYPE[quizeType]);
  const quizLogic = computed(() => COMPOSBLE_BY_TYPE[quizeType]);

  return {
    quizComponent,
    quizLogic
  };
}

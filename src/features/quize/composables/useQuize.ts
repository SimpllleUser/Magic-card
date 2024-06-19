import { computed, ComputedRef, Ref, ref } from 'vue';
import { WordEntity } from 'src/features/words/types/word';
import { getRandomizedArray } from 'src/features/quize/utils';
import { cloneDeep, find, findIndex } from 'lodash';
import { generateId } from 'src/helpers/id-generator';

enum CheckKey {
  FROM = 'from',
  TO = 'to'
}
interface QuizeConfig {
  checkByKey?: CheckKey;
}

interface QuizeWord {
  id: string;
  from: string;
  to: string;
  isCorrect?: boolean;
  answer?: string;
}

export interface Quiestion {
  id: string;
  question: string;
}

interface UseQuize {
  isSelectedVariant: (wordId: string, answerId: string) => boolean;
  queueOfQuestion: ComputedRef<Array<Quiestion>>;
  setAnswer: (wordId: string, answerId: string) => void;
  getVariantsOfQuestion: (word: WordEntity, currentWordsId: string) => Array<{ id: string; word: string }>;
  resultOfQuize: Ref<Array<QuizeWord>>;
  resetResult: () => void;
}
export function useQuize(words: Array<WordEntity>, config: QuizeConfig = { checkByKey: CheckKey.FROM }): UseQuize {
  const initialWords = ref(getRandomizedArray(words));
  const initWords = () => {
    initialWords.value = [...getRandomizedArray(words)];
  };

  const answerOfQuestion = ref<Record<string, string>>({});
  const queueOfQuestion = computed(() => {
    return initialWords.value.map(
      (word: WordEntity): Quiestion => ({
        id: word.id,
        question: word[config.checkByKey],
        key: generateId()
      })
    );
  });

  const setAnswer = (wordId: string, answerId: string) => {
    answerOfQuestion.value = {
      ...answerOfQuestion.value,
      [wordId]: answerId
    };

    const actualWordIndex = findIndex(resultOfQuize.value, { id: wordId });
    const answerWord = find(resultOfQuize.value, { id: answerId });
    resultOfQuize.value[actualWordIndex] = {
      ...resultOfQuize.value[actualWordIndex],
      isCorrect: resultOfQuize.value[actualWordIndex].id === answerId,
      answer: answerWord[config.checkByKey === CheckKey.FROM ? CheckKey.TO : CheckKey.FROM]
    };
  };

  const isPutAnswer = (wordId: string): string | undefined => answerOfQuestion.value[wordId];
  const isSelectedVariant = (wordId: string, answerId: string) => isPutAnswer(wordId) === answerId;

  const resultOfQuize = ref<Array<QuizeWord>>(cloneDeep(initialWords.value));

  const fromWordToVariant = (word: WordEntity): { id: string; word: string } => ({
    id: word.id,
    word: word[config.checkByKey === CheckKey.FROM ? CheckKey.TO : CheckKey.FROM]
  });

  const getVariantsOfQuestion = (word: WordEntity, currentWordsId: string): Array<{ id: string; word: string }> => {
    const variants = words.filter((item: WordEntity) => item.id !== currentWordsId).map(fromWordToVariant);
    const currentWord = fromWordToVariant(find(words, { id: currentWordsId })!);

    return getRandomizedArray<{ id: string; word: string }>([
      ...getRandomizedArray([currentWord, ...variants.slice(0, 3)])
    ]);
  };

  const resetResult = () => {
    answerOfQuestion.value = {};
    resultOfQuize.value = cloneDeep(initialWords.value);
    initWords();
  };

  return {
    isSelectedVariant,
    queueOfQuestion,
    setAnswer,
    getVariantsOfQuestion,
    resultOfQuize,
    resetResult
  };
}

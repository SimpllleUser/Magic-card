import { computed, ComputedRef, Ref, ref } from 'vue';
import { cloneDeep, find, findIndex } from 'lodash';
import { getRandomizedArray } from 'src/shared/lib/utils/random';
import { WordEntity } from 'src/widgets/Words';

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
  const initialWords = getRandomizedArray(words);
  const answerOfQuestion = ref<Record<string, string>>({});
  const queueOfQuestion = computed(() =>
    initialWords.map(
      (word: WordEntity): Quiestion => ({
        id: word.id,
        question: word[config.checkByKey]
      })
    )
  );

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

  const resultOfQuize = ref<Array<QuizeWord>>(cloneDeep(initialWords));

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
    resultOfQuize.value = cloneDeep(initialWords);
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

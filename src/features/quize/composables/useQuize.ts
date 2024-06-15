import { computed, ref } from 'vue';
import { WordEntity } from 'src/features/words/types/word';
import { getRandomizedArray } from 'src/features/quize/utils';
import { find, findIndex } from 'lodash';
import { Dialog } from 'quasar';

enum CheckKey {
  FROM = 'from',
  TO = 'to'
}
interface QuizeConfig {
  checkByKey?: CheckKey;
}

interface QuizeWord {
  id: string;
  isAnswered: boolean;
  isCorrect: boolean;
  question: string;
}

export interface Quiestion {
  id: string;
  question: string;
}
export function useQuize(words: Array<WordEntity>, config: QuizeConfig = { checkByKey: CheckKey.FROM }) {
  const initialWords = getRandomizedArray(words);
  const answers = ref<Record<string, string>>({});
  const queueOfQuestion = ref(
    initialWords.map(
      (word: WordEntity): Quiestion => ({
        id: word.id,
        question: word[config.checkByKey]
      })
    )
  );

  const setAnswer = (wordId: string, answerId: string) => {
    answers.value = {
      ...answers.value,
      [wordId]: answerId
    };
    const actualWordIndex = findIndex(queueOfQuestion.value, { id: wordId });
    const answerWord = find(total.value, { id: answerId })!;
    total.value[actualWordIndex] = {
      ...total.value[actualWordIndex],
      isCorrect: total.value[actualWordIndex].id === answerId,
      answer: answerWord[config.checkByKey === CheckKey.FROM ? CheckKey.TO : CheckKey.FROM]
    };
  };

  const isPutAnswer = (wordId: string): string | undefined => answers.value[wordId];
  const isSelectedVariant = (wordId: string, answerId: string) => isPutAnswer(wordId) === answerId;

  const total = ref<Array<WordEntity & { isCorrect?: boolean }>>(initialWords);

  const getResults = () => {
    return total.value.every((word) => word?.isCorrect);
  };

  const results = computed(getResults);

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

  return {
    isSelectedVariant,
    queueOfQuestion,
    setAnswer,
    getResults,
    getVariantsOfQuestion,
    total,
    results
  };
}

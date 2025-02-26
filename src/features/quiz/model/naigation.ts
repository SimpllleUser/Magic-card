import { useRouter } from 'vue-router';
import { useQuizsStore } from '@/features/Play/store/quiz';
import { QuizeType } from '@/features/Play/Quize/types';
import { DictionaryItem } from '@/features/dictionary/model/types';

interface NavigationParams {
  dictionaryId: string;
  words: DictionaryItem[];
  type?: QuizeType;
}

export const useNavigation = () => {
  const router = useRouter();
  const quizStore = useQuizsStore();

  const goToQuize = ({ dictionaryId, words, type }: NavigationParams) => {
    quizStore.setActiveModule(dictionaryId);
    quizStore.setWords(words);
    quizStore.setCurrentType(type);
    router.push({ name: 'Quize' });
  };

  const goToViewMode = ({ dictionaryId, words }: NavigationParams) => {
    quizStore.setActiveModule(dictionaryId);
    quizStore.setWords(words);
    router.push({ name: 'ViewModeWords' });
  };

  return {
    goToQuize,
    goToViewMode
  };
};

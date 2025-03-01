import { useRouter } from 'vue-router';
import { QuizeType } from '@/features/quiz/model/types';
import { DictionaryItem } from '@/features/dictionary/model/types';
import { useQuizsStore } from '@/stores/quiz';
import { PageNames } from '@/router/types';

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
    router.push({ name: PageNames.Quize });
  };

  const goToViewMode = async ({ dictionaryId, words }: NavigationParams) => {
    quizStore.setActiveModule(dictionaryId);
    quizStore.setWords(words);

    router.push({ name: PageNames.WordViewer });
  };

  return {
    goToQuize,
    goToViewMode
  };
};

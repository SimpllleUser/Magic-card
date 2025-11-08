import { useRouter } from 'vue-router';
import { QuizType } from '@/features/quiz';
import { DictionaryItem } from '@/features/dictionary';
import { useQuizStore } from '@/stores/quiz';
import { PageNames } from '@/router/types';

interface NavigationParams {
  dictionaryId: string;
  words: DictionaryItem[];
  type?: QuizType;
}

export const useNavigation = () => {
  const router = useRouter();
  const quizStore = useQuizStore();

  const goToQuiz = ({ dictionaryId, words, type }: NavigationParams) => {
    quizStore.setActiveModule(dictionaryId);
    quizStore.setWords(words);
    quizStore.setCurrentType(type);
    router.push({ name: PageNames.Quiz });
  };

  const goToViewMode = async ({ dictionaryId, words }: NavigationParams) => {
    quizStore.setActiveModule(dictionaryId);
    quizStore.setWords(words);

    router.push({ name: PageNames.WordViewer });
  };

  return {
    goToQuiz,
    goToViewMode
  };
};

import { useRouter } from 'vue-router';
import { useQuizsStore } from '@/features/Play/store/quiz';
import { QuizeType } from '@/features/Play/Quize/types';
import { DictionaryItem } from '@/core/models/Topic';

interface NavigationParams {
  topicId: string;
  words: DictionaryItem[];
  type?: QuizeType;
}

export const useNavigation = () => {
  const router = useRouter();
  const quizStore = useQuizsStore();

  const goToQuize = ({ topicId, words, type }: NavigationParams) => {
    quizStore.setActiveModule(topicId);
    quizStore.setWords(words);
    quizStore.setCurrentType(type);
    router.push({ name: 'Quize' });
  };

  const goToViewMode = ({ topicId, words }: NavigationParams) => {
    quizStore.setActiveModule(topicId);
    quizStore.setWords(words);
    router.push({ name: 'ViewModeWords' });
  };

  return {
    goToQuize,
    goToViewMode
  };
};

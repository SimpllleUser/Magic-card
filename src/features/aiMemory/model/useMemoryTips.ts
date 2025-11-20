import { MemoryService } from '@/features/aiMemory';
import { LoadingKeys } from '@/shared';
import { useLoadingStore } from '@/stores/loading';

function highlightWord(text: string, word: string) {
  const regex = new RegExp(`(${word})`, 'gi');
  return text.replace(regex, '<span class="text-primary font-weight-bold ">$1</span>');
}

export const useMemoryTips = (word: ComputedRef<string>) => {
  const loadingStore = useLoadingStore();
  const tipsData = ref<{
    mnemonic: string;
    sentences: string[];
  }>({
    mnemonic: '',
    sentences: []
  });

  const memoryService = new MemoryService();

  const generateMnemonic = async () => {
    const { mnemonic = '' } = await loadingStore.loadingWrapper(LoadingKeys.AI_MNEMONIC, () =>
      memoryService.generateMnemonic(word.value)
    );
    tipsData.value.mnemonic = mnemonic;
  };
  const generateSentences = async () => {
    const { examples } = await loadingStore.loadingWrapper(LoadingKeys.AI_SENTENCES, () =>
      memoryService.generateExampleSentences(word.value)
    );
    tipsData.value.sentences = examples;
  };

  const existSomeTip = computed(() => !!tipsData.value.mnemonic || !!tipsData.value.sentences.length);
  const tips = computed(() => ({
    mnemonic: highlightWord(tipsData.value.mnemonic, word.value),
    sentences: tipsData.value.sentences.map((example) => highlightWord(example, word.value))
  }));

  return { tips, generateMnemonic, generateSentences, existSomeTip };
};

import { MemoryService } from '@/features/aiMemory';

function highlightWord(text: string, word: string) {
  const regex = new RegExp(`(${word})`, 'gi');
  return text.replace(regex, '<span class="text-primary font-weight-bold ">$1</span>');
}

export const useMemoryTips = (word: ComputedRef<string>) => {
  const tipsData = ref<{
    mnemonic: string;
    sentences: string;
  }>({
    mnemonic: '',
    sentences: ''
  });

  const memoryService = new MemoryService();

  const generateMnemonic = async () => {
    tipsData.value.mnemonic = await memoryService.generateMnemonic(word.value);
  };
  const generateSentences = async () => {
    tipsData.value.sentences = await memoryService.generateExampleSentences(word.value);
  };

  const existSomeTip = computed(() => !!tipsData.value.mnemonic || !!tipsData.value.sentences);
  const tips = computed(() => ({
    mnemonic: highlightWord(tipsData.value.mnemonic, word.value),
    sentences: highlightWord(tipsData.value.sentences, word.value)
  }));

  return { tips, generateMnemonic, generateSentences, existSomeTip };
};

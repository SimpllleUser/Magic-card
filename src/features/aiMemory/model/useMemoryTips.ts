import { MemoryService } from '@/features/aiMemory';

function highlightWord(text: string, word: string) {
  const regex = new RegExp(`(${word})`, 'gi');
  return text.replace(regex, '<span class="text-primary font-weight-bold ">$1</span>');
}

export const useMemoryTips = (word: ComputedRef<string>) => {
  const tipsData = ref<{
    mnemonic: string;
    sentences: string[];
  }>({
    mnemonic: '',
    sentences: []
  });

  const memoryService = new MemoryService();

  const generateMnemonic = async () => {
    const { mnemonic = '' } = await memoryService.generateMnemonic(word.value);
    tipsData.value.mnemonic = mnemonic;
  };
  const generateSentences = async () => {
    const { examples } = await memoryService.generateExampleSentences(word.value);
    tipsData.value.sentences = examples;
  };

  const existSomeTip = computed(() => !!tipsData.value.mnemonic || !!tipsData.value.sentences.length);
  const tips = computed(() => ({
    mnemonic: highlightWord(tipsData.value.mnemonic, word.value),
    sentences: tipsData.value.sentences.map((example) => highlightWord(example, word.value))
  }));

  return { tips, generateMnemonic, generateSentences, existSomeTip };
};

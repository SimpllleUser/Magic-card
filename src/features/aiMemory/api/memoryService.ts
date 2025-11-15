import { AIService } from '@/features/aiMemory/api/index';

export class MemoryService {
  constructor(private aiService = new AIService()) {}

  // TODO add system instruction with correct format for generate data
  async generateMnemonic(word: string): Promise<string> {
    return this.aiService.generateTextContent(`Create a short, funny or easy mnemonic to remember the word "${word}"`, {
      systemInstruction: 'Mnemonic: "Be + noble = kind person" → уяви, що "benevolent'
    });
  }

  async generateExampleSentences(word: string): Promise<string> {
    return this.aiService.generateTextContent(`Create 3 short example sentences with different meanings of "${word}"`, {
      systemInstruction:
        'Examples **Приклад:**\n' +
        '\n' +
        '- Word: "set"\n' +
        '    1. I set my alarm for 7 AM.\n' +
        '    2. The sun will set soon.\n' +
        '    3. He set a world record.'
    });
  }
}

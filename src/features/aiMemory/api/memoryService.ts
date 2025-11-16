import { AIService } from '@/features/aiMemory/api';

export interface AIMemoryResult<T> {
  success: boolean;
  data: T | null;
  raw: string;
  error?: string;
}

export class MemoryService {
  constructor(private aiService = new AIService()) {}

  private async generateAIData<T>(
    word: string,
    promptTemplate: string,
    systemInstruction: string
  ): Promise<AIMemoryResult<T>> {
    try {
      const prompt = promptTemplate.replace(/\{\{word\}\}/g, word);

      const response = await this.aiService.generateTextContent(prompt, {
        systemInstruction
      });

      const cleaned = response
        .replace(/```json/i, '')
        .replace(/```/g, '')
        .trim();

      try {
        const parsed = JSON.parse(cleaned) as T;
        return { success: true, data: parsed, raw: cleaned };
      } catch (err) {
        console.warn('⚠️ Failed to parse AI JSON:', cleaned, err);
        return { success: false, data: null, raw: cleaned, error: 'Invalid JSON' };
      }
    } catch (error: any) {
      console.error('❌ AI request failed:', error);
      return { success: false, data: null, raw: '', error: error.message };
    }
  }

  async generateMnemonic(word: string): Promise<{ word: string; mnemonic: string }> {
    const prompt = `
You are a language learning assistant.

Create a short, funny, or easy mnemonic to help remember the English word "{{word}}".
Respond strictly in valid JSON format with the following structure:

{
  "word": "{{word}}",
  "mnemonic": "<your mnemonic here>"
}
`;

    const systemInstruction = 'Respond only with valid JSON — no text outside the JSON object.';

    const result = await this.generateAIData<{ word: string; mnemonic: string }>(word, prompt, systemInstruction);

    // fallback на текст
    if (!result.success || !result.data) return { word, mnemonic: result.raw || '' };

    return result.data;
  }

  async generateExampleSentences(word: string): Promise<{ word: string; examples: string[] }> {
    const prompt = `
You are a helpful English learning assistant.
Create 3 short, simple example sentences that use the word "{{word}}" in different contexts or meanings.
Return your answer strictly as valid JSON (no markdown or code fences).

{
  "word": "{{word}}",
  "examples": [
    "<sentence 1>",
    "<sentence 2>",
    "<sentence 3>"
  ]
}
`;

    const systemInstruction =
      'Respond only with valid JSON — do not wrap output in markdown. ' +
      'Sentences must be short (max 10 words) and simple.';

    const result = await this.generateAIData<{ word: string; examples: string[] }>(word, prompt, systemInstruction);

    if (!result.success || !result.data) {
      const examples = result.raw
        .split(/\n|•|-/)
        .map((s) => s.trim())
        .filter(Boolean);
      return { word, examples };
    }

    return result.data;
  }
}

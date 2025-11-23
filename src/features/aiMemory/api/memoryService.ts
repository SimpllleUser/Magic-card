import { AIService } from '@/features/aiMemory/api';
import { PROMPTS } from '@/features/aiMemory/constants';
import { RemoteCacheStorageService } from '@/shared';
const SYSTEM_INSTRUCTION = 'Respond only with valid JSON — no text outside the JSON object.';

export interface AIMemoryResult<T> {
  success: boolean;
  data: T | null;
  raw: string;
  error?: string;
}

export class MemoryService {
  cacheService = new RemoteCacheStorageService<{ key: string; value: string }>();
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
    const result = await this.generateAIData<{ word: string; mnemonic: string }>(
      word,
      PROMPTS.mnemonic,
      SYSTEM_INSTRUCTION
    );

    if (!result.success || !result.data) return { word, mnemonic: result.raw || '' };
    await this.cacheService.set(`mnemonic_${word}`, result.data);
    return result.data;
  }

  async generateExampleSentences(word: string): Promise<{ word: string; examples: string[] }> {
    const result = await this.generateAIData<{ word: string; examples: string[] }>(
      word,
      PROMPTS.sentences,
      SYSTEM_INSTRUCTION
    );

    if (!result.success || !result.data) {
      const examples = result.raw
        .split(/\n|•|-/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (!examples.length) return { word, examples: [] };
    }

    try {
      await this.cacheService.set(`sentences_${word}`, result.data);
    } catch {}

    return result.data;
  }
}

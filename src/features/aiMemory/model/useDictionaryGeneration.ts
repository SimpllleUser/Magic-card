import { PROMPTS } from "@/features/aiMemory/constants";
import { AIService } from "@/shared";
import { DictionaryItem } from "@/features/dictionary";

export function useDictionaryGeneration(title: ComputedRef<string>) {
  const aiService = new AIService();


  const generate = async (): Promise<{
    description: string;
    items: DictionaryItem[];
  }> => {
    const SYSTEM_INSTRUCTION = 'Respond only with valid JSON — no text outside the JSON object.';
    const response = await aiService.generateTextContent(PROMPTS.dictionary(title.value, 10), SYSTEM_INSTRUCTION);
    const data = response
      .replace(/```json/i, '')
      .replace(/```/g, '')
      .trim();
    return JSON.parse(data);
  }

  return {
    generate
  }
}
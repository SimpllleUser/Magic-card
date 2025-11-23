import { GoogleGenAI } from '@google/genai';
import { IHistory } from '../../features/aiMemory/model/types';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_AI_API_KEY
});

const MODEL = import.meta.env.VITE_AI_MODEL;

interface IGenerateContentConfig {
  history?: IHistory;
  systemInstruction?: string;
}

export class AIService {
  constructor() {}
  async generateTextContent(prompt: string, config: IGenerateContentConfig = { systemInstruction: '', history: [] }) {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config
    });
    return response.text || '';
  }
}

import { QuizType } from '@/features/quiz/model/types';

export interface WordProgress {
  wordId: string;
  successCount: number;
  failCount: number;
  streak: number;
  lastAttempt: number;
  knowledgeScore: number; // 0–1
  nextReview?: number; // timestamp (ms)
}

export interface DictionaryProgress {
  dictionaryId: string;
  userId: string;
  words: Record<string, WordProgress>;
  totalScore: number;
}

export interface UpdateOptions {
  isCorrect: boolean;
  quizType?: QuizType;
}

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

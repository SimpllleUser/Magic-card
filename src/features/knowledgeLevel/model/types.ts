import { QuizType } from '@/features/quiz/model/types';

/**
 * Represents learning progress for a single word.
 * Tracks accuracy, repetition history, memory retention, and next review schedule.
 */
export interface WordProgress {
  /** Unique word identifier (from dictionary) */
  wordId: string;

  /** Number of successful quiz attempts (weighted by quiz type) */
  successCount: number;

  /** Number of failed quiz attempts */
  failCount: number;

  /** Current streak of correct answers */
  streak: number;

  /** Timestamp (ms) of the last attempt */
  lastAttempt: number;

  /** Calculated overall knowledge score (0–1), based on accuracy, stability and time decay */
  knowledgeScore: number;

  /** Combined measure of memory retention (0–1): stability × time decay */
  memoryStrength: number;

  /** Timestamp (ms) when this word should be reviewed next (SRS interval) */
  nextReview?: number;

  /** Total number of attempts (success + fail) — useful for analytics */
  totalAttempts?: number;

  /** Optional: average interval between attempts in days (computed dynamically, may not persist) */
  avgIntervalDays?: number;
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

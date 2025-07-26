/**
 * Interface representing calculated statistical data for a user.
 * Contains the following metrics:
 * - **IA**: Incorrect answers
 * - **ACC**: Accuracy (%)
 * - **ATQ**: Average Time per Question (seconds)
 * - **WM**: Word Mastery (%)
 * - **ES**: Efficiency Score
 * - **CA**: Correct answers
 */

export interface CalculatedStatistic {
  IA: number;
  ACC: number;
  ATQ: number;
  WM: number;
  ES: number;
  CA: number;
  totalNumberOFAttempts: number;
}

export type IDictionaryStatistics = CalculatedStatistic & {
  totalNumberOFAttempts: number;
  id: string;
  dictionaryId: string;
  ts: number;
};

export interface DictionaryStatisticPrams {
  dictionaryId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}

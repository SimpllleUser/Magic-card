import { DictionaryProgress, WordProgress } from '../types';
import { LearningMetrics } from './LearningMetrics';

/**
 * Aggregates analytics from LearningMetrics for dashboards and progress tracking.
 * Provides high-level insights like mastery %, average recall, difficulty etc.
 */
export class KnowledgeAnalytics {
  /**
   * Returns a summary of key learning metrics for a given dictionary.
   */
  static getSummary(progress: DictionaryProgress) {
    const words = Object.values(progress.words);
    if (words.length === 0) {
      return {
        masteryPercent: 0,
        averageRecall: 0,
        averageDifficulty: 0,
        weakWords: 0,
        totalWords: 0,
        strongWords: 0
      };
    }

    // 🔹 Mastery percentage
    const masteryPercent = LearningMetrics.getMasteryPercent(progress);

    // 🔹 Average recall probability across words
    const recalls = words.map((w) => LearningMetrics.getRecallProbability(w));
    const averageRecall = +(recalls.reduce((a, b) => a + b, 0) / recalls.length).toFixed(2);

    // 🔹 Average difficulty index
    const difficulties = words.map((w) => LearningMetrics.getDifficulty(w));
    const averageDifficulty = +(difficulties.reduce((a, b) => a + b, 0) / difficulties.length).toFixed(2);

    // 🔹 Weak words count (score < 0.3)
    const weakWords = words.filter((w) => w.knowledgeScore < 0.3).length;

    // 🔹 Strong words count (score ≥ 0.8)
    const strongWords = words.filter((w) => w.knowledgeScore >= 0.8).length;

    return {
      masteryPercent,
      averageRecall,
      averageDifficulty,
      weakWords,
      strongWords,
      totalWords: words.length
    };
  }

  /**
   * Returns a detailed analytics object for a specific word.
   */
  static getWordAnalytics(word: WordProgress) {
    const recall = LearningMetrics.getRecallProbability(word);
    const difficulty = LearningMetrics.getDifficulty(word);

    return {
      wordId: word.wordId,
      recall,
      difficulty,
      mastered: word.knowledgeScore >= 0.8,
      weak: word.knowledgeScore < 0.3
    };
  }
}

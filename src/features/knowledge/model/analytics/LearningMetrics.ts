import { WordProgress, DictionaryProgress } from '../types';

export class LearningMetrics {
  /**
   * 1️⃣ Recall Probability — ймовірність, що користувач згадає слово зараз
   * Формула базується на кривій забування Ebbinghaus.
   */
  static getRecallProbability(word: WordProgress): number {
    const now = Date.now();
    const daysSinceLast = word.lastAttempt ? (now - word.lastAttempt) / (1000 * 60 * 60 * 24) : 0;

    const memory = Math.max(0.1, word.memoryStrength ?? 0.1); // уникнути ділення на 0
    return Math.exp(-daysSinceLast / (7 * memory)); // результат 0–1
  }

  /**
   * 2️⃣ Difficulty Index — наскільки слово складне для користувача
   * Чим більше помилок, тим вищий коефіцієнт.
   */
  static getDifficulty(word: WordProgress): number {
    return +(word.failCount / (word.successCount + 1)).toFixed(2);
  }

  /**
   * 3️⃣ Mastery Percent — відсоток засвоєних слів у словнику
   * Вважаємо слово mastered, якщо knowledgeScore ≥ 0.8
   */
  static getMasteryPercent(progress: DictionaryProgress): number {
    const words = Object.values(progress.words);
    if (!words.length) return 0;
    const learned = words.filter((w) => w.knowledgeScore >= 0.8).length;
    return +((learned / words.length) * 100).toFixed(1);
  }
}

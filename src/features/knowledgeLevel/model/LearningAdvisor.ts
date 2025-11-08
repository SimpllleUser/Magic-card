import { DictionaryProgress } from './types';
import { LearningMetrics } from './LearningMetrics';
import { KnowledgeAnalytics } from './KnowledgeAnalytics';

/**
 * Smart layer that translates analytics into user-friendly actions.
 * Goal: give clear directions like “review these words”, “practice hard ones”, etc.
 */
export class LearningAdvisor {
  static getNextActions(progress: DictionaryProgress) {
    const analytics = KnowledgeAnalytics.getSummary(progress);
    const words = Object.values(progress.words);

    // 1️⃣ Визначаємо групи
    const weakWords = words.filter((w) => w.knowledgeScore < 0.3);
    const lowRecallWords = words.filter((w) => LearningMetrics.getRecallProbability(w) < 0.5);
    const hardWords = words.filter((w) => LearningMetrics.getDifficulty(w) > 0.5);

    const actions: string[] = [];

    // 2️⃣ Логіка по сценаріях

    // Сценарій 1: користувач забуває слова
    if (lowRecallWords.length > 0) {
      actions.push(`You’re starting to forget ${lowRecallWords.length} words. Let’s review them first 🔁`);
    }

    // Сценарій 2: багато слабких слів
    if (weakWords.length > 0) {
      actions.push(`You still need to strengthen ${weakWords.length} weak words 💪`);
    }

    // Сценарій 3: складні слова
    if (hardWords.length > 0) {
      actions.push(`Some words are tricky (${hardWords.length}). Focus on them for deeper practice 🎯`);
    }

    // Сценарій 4: все стабільно — але треба повторити
    if (actions.length === 0 && analytics.masteryPercent > 70) {
      actions.push('Nice work! It’s a good time to review familiar words to keep memory fresh 🧠');
    }

    // Сценарій 5: якщо користувач тільки почав
    if (analytics.totalWords > 0 && analytics.masteryPercent < 20) {
      actions.push('Start by learning your new words. Practice small groups daily 🚀');
    }

    // Сценарій 6: надихаємо
    if (analytics.masteryPercent >= 90) {
      actions.push('🔥 Excellent memory retention! Consider adding new words.');
    }

    return actions;
  }
}

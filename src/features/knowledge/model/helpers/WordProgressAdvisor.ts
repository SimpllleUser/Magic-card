import { WordProgress } from '../types';
import { getMemoryLabel } from './utils';

/**
 * WordProgressAdvisor
 * -------------------
 * Generates adaptive learning hints for a specific word
 * based on its current knowledgeScore and memoryStrength.
 */
export class WordProgressAdvisor {
  private targetMastery = 0.9; // level of "mastered"
  private avgGainPerAttempt = 0.05; // how much each successful attempt raises the score

  constructor(private word: WordProgress) {}

  getAttemptsToMaster(): number {
    const remainingDelta = Math.max(0, this.targetMastery - this.word.knowledgeScore);
    const adjustedGain = this.avgGainPerAttempt * (1 - this.word.memoryStrength);
    return Math.max(1, Math.ceil(remainingDelta / adjustedGain));
  }

  getEstimatedDaysToMaster(dailyPractice = 5): number {
    const attempts = this.getAttemptsToMaster();
    return Math.ceil(attempts / dailyPractice);
  }

  getHintText(): string {
    const attempts = this.getAttemptsToMaster();
    const label = getMemoryLabel(this.word.memoryStrength);
    if (label === 'Mastered') return 'This word is already mastered 🎉';
    return `${attempts} more correct ${attempts === 1 ? 'answer' : 'answers'} to master this word.`;
  }

  getRecommendation(dailyPractice = 5) {
    return {
      wordId: this.word.wordId,
      knowledgeScore: this.word.knowledgeScore,
      attemptsToMaster: this.getAttemptsToMaster(),
      estimatedDays: this.getEstimatedDaysToMaster(dailyPractice),
      hint: this.getHintText()
    };
  }
}

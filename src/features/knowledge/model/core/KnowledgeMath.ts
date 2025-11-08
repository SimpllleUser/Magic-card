import { WordProgress } from '../helpers/types';

export class KnowledgeMath {
  static computeStability(totalAttempts: number): number {
    return 1 - Math.exp(-totalAttempts / 5);
  }

  static computeTimeDecay(lastAttempt: number, now: number): number {
    const days = lastAttempt ? (now - lastAttempt) / (1000 * 60 * 60 * 24) : 0;
    return Math.exp(-days / 7);
  }

  static computeAccuracy(successCount: number, failCount: number): number {
    return successCount / (successCount + failCount);
  }

  static computeMetrics(base: WordProgress, now: number, streakBonusCap: number) {
    const { successCount, failCount, streak, lastAttempt } = base;
    const totalAttempts = successCount + failCount;
    const stabilityFactor = this.computeStability(totalAttempts);
    const timeDecay = this.computeTimeDecay(lastAttempt, now);
    const accuracy = this.computeAccuracy(successCount, failCount);
    const streakBonus = Math.min(streak * 0.05, streakBonusCap);

    const knowledgeScore = Math.min(1, (accuracy * 0.6 + streakBonus * 0.2 + stabilityFactor * 0.2) * timeDecay);
    const memoryStrength = +(stabilityFactor * timeDecay).toFixed(3);

    return { knowledgeScore, memoryStrength };
  }
}

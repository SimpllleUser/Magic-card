import { QuizType } from '@/features/quiz/model/types';
import { DictionaryProgress, StorageAdapter, UpdateOptions, WordProgress } from '../types';
import { getDate } from '@/shared';
/**
 * KnowledgeEvaluator encapsulates learning progress logic:
 * - success/fail stats, streak bonus
 * - time-based decay (forgetting)
 * - spaced repetition scheduling (nextReview)
 * - optional persistence (via provided StorageAdapter or window.localStorage)
 */
export class KnowledgeEvaluation {
  private decayRate = 0.98; // daily forgetting multiplier (lower => faster forgetting)
  private streakBonusStep = 0.05; // +5% per correct in a row
  private streakBonusCap = 0.25; // max +25%
  private quizTypeWeights: Record<QuizType, number> = {
    [QuizType.SelectWord]: 1,
    [QuizType.InputLetters]: 1.5,
    [QuizType.InputWord]: 2
  };

  private storageKey: string;
  private storage?: StorageAdapter;

  constructor(private progress: DictionaryProgress, storage?: StorageAdapter) {
    this.storageKey = `ke::${progress.userId}::${progress.dictionaryId}`;
    this.storage = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    this.restore();
  }

  // ---------- Public API ----------

  /** Return a live copy of progress object */
  getResult() {
    return {
      dictionaryId: this.progress.dictionaryId,
      userId: this.progress.userId,
      totalScore: this.progress.totalScore,
      words: this.progress.words
    };
  }

  private scheduleNextReview(score: number, now: number): number {
    const nextReviewDays = this.getNextReviewInterval(score);
    return now + nextReviewDays * 24 * 60 * 60 * 1000;
  }

  private computeStability(totalAttempts: number) {
    return 1 - Math.exp(-totalAttempts / 5);
  }

  private computeTimeDecay(lastAttempt: number, now: number) {
    const days = lastAttempt ? (now - lastAttempt) / (1000 * 60 * 60 * 24) : 0;
    return Math.exp(-days / 7);
  }

  private computeAccuracy(successCount: number, failCount: number) {
    return successCount / (successCount + failCount);
  }

  private calculateKnowledgeMetrics(base: WordProgress, now: number) {
    const { successCount, failCount, streak, lastAttempt } = base;

    const totalAttempts = successCount + failCount;
    const stabilityFactor = this.computeStability(totalAttempts);
    const timeDecay = this.computeTimeDecay(lastAttempt, now);
    const accuracy = this.computeAccuracy(successCount, failCount);
    const streakBonus = Math.min(streak * this.streakBonusStep, this.streakBonusCap);

    const knowledgeScore = Math.min(1, (accuracy * 0.6 + streakBonus * 0.2 + stabilityFactor * 0.2) * timeDecay);
    const memoryStrength = +(stabilityFactor * timeDecay).toFixed(3);

    return { knowledgeScore, memoryStrength };
  }

  private updateStats(current: WordProgress, options: UpdateOptions, now: number): WordProgress {
    const { isCorrect, quizType = QuizType.SelectWord } = options;
    const weight = this.quizTypeWeights[quizType] ?? 1;

    const successCount = isCorrect ? current.successCount + weight : current.successCount;
    const failCount = isCorrect ? current.failCount : current.failCount + 1;
    const streak = isCorrect ? current.streak + 1 : 0;

    return {
      ...current,
      successCount,
      failCount,
      streak,
      lastAttempt: now
    };
  }

  /** Update knowledge for a single word and persist */
  updateWord(wordId: string, options: UpdateOptions): WordProgress {
    const now = Date.now();
    const current = this.getWordProgress(wordId);
    const base = this.updateStats(current, options, now);

    // 1️⃣ Обчислюємо знання та пам’ять
    const metrics = this.calculateKnowledgeMetrics(base, now);

    // 2️⃣ Плануємо наступне повторення
    const nextReview = this.scheduleNextReview(metrics.knowledgeScore, now);

    // 3️⃣ Формуємо фінальний результат
    const updated: WordProgress = {
      ...base,
      ...metrics,
      nextReview
    };

    this.progress.words[wordId] = updated;
    this.progress.totalScore = this.calculateDictionaryScore();
    this.persist();

    return updated;
  }

  /** List words due for review (nextReview <= now) */
  getWordsToReview(): WordProgress[] {
    return Object.values(this.progress.words).filter(
      (w) => !w.nextReview || getDate(new Date(w.nextReview)) === getDate(new Date())
    );
  }

  /** Percentage of words considered learned (knowledgeScore >= 0.7) */
  getLearningCompletion(): number {
    const words = Object.values(this.progress.words);
    if (words.length === 0) return 0;
    const learned = words.filter((w) => w.knowledgeScore >= 0.7).length;
    return +((learned / words.length) * 100).toFixed(1);
  }

  /** Words considered learned */
  getLearnedWords(): WordProgress[] {
    return Object.values(this.progress.words).filter((w) => w.knowledgeScore >= 0.7);
  }

  /** Weak words (knowledgeScore < 0.3) */
  getWeakWords(): WordProgress[] {
    return Object.values(this.progress.words).filter((w) => w.knowledgeScore < 0.3);
  }

  /** Replace internal progress (useful for hydration) and persist */
  replaceProgress(p: DictionaryProgress) {
    this.progress = { ...p, words: { ...p.words } };
    this.persist();
  }

  // ---------- Internals ----------

  private getWordProgress(wordId: string): WordProgress {
    return (
      this.progress.words[wordId] || {
        wordId,
        successCount: 0,
        failCount: 0,
        streak: 0,
        lastAttempt: 0,
        knowledgeScore: 0,
        nextReview: 0
      }
    );
  }

  private calculateDictionaryScore(): number {
    const words = Object.values(this.progress.words);
    if (words.length === 0) return 0;
    const total = words.reduce((sum, w) => sum + w.knowledgeScore, 0);
    return +(total / words.length).toFixed(2);
  }

  /** Simple SRS schedule based on current knowledge score */
  private getNextReviewInterval(score: number): number {
    if (score < 0.3) return 1; // tomorrow
    if (score < 0.5) return 2; // in 2 days
    if (score < 0.7) return 4; // in 4 days
    if (score < 0.9) return 7; // in a week
    return 14; // in two weeks
  }

  // ---------- Persistence ----------

  private persist() {
    if (!this.storage) return;
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(this.progress));
    } catch {}
  }

  private restore() {
    if (!this.storage) return;
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as DictionaryProgress;
        // Keep dictionaryId/userId from ctor, but merge words if IDs match
        if (parsed.dictionaryId === this.progress.dictionaryId && parsed.userId === this.progress.userId) {
          this.progress.words = parsed.words || {};
          this.progress.totalScore = parsed.totalScore ?? 0;
        }
      }
    } catch {}
  }

  /** Wipe persisted progress for this (user, dictionary) pair */
  clearPersisted() {
    if (!this.storage) return;
    try {
      this.storage.removeItem(this.storageKey);
    } catch {}
  }
}

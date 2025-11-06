import { KnowledgeMath } from './KnowledgeMath';
import { SpacedRepetition } from './SpacedRepetition';
import { ProgressStorage } from './ProgressStorage';
import { DictionaryProgress, WordProgress, UpdateOptions, QuizType, StorageAdapter } from './types';

export class KnowledgeEvaluator {
  private streakBonusCap = 0.25;
  private quizTypeWeights: Record<QuizType, number> = {
    [QuizType.SelectWord]: 1,
    [QuizType.InputLetters]: 1.5,
    [QuizType.InputWord]: 2
  };

  private store: ProgressStorage;

  constructor(private progress: DictionaryProgress, storage?: StorageAdapter) {
    const key = `ke::${progress.userId}::${progress.dictionaryId}`;
    this.store = new ProgressStorage(key, storage ?? window.localStorage);
    const saved = this.store.load();
    if (saved) Object.assign(this.progress, saved);
  }

  updateWord(wordId: string, options: UpdateOptions): WordProgress {
    const now = Date.now();
    const current = this.getWordProgress(wordId);
    const base = this.updateStats(current, options, now);

    const metrics = KnowledgeMath.computeMetrics(base, now, this.streakBonusCap);
    const nextReview = SpacedRepetition.scheduleNextReview(metrics.knowledgeScore, now);

    const updated: WordProgress = { ...base, ...metrics, nextReview };
    this.progress.words[wordId] = updated;
    this.progress.totalScore = this.calculateDictionaryScore();
    this.store.save(this.progress);
    return updated;
  }

  private updateStats(current: WordProgress, options: UpdateOptions, now: number): WordProgress {
    const { isCorrect, quizType = QuizType.SelectWord } = options;
    const weight = this.quizTypeWeights[quizType] ?? 1;
    return {
      ...current,
      successCount: isCorrect ? current.successCount + weight : current.successCount,
      failCount: isCorrect ? current.failCount : current.failCount + 1,
      streak: isCorrect ? current.streak + 1 : 0,
      lastAttempt: now
    };
  }

  private getWordProgress(id: string): WordProgress {
    return (
      this.progress.words[id] ?? {
        wordId: id,
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
    return words.length ? +(words.reduce((s, w) => s + w.knowledgeScore, 0) / words.length).toFixed(2) : 0;
  }

  getResult() {
    return this.progress;
  }
}

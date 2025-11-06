export class SpacedRepetition {
  static getNextInterval(score: number): number {
    if (score < 0.3) return 1;
    if (score < 0.5) return 2;
    if (score < 0.7) return 4;
    if (score < 0.9) return 7;
    return 14;
  }

  static scheduleNextReview(score: number, now: number): number {
    const days = this.getNextInterval(score);
    return now + days * 24 * 60 * 60 * 1000;
  }
}

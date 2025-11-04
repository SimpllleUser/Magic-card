export enum KnowledgeLevel {
  New = 'New',
  Beginner = 'Beginner',
  Learning = 'Learning',
  Familiar = 'Familiar',
  Mastered = 'Mastered'
}

/**
 * Returns human-readable knowledge level based on knowledgeScore (0–1)
 */
export function getWordLevel(score: number): KnowledgeLevel {
  if (score < 0.2) return KnowledgeLevel.New;
  if (score < 0.4) return KnowledgeLevel.Beginner;
  if (score < 0.6) return KnowledgeLevel.Learning;
  if (score < 0.8) return KnowledgeLevel.Familiar;
  return KnowledgeLevel.Mastered;
}

/**
 * Converts knowledge score (0–1) into rating from 1 to 5 stars
 */
export function getWordRating(score: number): number {
  return Math.min(5, Math.max(1, Math.round(score * 5)));
}

/**
 * Converts knowledge score (0–1) into percentage 0–100%
 */
export function getWordProgressPercent(score: number): number {
  return Math.round(score * 100);
}

/**
 * Combines text and rating for UI display
 */
export function getWordLevelLabel(score: number): string {
  const level = getWordLevel(score);
  const percent = getWordProgressPercent(score);
  return `${level} (${percent}%)`;
}

export function getMemoryLabel(strength: number): string {
  if (strength < 0.3) return 'Weak';
  if (strength < 0.6) return 'Moderate';
  if (strength < 0.8) return 'Strong';
  return 'Very strong';
}

export function getMemoryColor(strength: number): string {
  if (strength < 0.3) return '#ef4444'; // red
  if (strength < 0.6) return '#f59e0b'; // amber
  if (strength < 0.8) return '#10b981'; // green
  return '#0ea5e9'; // blue
}

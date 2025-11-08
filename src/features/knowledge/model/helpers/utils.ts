import { Colors, Icons } from '@/core';

export enum KnowledgeLevel {
  New = 'New',
  Beginner = 'Beginner',
  Learning = 'Learning',
  Familiar = 'Familiar',
  Mastered = 'Mastered'
}

export function getWordLevel(score: number): KnowledgeLevel {
  if (score < 0.2) return KnowledgeLevel.New;
  if (score < 0.4) return KnowledgeLevel.Beginner;
  if (score < 0.6) return KnowledgeLevel.Learning;
  if (score < 0.8) return KnowledgeLevel.Familiar;
  return KnowledgeLevel.Mastered;
}

export function getWordRating(score: number): number {
  return Math.min(5, Math.max(1, Math.round(score * 5)));
}

export function getWordProgressPercent(score: number): number {
  return Math.round(score * 100);
}

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
  if (strength < 0.3) return Colors.Error; // red
  if (strength < 0.6) return Colors.Warning; // amber
  if (strength < 0.8) return Colors.Success; // green
  return Colors.Primary; // blue
}

export function getKnowledgeIcon(score: number): string {
  if (score < 0.2) return Icons.LightbulbOffOutline; // new / not known
  if (score < 0.4) return Icons.LightbulbOutline; // beginner
  if (score < 0.6) return Icons.LightbulbOnOutline; // learning
  if (score < 0.8) return Icons.LightbulbOn; // familiar
  return Icons.StarCircle; // mastered
}

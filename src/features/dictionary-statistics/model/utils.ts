import { CalculatedStatistic, DictionaryStatisticPrams } from '../model/types';

export const getCalculationStatistics = (
  params: DictionaryStatisticPrams,
  totalNumberOFAttempts: number
): CalculatedStatistic => {
  const IA = +params.incorrectAnswers.toFixed(0);
  const CA = +params.correctAnswers.toFixed(0);
  const TQ = +params.totalQuestions.toFixed(0);
  const TT = params.timeTaken;

  const ACC = (CA / TQ) * 100;
  const ATQ = TT / TQ;
  const WM = (CA / TQ) * 100; /// if >= 80 learned; if <= 50 wordNeedsAdditionalRepetition;

  const ES = ACC * (1 / ATQ); /// Efficiency Score (ES) Поєднує точність і швидкість then higher then better

  return { IA, ACC, ATQ, WM, ES, CA, totalNumberOFAttempts };
};

export const getStatusLearning = (ES: number): string => {
  if (ES >= 80) return 'Learned';
  if (ES <= 50) return 'Word needs additional repetition';
  return 'Need more practice';
};

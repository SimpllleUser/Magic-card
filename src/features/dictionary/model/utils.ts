import { omit } from 'lodash';
import { generateId } from '@/shared/utils/id-generate';
import { CalculatedStatistic, Dictionary, DictionaryItem, DictionaryStatisticPrams } from '../model/types';
import { ENTITY_API_KEYS } from '@/shared/api/constants';

export const mappedDictionaryItems = (dictionaryParams: Dictionary): Dictionary => ({
  ...dictionaryParams,
  items: dictionaryParams.items.map(
    (item: Omit<DictionaryItem, 'id'>): DictionaryItem => ({
      ...item,
      id: generateId(),
      from: item.from.trim(),
      to: item.to.trim()
    })
  )
});

export const makeCopyDictionary = (dictionary: Dictionary): Dictionary => omit(dictionary, ['id', ...ENTITY_API_KEYS]);

export const getCalculationStatistics = (
  params: DictionaryStatisticPrams,
  totalNumberOFAttempts: number
): CalculatedStatistic => {
  const IA = params.incorrectAnswers;
  const CA = params.correctAnswers;
  const TQ = params.totalQuestions;
  const TT = params.timeTaken;

  const ACC = (CA / TQ) * 100;
  const ATQ = TT / TQ;
  const WM = (CA / totalNumberOFAttempts) * 100; /// if >= 80 learned; if <= 50 wordNeedsAdditionalRepetition;

  const ES = ACC * (1 / ATQ); /// Efficiency Score (ES) Поєднує точність і швидкість then higher then better

  return { IA, ACC, ATQ, WM, ES };
};

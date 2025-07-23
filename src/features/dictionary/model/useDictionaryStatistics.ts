import { useCRUD } from '@/shared/use/useCRUD';
import { CalculatedStatistic, DictionaryStatisticPrams, DictionaryStatistics } from '@/features/dictionary/model/types';

export type LevelOfKnowledge = 'learned' | 'wordNeedsAdditionalRepetition';
/*
  Записувати дані статистики для кожної сесії.
  Потім можна буде сумувати всі показники та покувати як загальний результат
  по кожному слову
*/

/*
  Записувати дані статистики для кожного слова
  Адаптувати формули знизу до слова
*/

export function useDictionaryStatistics() {
  // const IA = params.incorrectAnswers; /// Incorrect Answers Скільки слів/питань користувач відповів неправильно.

  /// Accuracy (ACC); Показник успішності у відсотках

  /// Average Time per Question (ATQ) Середній час,витрачений на відповідь на одне питання.

  /// Word Mastery (WM) - Оцінка, наскільки добре користувач засвоїв конкретні слова

  /// const DL = 0;  Difficulty (DL) - Рівень складності  Додати кеф в залежнеості від типу quiz

  const statisticsCrud = useCRUD<DictionaryStatistics>([], { key: 'dictionaryStatistics', returnAsObject: true });

  const getCalculationStatistics = (params: DictionaryStatisticPrams): CalculatedStatistic => {
    const totalNumberOFAttempts = getTotalNumberOFAttempts(params.dictionaryId);
    const CA = params.correctAnswers; /// Correct Answers, Скільки слів/питань користувач відповів правильно.

    const TQ = params.totalQuestions; ///  Total Questions (TQ) Скільки питань було у квізі
    const TT = params.timeTaken; /// Time Taken  Скільки часу користувач витратив на квіз.

    const ACC = (CA / TQ) * 100;
    const ATQ = TT / TQ;
    const WM = (CA / totalNumberOFAttempts) * 100; /// if >= 80 learned; if <= 50 wordNeedsAdditionalRepetition;

    const ES = ACC * (1 / ATQ); /// Efficiency Score (ES) Поєднує точність і швидкість then higher then better

    return { ACC, ATQ, WM, ES };
  };

  const getTotalNumberOFAttempts = (id: string): number =>
    statisticsCrud.data.value.filter((item) => item.dictionaryId === id)?.length || 0 + 1;

  const saveStatistics = (params: Omit<DictionaryStatisticPrams, 'ts'>) => {
    const data: DictionaryStatistics = {
      ...getCalculationStatistics(params),
      id: new Date().valueOf().toString(),
      ts: new Date().valueOf(),
      dictionaryId: params.dictionaryId,
      totalNumberOFAttempts: getTotalNumberOFAttempts(params.dictionaryId)
    };

    statisticsCrud.add(data);
  };

  return {
    saveStatistics
  };
}

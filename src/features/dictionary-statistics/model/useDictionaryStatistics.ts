import { useCRUD } from '@/shared/use/useCRUD';
import { DictionaryStatisticPrams, IDictionaryStatistics } from './types';
import { getCalculationStatistics } from './utils';

// export type LevelOfKnowledge = 'learned' | 'wordNeedsAdditionalRepetition';
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
  /// const DL = 0;  Difficulty (DL) - Рівень складності  Додати кеф в залежнеості від типу quiz

  const statisticsCrud = useCRUD<IDictionaryStatistics>([], { key: 'Dictionary-statistics', returnAsObject: true });

  const getTotalNumberOFAttempts = (id: string): number =>
    statisticsCrud.data.value.filter((item) => item.dictionaryId === id)?.length + 1;

  const saveStatistics = (params: Omit<DictionaryStatisticPrams, 'ts'>) => {
    const totalNumberOFAttempts = getTotalNumberOFAttempts(params.dictionaryId);
    const data: IDictionaryStatistics = {
      ...getCalculationStatistics(params, totalNumberOFAttempts),
      id: new Date().valueOf().toString(),
      ts: new Date().valueOf(),
      dictionaryId: params.dictionaryId,
      totalNumberOFAttempts: getTotalNumberOFAttempts(params.dictionaryId)
    };

    statisticsCrud.add(data);
  };

  const getByDictionaryId = (dictionaryId: string): IDictionaryStatistics[] =>
    statisticsCrud.data.value.filter((item) => item.dictionaryId === dictionaryId);

  return {
    saveStatistics,
    getByDictionaryId
  };
}

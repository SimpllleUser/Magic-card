import { generateId } from '@/shared/utils/id-generate';
import { Dictionary, DictionaryItem } from '../model/types';

export const mappedDictionaryItems = (dictionaryParams: Dictionary): Dictionary => ({
  ...dictionaryParams,
  dictionary: dictionaryParams.dictionary.map(
    (item: Omit<DictionaryItem, 'id'>): DictionaryItem => ({ ...item, id: generateId() })
  )
});

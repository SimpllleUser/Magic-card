import { omit } from 'lodash';
import { generateId } from '@/shared/utils/id-generate';
import { Dictionary, DictionaryItem } from '../model/types';
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

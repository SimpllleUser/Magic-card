import { omit } from 'lodash';
import { generateId } from '@/shared';
import { Dictionary, DictionaryItem } from '../model/types';
import { ENTITY_API_KEYS } from '@/shared';

export const mappedDictionaryItems = <T extends { items: DictionaryItem[] }>(dictionaryParams: T): T => ({
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

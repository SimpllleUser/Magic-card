import { Entity } from './index';
import { generateId } from '@/shared/utils/id-generate';

export interface DictionaryItem {
  id: string;
  from: string;
  to: string;
}

export type Topic = Entity<{
  title: string;
  description: string;
  dictionary: Array<DictionaryItem>;
}>;

export const mappedDictionaryOfTopic = (topic: Topic): DictionaryItem => ({
  ...topic,
  dictionary: topic.dictionary.map(
    (item: Omit<DictionaryItem, 'id'>): DictionaryItem => ({ ...item, id: generateId() })
  )
});

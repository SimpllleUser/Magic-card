import { EntityWithId, OptionalId } from '@/core/models';
import { EntityAPI, EntityApiFields } from '@/shared/index/types';

export type DictionaryItem = {
  id: string;
  from: string;
  to: string;
} & Partial<EntityApiFields>;

export type Dictionary = EntityWithId<{
  title: string;
  description: string;
  items: Array<DictionaryItem>;
  userId?: string;
}>;

export interface DictionaryFormProps {
  formData?: Dictionary | Record<string, any>;
}

export interface DictionaryFormEmits {
  (event: 'submit', payload: Dictionary): void;
}

export type DictionaryCRUD = {
  data: Ref<EntityWithId<Dictionary>[]>;
  create: (item: Required<OptionalId<DictionaryItem>>) => void;
  add: (item: Required<OptionalId<Dictionary>>) => Dictionary;
  read: () => Dictionary[];
  update: (updatedItem: Partial<DictionaryItem>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Dictionary | undefined;
};
export type DictionaryWithItemsString = Dictionary & { items: string };
export type DictionaryAPIWithStringItems = EntityAPI<DictionaryWithItemsString>;
export type DictionaryApiData = EntityAPI<Dictionary>;

export type useDictionaryAPI = {
  create: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  update: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  getAll: () => Promise<DictionaryApiData[]>;
  remove: (id: string) => Promise<unknown>;
};

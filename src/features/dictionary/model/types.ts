import { EntityWithId, OptionalId } from '@/core/models';
import { EntityAPI, EntityApiFields, RemoveFields, ReplaceField } from '@/shared/index/types';

export type DictionaryItem = {
  id: string;
  from: string;
  to: string;
} & Partial<EntityApiFields>;

export interface BaseDictionary {
  title: string;
  description: string;
  items: Array<DictionaryItem>;
  userId?: string;
}

export type Dictionary = EntityWithId<BaseDictionary>;

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

export type DictionaryParamsForUpdate = RemoveFields<EntityAPI<Dictionary>, '$id'> & { id: string };
// export type IDictionaryBaseDTO = RemoveField<EntityAPI<RemoveField<Dictionary, 'items'>, '$id'>
export type IDictionaryBaseDTO = RemoveFields<EntityAPI<Dictionary>, '$id' | 'id' | 'items'>;
export type IDictionaryUpdateDTO = EntityAPI<ReplaceField<RemoveFields<Dictionary, 'id'>, 'items', string>>;
export type IDictionaryCreateDTO = ReplaceField<BaseDictionary, 'items', string>;
export type IDictionaryGetDTO = RemoveFields<EntityAPI<Required<Dictionary>>, '$id'>;

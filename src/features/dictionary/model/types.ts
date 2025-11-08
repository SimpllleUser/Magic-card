import { EntityWithId, OptionalId } from '@/core';
import { EntityAPI, EntityApiFields, RemoveFields, ReplaceField } from '@/shared';

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
export type DictionaryStrong = Required<Dictionary>;
export type BaseDictionaryStrong = Required<BaseDictionary>;

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
export type DictionaryApiData = EntityAPI<Required<Dictionary>>;

export type DictionaryApiEntity = EntityAPI<ReplaceField<BaseDictionaryStrong, 'items', string>>;
export type IDictionaryBaseDtoParams = RemoveFields<EntityAPI<DictionaryStrong>, 'id' | 'items'>;
export type DictionaryParamsForUpdate = RemoveFields<EntityAPI<DictionaryStrong>, '$id'>;
// export type IDictionaryBaseDTO = RemoveField<EntityAPI<RemoveField<Dictionary, 'items'>, '$id'>
export type IDictionaryBaseDTO = RemoveFields<EntityAPI<Dictionary>, '$id' | 'id' | 'items'>;
export type IDictionaryCreateDTO = ReplaceField<BaseDictionary, 'items', string>;
export type IDictionaryGetDTO = RemoveFields<EntityAPI<Required<Dictionary>>, '$id'>;
export type IDictionaryUpdateDTO = DictionaryApiEntity;
export type IDictionaryGetParamsDTO = DictionaryApiEntity;

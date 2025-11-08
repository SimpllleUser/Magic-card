import { useCRUD } from '@/shared';
import { mappedDictionaryItems } from '../model/utils';
import type { Dictionary, DictionaryCRUD } from '../model/types';

export const useDictionaryCRUD = (): DictionaryCRUD => {
  const crud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });

  const create = (dictionary: Dictionary): void => crud.create(mappedDictionaryItems(dictionary));
  const update = (dictionary: Dictionary): void => crud.update(mappedDictionaryItems(dictionary));

  return { ...crud, create, update };
};

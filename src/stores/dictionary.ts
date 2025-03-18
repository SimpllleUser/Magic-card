import { defineStore } from 'pinia';
import { Dictionary } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems } from '@/features/dictionary/model/utils';
import { has } from 'lodash';
import { useDictionaryApi } from '@/features/dictionary/api';

const dictionaryApi = useDictionaryApi();


export const useDictionaryStore = defineStore('dictionary', () => {
  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });
  const create = (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary))
  const update = (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary))

  const items = computed(() => dictionaryCrud.data);

  const baseSyncLocalDictionaryWithClold = async () => {
    for (const dictionary of dictionaryCrud.data.value) {
      if (!has(dictionary, ['$id'])) {
        const savedDictionary = await dictionaryApi.save(dictionary);
        dictionaryCrud.update(savedDictionary);
      }
    }
  }

  return {
    ...dictionaryCrud,
    update,
    create,
    items: items.value,
    baseSyncLocalDictionaryWithClold,
  };
});

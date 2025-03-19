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

  const saveDictionaryOnCloudFromStorage = async () => {
    for (const dictionary of dictionaryCrud.data.value) {
      if (!has(dictionary, ['$id'])) {
        const savedDictionary = await dictionaryApi.create(dictionary);
        dictionaryCrud.update(savedDictionary);
      }
    }
  }

  const saveDictionaryOnStorageFromCloud = async () => {
    const dictionaries = await dictionaryApi.getAll();
    dictionaries.forEach((dictionary) => {
      dictionaryCrud.create(dictionary);
    });
  }

  const updateWithCloud = async (dictionary: Dictionary) => {
    const cloudItem = await dictionaryApi.update(dictionary)
    update(cloudItem)
  }

  const createWithCloud = async (dictionary: Dictionary) => {
    const cloudItem = await dictionaryApi.create(dictionary)
    create(cloudItem)
  }

  const removeWithCloud = async (dictionary: Dictionary) => {
    dictionaryCrud.remove(dictionary.id)
    if (dictionary?.$id)
      await dictionaryApi.remove(dictionary?.$id)
  }

  return {
    ...dictionaryCrud,
    update,
    create,
    updateWithCloud,
    createWithCloud,
    removeWithCloud,
    items: items.value,
    saveDictionaryOnCloudFromStorage,
    saveDictionaryOnStorageFromCloud,
  };
});

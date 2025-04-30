import { defineStore } from 'pinia';
import { Dictionary } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems } from '@/features/dictionary/model/utils';
import { useDictionaryApi } from '@/features/dictionary/api';
import { useAuthStore } from './auth';
import { generateId } from '@/shared/utils/id-generate';

const dictionaryApi = useDictionaryApi();


export const useDictionaryStore = defineStore('dictionary', () => {
  const authStore = useAuthStore();

  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });
  const create = (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary));
  const update = (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary));



  const updateWithCloud = async (dictionary: Dictionary) => {
    const cloudItem = await dictionaryApi.update(dictionary);
    update(cloudItem);
  };

  const createWithCloud = async (dictionary: Dictionary) => {
    const cloudItem = await dictionaryApi.create({
      ...dictionary,
      id: generateId()
    });
    create(cloudItem);
  };

  const removeWithCloud = async (dictionary: Dictionary) => {
    dictionaryCrud.remove(dictionary.id);
    if (dictionary?.$id) await dictionaryApi.remove(dictionary?.$id);
  };

  const items = computed(() => {
    const localItems = dictionaryCrud.data.value.filter((item) => !item?.$id);
    if (!authStore.user?.$id) return localItems;

    return dictionaryCrud.data.value.filter((item) => item?.userId === authStore.user?.$id);
  });

  return {
    ...dictionaryCrud,
    update,
    create,
    updateWithCloud,
    createWithCloud,
    removeWithCloud,
    items,

  };
});

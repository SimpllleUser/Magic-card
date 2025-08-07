import { defineStore } from 'pinia';
import { Dictionary } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems } from '@/features/dictionary/model/utils';
import { useDictionaryApi } from '@/features/dictionary/api';
import { useAuthStore } from '../features/auth/model/auth';
import { generateId } from '@/shared/utils/id-generate';

const dictionaryApi = useDictionaryApi();

export const useDictionaryStore = defineStore('dictionary', () => {
  const authStore = useAuthStore();

  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });
  const create = (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary));
  const update = (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary));

  const updateWithCloud = async (dictionary: Dictionary) => {
    let dictionaryData = dictionary;
    if (dictionary?.$id) {
      dictionaryData = await dictionaryApi.update(dictionary);
    }

    update(dictionaryData);
  };

  const createWithCloud = async (dictionary: Dictionary) => {
    let dictionaryData = mappedDictionaryItems({ ...dictionary, id: generateId() });
    if (authStore.isAuthenticated) {
      dictionaryData = await dictionaryApi.create(dictionaryData);
    }

    create(dictionaryData);
  };

  const removeWithCloud = async (dictionary: Dictionary) => {
    dictionaryCrud.remove(dictionary.id);
    if (dictionary?.$id) await dictionaryApi.remove(dictionary?.$id);
  };

  const saveToCloud = async (dictionary: Dictionary) => {
    const dictionaryForCloud = { ...dictionary, userId: authStore.isAuthenticated };
    const dictionaryFromCloud = await dictionaryApi.create(dictionaryForCloud);
    dictionaryCrud.update(dictionaryFromCloud);
  };

  const localDictionarys = computed(() => dictionaryCrud.data.value.filter((item) => !item?.$id));

  const items = computed(() => {
    if (!authStore.isAuthenticated) return localDictionarys.value;

    return dictionaryCrud.data.value;
  });

  const fetchDictionarys = async () => {
    const dictionarysFromCloud = await dictionaryApi.getAll(authStore.user.id);
    const dictionarysFromStorage = localDictionarys.value;

    dictionaryCrud.set([...dictionarysFromCloud, ...dictionarysFromStorage]);
  };

  return {
    ...dictionaryCrud,
    update,
    create,
    updateWithCloud,
    createWithCloud,
    removeWithCloud,
    saveToCloud,
    fetchDictionarys,
    items
  };
});

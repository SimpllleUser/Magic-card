import { defineStore } from 'pinia';
import { generateId, useCRUD } from '@/shared';
import { mappedDictionaryItems } from '@/features/dictionary';
import { Dictionary, DictionaryApi, DictionaryParamsForUpdate } from '@/features/dictionary/api';
import { useAuthStore } from '@/features/auth';

const dictionaryApi = new DictionaryApi();

export const useDictionaryStore = defineStore('dictionary', () => {
  const authStore = useAuthStore();

  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionaries', returnAsObject: true });
  const create = (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary));
  const update = (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary));

  const updateWithCloud = async (dictionary: DictionaryParamsForUpdate) => {
    let dictionaryData = dictionary;
    if (dictionary?.id) {
      dictionaryData = await dictionaryApi.update(dictionary);
    }

    update(dictionaryData);
  };

  const createWithCloud = async (dictionary: Dictionary) => {
    let dictionaryData = mappedDictionaryItems({ ...dictionary, id: generateId() });
    if (authStore.isAuth) {
      dictionaryData = await dictionaryApi.create(dictionaryData);
    }

    create(dictionaryData);
  };

  const removeWithCloud = async (dictionary: Dictionary) => {
    dictionaryCrud.remove(dictionary.id);
    if (dictionary?.id) await dictionaryApi.remove(dictionary?.id);
  };

  const saveToCloud = async (dictionary: Dictionary) => {
    const dictionaryForCloud = { ...dictionary, userId: authStore.user.$id };
    const dictionaryFromCloud = await dictionaryApi.create(dictionaryForCloud);
    dictionaryCrud.update(dictionaryFromCloud);
  };

  const localDictionaries = computed(() => dictionaryCrud.data.value.filter((item) => !item?.id));

  const items = computed(() => {
    if (!authStore.isAuth) return localDictionaries.value;

    return dictionaryCrud.data.value;
  });

  const fetchDictionaries = async () => {
    const dictionariesFromCloud = await dictionaryApi.getAll(authStore.user.$id);
    const dictionariesFromStorage = localDictionaries.value;

    dictionaryCrud.set([...dictionariesFromCloud, ...dictionariesFromStorage]);
  };

  return {
    ...dictionaryCrud,
    update,
    create,
    updateWithCloud,
    createWithCloud,
    removeWithCloud,
    saveToCloud,
    fetchDictionaries,
    items
  };
});

import { defineStore } from 'pinia';
import { Dictionary } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems } from '@/features/dictionary/model/utils';
import { useDictionaryApi } from '@/features/dictionary/api';
import { useAuthStore } from './auth';
import { EnitityAPI } from '@/shared/index/types';
import { setActionsStrategy } from '@/features/dictionary/model/ActionDictionaryStrategy';

const dictionaryApi = useDictionaryApi();

const getDictionaryIds = (items: Dictionary[]) => items.map((item) => item.id);
const findDictionaryById = (items: Dictionary[], id: string) => items.find((item) => item.id === id);

export const useDictionaryStore = defineStore('dictionary', () => {
  const authStore = useAuthStore();

  const actionsStategy = setActionsStrategy(authStore.isAuthenticated);

  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });
  const create = (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary));
  const update = (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary));

  /// TODO refactor this function after write tests
  const syncDataBetweenStoragesData = async () => {
    const dictionariesFromCloud = await dictionaryApi.getAll();
    const dictionariesFromStorage = dictionaryCrud.data.value;

    const storageDictionaryIds = getDictionaryIds(dictionariesFromStorage);
    const cloudDictionaryIds = getDictionaryIds(dictionariesFromCloud);

    const allDictionaryIds = [...storageDictionaryIds, ...cloudDictionaryIds];

    for (const id of allDictionaryIds) {
      const existInStorage = storageDictionaryIds.includes(id);
      const existInCloud = cloudDictionaryIds.includes(id);

      if (existInCloud && existInStorage) continue;

      if (existInCloud && !existInStorage) {
        const cloudDictionary = findDictionaryById(dictionariesFromCloud, id);
        if (!cloudDictionary) continue;
        dictionaryCrud.add(cloudDictionary);
      }

      if (!existInCloud && existInStorage) {
        const storageDictionary = findDictionaryById(dictionariesFromStorage, id);
        if (!storageDictionary) continue;
        await dictionaryApi.create({
          ...storageDictionary,
          userId: authStore.user?.$id
        });
      }
    }
  };

  const updateWithCloud = async (dictionary: EnitityAPI<Dictionary> | Dictionary) =>
    await actionsStategy({ dictionary, localAction: update, cloudAction: dictionaryApi.update });

  const createWithCloud = async (dictionary: EnitityAPI<Dictionary> | Dictionary) =>
    await actionsStategy({ dictionary, localAction: create, cloudAction: dictionaryApi.create });

  const removeWithCloud = async (dictionary: Dictionary) => {
    dictionaryCrud.remove(dictionary.id);
    if (dictionary?.$id && authStore.isAuthenticated) await dictionaryApi.remove(dictionary?.$id);
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
    syncDataBetweenStoragesData
  };
});

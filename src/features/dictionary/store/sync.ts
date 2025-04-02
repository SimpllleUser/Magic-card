import { AuthStore } from '@/stores/auth';
import { Dictionary, useDictionaryAPI } from '../model/types';

export const syncDataBetweenStorages = async (
  authStore: AuthStore,
  dictionaryApi: useDictionaryAPI,
  dictionaries: Ref<Dictionary[]>,
  localAdd: (item: Dictionary) => void
) => {
  const cloud = await dictionaryApi.getAll();
  const local = dictionaries.value;

  const allIds = new Set([...local.map((i) => i.id), ...cloud.map((i) => i.id)]);
  for (const id of allIds) {
    const localItem = local.find((i) => i.id === id);
    const cloudItem = cloud.find((i) => i.id === id);

    if (cloudItem && !localItem) {
      localAdd(cloudItem);
    }

    if (!cloudItem && localItem) {
      await dictionaryApi.create({ ...localItem, userId: authStore.user?.$id });
    }
  }
};

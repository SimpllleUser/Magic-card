import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useDictionaryApi } from '@/features/dictionary/api';
import { useDictionaryCRUD } from '@/features/dictionary/store/crud';
import { useDictionaryCloud } from '@/features/dictionary/store/cloud';
import { useDictionaryComputed } from '@/features/dictionary/store/computed';
import { syncDataBetweenStorages } from '@/features/dictionary/store/sync';

export const useDictionaryStore = defineStore('dictionary', () => {
  const authStore = useAuthStore();
  const dictionaryApi = useDictionaryApi();

  const crud = useDictionaryCRUD();
  const cloud = useDictionaryCloud(authStore, crud);
  const items = computed(() => useDictionaryComputed(crud.data, authStore.user?.$id));

  const syncDataBetweenStoragesData = async () => {
    await syncDataBetweenStorages(authStore, dictionaryApi, crud.data, crud.add);
  };

  return {
    ...crud,
    ...cloud,
    items,
    syncDataBetweenStoragesData
  };
});

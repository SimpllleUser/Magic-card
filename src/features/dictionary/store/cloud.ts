import { DictionaryApi, setActionsStrategy } from '@/features/dictionary';
import type { EntityAPI } from '@/shared/index/types';
import { Dictionary, DictionaryCRUD } from '../model/types';
import { AuthStore } from '@/features/auth/model/auth';

export const useDictionaryCloud = (authStore: AuthStore, crudMethods: DictionaryCRUD) => {
  const dictionaryApi = new DictionaryApi();
  const actionsStrategy = setActionsStrategy(authStore.isAuthenticated);

  const createWithCloud = (dictionary: EntityAPI<Dictionary> | Dictionary) =>
    actionsStrategy({ dictionary, localAction: crudMethods.create, cloudAction: dictionaryApi.create });

  const updateWithCloud = (dictionary: EntityAPI<Dictionary> | Dictionary) =>
    actionsStrategy({ dictionary, localAction: crudMethods.update, cloudAction: dictionaryApi.update });

  const removeWithCloud = async (dictionary: Dictionary) => {
    crudMethods.remove(dictionary.id);
    if (dictionary?.$id && authStore.isAuthenticated) {
      await dictionaryApi.remove(dictionary?.$id);
    }
  };

  return { createWithCloud, updateWithCloud, removeWithCloud };
};

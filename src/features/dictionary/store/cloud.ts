import { setActionsStrategy } from '../model/ActionDictionaryStrategy';
import { useDictionaryApi } from '../api';
import type { EnitityAPI } from '@/shared/index/types';
import { Dictionary, DictionaryCRUD } from '../model/types';
import { AuthStore } from '@/stores/auth';

export const useDictionaryCloud = (authStore: AuthStore, crudMethods: DictionaryCRUD) => {
  const dictionaryApi = useDictionaryApi();
  const actionsStrategy = setActionsStrategy(authStore.isAuthenticated);

  const createWithCloud = (dictionary: EnitityAPI<Dictionary> | Dictionary) =>
    actionsStrategy({ dictionary, localAction: crudMethods.create, cloudAction: dictionaryApi.create });

  const updateWithCloud = (dictionary: EnitityAPI<Dictionary> | Dictionary) =>
    actionsStrategy({ dictionary, localAction: crudMethods.update, cloudAction: dictionaryApi.update });

  const removeWithCloud = async (dictionary: Dictionary) => {
    crudMethods.remove(dictionary.id);
    if (dictionary?.$id && authStore.isAuthenticated) {
      await dictionaryApi.remove(dictionary?.$id);
    }
  };

  return { createWithCloud, updateWithCloud, removeWithCloud };
};

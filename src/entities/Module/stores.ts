import { defineStore } from 'pinia';
import { IModule } from './types';
import { useCRUD } from 'src/shared/lib/use/useCRUD';

const CONFIG = {
  ID: 'modules',
  LS_KEY: 'modules'
};

export const useModulesStore = defineStore(CONFIG.ID, () => {
  const moduleCrud = useCRUD<IModule>([], { key: CONFIG.LS_KEY, returnAsObject: true });

  return { ...moduleCrud, modules: moduleCrud.data };
});

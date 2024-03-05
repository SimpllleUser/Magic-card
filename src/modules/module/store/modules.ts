import { defineStore } from 'pinia';
import { IModule } from '../types';
import { useCRUD } from 'src/composables/useCRUD';

export const useModulesStore = defineStore('modules', () => {
  // !TO REPO
  // Може все таки зробити spread через bject
  const [modules, create, read, update, remove] = useCRUD<IModule>([], { key: 'modules' });

  return { modules, create, read, update, remove };
});

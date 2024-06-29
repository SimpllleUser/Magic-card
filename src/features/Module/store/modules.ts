import { defineStore } from 'pinia';
import { IModule } from '../types/module';
import { useCRUD } from 'src/shared/composables/useCRUD';

export const useModulesStore = defineStore('modules', () => {
  // !TO REPO
  // Може все таки зробити spread через bject
  const moduleCrud = useCRUD<IModule>([], { key: 'modules', returnAsObject: true });

  return { ...moduleCrud, modules: moduleCrud.data };
});

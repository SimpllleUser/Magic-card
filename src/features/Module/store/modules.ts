import { defineStore } from 'pinia';
import { useCRUD } from 'src/shared/lib/use/useCRUD';
import { IModule } from 'src/entities/Module';

/// DEPRECATED
export const useModulesStore = defineStore('modules', () => {
  const moduleCrud = useCRUD<IModule>([], { key: 'modules', returnAsObject: true });

  return { ...moduleCrud, modules: moduleCrud.data };
});

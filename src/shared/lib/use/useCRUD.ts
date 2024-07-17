import { ref, Ref } from 'vue';
import _ from 'lodash';
import { generateId } from 'src/helpers/id-generator';
import { EntityUnform } from 'src/boot/types';
import { useLocalStorage } from '@vueuse/core';

interface CrudItem {
  id: string;
}

interface IUseCrudConfig {
  key?: string;
  returnAsObject?: boolean;
}

// Function overloads declaration
export function useCRUD<T extends CrudItem>(
  initialValue: Array<T>,
  config: IUseCrudConfig & { returnAsObject: true }
): {
  data: Ref<T[]>;
  create: (item: Required<EntityUnform<T>>) => void;
  read: () => T[];
  update: (updatedItem: Partial<T>) => void;
  remove: (id: string) => void;
  getById: (id: string) => T | undefined;
};

export function useCRUD<T extends CrudItem>(
  initialValue: Array<T>,
  config?: IUseCrudConfig
): [
  Ref<T[]>,
  (item: Required<EntityUnform<T>>) => void,
  () => T[],
  (updatedItem: Partial<T>) => void,
  (id: string) => void,
  (id: string) => T | undefined
];

// Implementation of the function
export function useCRUD<T extends CrudItem>(initialValue: Array<T> = [], config?: IUseCrudConfig): any {
  const data: Ref<Array<T>> = config?.key ? useLocalStorage(config.key, initialValue) : ref(initialValue);

  const create = (item: Required<EntityUnform<T>>): void => {
    data.value.push({ ...item, id: generateId() });
  };

  const read = (): T[] => {
    return _.cloneDeep(data.value);
  };

  const update = (updatedItem: Partial<T> & { id: string }) => {
    const index = _.findIndex(data.value, { id: updatedItem.id });
    if (index !== -1) {
      data.value[index] = _.merge({}, data.value[index], updatedItem);
    }
  };

  const remove = (id: string) => {
    _.remove(data.value, { id });
  };

  const getById = (id: string): T | undefined => _.find(data.value, { id });

  if (config?.returnAsObject) {
    return { data, create, read, update, remove, getById };
  }

  return [data, create, read, update, remove, getById];
}

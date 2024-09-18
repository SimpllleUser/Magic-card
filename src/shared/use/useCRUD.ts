import { ref, Ref } from 'vue';
import _ from 'lodash';
import { useLocalStorage } from '@vueuse/core';
import { Entity, WithoutId } from '@/core/models';
import { generateId } from '@/shared/utils/id-generate';

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
  data: Ref<Entity<T>[]>;
  create: (item: Required<WithoutId<T>>) => void;
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
  (item: Required<WithoutId<T>>) => void,
  () => T[],
  (updatedItem: Partial<T>) => void,
  (id: string) => void,
  (id: string) => T | undefined
];

// Implementation of the function
export function useCRUD<T extends CrudItem>(initialValue: Array<T> = [], config?: IUseCrudConfig): any {
  const data: Ref<Array<T>> = config?.key ? useLocalStorage(config.key, initialValue) : ref(initialValue);

  const create = (item: Required<WithoutId<T>>): void => {
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

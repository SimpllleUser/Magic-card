import { ref, Ref } from 'vue';
import _ from 'lodash';
import { generateId } from 'src/helpers/id-generator';
import { EntityUnform } from 'boot/types';
import { useLocalStorage } from '@vueuse/core';

interface CrudItem {
  id: string;
}

export function useCRUD<T extends CrudItem>(initialValue: Array<T> = [], key?: string) {
  const data: Ref<T[]> = key ? useLocalStorage(key, initialValue) : ref(initialValue);

  const create = (item: Required<EntityUnform<T>>): void => {
    data.value.push({ ...item, id: generateId() });
  };

  const read = (): T[] => {
    return _.cloneDeep(data.value);
  };

  const update = (updatedItem: Partial<T>) => {
    const index = _.findIndex(data.value, { id: updatedItem.id });

    if (index !== -1) {
      data.value[index] = _.merge({}, data.value[index], updatedItem);
    }
  };

  const remove = (id: string) => {
    _.remove(data.value, { id });
  };

  return [data, create, read, update, remove];
}

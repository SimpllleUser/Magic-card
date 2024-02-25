import { ref, Ref } from 'vue';
import _ from 'lodash';
import { generateId } from 'src/helpers/id-generator';
import { EntityUnform } from 'boot/types';

interface CrudItem {
  id: string;
}

export function useCRUD<T extends CrudItem>(initialValue: Array<T> = []) {
  const data: Ref<T[]> = ref(initialValue);

  const create = (item: Required<EntityUnform<T>>): void => {
    data.value.push({ ...item, id: generateId() });
  };

  const read = (): T[] => {
    return _.cloneDeep(data.value);
  };

  const update = (id: string, updatedItem: Partial<T>) => {
    const index = _.findIndex(data.value, { id });

    if (index !== -1) {
      data.value[index] = _.merge({}, data.value[index], updatedItem);
    }
  };

  const remove = (id: string) => {
    _.remove(data.value, { id });
  };

  return [data, create, read, update, remove];
}

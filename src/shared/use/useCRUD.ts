import { ref, Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { EntityWithId, OptionalId } from '@/core/models';
import { generateId } from '@/shared/utils/id-generate';

interface EntityId {
  id: string;
}

interface IUseCrudConfig {
  key?: string;
  returnAsObject?: boolean;
}

export type UseCrud<T> = {
  data: Ref<EntityWithId<T>[]>;
  create: (item: Required<OptionalId<T>>) => T;
  add: (item: Required<OptionalId<T>>) => T;
  read: () => T[];
  update: (updatedItem: Partial<T>) => void;
  remove: (id: string) => void;
  getById: (id: string) => T | undefined;
};

function findIndexById<T extends EntityId>(items: T[], id: string): number {
  return items.findIndex((item) => item.id === id);
}

function mergeItem<T>(original: T, updates: Partial<T>): T {
  return { ...original, ...updates };
}

function removeById<T extends EntityId>(items: T[], id: string): T[] {
  return items.filter((item) => item.id !== id);
}

function findById<T extends EntityId>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

export function useCRUD<T extends EntityId>(
  initialValue: T[],
  config: IUseCrudConfig & { returnAsObject: true }
): UseCrud<T>;

export function useCRUD<T extends EntityId>(
  initialValue: T[],
  config?: IUseCrudConfig
): [
  Ref<T[]>,
  (item: Required<OptionalId<T>>) => T,
  () => T[],
  (updatedItem: Partial<T>) => void,
  (id: string) => void,
  (id: string) => T | undefined
];

// Implementation
export function useCRUD<T extends EntityId>(initialValue: T[] = [], config?: IUseCrudConfig): any {
  const items: Ref<T[]> = config?.key ? useLocalStorage(config.key, initialValue) : ref(initialValue);

  const add = (item: T) => {
    items.value.push(item);
  };

  const create = (item: Required<OptionalId<T>>): T => {
    const newItem = { ...item, id: generateId() };
    add(newItem);
    return newItem;
  };

  const read = (): T[] => JSON.parse(JSON.stringify(items.value));

  const update = (updatedItem: EntityWithId<T>): void => {
    const index = findIndexById(items.value, updatedItem.id);
    if (index !== -1) {
      items.value[index] = mergeItem(items.value[index], updatedItem);
    }
  };

  const remove = (id: string): void => {
    items.value = removeById(items.value, id);
  };

  const set = (values: T[]): void => {
    items.value = values;
  }

  const getById = (id: string): T | undefined => findById(items.value, id);

  if (Boolean(config?.returnAsObject)) {
    return { data: items, create, add, read, update, remove, getById, set };
  }

  return [items, create, add, read, update, remove, getById, set];
}

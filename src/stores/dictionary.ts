import { defineStore } from 'pinia';
import { Dictionary, } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems, mappedDictionaryOfDictionary } from '@/features/dictionary/model/utils';

const MOCK = [
  {
    id: '1',
    title: 'Object One',
    description: 'This is the description for Object One.'
  },
  {
    id: '2',
    title: 'Object Two',
    description: 'This is the description for Object Two.'
  },
  {
    id: '3',
    title: 'Object Three',
    description: 'This is the description for Object Three.'
  },
  {
    id: '4',
    title: 'Object Four',
    description: 'This is the description for Object Four.'
  },
  {
    id: '5',
    title: 'Object Five',
    description: 'This is the description for Object Five.'
  }
];

export const useDictionaryStore = defineStore('dictionary', () => {
  const dictionaryCrud = useCRUD<Dictionary>(MOCK, { key: 'dictionarys', returnAsObject: true });

  const items = computed(() => dictionaryCrud.data);

  return {
    ...dictionaryCrud,
    update: (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary)),
    create: (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary)),
    items: items.value
  };
});

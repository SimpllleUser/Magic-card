import { defineStore } from 'pinia';
import { Dictionary, } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryOfTopic } from '@/features/dictionary/model/utils';

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
  const topicCrud = useCRUD<Dictionary>(MOCK, { key: 'topics', returnAsObject: true });

  const items = computed(() => topicCrud.data);

  return {
    ...topicCrud,
    update: (dictionary: Dictionary) => topicCrud.update(mappedDictionaryOfTopic(dictionary)),
    create: (dictionary: Dictionary) => topicCrud.create(mappedDictionaryOfTopic(dictionary)),
    items: items.value
  };
});

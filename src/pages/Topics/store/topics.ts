import { defineStore } from 'pinia';
import { Topic } from '@/core/models/Topic';

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

export const useTopicsStore = defineStore('topics', () => {
  const items = ref<Array<Topic>>(MOCK);

  return {
    items
  };
});

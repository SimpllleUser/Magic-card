import { defineStore } from 'pinia';
import { Dictionary } from '@/features/dictionary/model/types';
import { useCRUD } from '@/shared/use/useCRUD';
import { mappedDictionaryItems } from '@/features/dictionary/model/utils';

export const useDictionaryStore = defineStore('dictionary', () => {
  const dictionaryCrud = useCRUD<Dictionary>([], { key: 'dictionarys', returnAsObject: true });

  const items = computed(() => dictionaryCrud.data);

  return {
    ...dictionaryCrud,
    update: (dictionary: Dictionary) => dictionaryCrud.update(mappedDictionaryItems(dictionary)),
    create: (dictionary: Dictionary) => dictionaryCrud.create(mappedDictionaryItems(dictionary)),
    items: items.value
  };
});

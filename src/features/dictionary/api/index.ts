import { ApiService } from '@/shared/api';
import {
  Dictionary,
  DictionaryApiData,
  DictionaryAPIWithStringItems,
  DictionaryWithItemsString,
  useDictionaryAPI
} from '../model/types';

const serialize = (dictionary: Dictionary): Dictionary & { items: string } => ({
  ...dictionary,
  items: JSON.stringify(dictionary.items)
});
const deserialize = (dictionary: DictionaryAPIWithStringItems): DictionaryApiData => ({
  ...dictionary,
  items: dictionary?.items ? JSON.parse(dictionary?.items) : []
});

const apiService = new ApiService({
  dbId: import.meta.env.VITE_DB_ID,
  collectionId: import.meta.env.VITE_DICTIONARY_COLLECTION_ID
});

export function useDictionaryApi(): useDictionaryAPI {
  const create = async (dictionary: Dictionary) => {
    const result = await apiService.create<DictionaryWithItemsString>(serialize(dictionary));
    return deserialize(result);
  };

  const update = async (dictionary: DictionaryApiData): Promise<DictionaryApiData> => {
    const res = await apiService.update<DictionaryWithItemsString>(serialize(dictionary));
    return deserialize(res);
  };

  const getAll = async (userId: string): Promise<DictionaryApiData[]> => {
    const res = await apiService.getAll<DictionaryWithItemsString>(userId);
    return res.map(deserialize);
  };

  const remove = async (id: string): Promise<unknown> => {
    return apiService.remove(id);
  };

  return {
    create,
    update,
    remove,
    getAll
  };
}

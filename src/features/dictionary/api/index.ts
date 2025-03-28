import { ApiService } from '@/shared/api';
import { Dictionary } from '../model/types';
import { EnitityAPI } from '@/shared/index/types';

type DictionaryWithItemsString = Dictionary & { items: string };
type DictionaryAPIWithStringItems = EnitityAPI<DictionaryWithItemsString>;
type DictionaryApiData = EnitityAPI<Dictionary>;

const serialize = (dictionary: Dictionary): Dictionary & { items: string } => ({
  ...dictionary,
  items: JSON.stringify(dictionary.items)
})
const deserialize = (dictionary: DictionaryAPIWithStringItems): DictionaryApiData => ({
  ...dictionary,
  items: dictionary?.items ? JSON.parse(dictionary?.items) : []
});

const apiService = new ApiService({
  dbId: import.meta.env.VITE_DB_ID,
  collectionId: import.meta.env.VITE_DICTIONARY_COLLECTION_ID
})

export function useDictionaryApi(): {
  create: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  update: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  getAll: () => Promise<DictionaryApiData[]>;
  remove: () => Promise<unknown>;
} {
  const create = async (dictionary: Dictionary) => {
    const result = await apiService.create<DictionaryWithItemsString>(serialize(dictionary));
    return deserialize(result);
  };

  const update = async (dictionary: DictionaryApiData): Promise<DictionaryApiData> => {
    const res = await apiService.update<DictionaryWithItemsString>(serialize(dictionary))
    return deserialize(res);
  };

  const getAll = async (): Promise<DictionaryApiData[]> => {
    const res = await apiService.getAll<DictionaryWithItemsString>()
    return res.map(deserialize);
  };

  const remove = async (id: string): Promise<unknown> => {
    const res = await apiService.remove(id);
    return res
  };

  return {
    create,
    update,
    remove,
    getAll
  };
}

import { database, ID } from '@/shared/api';
import { Dictionary } from '../model/types';
import { EnitityAPI } from '@/shared/index/types';
import { omit } from 'lodash';

type DictionaryWithItemsString = Dictionary & { items: string };
type DictionaryAPIWithStringItems = EnitityAPI<DictionaryWithItemsString>;
type DictionaryApiData = EnitityAPI<Dictionary>;

const serialize = (dictionary: Dictionary): Dictionary & { items: string } => {
  return {
    /// TODO make this logic in main service api
    ...omit(dictionary, ['$databaseId', '$collectionId']),
    items: JSON.stringify(dictionary.items)
  };
};

const deserialize = (dictionary: DictionaryAPIWithStringItems): DictionaryApiData => ({
  ...dictionary,
  items: JSON.parse(dictionary.items)
});

export function useDictionaryApi(): {
  save: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  update: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  getAll: () => Promise<DictionaryApiData[]>;
} {
  const save = async (dictionary: Dictionary) => {
    const res = await database.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DICTIONARY_COLLECTION_ID,
      ID.unique(),
      serialize(dictionary)
    );
    return deserialize(res);
  };

  const update = async (dictionary: DictionaryApiData): Promise<DictionaryApiData> => {
    console.log(dictionary, dictionary.$id);
    const res = await database.updateDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DICTIONARY_COLLECTION_ID,
      dictionary.$id,
      serialize(dictionary)
    );
    return deserialize(res);
  };

  const getAll = async (): Promise<DictionaryApiData[]> => {
    const res = await database.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_DICTIONARY_COLLECTION_ID);

    return res.documents.map(deserialize);
  };

  return {
    save,
    update,
    getAll
  };
}

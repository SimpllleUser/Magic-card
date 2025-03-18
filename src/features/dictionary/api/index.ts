import { database, ID } from '@/shared/api';
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
  items: JSON.parse(dictionary.items)
})

export function useDictionaryApi(): { save: (dictionary: Dictionary) => Promise<DictionaryApiData> } {
  const save = async (dictionary: Dictionary) => {
    const res = await database.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DICTIONARY_COLLECTION_ID,
      ID.unique(),
      serialize(dictionary)
    );
    return deserialize(res)
  };

  const getAll = async (): Promise<DictionaryApiData[]> => {
    const res = await database.listDocuments(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DICTIONARY_COLLECTION_ID
    );

    return res.documents.map(deserialize)
  };

  return {
    save,
    getAll,
  };
}

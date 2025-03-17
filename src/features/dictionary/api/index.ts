import { database, ID } from '@/shared/api';
import { Dictionary } from '../model/types';

// const promise = database.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_DICTIONARY_COLLECTION_ID);

export function useDictionaryApi(): { save: (dictionary: Dictionary) => Promise<void> } {
  const save = async (dictionary: Dictionary) => {
    const res = await database.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DICTIONARY_COLLECTION_ID,
      ID.unique(),
      dictionary
    );

    console.log(res);
  };

  return {
    save
  };
}

// promise.then(
//   function (response) {
//     console.log(response);
//     console.log(JSON.parse(JSON.stringify(response.words)));
//   },
//   function (error) {
//     console.log(JSON.parse(JSON.stringify(error)));
//   }
// );

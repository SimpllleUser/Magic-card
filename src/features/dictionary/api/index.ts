import { database } from "@/shared/api";

const promise = database.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_DICTIONARY_COLLECTION_ID);

// promise.then(
//   function (response) {
//     console.log(response);
//     console.log(JSON.parse(JSON.stringify(response.words)));
//   },
//   function (error) {
//     console.log(JSON.parse(JSON.stringify(error)));
//   }
// );

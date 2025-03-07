import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

const promise = databases.createDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_COLLECTION_ID, ID.unique(), {
  title: 'Some title',
  description: 'Some description'
});

promise.then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  }
);

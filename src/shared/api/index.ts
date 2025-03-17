import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

const database = new Databases(client);

export { database, client, ID };

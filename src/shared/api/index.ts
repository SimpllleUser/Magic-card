import { Client, Databases, ID } from 'appwrite';
import { EnitityAPI } from '../index/types';
import { omit } from 'lodash';

const client = new Client();

console.log('VITE_CLOUD_SERVICE_URL', import.meta.env.VITE_CLOUD_SERVICE_URL)
console.log('env',import.meta.env)
client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

const database = new Databases(client);

export { database, client, ID };


export class ApiService {

  dbId: string;
  collectionId: string;

  constructor(data: { dbId: string, collectionId: string }) {
    this.dbId = data.dbId;
    this.collectionId = data.collectionId;
  }

  async create<T extends object>(data: T): Promise<T> {
    const res =  await database.createDocument(this.dbId, this.collectionId, ID.unique(), data);
    return res as T;
  }

  async update<T extends object>(data: EnitityAPI<T>): Promise<T> {
    const res =  await database.updateDocument(this.dbId, this.collectionId, data.$id, this.deserialize(data));
    return res as T;
  }

  async getOne<T extends object>(id: string): Promise<EnitityAPI<T>> {
    const res = await database.getDocument(this.dbId, this.collectionId, id);
    return res as EnitityAPI<T>;
  }

  async getAll<T extends object>(): Promise<EnitityAPI<T>[]> {
    const res = await database.listDocuments(this.dbId, this.collectionId);
    return res.documents as EnitityAPI<T>[];
  }

  async remove(id: string): Promise<{ success: boolean, id: string }> {
    await database.deleteDocument(this.dbId, this.collectionId, id);
    return { success: true, id };
  }

  private deserialize<T extends object>(data: EnitityAPI<T>): T {
    return omit(data, ['$id','$databaseId', '$collectionId']) as T;
  }

}

import { Account, Client, Databases, ID, Query } from 'appwrite';
import { omit } from 'lodash';
import { EntityAPI } from '../index/types';
import { ENTITY_API_KEYS } from './constants';
import { DictionaryCreateDTO } from '@/features/dictionary/model/DictionaryDTO';

const client = new Client();

client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { database, client, ID, account };

export class ApiService {
  dbId: string;
  collectionId: string;

  constructor(data: { dbId: string; collectionId: string }) {
    this.dbId = data.dbId;
    this.collectionId = data.collectionId;
  }

  async create<T extends object>(data: DictionaryCreateDTO): Promise<T> {
    try {
      const res = await database.createDocument(this.dbId, this.collectionId, ID.unique(), data);
      return res as T;
    } catch (error) {
      this.handleError(error, `create document in collection ${this.collectionId}`);
    }
  }

  async update<T extends object>(data: EntityAPI<T>): Promise<T> {
    try {
      const res = await database.updateDocument(this.dbId, this.collectionId, data.$id, this.deserialize(data));
      return res as T;
    } catch (error) {
      this.handleError(error, `update document ${data.$id} in collection ${this.collectionId}`);
    }
  }

  async getOne<T extends object>(id: string): Promise<EntityAPI<T>> {
    try {
      const res = await database.getDocument(this.dbId, this.collectionId, id);
      return res as EntityAPI<T>;
    } catch (error) {
      this.handleError(error, `get document ${id} from collection ${this.collectionId}`);
    }
  }

  async getAll<T extends object>(userId: string): Promise<EntityAPI<T>[]> {
    try {
      const res = await database.listDocuments(this.dbId, this.collectionId, [Query.equal('userId', userId)]);
      return res.documents as EntityAPI<T>[];
    } catch (error) {
      this.handleError(error, `list documents in collection ${this.collectionId}`);
    }
  }

  async remove(id: string): Promise<{ success: boolean; id: string }> {
    try {
      await database.deleteDocument(this.dbId, this.collectionId, id);
      return { success: true, id };
    } catch (error) {
      this.handleError(error, `delete document ${id} from collection ${this.collectionId}`);
    }
  }

  private deserialize<T extends object>(data: EntityAPI<T>): T {
    return omit(data, ENTITY_API_KEYS) as T;
  }

  private handleError(error: unknown, context: string): never {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = {
      context,
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
      timestamp: new Date().toISOString()
    };
    console.log('[ApiService Error]', JSON.parse(JSON.stringify(errorDetails, null, 2)));
    throw new Error(`Failed in ${context}: ${errorMessage}`);
  }
}

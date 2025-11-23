import { EntityApiFields } from '@/shared';
import { Client, Databases, ID, Query } from 'appwrite';

export class AppwriteCrudService<T extends EntityApiFields> {
  private client: Client;
  protected readonly databaseId: string;
  protected readonly collectionId: string;
  protected databases: Databases;

  constructor(collectionId: string) {
    this.client = new Client()
      .setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL)
      .setProject(import.meta.env.VITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    this.databaseId = import.meta.env.VITE_DB_ID;
    this.collectionId = collectionId;
  }

  async getByFields(fields: Partial<T>) {
    const queries = Object.entries(fields).map(([key, value]) => {
      return Query.equal(key, value as string | number | boolean);
    });
    return await this.databases.listDocuments<T>(this.databaseId, this.collectionId, queries);
  }

  async create(data: Omit<T, '$id' | '$createdAt' | '$updatedAt'>) {
    return this.databases.createDocument<T>(this.databaseId, this.collectionId, ID.unique(), data);
  }

  async getById(id: string) {
    return this.databases.getDocument<T>(this.databaseId, this.collectionId, id);
  }

  async update(id: string, data: Partial<T>) {
    return this.databases.updateDocument<T>(this.databaseId, this.collectionId, id, data);
  }

  async delete(id: string) {
    return this.databases.deleteDocument(this.databaseId, this.collectionId, id);
  }

  async getAll(limit = 50) {
    const res = await this.databases.listDocuments<T>(this.databaseId, this.collectionId, [Query.limit(limit)]);
    return res.documents;
  }
}

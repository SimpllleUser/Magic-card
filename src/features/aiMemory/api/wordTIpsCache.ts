import { Client, Databases, ID } from 'appwrite';

export interface WordTipCache {
  $id?: string;
  word: string;
  response: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export class WordTipsCacheService {
  private client: Client;
  private databases: Databases;
  private readonly databaseId: string;
  private readonly collectionId: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL)
      .setProject(import.meta.env.VITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    this.databaseId = import.meta.env.VITE_DB_ID;
    this.collectionId = import.meta.env.VITE_WORDS_TIPS_CACHE;
  }

  /** CREATE */
  async create(data: Omit<WordTipCache, '$id' | '$createdAt' | '$updatedAt'>) {
    return await this.databases.createDocument<WordTipCache>(this.databaseId, this.collectionId, ID.unique(), data);
  }

  /** READ (by id) */
  async getById(id: string) {
    return await this.databases.getDocument<WordTipCache>(this.databaseId, this.collectionId, id);
  }

  /** READ (by word) */
  async getByWord(word: string) {
    const res = await this.databases.listDocuments<WordTipCache>(this.databaseId, this.collectionId, [
      Query.equal('word', word)
    ]);
    return res.documents[0] || null;
  }

  /** UPDATE */
  async update(id: string, data: Partial<WordTipCache>) {
    return await this.databases.updateDocument<WordTipCache>(this.databaseId, this.collectionId, id, data);
  }

  /** DELETE */
  async delete(id: string) {
    return await this.databases.deleteDocument(this.databaseId, this.collectionId, id);
  }

  /** LIST all (optional limit, search) */
  async list(limit = 50) {
    const res = await this.databases.listDocuments<WordTipCache>(this.databaseId, this.collectionId, [
      Query.limit(limit)
    ]);
    return res.documents;
  }
}

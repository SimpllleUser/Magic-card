import { Account, Client, Databases, ID, OAuthProvider } from 'appwrite';
import { omit } from 'lodash';
import { EntityAPI } from '../index/types';
import { ENTITY_API_KEYS } from './constants';

const client = new Client();

client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { database, client, ID };

// Визначення типу пристрою
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Auth service для OAuth
export class AuthService {
  private account: Account;
  private readonly REDIRECT_KEY = 'auth_redirect_url';

  constructor() {
    this.account = account;
  }

  private saveCurrentLocation(): void {
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    sessionStorage.setItem(this.REDIRECT_KEY, currentPath);
  }

  getRedirectUrl(): string {
    const savedUrl = sessionStorage.getItem(this.REDIRECT_KEY);
    sessionStorage.removeItem(this.REDIRECT_KEY);
    return savedUrl || '/';
  }

  async loginWithGoogle(): Promise<void> {
    try {
      this.saveCurrentLocation();

      const successUrl = `${window.location.origin}/auth/success`;
      const failureUrl = `${window.location.origin}/auth/failure`;

      await this.account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
    } catch (error) {
      console.error('Google OAuth login failed:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.account.get();
      return true;
    } catch {
      return false;
    }
  }
}

export class ApiService {
  dbId: string;
  collectionId: string;

  constructor(data: { dbId: string; collectionId: string }) {
    this.dbId = data.dbId;
    this.collectionId = data.collectionId;
  }

  async create<T extends object>(data: T): Promise<T> {
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

  async getAll<T extends object>(): Promise<EntityAPI<T>[]> {
    try {
      const res = await database.listDocuments(this.dbId, this.collectionId);
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

export const authService = new AuthService();
export { account, OAuthProvider };

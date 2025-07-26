import { Client, Databases, ID, Account, OAuthProvider } from 'appwrite';
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

export class AuthService {
  private account: Account;
  private readonly REDIRECT_KEY = 'auth_redirect_url';
  private readonly SESSION_CHECK_KEY = 'auth_session_check';

  constructor() {
    this.account = account;
  }

  private saveCurrentLocation(): void {
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    localStorage.setItem(this.REDIRECT_KEY, currentPath); // Змінено на localStorage
  }

  getRedirectUrl(): string {
    const savedUrl = localStorage.getItem(this.REDIRECT_KEY);
    localStorage.removeItem(this.REDIRECT_KEY);
    return savedUrl || '/';
  }

  async waitForSession(maxAttempts = 15, delay = 1000): Promise<boolean> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const session = await this.account.get();
        console.log(`✅ Session found:`, session);
        return true;
      } catch (error) {
        console.error(`⏳ Waiting for session... attempt ${i + 1}/${maxAttempts}`, error);
        if (i < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    console.error('❌ Session not found after maximum attempts');
    return false;
  }

  async loginWithGoogle(): Promise<void> {
    try {
      this.saveCurrentLocation();
      localStorage.setItem(this.SESSION_CHECK_KEY, 'pending'); // Змінено на localStorage

      const currentPath = encodeURIComponent(
        window.location.pathname + window.location.search + window.location.hash
      );
      const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin; // Додано змінну для базового URL
      const successUrl = isIOS()
        ? `myapp://auth/success?redirect=${currentPath}` // Кастомна схема для iOS
        : `${baseUrl}/auth/success?redirect=${currentPath}`; // Використовуємо базовий URL
      const failureUrl = isIOS()
        ? `myapp://auth/failure`
        : `${baseUrl}/auth/failure`;

      // Перевірка наявної сесії
      const currentSession = await this.account.get().catch(() => null);
      if (currentSession) {
        console.log('✅ Session already exists');
        this.completeAuth();
        window.location.href = this.getRedirectUrl();
        return;
      }

      console.log('Attempting OAuth with successUrl:', successUrl, 'failureUrl:', failureUrl); // Дебагінг
      await this.account.createOAuth2Session(
        OAuthProvider.Google,
        successUrl,
        failureUrl
      );

      if (isIOS()) {
        await this.waitForSession(15, 1000);
      }
    } catch (error) {
      console.error('Google OAuth login failed:', error);
      localStorage.removeItem(this.SESSION_CHECK_KEY);
      throw error;
    }
  }

  async handleOAuthRedirect(): Promise<boolean> {
    if (this.isAuthInProgress()) {
      const sessionFound = await this.waitForSession(15, 1000);
      if (sessionFound) {
        this.completeAuth();
        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect') || this.getRedirectUrl();
        console.log('Redirecting to:', decodeURIComponent(redirectPath));
        window.location.href = decodeURIComponent(redirectPath);
        return true;
      } else {
        console.error('❌ Failed to complete OAuth session');
        this.completeAuth();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
        window.location.href = `${baseUrl}/auth/failure`;
        return false;
      }
    }
    return false;
  }

  isAuthInProgress(): boolean {
    return localStorage.getItem(this.SESSION_CHECK_KEY) === 'pending';
  }

  completeAuth(): void {
    localStorage.removeItem(this.SESSION_CHECK_KEY);
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
    console.log(`[ApiService Error]`, JSON.parse(JSON.stringify(errorDetails, null, 2)));
    throw new Error(`Failed in ${context}: ${errorMessage}`);
  }
}

export const authService = new AuthService();
export { account, OAuthProvider };

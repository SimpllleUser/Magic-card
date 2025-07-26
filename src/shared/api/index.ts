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
const isMobile = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    localStorage.setItem(this.REDIRECT_KEY, currentPath);
  }

  getRedirectUrl(): string {
    const savedUrl = localStorage.getItem(this.REDIRECT_KEY);
    localStorage.removeItem(this.REDIRECT_KEY);
    return savedUrl || '/';
  }

  async waitForSession(maxAttempts = 20, delay = 1500): Promise<boolean> {
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
      localStorage.setItem(this.SESSION_CHECK_KEY, 'pending');

      // Перевірка наявної сесії
      const currentSession = await this.account.get().catch(() => null);
      if (currentSession) {
        console.log('✅ Session already exists');
        this.completeAuth();
        window.location.href = this.getRedirectUrl();
        return;
      }

      const currentPath = encodeURIComponent(
        window.location.pathname + window.location.search + window.location.hash
      );
      const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;

      // Використовуємо однакові URL для всіх платформ
      const successUrl = `${baseUrl}/auth/success?redirect=${currentPath}`;
      const failureUrl = `${baseUrl}/auth/failure`;

      console.log('Attempting OAuth with successUrl:', successUrl, 'failureUrl:', failureUrl);

      // Для мобільних пристроїв використовуємо прямий редирект
      if (isMobile()) {
        console.log('🔀 Mobile device detected, using direct redirect');

        // Зберігаємо стан перед редиректом
        localStorage.setItem('oauth_in_progress', 'true');
        localStorage.setItem('oauth_timestamp', Date.now().toString());

        // Створюємо OAuth сесію та редиректимо
        window.location.href = this.account.createOAuth2Session(
          OAuthProvider.Google,
          successUrl,
          failureUrl
        );
      } else {
        // Для десктопа використовуємо стандартний метод
        console.log('🖥️ Desktop device detected, using standard OAuth');
        await this.account.createOAuth2Session(
          OAuthProvider.Google,
          successUrl,
          failureUrl
        );
      }

    } catch (error) {
      console.error('Google OAuth login failed:', error);
      localStorage.removeItem(this.SESSION_CHECK_KEY);
      localStorage.removeItem('oauth_in_progress');
      localStorage.removeItem('oauth_timestamp');
      throw error;
    }
  }

  async handleOAuthRedirect(): Promise<boolean> {
    console.log('🔄 Handling OAuth redirect...');

    // Перевіряємо чи є OAuth в процесі
    const oauthInProgress = localStorage.getItem('oauth_in_progress');
    const oauthTimestamp = localStorage.getItem('oauth_timestamp');

    // Очищуємо OAuth флаги
    localStorage.removeItem('oauth_in_progress');
    localStorage.removeItem('oauth_timestamp');

    // Перевіряємо чи OAuth не застарілий (максимум 10 хвилин)
    if (oauthTimestamp) {
      const timeDiff = Date.now() - parseInt(oauthTimestamp);
      if (timeDiff > 10 * 60 * 1000) { // 10 хвилин
        console.log('⚠️ OAuth session expired');
        this.completeAuth();
        return false;
      }
    }

    if (this.isAuthInProgress() || oauthInProgress) {
      console.log('🔍 Auth in progress, waiting for session...');

      // Збільшуємо час очікування для мобільних пристроїв
      const maxAttempts = isMobile() ? 25 : 15;
      const delay = isMobile() ? 2000 : 1000;

      const sessionFound = await this.waitForSession(maxAttempts, delay);

      if (sessionFound) {
        console.log('✅ OAuth completed successfully');
        this.completeAuth();

        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect') || this.getRedirectUrl();

        console.log('Redirecting to:', decodeURIComponent(redirectPath));

        // Для мобільних додаємо невеликі затримку перед редиректом
        if (isMobile()) {
          setTimeout(() => {
            window.location.href = decodeURIComponent(redirectPath);
          }, 500);
        } else {
          window.location.href = decodeURIComponent(redirectPath);
        }

        return true;
      } else {
        console.error('❌ Failed to complete OAuth session');
        this.completeAuth();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
        window.location.href = `${baseUrl}/auth/failure`;
        return false;
      }
    }

    console.log('ℹ️ No auth in progress');
    return false;
  }

  isAuthInProgress(): boolean {
    return localStorage.getItem(this.SESSION_CHECK_KEY) === 'pending';
  }

  completeAuth(): void {
    localStorage.removeItem(this.SESSION_CHECK_KEY);
    localStorage.removeItem('oauth_in_progress');
    localStorage.removeItem('oauth_timestamp');
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
      // Очищуємо всі OAuth дані
      localStorage.removeItem(this.SESSION_CHECK_KEY);
      localStorage.removeItem('oauth_in_progress');
      localStorage.removeItem('oauth_timestamp');
      localStorage.removeItem(this.REDIRECT_KEY);
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

  // Додатковий метод для очищення застарілих OAuth даних
  cleanupExpiredAuth(): void {
    const oauthTimestamp = localStorage.getItem('oauth_timestamp');
    if (oauthTimestamp) {
      const timeDiff = Date.now() - parseInt(oauthTimestamp);
      if (timeDiff > 10 * 60 * 1000) { // 10 хвилин
        console.log('🧹 Cleaning up expired OAuth data');
        this.completeAuth();
      }
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

import { has } from 'lodash';

export class LocalStorageService<T = unknown> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.key, serialized);
    } catch (e) {
      console.error(`Error saving "${this.key}" to localStorage`, e);
    }
  }

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error(`Error reading "${this.key}" from localStorage`, e);
      return null;
    }
  }

  remove(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (e) {
      console.error(`Error removing "${this.key}" from localStorage`, e);
    }
  }

  has(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  deepHas(key: string): boolean {
    return has(this.get(), key);
  }

  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }
}

import { DictionaryProgress, StorageAdapter } from '../helpers/types';

export class ProgressStorage {
  constructor(private key: string, private storage?: StorageAdapter) {}

  save(progress: DictionaryProgress) {
    if (!this.storage) return;
    this.storage.setItem(this.key, JSON.stringify(progress));
  }

  load(): DictionaryProgress | null {
    if (!this.storage) return null;
    const raw = this.storage.getItem(this.key);
    return raw ? (JSON.parse(raw) as DictionaryProgress) : null;
  }

  clear() {
    if (!this.storage) return;
    this.storage.removeItem(this.key);
  }
}

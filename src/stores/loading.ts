import { LoadingKeys } from '@/shared';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingKeys: [] as LoadingKeys[]
  }),
  getters: {
    isLoading: (state) => (key: LoadingKeys) => state.loadingKeys.includes(key),
    isLoadings: (state) => (keys: LoadingKeys[]) => keys.some((key) => state.loadingKeys.includes(key))
  },
  actions: {
    _addLoadingKey(key: LoadingKeys) {
      this.loadingKeys.push(key);
    },
    _removeLoadingKey(key: LoadingKeys) {
      this.loadingKeys = this.loadingKeys.filter((k) => k !== key);
    },
    async loadingWrapper<T>(key: LoadingKeys, fn: () => Promise<T>): Promise<T> {
      this._addLoadingKey(key);
      try {
        return await fn();
      } finally {
        this._removeLoadingKey(key);
      }
    }
  }
});

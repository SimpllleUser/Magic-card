import { AppwriteCrudService } from './appwriteCRUD';

export class RemoteCacheStorageService<T> extends AppwriteCrudService<T> {
  constructor() {
    super(import.meta.env.VITE_REMOTE_CACHE);
  }

  async get(key: string): Promise<T | null> {
    return (await this.getByFields({ key }).documents[0]) || null;
  }

  async set(key: string, value: T): Promise<T | null> {
    try {
      const dataByKey = await this.getByFields({ key });
      const existingDoc = dataByKey.documents.length ? dataByKey.documents[0] : null;

      if (existingDoc) {
        const currentArray = existingDoc.value || [];
        const updatedArray = [...currentArray, JSON.stringify(value)];

        await this.databases.updateDocument(this.databaseId, this.collectionId, existingDoc.$id, {
          value: updatedArray
        } as Partial<T>);
      } else {
        await this.create({
          key,
          value: [JSON.stringify(value)]
        });
      }

      return value;
    } catch (error) {
      console.error('Помилка в set:', error);
      return null;
    }
  }
}

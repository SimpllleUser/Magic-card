import { ApiService } from '@/shared/api';
import {
  Dictionary,
  DictionaryApiData,
  DictionaryWithItemsString,
} from '../model/types';
import { useAuthStore } from '@/features/auth/model/auth';
import { DictionaryCreateDTO, DictionaryGetDTO, DictionaryUpdateDTO } from '@/features/dictionary/model/DictionaryDTO';

const apiService = new ApiService({
  dbId: import.meta.env.VITE_DB_ID,
  collectionId: import.meta.env.VITE_DICTIONARY_COLLECTION_ID
});

export class DictionaryApi {
  constructor(private apiService: ApiService) {}

  async create(dictionary: Dictionary) {
    const user = useAuthStore().user;
    const dictionaryParams = new DictionaryCreateDTO(dictionary, user.$id);
    const result = await apiService.create<DictionaryWithItemsString>(dictionaryParams);
    return new DictionaryGetDTO(result);
  }

  async updateDictionary(dictionary: DictionaryApiData): Promise<DictionaryGetDTO> {
    const dictionaryParams = new DictionaryUpdateDTO(dictionary);

    const result = await apiService.update<DictionaryWithItemsString>(dictionaryParams);
    return new DictionaryGetDTO(result);
  }

  async getAll(userId: string) {
    const res = await apiService.getAll<DictionaryWithItemsString>(userId);
    return res.map((item) => new DictionaryGetDTO(item));
  }

  async remove(id: string) {
    return apiService.remove(id);
  }
}

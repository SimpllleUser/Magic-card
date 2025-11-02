import { ApiService } from '@/shared/api';
import { Dictionary, DictionaryApiEntity, DictionaryParamsForUpdate } from '../model/types';
import { useAuthStore } from '@/features/auth/model/auth';
import { DictionaryCreateDTO, DictionaryGetDTO, DictionaryUpdateDTO } from '@/features/dictionary/model/DictionaryDTO';

const _apiService = new ApiService({
  dbId: import.meta.env.VITE_DB_ID,
  collectionId: import.meta.env.VITE_DICTIONARY_COLLECTION_ID
});

export class DictionaryApi {
  // eslint-disable-next-line no-useless-constructor
  constructor(private apiService: ApiService = _apiService) {}

  async create(dictionary: Dictionary) {
    const user = useAuthStore().user;
    const dictionaryParams = new DictionaryCreateDTO(dictionary, user.$id);
    const result = await this.apiService.create<DictionaryApiEntity>(dictionaryParams);
    return new DictionaryGetDTO(result);
  }

  async update(dictionary: DictionaryParamsForUpdate): Promise<DictionaryGetDTO> {
    const dictionaryParams = new DictionaryUpdateDTO(dictionary);

    const result = await this.apiService.update<DictionaryApiEntity>(dictionaryParams);
    return new DictionaryGetDTO(result);
  }

  async getAll(userId: string) {
    const res = await this.apiService.getAll<DictionaryApiEntity>(userId);
    return res.map((item) => new DictionaryGetDTO(item));
  }

  async remove(id: string) {
    return this.apiService.remove(id);
  }
}

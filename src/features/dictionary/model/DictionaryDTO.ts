import {
  BaseDictionary,
  DictionaryItem,
  DictionaryParamsForUpdate,
  IDictionaryBaseDTO,
  IDictionaryCreateDTO,
  IDictionaryGetDTO,
  IDictionaryGetParamsDTO,
  IDictionaryUpdateDTO
} from '@/features/dictionary/model/types';
export class DictionaryBaseDTO implements IDictionaryBaseDTO {
  title: string;
  description: string;
  userId: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;

  constructor(dictionary: DictionaryParamsForUpdate) {
    this.title = dictionary.title;
    this.description = dictionary.description;
    this.$permissions = dictionary.$permissions;
    this.$databaseId = dictionary.$databaseId;
    this.$collectionId = dictionary.$collectionId;
    this.$createdAt = dictionary.$createdAt;
    this.$updatedAt = dictionary.$updatedAt;
    this.userId = dictionary.userId;
  }
}
export class DictionaryUpdateDTO extends DictionaryBaseDTO implements IDictionaryUpdateDTO {
  items: string;
  $id: string;

  constructor(dictionary: DictionaryParamsForUpdate) {
    super(dictionary);
    this.items = this.serializeItems(dictionary.items);
    this.$id = dictionary.id;
  }

  private serializeItems(items: DictionaryItem[]): string {
    return JSON.stringify(items);
  }
}

export class DictionaryCreateDTO implements IDictionaryCreateDTO {
  items: string;
  title: string;
  description: string;
  userId: string;

  constructor(dictionary: BaseDictionary, userId: string) {
    this.title = dictionary.title;
    this.description = dictionary.description;
    this.userId = userId;
    this.items = this.serializeItems(dictionary.items);
  }

  private serializeItems(items: DictionaryItem[]): string {
    return JSON.stringify(items);
  }
}

export class DictionaryGetDTO implements IDictionaryGetDTO {
  items: DictionaryItem[];
  title: string;
  description: string;
  userId: string;
  id: string;
  $permissions: string[];
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;

  constructor(dictionary: IDictionaryGetParamsDTO) {
    this.items = this.serializeItems(dictionary.items);
    this.title = dictionary.title;
    this.description = dictionary.description;
    this.userId = dictionary.userId;
    this.id = dictionary.$id;
    this.$permissions = dictionary.$permissions;
    this.$createdAt = dictionary.$createdAt;
    this.$updatedAt = dictionary.$updatedAt;
    this.$databaseId = dictionary.$databaseId;
    this.$collectionId = dictionary.$collectionId;
  }

  private serializeItems(items: string): DictionaryItem[] {
    return items.trim().length ? JSON.parse(items) : [];
  }
}

import {
  BaseDictionary,
  Dictionary,
  DictionaryItem,
  DictionaryParamsForUpdate,
  IDictionaryBaseDTO,
  IDictionaryCreateDTO,
  IDictionaryGetDTO,
  IDictionaryUpdateDTO
} from '@/features/dictionary/model/types';
import { EntityAPI } from '@/shared/index/types';

export class DictionaryBaseDTO implements IDictionaryBaseDTO {
  title: string;
  description: string;
  userId?: string | undefined;
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
    return items.map((item) => JSON.stringify(item)).join(',');
  }
}

export class DictionaryCreateDTO implements IDictionaryCreateDTO {
  items: string;
  title: string;
  description: string;
  userId: string;

  constructor(dictionary: Required<BaseDictionary>) {
    this.title = dictionary.title;
    this.description = dictionary.description;
    this.userId = dictionary.userId;
    this.items = this.serializeItems(dictionary.items);
  }

  private serializeItems(items: DictionaryItem[]): string {
    return items.map((item) => JSON.stringify(item)).join(',');
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

  constructor(dictionary: EntityAPI<Dictionary>) {
    this.items = dictionary.items;
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
}

// export class DictionaryGetDTO {
//   dictionary: EntityAPI<Dictionary> & { id: string };
//
//   constructor(dictionary: EntityAPI<DictionaryWithItemsString>) {
//     this.dictionary = this.serialize(dictionary);
//   }
//
//   serialize(dictionary: EntityAPI<DictionaryWithItemsString>): EntityAPI<Dictionary> {
//     return {
//       ...dictionary,
//       id: dictionary.$id,
//       items: dictionary?.items ? JSON.parse(dictionary?.items) : []
//     };
//   }
// }

import Modals from '@/core/models/modals';
import { EntityWithId, OptionalId } from '@/core/models';
import { EnitityAPI, EntityApiFields } from '@/shared/index/types';

export type DictionaryItem = {
  id: string;
  from: string;
  to: string;
} & Partial<EntityApiFields>;

export type Dictionary = EntityWithId<{
  title: string;
  description: string;
  items: Array<DictionaryItem>;
  userId?: string;
}>;

export interface DictionaryFormProps {
  formData?: Dictionary;
  modalId: Modals.DictionaryUpdate | Modals.DictionaryCreate;
}

export interface DictionaryFormEmits {
  (event: 'submit', payload: Dictionary): void;
}

export type DictionaryCRUD = {
  data: Ref<EntityWithId<Dictionary>[]>;
  create: (item: Required<OptionalId<DictionaryItem>>) => void;
  add: (item: Required<OptionalId<Dictionary>>) => Dictionary;
  read: () => Dictionary[];
  update: (updatedItem: Partial<DictionaryItem>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Dictionary | undefined;
};
export type DictionaryWithItemsString = Dictionary & { items: string };
export type DictionaryAPIWithStringItems = EnitityAPI<DictionaryWithItemsString>;
export type DictionaryApiData = EnitityAPI<Dictionary>;

export type useDictionaryAPI = {
  create: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  update: (dictionary: Dictionary) => Promise<DictionaryApiData>;
  getAll: () => Promise<DictionaryApiData[]>;
  remove: (id: string) => Promise<unknown>;
};

/**
 * Interface representing calculated statistical data for a user.
 * Contains the following metrics:
 * - **IA**: Incorrect answers
 * - **ACC**: Accuracy (%)
 * - **ATQ**: Average Time per Question (seconds)
 * - **WM**: Word Mastery (%)
 * - **ES**: Efficiency Score
 * - **CA**: Correct answers
 */

export interface CalculatedStatistic {
  IA: number;
  ACC: number;
  ATQ: number;
  WM: number;
  ES: number;
  CA: number;
  totalNumberOFAttempts: number;
}

export type DictionaryStatistics = CalculatedStatistic & {
  totalNumberOFAttempts: number;
  id: string;
  dictionaryId: string;
  ts: number;
};

export interface DictionaryStatisticPrams {
  dictionaryId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}

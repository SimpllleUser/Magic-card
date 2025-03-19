import Modals from '@/core/models/modals';
import { Entity } from '@/core/models';
import { EntityApiFields } from '@/shared/index/types';

export type DictionaryItem {
  id: string;
  from: string;
  to: string;
} & Partial<EntityApiFields>



export type Dictionary = Entity<{
  title: string;
  description: string;
  items: Array<DictionaryItem>;
}>;

export interface DictionaryFormProps {
  formData?: Dictionary;
  modalId: Modals.DictionaryUpdate | Modals.DictionaryCreate;
}

export interface DictionaryFormEmits {
  (event: 'submit', payload: Dictionary): void;
}

import Modals from '@/core/models/modals';
import { Entity } from '@/core/models';

export interface DictionaryItem {
  id: string;
  from: string;
  to: string;
}

export type Dictionary = Entity<{
  title: string;
  description: string;
  dictionary: Array<DictionaryItem>; /// TODO replace into items
}>;

export interface DictionaryFormProps {
  formData?: Dictionary;
  modalId: Modals.TopicUpdate | Modals.TopicCreate;
}

export interface DictionaryFormEmits {
  (event: 'submit', payload: Dictionary): void;
}

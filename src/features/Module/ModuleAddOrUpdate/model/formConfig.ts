import { TextInput } from 'base-form/src/shared/ui/inputs';
import input from 'base-form/src/shared/ui/inputs/config';

interface IFormData {
  id: string;
  title: string;
  description: string;
}

export class FormConfig {
  id?: string;
  title: TextInput;
  description: TextInput;

  constructor(data: IFormData) {
    this.id = data?.id || '';
    this.title = input.text({ value: data?.title || '', label: 'Title' });
    this.description = input.textarea({ value: data?.description || '', label: 'Description' });
  }
}

export const useEntity = (data: IFormData) => new FormConfig(data);

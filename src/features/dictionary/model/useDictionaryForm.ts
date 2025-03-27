import { TextareaInput, TextInput } from 'base-form/src/shared/ui/inputs';
import { Dictionary, DictionaryItem } from './types';
import { InputList } from 'base-form/src/shared/ui/inputs/components/input-list/model';
import input from 'base-form/src/shared/ui/inputs/config';
import { useAuthStore } from '@/stores/auth';

const getDefaultDictionaryItem = (
  data?: DictionaryItem = {
    id: '',
    from: '',
    to: ''
  }
) => ({
  id: data?.id || '',
  from: input.text({
    value: data?.from || '',
    label: 'From',
    rules: { required: true }
  }),
  to: input.text({
    value: data?.to || '',
    label: 'To',
    rules: { required: true }
  })
});

const authStore = useAuthStore();

export class DictionaryFormModel {
  id: string;
  userId: string = '';
  title: TextInput;
  description: TextareaInput;
  items: InputList<{ from: TextInput; to: TextInput }>;

  constructor(data?: DictionaryItem) {
    this.id = data?.id || '';
    this.userId = authStore.user?.$id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { required: true }
    });
    this.description = input.textarea({
      value: data?.description || '-',
      label: 'Description',
      rules: { required: true }
    });
    this.items = input.list(data?.items?.map(getDefaultDictionaryItem) || [], getDefaultDictionaryItem());
  }
}

export const useDictionaryForm = (data?: Dictionary) => new DictionaryFormModel(data);

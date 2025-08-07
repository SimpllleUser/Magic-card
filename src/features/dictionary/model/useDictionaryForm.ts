import { TextareaInput, TextInput } from 'base-form/src/shared/ui/inputs';
import { Dictionary, DictionaryItem } from './types';
import { InputList } from 'base-form/src/shared/ui/inputs/components/input-list/model';
import input from 'base-form/src/shared/ui/inputs/config';
import { useAuthStore } from '@/features/auth/model/auth';
import { ActionForm } from 'base-form/src/shared/ui/form';
import { EntityAPI } from '@/shared/index/types';

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
  title: TextInput;
  description: TextareaInput;
  items: InputList<{ from: TextInput; to: TextInput }>;

  constructor(data?: DictionaryItem) {
    this.id = data?.id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { required: true }
    });
    this.description = input.textarea({
      value: data?.description,
      label: 'Description'
    });
    this.items = input.list(data?.items?.map(getDefaultDictionaryItem) || [], getDefaultDictionaryItem());
  }
}

export class DictionaryFormCreateModelAutheduUser extends DictionaryFormModel {
  userId: string;

  constructor(data?: DictionaryItem) {
    super(data);
    this.userId = authStore.user?.id || '';
  }
}

export class DictionaryFormUpdateModelAuthedUser extends DictionaryFormCreateModelAutheduUser {
  $id: string;
  $permissions: string[];
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;

  constructor(data: EntityAPI<DictionaryItem>) {
    super(data);
    this.$id = data.$id;
    this.$permissions = data.$permissions;
    this.$createdAt = data.$createdAt;
    this.$updatedAt = data.$updatedAt;
    this.$databaseId = data.$databaseId;
    this.$collectionId = data.$collectionId;
  }
}

export const useDictionaryForm = (data?: Dictionary | EntityAPI<DictionaryItem>, type?: ActionForm) => {
  if (authStore.isAuthenticated && type === ActionForm.Save) {
    return new DictionaryFormUpdateModelAuthedUser(data);
  }
  if (authStore.isAuthenticated && type === ActionForm.Create) {
    return new DictionaryFormCreateModelAutheduUser(data);
  }
  return new DictionaryFormModel(data);
};

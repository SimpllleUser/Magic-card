import { TextareaInput, TextInput } from 'base-form/src/shared/ui/inputs';
import input from 'base-form/src/shared/ui/inputs/config';
import { DictionaryItem, Topic } from '@/core/models/Topic';
import { InputList } from 'base-form/src/shared/ui/inputs/components/input-list/model';

const templateListDictionary = (data?: DictionaryItem = {}) => ({
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

export class TopicForm {
  id: string;
  title: TextInput;
  description: TextareaInput;
  dictionary: InputList<{ from: TextInput; to: TextInput }>;

  constructor(data?: Topic) {
    this.id = data?.id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { required: true }
    });
    this.description = input.textarea({
      value: data?.description,
      label: 'Description',
      rules: { required: true }
    });
    this.dictionary = input.list(data?.dictionary?.map(templateListDictionary) || [], templateListDictionary());
  }
}

export const useTopicForm = (data?: Topic) => new TopicForm(data);

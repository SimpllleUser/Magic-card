import { TextareaInput, TextInput } from 'base-form/src/shared/ui/inputs';
import input from 'base-form/src/shared/ui/inputs/config';
import { Topic } from '@/core/models/Topic';

export class TopicForm {
  id: string;
  title: TextInput;
  description: TextareaInput;

  constructor(data?: Topic) {
    this.id = data?.id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { required: true, min: 3 }
    });
    this.description = input.textarea({
      value: data?.title,
      label: 'Description',
      rules: { required: true }
    });
  }
}

export const useFormTopic = (data?: Topic) => new TopicForm(data);

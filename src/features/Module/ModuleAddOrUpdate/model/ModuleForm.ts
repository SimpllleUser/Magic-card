import { TextInput } from 'base-form/src/shared/ui/inputs/models';
import input from 'src/shared/ui/InputConfigurator/index';
import { TextareaInput } from 'src/shared/ui/InputConfigurator/models/TextareaInput';
interface FormData {
  id: string;
  title: string;
  description: string;
}

export class ModuleForm {
  id: string;
  title: TextInput;
  description: TextareaInput;
  constructor(data?: FormData) {
    this.id = data?.id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { length: 5 }
    });
    this.description = input.textarea({
      value: data?.title,
      label: 'Description',
      rules: { length: 5 }
    });
  }
}

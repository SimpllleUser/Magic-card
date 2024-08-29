import { TextInput } from 'base-form/src/shared/ui/inputs/models';
import input from 'base-form/src/shared/ui/inputs/models/InputConfigurator';

interface FormData {
  id: string;
  title: string;
  description: string;
}

export class ModuleForm {
  id: string;
  title: TextInput;
  description: TextInput;
  constructor(data?: FormData) {
    this.id = data?.id || '';
    this.title = input.text({
      value: data?.title,
      label: 'Title',
      rules: { length: 5 }
    });
    this.description = input.text({
      value: data?.title,
      label: 'Title',
      rules: { length: 5 }
    });
  }
}

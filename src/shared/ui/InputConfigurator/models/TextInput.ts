import { InputPrams } from 'base-form/src/shared/ui/form/composables';
import { TextInput } from 'base-form/src/shared/ui/inputs/models';
import { TextInput as Component } from 'src/shared/ui/InputConfigurator/components';

export class VTextInput extends TextInput {
  constructor(data?: Partial<InputPrams<string>>) {
    super(data);
    this.component = Component;
  }
}

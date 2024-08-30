import { InputPrams } from 'base-form/src/shared/ui/form/composables';
import { TextInput } from 'base-form/src/shared/ui/inputs/models';
import { TextareaInput as Component } from 'src/shared/ui/InputConfigurator/components';

export type TextareaInputParam = Partial<InputPrams<string> & { isAutogrow: boolean }> & {
  isAutogrow?: boolean;
};

export class TextareaInput extends TextInput {
  isAutogrow: boolean;
  constructor(data?: TextareaInputParam) {
    super(data);
    this.component = Component;
    this.isAutogrow = data?.isAutogrow ?? false;
  }
}

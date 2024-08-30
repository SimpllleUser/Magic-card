import { forOwn } from 'lodash';
import { VTextInput } from 'src/shared/ui/InputConfigurator/models/TextInput';
import { ABaseInput, ListInput } from 'base-form/src/shared/ui/inputs/models';
import { InputPrams } from 'base-form/src/shared/ui/form/composables';
import { TextareaInput, TextareaInputParam } from 'src/shared/ui/InputConfigurator/models/TextareaInput';

type InputDataItem = Record<string, CallableFunction>;

class InputConfigurator<T> {
  private static instance: InputConfigurator<any>;

  private readonly inputs!: T;

  constructor(inputs: T) {
    if (InputConfigurator.instance) {
      return;
    }
    this.inputs = inputs;
    InputConfigurator.instance = this;
  }

  addInput(input: InputDataItem) {
    forOwn(input, (value, key) => {
      InputConfigurator.instance.inputs[key] = value;
    });
  }

  getInputs() {
    return this.inputs;
  }
}

interface InputsOfConfig {
  text: (params?: Partial<InputPrams<string>>) => VTextInput;
  textarea: (params?: TextareaInputParam) => TextareaInput;
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>;
}

const list: InputsOfConfig = {
  text: (params) => new VTextInput(params),
  textarea: (params) => new TextareaInput(params),
  list: (items, defaultItem) => new ListInput(items, defaultItem)
};

const input = new InputConfigurator<InputsOfConfig>(list);

export const { addInput } = input;

export default input.getInputs();

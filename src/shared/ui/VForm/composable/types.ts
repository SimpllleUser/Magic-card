import { ValidationRule } from 'src/shared/lib/use/validation';
import { ComponentTypes } from 'src/shared/ui/VForm';
import { BaseInputOptions } from 'src/shared/ui/VForm/composable/useInput';

type InputItemOfList = Record<string, IBaseInputs<string | boolean | Array<string>>>;

export interface InputParams<T> {
  value: T;
  rules?: Array<ValidationRule>;
  hint?: string;
  label?: string;
}

export interface IBaseInputs<T> extends BaseInputOptions<T> {
  value: T;
  component: ComponentTypes;
  rules?: Array<ValidationRule>;
  _rules?: Array<ValidationRule>;
  hint?: string;
  label?: string;
}

export interface InputListParams<InputConfig> {
  config: Record<string, IBaseInputs<InputConfig>>;
  value: Array<InputItemOfList>;
}

export interface InputListConfig<InputConfig, InputValue>
  extends InputListParams<InputConfig>,
    BaseInputOptions<InputValue> {
  component: ComponentTypes.FormInputList;
  getValue: () => InputValue;
  activateValidation: (canShowError: boolean) => void;
}

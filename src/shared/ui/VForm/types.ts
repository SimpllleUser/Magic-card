import { QCheckboxProps, QInputProps, QSelectProps } from 'quasar';
import { ValidationRule } from 'src/shared/composables/validation';

export type InputValueBase = string | number | boolean;
export type InputValue = InputValueBase | Array<InputValueBase> | Record<string, InputValueBase>;

export enum ComponentTypes {
  Input = 'Input',
  Select = 'Select',
  Checkbox = 'Checkbox',
  FormInputList = 'FormInputList'
}

export interface IFormInput {
  value: unknown;
  label: string;
  getValue: () => unknown;
  isValid: (validation: CallableFunction) => boolean;
  activateValidation: (allowActivateValidation: boolean) => void;
  component: ComponentTypes;
  rules?: Array<ValidationRule>;
  _rules?: Array<ValidationRule>;
}

export type FormConfig = Record<string, IFormInput>;

export type UseFormParams = {
  formConfig: FormConfig;
};

export type FormInputProps = Pick<Partial<QInputProps | QCheckboxProps | QSelectProps>, 'onUpdate:modelValue'> &
  Required<{
    value: InputValue;
    label: string;
    rules?: Array<ValidationRule>;
  }>;

export type IUseFormInput = FormInputProps & { component: ComponentTypes; error?: string };

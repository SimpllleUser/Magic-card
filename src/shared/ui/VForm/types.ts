import { QCheckboxProps, QInputProps, QSelectProps } from 'quasar';
import { ValidationRule } from './validation/rules';

export type IUseFormInput = FormInputProps & { component: ComponentTypes; error?: string };

export type FormInputProps = Pick<Partial<QInputProps | QCheckboxProps | QSelectProps>, 'onUpdate:modelValue'> &
  Required<{
    value: InputValue;
    label: string;
    rules?: Array<ValidationRule>;
  }>;

export type InputValueBase = string | number | boolean;
export type InputValue = InputValueBase | Array<InputValueBase> | Record<string, InputValueBase>;

export enum ComponentTypes {
  Input = 'Input',
  Select = 'Select',
  Checkbox = 'Checkbox',
  FormInputList = 'FormInputList'
}

export enum ActionForm {
  Create,
  Edit
}

export type SimpleValueTypes = string | number | boolean;

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

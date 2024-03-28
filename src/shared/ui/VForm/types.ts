import { ValidationRule } from 'src/components/VForm/types';

export type SimpleValueTypes = string | number | boolean;

export interface IFormInput {
  value: unknown;
  getValue: () => unknown;
  isValid: (validation: CallableFunction) => boolean;
  activateValidation: (allowActivateValidation: boolean) => void;
  component: unknown;
  rules?: Array<ValidationRule>;
  _rules?: Array<ValidationRule>;
}

export type FormConfig = Record<string, IFormInput>;

export type UseFormParams = {
  formConfig: FormConfig;
};

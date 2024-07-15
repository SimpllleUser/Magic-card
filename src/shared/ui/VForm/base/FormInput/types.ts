import { ValidationRule } from 'src/shared/composables/validation';
import { ComponentTypes } from 'src/shared/ui/VForm';

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

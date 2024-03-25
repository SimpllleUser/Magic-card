import { ValidationRule } from 'src/components/VForm/types';

export type SimpleValueTypes = string | number | boolean;
// type NotSimpleValueType = SimpleValueTypes | Array<NotSimpleValueType> | Record<string, NotSimpleValueType>;

export enum FormInputTypes {
  Input = 'Input',
  Check = 'Checkbox',
  Select = 'Select',
  InputList = 'FormInputList'
}

export type SimpleFormInputType =
  | FormInputTypes.Input
  | FormInputTypes.Check
  | FormInputTypes.Select
  | FormInputTypes.InputList;

export type SimpleFormInputConfig = {
  component: SimpleFormInputConfig;
  value: SimpleFormInputType extends FormInputTypes.Input
    ? string
    : SimpleFormInputType extends FormInputTypes.Check
    ? boolean
    : SimpleFormInputType extends FormInputTypes.Select
    ? string | Array<string>
    : SimpleFormInputType extends FormInputTypes.InputList
    ? Array<Record<string, SimpleFormInputConfig>>
    : never;
  label: string;
  rules?: Array<ValidationRule>;
  _rules?: Array<ValidationRule>;
};

export type UseFormParams = {
  formConfig: Record<string, SimpleFormInputConfig>;
};

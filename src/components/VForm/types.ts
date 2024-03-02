import { Ref } from 'vue';
import { QCheckboxProps, QInputProps, QSelectProps } from 'quasar';

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
  Checkbox = 'Checkbox'
}
export enum ActionForm {
  Create,
  Edit
}

type SelectValue = string | Record<string, unknown>;
type BaseInput<T> = { value: T; rules: Array<ValidationRule>; label?: string; hint?: string; error?: string };
type BaseForm<T> = T & { value: Ref<T>; error?: string };

export type InputItem = BaseInput<string>;
export type SelectItem = BaseInput<SelectValue> & { options: Array<unknown> };
export type CheckItem = BaseInput<boolean>;
export type InputList = Array<InputItemConfig>;

export type InputItemConfig = InputItem | SelectItem | CheckItem | InputList;

export type FormInputItem = BaseForm<InputItem>;
export type FormSelectItem = BaseForm<SelectItem>;
export type FormCheckItem = BaseForm<CheckItem>;
export type FormItemList = Array<FormItemConfig>;

export type FormItemConfig = FormInputItem | FormSelectItem | FormCheckItem | FormItemList;

export type FormDataValue = Record<string, number | string | Array<FormDataValue>>;

export enum ValidationRule {
  After = 'after',
  Alpha = 'alpha',
  AlphaDash = 'alpha_dash',
  AlphaNum = 'alpha_num',
  AlphaSpaces = 'alpha_spaces',
  Before = 'before',
  Between = 'between',
  Confirmed = 'confirmed',
  CreditCard = 'credit_card',
  DateBetween = 'date_between',
  Decimal = 'decimal',
  Digits = 'digits',
  Image = 'image',
  Included = 'included',
  Integer = 'integer',
  IP = 'ip',
  IPOrFQDN = 'ip_or_fqdn',
  Is = 'is',
  IsNot = 'is_not',
  Length = 'length',
  Max = 'max',
  Min = 'min',
  Mimes = 'mimes',
  Numeric = 'numeric',
  Regex = 'regex',
  Required = 'required',
  RequiredIf = 'required_if',
  Size = 'size',
  URL = 'url'
}

// export enum InputTypes {
//   Input = 'input',
//   Select = 'select',
//   Checkbox = 'checkbox'
// }

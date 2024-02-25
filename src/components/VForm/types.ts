export enum ActionForm {
  Create,
  Edit
}

type SelectValue = string | Record<string, unknown>;
type BaseInput<T> = { value: T; rules: Array<ValidationRule>; label?: string; hint?: string };
type BaseForm<T> = T & { error: string };

export type InputItem = BaseInput<string>;
export type SelectItem = BaseInput<SelectValue> & { options: Array<unknown> };
export type CheckItem = BaseInput<boolean>;

export type InputItemConfig = InputItem | SelectItem | CheckItem;

export type FormInputItem = BaseForm<InputItem>;
export type FormSelectItem = BaseForm<SelectItem>;
export type FormCheckItem = BaseForm<CheckItem>;

export type FormItemConfig = FormInputItem | FormSelectItem | FormCheckItem;

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

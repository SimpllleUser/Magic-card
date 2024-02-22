type SelectValue = string | Record<string, unknown>;
type BaseInput<T> = { value: T; rules: Array<string> };
type BaseForm<T> = T & { error: string };

export type InputItem = BaseInput<string>;
export type SelectItem = BaseInput<SelectValue> & { options: Array<unknown> };
export type CheckItem = BaseInput<boolean>;

export type InputItemConfig = InputItem | SelectItem | CheckItem;

export type FormInputItem = BaseForm<InputItem>;
export type FormSelectItem = BaseForm<SelectItem>;
export type FormCheckItem = BaseForm<CheckItem>;

export type FormItemConfig = FormInputItem | FormSelectItem | FormCheckItem;

// export enum InputTypes {
//   Input = 'input',
//   Select = 'select',
//   Checkbox = 'checkbox'
// }

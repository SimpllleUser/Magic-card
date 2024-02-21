export type IForm = any;

export type InputItem = { value: unknown; rules: Array<string> };
export type FormInputItem = InputItem & { error: string };

export enum InputTypes {
  Input = 'input',
  Select = 'select',
  Checkbox = 'checkbox'
}

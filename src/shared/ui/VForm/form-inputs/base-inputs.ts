import { ComponentTypes, ValidationRule } from 'components/VForm/types';

export interface ValidationFunction {
  (params: { rules: Array<ValidationRule>; value: string | boolean | Array<string> }): boolean;
}

export interface BaseInputOptions<T> {
  activateValidation(canShowError: boolean): void;
  getValue(): T;
  isValid(functionValidator: ValidationFunction): boolean;
}

interface InputParams<T> {
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

const generateBaseInput =
  <T extends string | boolean | Array<string>>(component: ComponentTypes) =>
  (params: InputParams<T>): IBaseInputs<T> => ({
    ...params,
    label: params?.label ?? '',
    hint: params?.hint ?? '',
    rules: params?.rules ?? [],
    _rules: [],
    component,
    activateValidation: function (canShowError): void {
      if (!this.rules) return;
      this._rules = canShowError ? this.rules : [];
    },
    getValue: function (): T {
      return this.value;
    },
    isValid: function (functionValidator): boolean {
      if (!this.rules?.length) return true;
      return !functionValidator({ rules: this._rules || [], value: this.value });
    }
  });

export const useText = generateBaseInput<string>(ComponentTypes.Input);
export const useCheck = generateBaseInput<boolean>(ComponentTypes.Checkbox);
export const useSelect = generateBaseInput<string | Array<string>>(ComponentTypes.Select);

export type IInputString = IBaseInputs<string>;
export type ICheckBox = IBaseInputs<boolean>;
export type ISelect = IBaseInputs<string | Array<string>>;

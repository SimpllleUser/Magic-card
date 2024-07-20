import { ComponentTypes } from '../types';
import { ValidationRule } from 'src/shared/lib/use/validation';
import { IBaseInputs, InputParams } from 'src/shared/ui/VForm/composable';

export interface ValidationFunction {
  (params: { rules: Array<ValidationRule>; value: string | boolean | Array<string> }): boolean;
}

export interface BaseInputOptions<T> {
  activateValidation(canShowError: boolean): void;
  getValue(): T;
  isValid(functionValidator: ValidationFunction): boolean;
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

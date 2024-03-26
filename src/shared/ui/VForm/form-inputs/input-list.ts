import { has, mapValues } from 'lodash';
import { BaseInputOptions, IBaseInputs } from './base-inputs';
import { ComponentTypes } from 'src/components/VForm/types';

const hasValue = (item: any): boolean => has(item, 'value');

type InputItemOfList = Record<string, IBaseInputs<string | boolean | Array<string>>>;

export interface InputListParams<InputConfig> {
  config: Record<string, IBaseInputs<InputConfig>>;
  value: Array<InputItemOfList>;
}

export interface InputListConfig<InputConfig, InputValue>
  extends InputListParams<InputConfig>,
    BaseInputOptions<InputValue> {
  component: ComponentTypes.FormInputList;
  getValue: () => InputValue;
  activateValidation: (canShowError: boolean) => void;
}

export const useInputList = <InputConfig, InputValue>(
  params: InputListParams<InputConfig>
): InputListConfig<InputConfig, InputValue> => ({
  ...params,
  component: ComponentTypes.FormInputList,
  activateValidation: function (canShowError: boolean): void {
    this.value.forEach((inputListItem: InputItemOfList) => {
      return mapValues(inputListItem, (input) => {
        if (!has(input, 'rules')) return;
        return input.activateValidation(canShowError);
      });
    });
  },

  getValue(): Array<InputValue> {
    return this.value.map((inputListItem: InputItemOfList) =>
      mapValues(inputListItem, (input) => (hasValue(input) ? (input.getValue() as InputValue) : input))
    ) as InputValue[];
  },
  isValid: function (functionValidator): boolean {
    return this.value.every((inputListItem: InputItemOfList) =>
      Object.values(inputListItem)
        .filter(hasValue)
        .every((input) => {
          return input.isValid(functionValidator);
        })
    );
  }
});

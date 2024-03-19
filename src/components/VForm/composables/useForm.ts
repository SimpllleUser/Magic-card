import { ComputedRef, computed, ref, watch, watchEffect } from 'vue';
import { cloneDeep, mapValues, isArray } from 'lodash';
import { useValidation } from 'components/VForm/composables/useValidation';
import { CallbackFunction } from 'boot/types';
import { BaseFormItemConfig, ValidationRule } from '../types';
import { BaseType } from 'typescript';

interface InputParams {
  value: BaseFormItemConfig;
  rules?: Array<ValidationRule>;
  label?: string | undefined;
  hint?: string | undefined;
  _rules?: Array<ValidationRule>;
}

type InputValue = Record<string, BaseType>;

type FormData = Record<string, InputParams>;

type FormConfig = Record<string, InputParams>;

interface FormActions {
  onSubmit?: CallbackFunction;
  onReset?: CallbackFunction;
}

interface FormComputed<T> {
  formDataValue: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
}

export function useForm<T>(initialFormConfig: FormConfig): FormActions & FormComputed<T> {
  const canShowError = ref(false);
  const formData = ref<FormData>(getInitDataForm(initialFormConfig));

  const activateRulesInForm = () => {
    for (const key in formData.value) {
      const item = formData.value[key];
      if (isArray(item.value)) {
        item.value = item.value.map((inputItem: BaseFormItemConfig) => {
          return mapValues(inputItem, (item) => {
            if (typeof item !== 'object') return item;
            return {
              ...item,
              _rules: canShowError.value ? item?.rules : []
            };
          });
        });
      } else if (item.rules) {
        item._rules = canShowError.value ? item.rules : [];
      }
    }
  };

  const onSubmit = (action?: CallbackFunction) => {
    canShowError.value = true;
    activateRulesInForm();
    console.log('Form data:', formData.value);
    action && action();
  };

  const onReset = (action?: CallbackFunction) => {
    canShowError.value = false;
    formData.value = cloneDeep(initialFormConfig);
    action && action();
  };

  const formDataValue = computed(() => {
    return mapValues(formData.value, getInputValue);
  });

  const isValid = computed(() => Object.values(formData.value).every((input: InputParams) => !useValidation(input)));

  watch(() => canShowError.value, activateRulesInForm);
  watchEffect(activateRulesInForm);

  return { formData, onSubmit, onReset, formDataValue, isValid };
}

function getInputParams(inputParams: InputParams): InputParams {
  if (Array.isArray(inputParams)) return inputParams.map(getInputParams);
  if (!Object.keys(inputParams).includes('value')) {
    return inputParams;
  }
  const { value, rules, ...rest } = inputParams;
  return {
    ...rest,
    value: value ?? '',
    rules: rules ?? [],
    label: inputParams.label ?? '',
    hint: inputParams.hint ?? ''
  };
}

function getInputValue<T>(input: InputParams): T | Array<T> {
  if (Array.isArray(input.value)) {
    return input.value.map((item) => mapValues(item, (fieldValues) => fieldValues?.value ?? fieldValues)) as T[];
  }
  const inputValue = input.value ?? input;
  return inputValue as T;
}

function getInitDataForm(initialDataParams: FormConfig): FormData {
  return mapValues(initialDataParams, getInputParams);
}

import { computed, ComputedRef, Ref, ref, watch, watchEffect } from 'vue';
import { cloneDeep, mapValues } from 'lodash';
import { useValidation } from 'components/VForm/composables/useValidation';
import { FormDataValue, FormInputItem, FormItemConfig, InputItemConfig } from '../types';
import { CallbackFunction } from 'boot/types';

export type UseFormResult = {
  formData: Ref<Record<string, FormInputItem>>;
  onSubmit: CallbackFunction;
  onReset: CallbackFunction;
  formDataValue: ComputedRef<Record<string, any>>;
  isValid: ComputedRef<boolean>;
};

const getInputParams = (inputParams: any): FormItemConfig => {
  if (Array.isArray(inputParams)) return inputParams.map(getInputParams);
  if (!Object.keys(inputParams).includes('value')) {
    console.log(inputParams);
    return inputParams;
  }
  return {
    ...inputParams,
    value: ref(inputParams?.value),
    rules: inputParams?.rules || [],
    error: '',
    label: inputParams?.label ?? '',
    hint: inputParams?.hint ?? ''
  };
};

const getInputValue = (input: FormItemConfig): FormDataValue => {
  if (Array.isArray(input.value)) {
    return input.value.map((item) => mapValues(item, (fieldValues) => fieldValues?.value ?? fieldValues));
  }
  return input.value ?? input;
};

const getInitDataForm = (initialDataParams: Record<string, InputItemConfig>) =>
  mapValues(initialDataParams, getInputParams);

export function useForm(initialFormConfig: Record<string, InputItemConfig>): UseFormResult {
  const canShowError = ref(false);

  const formData = ref<Record<string, FormItemConfig>>(getInitDataForm(initialFormConfig));

  const activateRulesInForm = () => {
    for (const key in formData.value) {
      const item = formData.value[key] as any;
      if (Array.isArray(item.value)) {
        item.value = item.value.map((inputItem) => {
          return mapValues(inputItem, (item) => {
            if (typeof item !== 'object') return item;
            return {
              ...item,
              _rules: canShowError.value ? item.rules : []
            };
          });
        });
      }
      if (item?.value) {
        item._rules = canShowError.value ? item.rules : [];
      }
    }
  };

  watch(() => canShowError.value, activateRulesInForm);

  watchEffect(activateRulesInForm);

  const onSubmit = (action?: CallbackFunction) => {
    canShowError.value = true;
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
  const isValid = computed(() => Object.values(formData.value).every((input) => !useValidation(input)));

  return { formData, onSubmit, onReset, formDataValue, isValid };
}

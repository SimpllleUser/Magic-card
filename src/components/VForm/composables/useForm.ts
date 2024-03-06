import { computed, ComputedRef, Ref, ref, watchEffect } from 'vue';
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
  updateInputValue: CallbackFunction;
};

const getInputParams = (inputParams: FormInputProps): FormItemConfig => {
  if (Array.isArray(inputParams)) return inputParams.map(getInputParams);
  return {
    ...inputParams,
    value: ref(inputParams.value),
    rules: inputParams.rules,
    error: '',
    label: inputParams.label ?? '',
    hint: inputParams.hint ?? ''
  };
};

const getInputValue = (input: FormItemConfig): FormDataValue => {
  if (Array.isArray(input.value)) return input.map(getInputValue);
  return input.value;
};

const getInitDataForm = (initialDataParams: Record<string, InputItemConfig>) =>
  mapValues(initialDataParams, getInputParams);

export function useForm(initialFormConfig: Record<string, InputItemConfig>): UseFormResult {
  const canShowError = ref(false);

  const formData = ref<Record<string, FormItemConfig>>(getInitDataForm(initialFormConfig));

  const updateInputValue = (values: FormDataValue) => {
    if (!Object.values(values).length) return;
    Object.keys(values).forEach((key) => {
      formData.value[key] = { ...formData.value[key], value: values[key] };
    });
  };

  watchEffect(() => {
    for (const key in formData.value) {
      if (Object.prototype.hasOwnProperty.call(formData.value, key)) {
        const input = formData.value[key];
        if (Array.isArray(input.value)) {
          input.value.forEach((inputItem) => {
            for (const key in inputItem) {
              if (Object.keys(inputItem).includes('error')) {
                const currentItem = inputItem[key];
                const existError = Object.keys(inputItem).includes('error');
                currentItem.error = existError && canShowError.value ? useValidation(currentItem) : '';
              }
            }
          });
          // input.value.forEach((someItem: FormItemConfig) => {
          //   const internalInput = someItem;
          //   console.log(useValidation(internalInput), canShowError.value, internalInput);
          //   internalInput.error = canShowError.value ? useValidation(internalInput) : '';
          // });
        }
        input.error = canShowError.value ? useValidation(input) : '';
      }
    }
  });

  const mapToValue = (item: any): any => {
    if (item?.id) {
      return item;
    }
    if (Array.isArray(item.value)) {
      return Object.values(item.value).map((item) =>
        Object.fromEntries(
          Object.entries(item)
            .filter(([key]) => key !== 'id')
            .map(([key, value]) => [key, mapToValue(value)])
        )
      );
    }
    return {
      ...item,
      error: canShowError.value ? useValidation(item) : ''
    };
  };

  const onSubmit = (action?: CallbackFunction) => {
    canShowError.value = true;
    action && action();
  };

  const onReset = (action?: CallbackFunction) => {
    canShowError.value = false;
    formData.value = cloneDeep(initialFormConfig);
    action && action();
  };

  const formDataValue = computed(() => mapValues(formData.value, getInputValue));
  const isValid = computed(() => Object.values(formData.value).every((input) => !useValidation(input)));

  return { formData, onSubmit, onReset, formDataValue, isValid, updateInputValue };
}

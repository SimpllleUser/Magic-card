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
  updateInputValue: CallbackFunction;
};

const getInputParams = (inputParams: any): FormItemConfig => {
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
  // if (Array.isArray(input.value)) return input.map(getInputValue);
  return input.value;
};

const getInitDataForm = (initialDataParams: Record<string, InputItemConfig>) =>
  mapValues(initialDataParams, getInputParams);

export function useForm(initialFormConfig: Record<string, InputItemConfig>): UseFormResult {
  const canShowError = ref(false);

  const formData = ref<Record<string, FormItemConfig>>(getInitDataForm(initialFormConfig));

  // const activateValidationRule = (item: any): any => {
  //   if (Array.isArray(item.value)) {
  //     // return item.value.map((item) => mapValues(item, activateValidationRule));
  //     return item.value.map((inputRow) => {
  //       console.log(inputRow);
  //       return Object.fromEntries(
  //         Object.entries(inputRow).map(([key, value]) =>
  //           key === 'id' ? [key, value] : [key, activateValidationRule(value)]
  //         )
  //       );
  //     });
  //   }
  //   return {
  //     ...item,
  //     _rules: canShowError.value ? item.rules : []
  //   };
  // };

  watch(
    () => canShowError.value,
    () => {
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
        item._rules = canShowError.value ? item.rules : [];
      }
    }
  );

  // watchEffect(() => {
  //   console.log(canShowError.value);
  //   for (const key in formData.value) {
  //     const item = formData.value[key] as any;
  //     if (Array.isArray(item.value)) {
  //       item.value = item.value.map((inputItem) => {
  //         return mapValues(inputItem, (item) => {
  //           if (typeof item !== 'object') return item;
  //           return {
  //             ...item,
  //             _rules: canShowError.value ? item.rules : []
  //           };
  //         });
  //       });
  //       item.modelValue = item.value.map((inputItem) => {
  //         return mapValues(inputItem, (item) => {
  //           if (typeof item !== 'object') return item;
  //           return {
  //             ...item,
  //             _rules: canShowError.value ? item.rules : []
  //           };
  //         });
  //       });
  //     }
  //     item._rules = item.rules;
  //   }
  // });

  const updateInputValue = (values: FormDataValue) => {
    if (!Object.values(values).length) return;
    Object.keys(values).forEach((key) => {
      formData.value[key] = { ...formData.value[key], value: values[key] };
    });
  };

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

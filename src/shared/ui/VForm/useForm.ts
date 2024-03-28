import { cloneDeep, has, mapValues } from 'lodash';
import { useValidation } from 'src/components/VForm/composables/useValidation';
import { computed, ComputedRef, ref, Ref, watch, watchEffect } from 'vue';
import { SimpleFormInputConfig, UseFormParams } from './types';

export function useForm<T>(formConfig: any): {
  inputs: Ref<any>;
  formValue: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
  onSubmit: (action?: CallableFunction) => void;
  onReset: (action?: CallableFunction) => void;
} {
  const canShowError = ref(false);

  const inputs = ref<UseFormParams>(formConfig);

  const formValue = computed<T>(() => getFormValue(inputs.value));

  const activateRulesOfForm = (allowActivateValidation: boolean): void => {
    if (!allowActivateValidation) return;
    Object.keys(inputs.value).forEach((key) => {
      const item = inputs.value[key];
      if (!has(item, 'value')) return;
      item.activateValidation && item.activateValidation(allowActivateValidation);
    });
  };

  const onSubmit = (action?: CallableFunction) => {
    canShowError.value = true;
    activateRulesOfForm(canShowError.value);
    action && action();
  };

  const onReset = (action?: CallableFunction) => {
    canShowError.value = false;
    inputs.value = cloneDeep<UseFormParams>(formConfig);
    action && action();
  };

  watch(
    () => canShowError.value,
    () => {
      activateRulesOfForm(canShowError.value);
    }
  );
  watchEffect(() => {
    activateRulesOfForm(canShowError.value);
  });

  const isValid = computed((): boolean => isValidForm(inputs.value));

  return {
    inputs,
    formValue,
    isValid,
    onSubmit,
    onReset
  };
}

function getFormValue<T>(form: any): any {
  return mapValues(form, (item) => (has(item, 'value') ? item.getValue() : item)) as T;
}

function isValidForm(form: UseFormParams): boolean {
  return Object.values(form as unknown as { [key: string]: any })
    .filter((item: SimpleFormInputConfig) => has(item, 'value'))
    .every((item: SimpleFormInputConfig) => {
      return item?.isValid && item?.isValid(useValidation);
    });
}

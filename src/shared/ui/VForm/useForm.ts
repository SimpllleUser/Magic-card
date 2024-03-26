import { cloneDeep, has, mapValues } from 'lodash';
import { useValidation } from 'src/components/VForm/composables/useValidation';
import { computed, ComputedRef, ref, Ref, watch, watchEffect } from 'vue';
import { SimpleFormInputConfig, UseFormParams } from './types';

export function useForm<T>(formConfig: UseFormParams): {
  form: Ref<any>;
  formValue: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
  onSubmit: (action?: CallableFunction) => void;
  onReset: (action?: CallableFunction) => void;
} {
  const canShowError = ref(false);

  const form = ref<UseFormParams>(formConfig);

  const formValue = computed((): T => getFormValue(form.value));

  const activateRulesOfForm = (allowActivateValidation: boolean): void => {
    if (!allowActivateValidation) return;
    Object.keys(form.value).forEach((key) => {
      const item = form.value[key];
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
    form.value = cloneDeep<UseFormParams>(formConfig);
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

  const isValid = computed((): boolean => isValidForm(form.value));

  return {
    form,
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
  return Object.values(form as unknown as { [key: string]: SimpleFormInputConfig })
    .filter((item: SimpleFormInputConfig) => has(item, 'value'))
    .every((item: SimpleFormInputConfig) => {
      return item?.isValid && item?.isValid(useValidation);
    });
}

import { cloneDeep, has, mapValues } from 'lodash';
import { useValidation } from 'src/components/VForm/composables/useValidation';
import { computed, ComputedRef, ref, Ref, watch, watchEffect } from 'vue';
import { FormConfig, IFormInput } from './types';

export function useForm<T>(formConfig: FormConfig): {
  inputs: Ref<any>;
  formValue: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
  onSubmit: (action?: CallableFunction) => void;
  onReset: (action?: CallableFunction) => void;
} {
  const canShowError = ref(false);

  const inputs = ref<FormConfig>(formConfig);

  const formValue = computed<T>(() => getFormValue(inputs.value));

  const activateRulesOfForm = (allowActivateValidation: boolean): void => {
    if (!allowActivateValidation) return;
    Object.keys(inputs.value).forEach((key: string) => {
      const item = inputs.value[key] as IFormInput;
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
    inputs.value = cloneDeep<FormConfig>(formConfig);
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

function isValidForm(form: FormConfig): boolean {
  return Object.values(form as unknown as { [key: string]: any })
    .filter((item: IFormInput) => has(item, 'value'))
    .every((item: IFormInput) => {
      return item?.isValid && item?.isValid(useValidation);
    });
}

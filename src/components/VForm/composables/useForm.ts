import { ref, watchEffect } from 'vue';
import { mapValues } from 'lodash';
import { useValidation } from 'components/VForm/composables/useValidation';
import { FormItemConfig, InputItemConfig } from '../types';
import { CallbackFunction } from 'boot/types';

export function useForm(initialFormConfig: Record<string, InputItemConfig>) {
  const canShowError = ref(false);

  const getInitDataForm = (initialDataParams: Record<string, InputItemConfig>) => {
    return mapValues(initialDataParams, (inputParams: InputItemConfig) => {
      return {
        ...inputParams,
        value: ref(inputParams.value),
        rules: inputParams.rules,
        error: ''
      };
    });
  };

  const formData = ref<Record<string, FormItemConfig>>(getInitDataForm(initialFormConfig));

  watchEffect(() => {
    for (const key in formData.value) {
      if (Object.prototype.hasOwnProperty.call(formData.value, key)) {
        const input = formData.value[key];
        input.error = canShowError.value ? useValidation(input) : '';
      }
    }
  });

  const onSubmit = (action?: CallbackFunction) => {
    canShowError.value = true;
    action && action();
  };

  const onReset = (action?: CallbackFunction) => {
    canShowError.value = false;
    action && action();
  };

  return { formData, onSubmit, onReset };
}

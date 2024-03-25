import { has, isObject, mapValues } from 'lodash';
import { useValidation } from 'src/components/VForm/composables/useValidation';
import { computed, ComputedRef, ref, Ref, watch, watchEffect } from 'vue';
import { FormInputTypes, SimpleFormInputConfig, SimpleFormInputType, SimpleValueTypes, UseFormParams } from './types';

export function useForm<T>(formConfig: UseFormParams): {
  form: Ref<any>;
  formValue: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
  onSubmit: (action?: CallableFunction) => void;
  onReset: (action?: CallableFunction) => void;
} {
  const canShowError = ref(false);

  const form = ref<UseFormParams>(formConfig);
  const formValue = computed((): T => getValueFromForm(form.value));

  /// зробити активацію правил для форми по аналогії з activateRulesInForm

  const activateRulesOfForm = () => {
    for (const key in form.value) {
      const item = form.value[key];
      if (isObject(item.value)) {
        console.log({ item }, has(item, 'rules'));
        item.value = mapValues(item.value, (inputItem: SimpleFormInputConfig) => {
          return mapValues(inputItem, (item: SimpleFormInputConfig) => {
            if (!has(item, 'rules')) return item;
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

  const onSubmit = (action?: CallableFunction) => {
    canShowError.value = true;
    activateRulesOfForm();
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
      canShowError.value && activateRulesOfForm();
    }
  );
  watchEffect(() => {
    canShowError.value && activateRulesOfForm();
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

const getValueFromInput = (item: SimpleFormInputConfig | SimpleValueTypes): SimpleValueTypes => {
  if (typeof item !== 'object') return item;
  return item.value;
};

const collectionOfGetvalueFromForm = {
  [FormInputTypes.Input]: (item: SimpleFormInputConfig) => item.value,
  [FormInputTypes.Check]: (item: SimpleFormInputConfig) => item.value,
  [FormInputTypes.Select]: (item: SimpleFormInputConfig) => item.value,
  [FormInputTypes.InputList]: (item: { value: Array<Record<string, SimpleFormInputConfig>> }) => {
    return Array.isArray(item.value)
      ? item.value?.map((inputItem: Record<string, SimpleFormInputConfig>) => {
          return mapValues(inputItem, getValueFromInput);
        })
      : [];
  }
};

function getValueFromForm<T>(form: UseFormParams): T {
  return mapValues(form, (item: SimpleFormInputConfig & { component: SimpleFormInputType }) => {
    if (typeof item !== 'object') return item;
    return collectionOfGetvalueFromForm[item.component as FormInputTypes](item);
  }) as T;
}

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function isValidForm(form: UseFormParams): boolean {
  return Object.values(form as unknown as { [key: string]: SimpleFormInputConfig })
    .filter((item: SimpleFormInputConfig) => has(item, 'rules'))
    .every((item: SimpleFormInputConfig) => {
      return !useValidation(item);
    });
}

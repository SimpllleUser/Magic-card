import { computed, Ref } from 'vue';
import { isString } from 'src/helpers/utils';

export function useInputErrors({ rules, value }: { rules: Array<unknown>; value: Ref<unknown> }) {
  const internalErrors = computed(
    () =>
      rules
        .map((rule) => rule(value.value))
        .filter(isString)
        .at(0) || ''
  );
  const existError = computed(() => Boolean(internalErrors.value));

  return {
    existError: existError.value,
    internalErrors: internalErrors.value
  };
}

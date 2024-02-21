import { computed } from 'vue';
import { isString } from 'src/helpers/utils';

export function useInputErrors({ rules, value }: { rules: Array<unknown>; value: unknown }) {
  const error = computed(
    () =>
      rules
        .map((rule) => rule(value))
        .filter(isString)
        .at(0) || ''
  );

  return error;
}

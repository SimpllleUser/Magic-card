import { ref, watchEffect } from 'vue';
import { mapValues } from 'lodash';
import validationRules from 'components/VForm/validationRules';
import { useInputErrors } from 'components/VInput/useInputErrors';
import { FormInputItem, InputItem } from '../types';

const { rules } = validationRules;

const getRuleArguments = (ruleKey: string): { ruleKey: string; paramsInArray: string[] } => {
  const [rule, paramsInString] = ruleKey?.split(':') || [];
  const paramsInArray = paramsInString?.split(',') || [];
  return { ruleKey: rule, paramsInArray };
};

const getRules = (keys: Array<string>): ((value: unknown) => boolean)[] =>
  keys.map((key) => (value: unknown) => {
    const { ruleKey, paramsInArray } = getRuleArguments(key);
    const params = [value, ...paramsInArray];
    return rules[ruleKey](...params);
  });

export function useForm(initialFormConfig: Record<string, InputItem>) {
  const canShowError = ref(false);

  const getInitDataForm = (initialDataParams: Record<string, InputItem>) => {
    return mapValues(initialDataParams, (inputParams: InputItem) => {
      return {
        value: ref(inputParams.value),
        rules: inputParams.rules,
        error: ''
      };
    });
  };

  const formData = ref<Record<string, FormInputItem>>(getInitDataForm(initialFormConfig));

  watchEffect(() => {
    for (const key in formData.value) {
      if (Object.prototype.hasOwnProperty.call(formData.value, key)) {
        const input = formData.value[key];
        input.error = canShowError.value
          ? useInputErrors({
              rules: getRules(input.rules) || [],
              value: input.value
            })
          : '';
      }
    }
  });

  const onSubmit = (action?: unknown) => {
    canShowError.value = true;
    action && action();
  };

  const onReset = (action?: unknown) => {
    canShowError.value = false;
    action && action();
  };

  return { formData, onSubmit, onReset };
}

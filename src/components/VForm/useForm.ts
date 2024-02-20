import { computed, reactive, ref } from 'vue';
import { mapValues } from 'lodash';
import validationRules from 'components/VForm/validationRules';

const { rules } = validationRules;

type InputItem = { value: unknown; rules: Array<string> };

const getRuleArguments = (ruleKey: string): any => {
  const [rule, paramsInString] = ruleKey?.split(':') || [];
  const paramsInArray = paramsInString?.split(',') || [];
  return { ruleKey: rule, paramsInArray };
};

export function useForm(initialFormConfig: Record<string, InputItem>) {
  const getRules = (keys: Array<string>): Array<any> =>
    keys.map((key) =>
      canShowError.value
        ? (value: any) => {
            const { ruleKey, paramsInArray } = getRuleArguments(key);
            const params = [value, ...paramsInArray];
            return rules[ruleKey](...params);
          }
        : () => true
    );

  const canShowError = ref(false);

  const initedData = mapValues(initialFormConfig, (inputParams: InputItem) => ({
    value: ref(inputParams.value),
    rules: computed(() => getRules(inputParams.rules))
  }));

  const formData = ref(initedData);

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

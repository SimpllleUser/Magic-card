import { computed } from 'vue';
import { isString } from 'lodash';
import { rules } from 'components/VForm/composables/rules';
import { isBoolean } from 'lodash';
import { ValidationRule } from '../types';
import { SimpleFormInputConfig } from 'src/shared/ui/VForm/types';

const getRuleArguments = (ruleKey: string): { ruleKey: string; paramsInArray: string[] } => {
  const [rule, paramsInString] = ruleKey?.split(':') || [];
  const paramsInArray = paramsInString?.split(',') || [];
  return { ruleKey: rule, paramsInArray };
};

const getRules = (keys: Array<ValidationRule>): ((value: unknown) => boolean | string)[] =>
  keys?.map((key) => (value: unknown) => {
    const { ruleKey, paramsInArray } = getRuleArguments(key);
    const params = [value, ...paramsInArray];
    return rules[ruleKey](...params) as boolean | string;
  });
export function useValidation(input: SimpleFormInputConfig) {
  const error = computed((): string => {
    const actualRules = getRules(input?.rules || []);
    const resultValidation =
      actualRules
        .map((rule) => rule(input.value))
        .filter(isString)
        .at(0) || '';
    return isBoolean(resultValidation) ? '' : resultValidation;
  });

  return error.value;
}

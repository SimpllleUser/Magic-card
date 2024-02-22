import { computed } from 'vue';
import { isString } from 'lodash';
import { rules } from 'components/VForm/composables/rules';
import { isBoolean } from 'lodash';

const getRuleArguments = (ruleKey: string): { ruleKey: string; paramsInArray: string[] } => {
  const [rule, paramsInString] = ruleKey?.split(':') || [];
  const paramsInArray = paramsInString?.split(',') || [];
  return { ruleKey: rule, paramsInArray };
};

const getRules = (keys: Array<string>): ((value: any) => boolean | string)[] =>
  keys?.map((key) => (value: unknown) => {
    const { ruleKey, paramsInArray } = getRuleArguments(key);
    const params = [value, ...paramsInArray];
    return rules[ruleKey](...params);
  });
export function useValidation({ rules, value }: { rules: Array<string>; value: unknown }) {
  const error = computed((): string => {
    const actualRules = getRules(rules || []);
    const resultValidation =
      actualRules
        .map((rule) => rule(value))
        .filter(isString)
        .at(0) || '';
    return isBoolean(resultValidation) ? '' : resultValidation;
  });

  return error.value;
}

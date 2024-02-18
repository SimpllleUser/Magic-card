import { computed, ref } from 'vue';
import validationRules from 'components/VForm/validationRules';

export function useForm(config: any): any {
  // const modelOfForm = Object.fromEntries(Object.entries(config).map(([key, config]) => ({
  //
  // })));
  // const validationInput = useValidationInput()
}

export function useValidationInput(keyRules: Array<string>): any {
  const { rules } = validationRules;

  const canShowError = ref<boolean>(false);
  const stateOfValidation = ref<Array<boolean | string>>([]);
  // const isValid = computed(() => stateOfValidation.value.every((state) => typeof state === 'boolean'));
  // const submitWrapper = (actionOnSubmit: Function): void => {
  //   canShowError.value = true;
  //   if (!isValid.value) return;
  //   actionOnSubmit();
  // };

  // TODO Додати обгортку для передачі аргуменів в методи валідаціх
  const checkValidation = (value: unknown): Array<boolean | string> | undefined => {
    if (!canShowError.value) return;
    return keyRules
      .map((key: string) => rules[key])
      .filter(Boolean)
      .map((method) => method(value));
  };

  return {
    checkValidation
    // submitWrapper
  };
}

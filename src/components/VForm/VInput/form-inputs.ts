import { ComponentTypes, FormInputProps, IUseFormInput } from 'components/VForm/types';
import { QCheckbox, QInput, QSelect } from 'quasar';
// import FormInputList from 'components/VForm/VInput/FormInputList.vue';
import FormInputList from './FormInputList.vue';
import { mapValues } from 'lodash';

export const initFormInput =
  (component: ComponentTypes) =>
  (params: FormInputProps): IUseFormInput => ({
    ...params,
    component
  });

const [useInput, useSelect, useCheckbox] = [ComponentTypes.Input, ComponentTypes.Select, ComponentTypes.Checkbox].map(
  initFormInput
);

const useFormInputList = (formInputsParams: Array<Record<string, FormInputProps>>) => ({
  component: ComponentTypes.FormInputList,
  modelValue: formInputsParams,
  config: mapValues(formInputsParams, () => '')
});

const components = {
  Input: QInput,
  Select: QSelect,
  Checkbox: QCheckbox,
  FormInputList: FormInputList
};

export { useInput, useSelect, useCheckbox, useFormInputList, components };

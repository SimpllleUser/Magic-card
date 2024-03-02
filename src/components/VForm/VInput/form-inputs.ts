import { ComponentTypes, FormInputProps, IUseFormInput } from 'components/VForm/types';
import { QCheckbox, QInput, QSelect } from 'quasar';

export const initFormInput =
  (component: ComponentTypes) =>
  (params: FormInputProps): IUseFormInput => ({
    ...params,
    component
  });

const [useInput, useSelect, useCheckbox] = [ComponentTypes.Input, ComponentTypes.Select, ComponentTypes.Checkbox].map(
  initFormInput
);

const components = {
  Input: QInput,
  Select: QSelect,
  Checkbox: QCheckbox
};

export { useInput, useSelect, useCheckbox, components };

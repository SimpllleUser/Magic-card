import { QCheckbox, QInput, QSelect } from 'quasar';
import { FormInputList } from 'src/shared/ui/VForm/base/FormInputList';
// import FormInputList from 'src/shared/ui/_VForm/_components/FormInputList.vue';

const components = {
  Input: QInput,
  Select: QSelect,
  Checkbox: QCheckbox,
  FormInputList: FormInputList
};

export type ComponentTypes = keyof typeof components;

// export const EXCESS_PROPS = ['rules', 'modelValue', 'errorMessage', 'error', 'bottomSlots'];

export { components };

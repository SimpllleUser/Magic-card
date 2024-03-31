import { QCheckbox, QInput, QSelect } from 'quasar';
import FormInputList from '../../../shared/ui/VForm/_components/FormInputList.vue';

const components = {
  Input: QInput,
  Select: QSelect,
  Checkbox: QCheckbox,
  FormInputList: FormInputList
};

export type ComponentTypes = keyof typeof components;

export const EXCESS_PROPS = ['rules', 'modelValue', 'errorMessage', 'error', 'bottomSlots'];

export { components };

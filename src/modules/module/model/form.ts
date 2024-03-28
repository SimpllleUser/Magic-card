import { ValidationRule } from 'src/components/VForm/types';
import { useText } from 'src/shared/ui/VForm/form-inputs';
import { IInputString } from 'src/shared/ui/VForm/form-inputs/base-inputs';
import { IModule } from '../types';

export interface IModuleFormConfig {
  id: string;
  title: IInputString;
  description: IInputString;
}

export const getFormConfig = (data?: IModule): IModuleFormConfig => {
  return {
    id: data?.id || '',
    title: useText({
      value: data?.title || '',
      label: 'Title',
      rules: [ValidationRule.Required]
    }),
    description: useText({
      value: data?.description || '',
      label: 'Description',
      rules: [ValidationRule.Required]
    })
  };
};

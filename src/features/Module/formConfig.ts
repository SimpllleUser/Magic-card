import { IModule } from 'src/entities/Module';
import { ValidationRule } from 'src/shared/composables/validation';
import { IInputString, useText } from 'src/shared/ui/VForm';

export interface IModuleFormConfig {
  id: string;
  title: IInputString;
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

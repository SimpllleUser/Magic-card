import { computed, Ref, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { useForm } from 'src/shared/ui/VForm/useForm';
import { useText } from 'src/shared/ui/VForm/form-inputs';
import { ValidationRule } from 'src/shared/ui/VForm/validation/rules';
import { ActionForm } from 'src/shared/ui/VForm/types';
import { EntityUnform } from 'boot/types';
import { WordEntity } from 'src/features/words/types/word';
import { useModulesStore, IModule, IModuleFormConfig } from 'src/entities/Module';

/// ADD FIX
/// EXAMPLE FOR FSD - > https://github.com/AKosogorov/fake-cyber-web-store/blob/master/src/shared/ui/VPrice/VPrice.vue
/// - Refactor by FSD VForm

interface IUseModuleAddOrUpdate {
  form: any;
  formAction: ActionForm;
  wordsList: Ref<Array<WordEntity>>;
  initDataModule: CallableFunction;
  onSubmitModule: CallableFunction;
}

export function useModuleAddOrUpdate(module: IModule): IUseModuleAddOrUpdate {
  const moduleStore = useModulesStore();
  const getFormConfig = (data?: IModule): IModuleFormConfig => {
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
  const generateForm = (params?: IModule) => useForm<IModule>(getFormConfig(params || {}));

  const form = ref(generateForm());
  const wordsList = ref<Array<WordEntity>>([]);

  const initDataModule = (module: IModule) => {
    if (!module?.id) return;
    form.value = generateForm(module || {});
    wordsList.value = cloneDeep(module.words);
  };

  const onSubmitModule = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = module?.id ? moduleStore.update : moduleStore.create;
    storeAction({ ...data, words: wordsList.value });
    form.value.onReset();
    action();
  };

  const formAction = computed((): ActionForm => {
    console.log(form.value.formValue.id);
    return form.value.formValue.id ? ActionForm.Edit : ActionForm.Create;
  });

  return {
    form,
    wordsList,
    formAction,
    initDataModule,
    onSubmitModule
  };
}
